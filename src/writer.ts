import StreamSaver, { createWriteStream } from 'streamsaver';

StreamSaver.mitm = 'https://listenai.github.io/web-recorder/mitm.html';

export default class Writer {

  readonly sampleRate: number;
  readonly bitDepth: number;
  readonly channels: number;

  private samplesPerMs: number;
  private bytesPerSample: number;

  private writer: WritableStreamDefaultWriter | null = null;

  private samplesWrote = 0;

  constructor(sampleRate: number, bitDepth: number, channels: number) {
    this.sampleRate = sampleRate;
    this.bitDepth = bitDepth;
    this.channels = channels;

    this.samplesPerMs = sampleRate / 1000;
    this.bytesPerSample = this.bitDepth / 8;
  }

  request(name: string): void {
    this.samplesWrote = 0;
    this.writer = createWriteStream(name).getWriter();
  }

  feed(samples: Buffer): number {
    this.writer?.write(new Uint8Array(samples.buffer));
    this.samplesWrote += samples.length / this.bytesPerSample;
    return this.samplesWrote / this.channels / this.samplesPerMs;
  }

  finish(): void {
    this.writer?.close();
    this.writer = null;
  }

}
