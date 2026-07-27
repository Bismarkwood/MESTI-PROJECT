// Assistant backend (HTTP, no WebSocket needed).
//   POST /chat   → smart text answers via Bedrock Converse (text + tool use).
//   POST /speak  → Amazon Polly text-to-speech, returns MP3 audio.
// The browser handles speech-to-text with the Web Speech API, so the voice loop
// is: browser STT → /chat → /speak → play.

import 'dotenv/config'
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http'
import { WebSocketServer, WebSocket } from 'ws'
import { askTextBrain } from './textBrain.ts'
import { synthesizeSpeech, ttsInfo, availableVoices, defaultVoiceKey } from './tts.ts'
import { openSttStream, sttInfo } from './sttStream.ts'

const PORT = Number(process.env.PORT ?? 8080)
const REGION = process.env.AWS_REGION ?? 'us-east-1'

function setCors(res: ServerResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

const httpServer = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  setCors(res)

  if (req.method === 'OPTIONS') {
    res.writeHead(204).end()
    return
  }

  if (req.method === 'POST' && req.url === '/chat') {
    try {
      const body = await readBody(req)
      const { sessionId, text, lang } = JSON.parse(body || '{}')
      if (typeof text !== 'string' || !text.trim()) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'text is required' }))
        return
      }
      const reply = await askTextBrain(
        String(sessionId ?? 'default'),
        text.trim(),
        typeof lang === 'string' ? lang : undefined,
      )
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(reply))
    } catch (err) {
      console.error('[assistant] /chat error:', err instanceof Error ? err.message : err)
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'internal error' }))
    }
    return
  }

  if (req.method === 'POST' && req.url === '/speak') {
    try {
      const body = await readBody(req)
      const { text, voice, lang } = JSON.parse(body || '{}')
      if (typeof text !== 'string' || !text.trim()) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'text is required' }))
        return
      }
      const audio = await synthesizeSpeech(
        text.trim(),
        typeof voice === 'string' ? voice : undefined,
        typeof lang === 'string' ? lang : undefined,
      )
      res.writeHead(200, { 'Content-Type': 'audio/mpeg', 'Content-Length': audio.length })
      res.end(audio)
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      console.error('[assistant] /speak error:', message)
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: message }))
    }
    return
  }

  if (req.method === 'GET' && req.url === '/voices') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ voices: availableVoices, default: defaultVoiceKey }))
    return
  }

  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ ok: true }))
    return
  }

  res.writeHead(404).end()
})

// ── Live speech-to-text over WebSocket ───────────────────────────────────────
// Browser streams raw PCM (16 kHz) up; we relay to Deepgram and stream
// transcripts back down.
const wss = new WebSocketServer({ server: httpServer })

wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
  const send = (msg: unknown) => {
    if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(msg))
  }
  // The client passes its chosen language as ?lang=xx on the WS URL.
  const lang = new URL(req.url ?? '/', 'http://localhost').searchParams.get('lang') ?? 'en'
  const stt = openSttStream(
    {
      onUtterance: (text) => send({ type: 'utterance', text }),
      onSpeechStart: () => send({ type: 'speechStart' }),
      onInterim: (text) => send({ type: 'interim', text }),
      onError: (message) => send({ type: 'error', message }),
    },
    lang,
  )

  // Keep the connection alive during long silent pauses (e.g. while the
  // assistant is thinking/speaking and the mic is paused, so no audio flows).
  // Without a heartbeat, idle WebSocket connections can be dropped by the
  // browser, an intermediary proxy, or the underlying TCP stack.
  let alive = true
  ws.on('pong', () => {
    alive = true
  })
  const heartbeat = setInterval(() => {
    if (!alive) {
      ws.terminate()
      return
    }
    alive = false
    try {
      ws.ping()
    } catch {
      /* ignore */
    }
  }, 15000)

  ws.on('message', (data: Buffer, isBinary: boolean) => {
    if (isBinary) stt.sendAudio(data)
  })
  ws.on('close', () => {
    clearInterval(heartbeat)
    stt.close()
  })
  ws.on('error', () => {
    clearInterval(heartbeat)
    stt.close()
  })
})

httpServer.listen(PORT, () => {
  console.log(`[assistant] HTTP + WS listening on http://localhost:${PORT}`)
  console.log(`[assistant]   POST /chat  → Bedrock text (${process.env.BEDROCK_TEXT_MODEL_ID ?? 'amazon.nova-lite-v1:0'})`)
  console.log(`[assistant]   POST /speak → TTS voices [${ttsInfo.voices}] default=${ttsInfo.default}`)
  console.log(`[assistant]   WS   /      → ElevenLabs STT (${sttInfo.model})`)
  console.log(`[assistant] region=${REGION}`)
})

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (c) => {
      data += c
      if (data.length > 1_000_000) reject(new Error('body too large'))
    })
    req.on('end', () => resolve(data))
    req.on('error', reject)
  })
}

