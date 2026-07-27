// Text-to-speech dispatcher with a named-voice registry. Each voice routes to
// its provider, so the widget can offer a simple female/male toggle while the
// server owns the provider details and keys.

import * as polly from './polly.ts'
import * as deepgram from './deepgram.ts'
import * as elevenlabs from './elevenlabs.ts'

interface VoiceDef {
  key: string
  label: string
  gender: 'female' | 'male'
  provider: 'elevenlabs' | 'deepgram' | 'polly'
  /** Provider-specific voice id (voice_id for ElevenLabs, model for Deepgram). */
  voiceId?: string
}

// "Jessica" (female) and "Daniel" (male) ElevenLabs premade voices — both work
// with the multilingual turbo model, so they can speak every supported
// language. Overridable via env. Confirmed against the account's /v1/voices.
const JESSICA_VOICE_ID = process.env.ELEVENLABS_JESSICA_VOICE_ID ?? 'cgSgspJ2msm6clMCkdW9'
const DANIEL_VOICE_ID = process.env.ELEVENLABS_MALE_VOICE_ID ?? 'onwK4e9ZLuTAKqWW03F9'

// Both primary voices are ElevenLabs (multilingual). Deepgram Aura 2 is the
// same-gender fallback used only when ElevenLabs is unavailable (billing/outage)
// and only for English, since Aura is English-only.
const DEEPGRAM_FALLBACK: Record<'female' | 'male', string> = {
  female: process.env.DEEPGRAM_FEMALE_VOICE ?? 'aura-2-thalia-en',
  male: process.env.DEEPGRAM_MALE_VOICE ?? 'aura-2-apollo-en',
}

const VOICES: VoiceDef[] = [
  { key: 'female', label: 'Female', gender: 'female', provider: 'elevenlabs', voiceId: JESSICA_VOICE_ID },
  { key: 'male', label: 'Male', gender: 'male', provider: 'elevenlabs', voiceId: DANIEL_VOICE_ID },
]

const byKey = Object.fromEntries(VOICES.map((v) => [v.key, v]))

/** Default voice. */
const DEFAULT_VOICE_KEY = process.env.TTS_DEFAULT_VOICE ?? 'female'

async function runVoice(def: VoiceDef, text: string, lang: string): Promise<Buffer> {
  switch (def.provider) {
    case 'elevenlabs':
      return elevenlabs.synthesize(text, def.voiceId!, lang)
    case 'deepgram':
      return deepgram.synthesize(text, def.voiceId)
    case 'polly':
    default:
      return polly.synthesize(text)
  }
}

/**
 * Synthesize speech, falling back to a working provider if the requested voice
 * fails (e.g. an ElevenLabs billing hold), so the assistant never goes silent.
 * `lang` (ISO 639-1) selects the spoken language; non-English always uses the
 * multilingual ElevenLabs voices.
 */
export async function synthesizeSpeech(text: string, voiceKey?: string, lang: string = 'en'): Promise<Buffer> {
  const requested = byKey[voiceKey ?? DEFAULT_VOICE_KEY] ?? VOICES[0]
  const gender = requested.gender

  // Fallback chain: ElevenLabs (requested) → Deepgram Aura (same gender, English
  // only) → Polly. For non-English, skip Deepgram (English-only) and fall back
  // to the other ElevenLabs voice before Polly.
  const chain: VoiceDef[] = [requested]
  if (lang === 'en') {
    chain.push({ key: `dg-${gender}`, label: 'Deepgram', gender, provider: 'deepgram', voiceId: DEEPGRAM_FALLBACK[gender] })
  } else {
    const altId = requested.voiceId === JESSICA_VOICE_ID ? DANIEL_VOICE_ID : JESSICA_VOICE_ID
    chain.push({ key: 'el-alt', label: 'ElevenLabs alt', gender, provider: 'elevenlabs', voiceId: altId })
  }
  chain.push({ key: 'polly', label: 'Polly', gender: 'female', provider: 'polly' })

  let lastErr: unknown
  for (const def of chain) {
    try {
      return await runVoice(def, text, lang)
    } catch (err) {
      lastErr = err
      console.error(`[tts] voice "${def.key}" (${def.provider}) failed:`, err instanceof Error ? err.message : err)
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error('all TTS providers failed')
}

/** Public voice list for the widget's toggle. */
export const availableVoices = VOICES.map((v) => ({ key: v.key, label: v.label, gender: v.gender }))
export const defaultVoiceKey = DEFAULT_VOICE_KEY

export const ttsInfo = {
  default: DEFAULT_VOICE_KEY,
  voices: VOICES.map((v) => `${v.key}:${v.provider}`).join(', '),
}
