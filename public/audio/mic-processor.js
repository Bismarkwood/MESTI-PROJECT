// AudioWorklet that captures microphone audio and emits 16-bit PCM chunks.
// The AudioContext runs at 16 kHz, so the browser handles resampling and this
// processor just converts Float32 samples to Int16 and batches them.

class MicProcessor extends AudioWorkletProcessor {
  constructor() {
    super()
    this._buffer = []
    this._batchSize = 2048 // ~128 ms at 16 kHz
  }

  process(inputs) {
    const input = inputs[0]
    if (!input || input.length === 0) return true
    const channel = input[0]
    if (!channel) return true

    for (let i = 0; i < channel.length; i++) {
      const s = Math.max(-1, Math.min(1, channel[i]))
      this._buffer.push(s < 0 ? s * 0x8000 : s * 0x7fff)
    }

    while (this._buffer.length >= this._batchSize) {
      const slice = this._buffer.splice(0, this._batchSize)
      const pcm = new Int16Array(slice)
      this.port.postMessage(pcm.buffer, [pcm.buffer])
    }

    return true
  }
}

registerProcessor('mic-processor', MicProcessor)
