// Live speech-to-text via ElevenLabs Scribe v2 Realtime — chosen for its
// combination of speed (~150ms) AND accuracy (benchmarked by ElevenLabs against
// Deepgram Nova-3 and Flux). Consolidates voice onto the vendor we already pay
// for. Audio is sent as base64 PCM16 chunks; VAD auto-commit closes each turn.
//
// The upstream socket can idle-close (e.g. while the mic is paused during a
// spoken reply). We detect that and transparently reconnect so a session that
// looks "stuck" to the browser silently recovers instead of dropping audio
// into a dead connection forever.

import WebSocket from 'ws'

const API_KEY = process.env.ELEVENLABS_API_KEY
const MODEL_ID = process.env.ELEVENLABS_STT_MODEL_ID ?? 'scribe_v2_realtime'
const LANGUAGE = process.env.ELEVENLABS_STT_LANGUAGE ?? 'en'
const MAX_RECONNECT_ATTEMPTS = 5

// Domain vocabulary that a general model tends to mangle — brand names, product
// names and jargon specific to BigData Ghana. Scribe supports keyterm boosting.
// ElevenLabs caps each keyterm at 20 characters — keep these short.
const KEYTERMS = [
  'BigData Ghana',
  'BigConnect AI',
  'SendLine SMS',
  'ForestTrace AI',
  'Route Advisor',
  'Maize',
  'Maize Intel',
  'geospatial',
  'Ghana',
  'Accra',
  'Bedrock',
  'AWS',
  'Nova Pro',
  'ESICOME',
  'Gushiegu',
  'NADMO',
]

export interface SttHandlers {
  /** A completed user turn (final transcript). */
  onUtterance: (text: string) => void
  /** The user started speaking (useful for barge-in). */
  onSpeechStart?: () => void
  /** Live partial transcript. */
  onInterim?: (text: string) => void
  onError: (message: string) => void
}

export interface SttStream {
  /** Feed raw PCM16 (16kHz, mono) audio bytes. */
  sendAudio: (buf: Buffer) => void
  close: () => void
}

function buildUrl(language: string): string {
  const params = new URLSearchParams({
    model_id: MODEL_ID,
    language_code: language,
    audio_format: 'pcm_16000',
    commit_strategy: 'vad',
  })
  // Keyterm boosting is English-oriented (brand/jargon spellings). Only send it
  // for English so it doesn't skew transcription in other languages.
  if (language === 'en') {
    for (const term of KEYTERMS) params.append('keyterms', term)
  }
  return `wss://api.elevenlabs.io/v1/speech-to-text/realtime?${params.toString()}`
}

export function openSttStream(handlers: SttHandlers, language: string = LANGUAGE): SttStream {
  if (!API_KEY) {
    handlers.onError('ELEVENLABS_API_KEY is not set')
    return { sendAudio: () => {}, close: () => {} }
  }

  let ws: WebSocket | null = null
  let open = false
  let speaking = false
  let closedByUs = false
  let reconnectAttempts = 0
  const pending: Buffer[] = []

  function sendChunk(buf: Buffer) {
    ws!.send(JSON.stringify({ message_type: 'input_audio_chunk', audio_base_64: buf.toString('base64') }))
  }

  function flushPending() {
    for (const b of pending) sendChunk(b)
    pending.length = 0
  }

  function connect() {
    open = false
    speaking = false
    const socket = new WebSocket(buildUrl(language), { headers: { 'xi-api-key': API_KEY! } })
    ws = socket

    socket.on('open', () => {
      open = true
      reconnectAttempts = 0
      flushPending()
    })

    socket.on('message', (raw) => {
      let m: any
      try {
        m = JSON.parse(raw.toString())
      } catch {
        return
      }

      switch (m.message_type) {
        case 'partial_transcript':
          if (!speaking && m.text) {
            speaking = true
            handlers.onSpeechStart?.()
          }
          if (m.text) handlers.onInterim?.(m.text)
          break
        case 'committed_transcript':
          speaking = false
          if (m.text?.trim()) handlers.onUtterance(m.text.trim())
          break
        case 'final_transcript':
          // committed_transcript is the authoritative end-of-turn signal.
          break
        case 'error':
        case 'auth_error':
        case 'quota_exceeded':
        case 'rate_limited':
        case 'transcriber_error':
        case 'input_error':
        case 'invalid_request':
          handlers.onError(`ElevenLabs STT ${m.message_type}: ${m.error ?? 'unknown error'}`)
          break
      }
    })

    socket.on('close', () => {
      open = false
      if (closedByUs) return
      // Idle timeout or transient drop — reconnect transparently so queued /
      // future audio doesn't silently vanish into a dead socket.
      if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
        reconnectAttempts++
        setTimeout(connect, 300)
      } else {
        handlers.onError('ElevenLabs STT connection lost and could not be re-established.')
      }
    })

    socket.on('error', (e: Error) => {
      // 'close' will follow and drive reconnect logic; just surface the cause.
      handlers.onError(e.message)
    })

    socket.on('unexpected-response', (_req, res) => {
      let body = ''
      res.on('data', (c) => (body += c))
      res.on('end', () => handlers.onError(`ElevenLabs STT ${res.statusCode}: ${body.slice(0, 160)}`))
    })
  }

  connect()

  return {
    sendAudio(buf: Buffer) {
      if (open && ws?.readyState === WebSocket.OPEN) sendChunk(buf)
      else if (pending.length < 200) pending.push(buf)
    },
    close() {
      closedByUs = true
      try {
        if (ws?.readyState === WebSocket.OPEN) ws.close()
      } catch {
        /* ignore */
      }
    },
  }
}

export const sttInfo = { model: MODEL_ID }
