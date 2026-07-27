// Throwaway: reproduces the "second turn goes silent" bug — speak, pause audio
// for several seconds (simulating the mic being paused while the assistant
// thinks/replies), then speak again. Verifies the STT proxy recovers.
import 'dotenv/config'
import WebSocket from 'ws'
import { PollyClient, SynthesizeSpeechCommand } from '@aws-sdk/client-polly'

const polly = new PollyClient({ region: process.env.AWS_REGION ?? 'us-east-1' })

async function pcmFor(text) {
  const res = await polly.send(
    new SynthesizeSpeechCommand({
      Text: text,
      OutputFormat: 'pcm',
      SampleRate: '16000',
      VoiceId: 'Matthew',
      Engine: 'neural',
    }),
  )
  return Buffer.from(await res.AudioStream.transformToByteArray())
}

const first = await pcmFor('Hello, can you tell me about your team?')
const second = await pcmFor('Great, and what services do you offer?')

const ws = new WebSocket('ws://localhost:8080')
ws.binaryType = 'arraybuffer'
const results = []

async function streamPcm(pcm) {
  const chunk = 3200
  for (let i = 0; i < pcm.length; i += chunk) {
    ws.send(pcm.subarray(i, i + chunk))
    await new Promise((r) => setTimeout(r, 90))
  }
  const silence = Buffer.alloc(3200)
  for (let i = 0; i < 14; i++) {
    ws.send(silence)
    await new Promise((r) => setTimeout(r, 90))
  }
}

ws.on('open', async () => {
  console.log('[test] turn 1: speaking...')
  await streamPcm(first)
  await new Promise((r) => setTimeout(r, 800))

  console.log('[test] simulating a long pause (12s) like thinking + TTS playback, sending NOTHING...')
  await new Promise((r) => setTimeout(r, 12000))

  console.log('[test] turn 2: speaking again...')
  await streamPcm(second)
  await new Promise((r) => setTimeout(r, 1000))

  console.log('[test] results:', results)
  ws.close()
  process.exit(results.length >= 2 ? 0 : 1)
})

ws.on('message', (raw) => {
  const m = JSON.parse(raw.toString())
  if (m.type === 'utterance') {
    console.log('[UTTERANCE]', m.text)
    results.push(m.text)
  } else if (m.type === 'error') {
    console.error('[error]', m.message)
  }
})
ws.on('error', (e) => {
  console.error('[test] ws error', e.message)
  process.exit(1)
})
