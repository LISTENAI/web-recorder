export type ISampleRate = 8000 | 16000 | 32000 | 48000;
export type IBitDepth = 16 | 32;

export default class Player {

  readonly sampleRate: ISampleRate;
  readonly bitDepth: IBitDepth;
  readonly channels: number;

  private readonly base: number;

  private readonly inputType: Int16ArrayConstructor | Int32ArrayConstructor;

  private readonly audioCtx: AudioContext;
  private readonly gainNode: GainNode;

  private readonly muted: boolean[] = [];

  private startTime: number;

  constructor(sampleRate: ISampleRate = 16000, bitDepth: IBitDepth = 32, channels = 6) {
    this.sampleRate = sampleRate;
    this.bitDepth = bitDepth;
    this.channels = channels;

    this.base = {
      16: (0xFFFF + 1) / 2,
      32: (0xFFFFFFFF + 1) / 2,
    }[bitDepth];

    this.inputType = {
      16: Int16Array,
      32: Int32Array,
    }[bitDepth];

    this.audioCtx = new AudioContext();

    this.gainNode = this.audioCtx.createGain();
    this.gainNode.gain.value = 10;
    this.gainNode.connect(this.audioCtx.destination);

    this.startTime = this.audioCtx.currentTime;
  }

  feed(samples: Buffer): void {
    const bytesPerSample = this.bitDepth / 8;
    const samplesCount = samples.length / bytesPerSample;

    const input = new this.inputType(samples.buffer);

    const buffer = new Float32Array(samplesCount);

    for (let i = 0; i < samplesCount; i++) {
      buffer[i] = input[i] / this.base;
    }

    const frames = buffer.length / this.channels;

    const bufferSource = this.audioCtx.createBufferSource();
    const audioBuffer = this.audioCtx.createBuffer(1, frames, this.sampleRate);

    const audioData = audioBuffer.getChannelData(0);
    for (let i = 0; i < frames; i++) {
      audioData[i] = 0;
      for (let channel = 0; channel < this.channels; channel++) {
        if (!this.muted[channel]) {
          audioData[i] += buffer[i * this.channels + channel] / this.channels;
        }
      }
    }

    if (this.startTime < this.audioCtx.currentTime) {
      this.startTime = this.audioCtx.currentTime;
    }

    bufferSource.buffer = audioBuffer;
    bufferSource.connect(this.gainNode);
    bufferSource.start(this.startTime);
    this.startTime += audioBuffer.duration;
  }

  destroy(): void {
    this.audioCtx.close();
  }

  setMute(channel: number, muted: boolean): void {
    this.muted[channel] = muted;
  }

}
