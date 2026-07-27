// Shared system prompt + tool definitions for the BigData Ghana assistant.
// Highlighting is resolved live in the browser DOM (see targetResolver.ts), so
// there's no fixed section list to maintain — the model just names the page and
// a short query describing the thing to highlight.

import { PAGES } from '../src/services/assistant/navigation.ts'
import { COMPANY_NAME } from '../src/services/assistant/knowledgeBase.ts'
import { SITE_KNOWLEDGE } from './siteKnowledge.ts'

/** Tool names shared between the model config and the dispatcher. */
export const TOOL = {
  navigate: 'navigate_to_page',
  highlight: 'highlight_section',
  openLink: 'open_external_link',
} as const

const pagePaths = PAGES.map((p) => p.path)

/** Raw tool definitions (schema kept as a plain object). Shared by all brains. */
export const TOOL_DEFS = [
  {
    name: TOOL.navigate,
    description:
      'Navigate the website to a specific page. Use when the user is interested in a page or asks to go to / open / view one, and no more specific item applies.',
    schema: {
      type: 'object',
      properties: {
        path: { type: 'string', enum: pagePaths, description: 'The route path of the page to open.' },
      },
      required: ['path'],
    },
  },
  {
    name: TOOL.highlight,
    description:
      'Scroll to and visually highlight a specific item or section on a page. The target is found live in the page by matching your query text, so it can pinpoint anything currently on the site (a service, a product or project card, a team member, the mission, the contact form, etc.). Use this whenever the user is interested in something specific.',
    schema: {
      type: 'object',
      properties: {
        page: { type: 'string', enum: pagePaths, description: 'The page the item lives on.' },
        query: {
          type: 'string',
          description:
            'A short, specific description of the exact thing to highlight, using the words most likely to appear on the page. Examples: "cloud migration", "BigConnect AI", "mission and vision", "Henry Baffoe", "open roles", "contact form".',
        },
      },
      required: ['page', 'query'],
    },
  },
  {
    name: TOOL.openLink,
    description: 'Open an external URL in a new browser tab. Use only for links the user explicitly asks to open.',
    schema: {
      type: 'object',
      properties: {
        url: { type: 'string', description: 'The absolute https URL to open.' },
        label: { type: 'string', description: 'A short human label for the link.' },
      },
      required: ['url'],
    },
  },
]

function toolGuidance(): string {
  const pageList = PAGES.map((p) => `${p.label} (${p.path})`).join(', ')
  return `Be proactive with the site. Whenever the user shows interest in a page, topic, product, service, \
person or section, take them there as you answer, even if they don't say "open" or "show me". Only skip this \
for greetings and small talk that isn't about the site.
- ${TOOL.highlight}: PREFER this whenever the user's interest maps to something specific. Give the page plus a \
short query naming the exact thing (a service, a product/project, a team member, the mission, the contact \
form). Use the knowledge below to choose the right page and phrase the query with words that appear on it.
- ${TOOL.navigate}: use only when the user wants a whole page with nothing specific in mind. Prefer a dedicated \
topic page (geospatial, cloud, ai-automation, data-analytics) over the generic Services page.
- Pages available: ${pageList}. Use only these exact paths. At most one navigation or highlight per reply. \
After acting, mention it in a natural half-sentence (e.g. "I've pulled it up for you").`
}

/** ISO 639-1 code → English name, for the "respond in this language" directive. */
export const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English',
  fr: 'French',
  es: 'Spanish',
  pt: 'Portuguese',
  de: 'German',
  zh: 'Chinese (Mandarin, Simplified)',
  ja: 'Japanese',
  ko: 'Korean',
  ar: 'Arabic',
  sw: 'Swahili',
}

function languageDirective(lang?: string): string {
  const code = (lang ?? 'en').toLowerCase()
  if (code === 'en' || !LANGUAGE_NAMES[code]) return ''
  const name = LANGUAGE_NAMES[code]
  return `\n\nLANGUAGE:\n- Respond entirely in ${name}. Write natural, fluent ${name} as a native speaker would. \
Keep proper nouns (company, product, project and place names) in their original form. The knowledge below is in \
English; translate the relevant facts into ${name} in your reply. The tool query for highlighting should still \
use the English words that appear on the page.`
}

/**
 * Grounding system prompt for the Bedrock brain. Answers power both typed chat
 * and (via Polly) spoken replies, so keep them plain and speakable. When `lang`
 * is a non-English code, the model is instructed to reply in that language.
 */
export function buildSystemPrompt(lang?: string): string {
  return `You are the assistant for ${COMPANY_NAME}, on their website. Talk like a sharp, knowledgeable human, warm and helpful, not a brochure.${languageDirective(lang)}

STYLE:
- Be genuinely helpful and specific: pack real detail from the knowledge into two to four sentences. Favour specificity over length; only go longer if the user explicitly asks for more detail.
- Plain, speakable prose in one short paragraph: no markdown, bullet points, numbered lists, emojis, symbols, or multi-paragraph answers (replies may be read aloud).
- Answer what was asked well, then offer a natural next step or short follow-up.
- Reply with only the message, no XML tags, no thinking, no reasoning.

Use the KNOWLEDGE below to answer accurately about anything on the website: services, projects, solutions, team, insights, careers, contact, clients. Pull the relevant detail rather than reciting it all. If something isn't in the knowledge, say you're not sure and offer the Contact page.

${SITE_KNOWLEDGE}

${toolGuidance()}`
}

/** Bedrock Converse tool configuration (schema as object). */
export function buildConverseToolConfig() {
  return {
    tools: TOOL_DEFS.map((t) => ({
      toolSpec: {
        name: t.name,
        description: t.description,
        inputSchema: { json: t.schema },
      },
    })),
  }
}
