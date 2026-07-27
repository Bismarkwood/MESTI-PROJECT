// Smart text answers via the Amazon Bedrock Converse API. Runs a tool-use loop
// so the model can navigate/highlight, and keeps short per-session memory so the
// conversation has context. Returns final text plus any browser action.

import { BedrockRuntimeClient, ConverseCommand } from '@aws-sdk/client-bedrock-runtime'
import type { ContentBlock, Message } from '@aws-sdk/client-bedrock-runtime'
import { buildSystemPrompt, buildConverseToolConfig } from './assistantConfig.ts'
import { dispatchTool } from './toolDispatch.ts'

const REGION = process.env.AWS_REGION ?? 'us-east-1'
const MODEL_ID = process.env.BEDROCK_TEXT_MODEL_ID ?? 'us.anthropic.claude-sonnet-4-5-20250929-v1:0'
const MAX_HISTORY = 16 // messages retained per session
const MAX_TOOL_LOOPS = 4

const client = new BedrockRuntimeClient({ region: REGION })
const toolConfig = buildConverseToolConfig()

// sessionId -> conversation messages
const sessions = new Map<string, Message[]>()
const lastSeen = new Map<string, number>()

export interface TextReply {
  text: string
  action: unknown | null
}

export async function askTextBrain(sessionId: string, userText: string, lang?: string): Promise<TextReply> {
  const history = sessions.get(sessionId) ?? []
  history.push({ role: 'user', content: [{ text: userText }] })

  let action: unknown | null = null
  let finalText = ''

  for (let loop = 0; loop < MAX_TOOL_LOOPS; loop++) {
    let res
    try {
      res = await client.send(
        new ConverseCommand({
          modelId: MODEL_ID,
          system: [{ text: buildSystemPrompt(lang) }],
          messages: history,
          toolConfig,
          inferenceConfig: { maxTokens: 320, temperature: 0.5 },
        }),
      )
    } catch (err) {
      // A malformed history (e.g. a stray/empty message) can make every future
      // turn in this session fail. Drop the session so the next turn starts
      // fresh instead of erroring forever.
      sessions.delete(sessionId)
      lastSeen.delete(sessionId)
      throw err
    }

    const message = res.output?.message
    if (!message?.content || message.content.length === 0) break
    history.push(message)

    // Collect any text the model produced this step.
    const stepText = sanitize(
      message.content
        .map((b) => ('text' in b ? b.text : ''))
        .filter(Boolean)
        .join(' '),
    )
    if (stepText) finalText = stepText

    if (res.stopReason === 'tool_use') {
      const toolResults: ContentBlock[] = []
      for (const block of message.content) {
        if (!('toolUse' in block) || !block.toolUse) continue
        const { toolUseId, name, input } = block.toolUse
        const { action: a, result } = dispatchTool(name ?? '', (input as Record<string, unknown>) ?? {})
        if (a && !action) action = a
        toolResults.push({
          toolResult: { toolUseId: toolUseId!, content: [{ text: result }] },
        })
      }
      history.push({ role: 'user', content: toolResults })
      continue // let the model produce its confirmation
    }

    break // end_turn / stop
  }

  // Persist trimmed history — never cut between a tool_use and its tool_result,
  // Bedrock requires those to stay adjacent.
  sessions.set(sessionId, trimHistory(history, MAX_HISTORY))
  lastSeen.set(sessionId, Date.now())
  pruneOldSessions()

  return { text: finalText || "I'm not sure how to answer that — want me to point you to the Contact page?", action }
}

/** Trim to the last `max` messages without splitting a tool_use/tool_result pair. */
function trimHistory(history: Message[], max: number): Message[] {
  if (history.length <= max) return history
  let start = history.length - max
  // A message whose content is all toolResult blocks must keep its preceding
  // (toolUse) message. Walk forward until we're not starting on one.
  while (
    start < history.length &&
    history[start]?.content?.some((b) => 'toolResult' in b) &&
    start > 0
  ) {
    start--
  }
  return history.slice(start)
}

// Strip reasoning/markup tags some models emit (e.g. <thinking>, <response>).
function sanitize(text: string): string {
  return text
    .replace(/<thinking>[\s\S]*?<\/thinking>/gi, '')
    .replace(/<\/?thinking>/gi, '')
    .replace(/<\/?response>/gi, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

// Drop sessions idle for over an hour to avoid unbounded growth.
function pruneOldSessions() {
  const cutoff = Date.now() - 60 * 60 * 1000
  for (const [id, ts] of lastSeen) {
    if (ts < cutoff) {
      sessions.delete(id)
      lastSeen.delete(id)
    }
  }
}
