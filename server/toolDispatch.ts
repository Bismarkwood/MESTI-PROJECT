// Maps a model tool call to (a) a browser action the frontend executes and
// (b) a short tool-result string sent back to the model so the conversation flows.

import { PAGES } from '../src/services/assistant/navigation.ts'
import { TOOL } from './assistantConfig.ts'

const pageByPath = Object.fromEntries(PAGES.map((p) => [p.path, p]))

export interface DispatchResult {
  action: unknown | null
  result: string
}

export function dispatchTool(toolName: string, input: Record<string, unknown>): DispatchResult {
  switch (toolName) {
    case TOOL.navigate: {
      const path = String(input.path ?? '')
      const page = pageByPath[path]
      if (!page) return { action: null, result: `No page found for path "${path}".` }
      return {
        action: { type: 'navigate', path: page.path, label: page.label },
        result: `Opened the ${page.label} page.`,
      }
    }

    case TOOL.highlight: {
      const path = String(input.page ?? '')
      const query = String(input.query ?? '').trim()
      const page = pageByPath[path]
      if (!page) return { action: null, result: `No page found for path "${path}".` }
      if (!query) return { action: null, result: 'No highlight query provided.' }
      return {
        action: { type: 'highlight', path: page.path, query, label: query },
        result: `Scrolled to and highlighted "${query}" on the ${page.label} page.`,
      }
    }

    case TOOL.openLink: {
      const url = String(input.url ?? '')
      const label = String(input.label ?? url)
      if (!/^https:\/\//i.test(url)) return { action: null, result: 'Refused: only https URLs can be opened.' }
      return {
        action: { type: 'open-tab', url, label },
        result: `Opened ${label} in a new tab.`,
      }
    }

    default:
      return { action: null, result: `Unknown tool "${toolName}".` }
  }
}
