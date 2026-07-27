// Text-to-speech via ElevenLabs. Returns MP3 audio bytes. The API key is read
// from the environment and never leaves the server.

const API_KEY = process.env.ELEVENLABS_API_KEY
const MODEL_ID = process.env.ELEVENLABS_MODEL_ID ?? 'eleven_turbo_v2_5'
const OUTPUT_FORMAT = process.env.ELEVENLABS_OUTPUT_FORMAT ?? 'mp3_44100_128'

export const elevenLabsReady = Boolean(API_KEY)

export async function synthesize(text: string, voiceId: string, languageCode?: string): Promise<Buffer> {
  if (!API_KEY) throw new Error('ELEVENLABS_API_KEY is not set')

  const url = `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(
    voiceId,
  )}?output_format=${encodeURIComponent(OUTPUT_FORMAT)}`

  const body: Record<string, unknown> = {
    text,
    model_id: MODEL_ID,
    voice_settings: { stability: 0.5, similarity_boost: 0.75 },
  }
  // eleven_turbo_v2_5 / flash_v2_5 accept a language_code to enforce the spoken
  // language instead of auto-detecting it. Skip for English (default).
  if (languageCode && languageCode !== 'en') body.language_code = languageCode

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`ElevenLabs ${res.status}: ${detail.slice(0, 200)}`)
  }

  const bytes = await res.arrayBuffer()
  return Buffer.from(bytes)
}

/** List available voices (used to resolve voice names → ids). */
export async function listVoices(): Promise<Array<{ voice_id: string; name: string }>> {
  if (!API_KEY) throw new Error('ELEVENLABS_API_KEY is not set')
  const res = await fetch('https://api.elevenlabs.io/v1/voices', {
    headers: { 'xi-api-key': API_KEY },
  })
  if (!res.ok) throw new Error(`ElevenLabs voices ${res.status}`)
  const data = (await res.json()) as { voices?: Array<{ voice_id: string; name: string }> }
  return data.voices ?? []
}
