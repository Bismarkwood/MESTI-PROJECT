// Text-to-speech via Amazon Polly. Returns MP3 audio bytes for a piece of text.
// Defaults to a generative voice for the most natural, human-like delivery.

import { PollyClient, SynthesizeSpeechCommand, type Engine, type VoiceId } from '@aws-sdk/client-polly'

const REGION = process.env.AWS_REGION ?? 'us-east-1'
const ENGINE = (process.env.POLLY_ENGINE ?? 'generative') as Engine
const VOICE_ID = (process.env.POLLY_VOICE_ID ?? 'Danielle') as VoiceId

const client = new PollyClient({ region: REGION })

export async function synthesize(text: string): Promise<Buffer> {
  const res = await client.send(
    new SynthesizeSpeechCommand({
      Text: text,
      OutputFormat: 'mp3',
      VoiceId: VOICE_ID,
      Engine: ENGINE,
    }),
  )
  if (!res.AudioStream) throw new Error('Polly returned no audio')
  const bytes = await res.AudioStream.transformToByteArray()
  return Buffer.from(bytes)
}

export const voiceInfo = { engine: ENGINE, voiceId: VOICE_ID }
