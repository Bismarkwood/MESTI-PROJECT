// Text-to-speech via Deepgram Aura 2. Returns MP3 audio bytes. The API key is
// read from the environment and never leaves the server.

const API_KEY = process.env.DEEPGRAM_API_KEY
const DEFAULT_VOICE = process.env.DEEPGRAM_VOICE ?? 'aura-2-thalia-en'
const BIT_RATE = process.env.DEEPGRAM_BIT_RATE ?? '48000'

export const deepgramReady = Boolean(API_KEY)

export async function synthesize(text: string, voice: string = DEFAULT_VOICE): Promise<Buffer> {
  if (!API_KEY) throw new Error('DEEPGRAM_API_KEY is not set')

  const url = `https://api.deepgram.com/v1/speak?model=${encodeURIComponent(
    voice,
  )}&encoding=mp3&bit_rate=${encodeURIComponent(BIT_RATE)}`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Token ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`Deepgram ${res.status}: ${detail.slice(0, 200)}`)
  }

  const bytes = await res.arrayBuffer()
  return Buffer.from(bytes)
}

export const voiceInfo = { voiceId: DEFAULT_VOICE, bitRate: BIT_RATE }
