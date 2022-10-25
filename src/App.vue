<template>
  <div :style="{ padding: '16px' }">
    <a-row type="flex" :gutter="16">
      <a-col>
        <a-button icon="usb" @click="open" :loading="busy" v-if="!opened" type="primary">
          打开设备
        </a-button>
        <a-button icon="disconnect" @click="close" :loading="busy" v-else>
          关闭设备
        </a-button>
      </a-col>

      <a-col>
        <a-button icon="download" @click="startRecord" :disabled="!opened" v-if="!recording">
          保存音频
        </a-button>
        <a-button type="danger" @click="stopRecord" v-else>
          {{ recordTime }}
        </a-button>
      </a-col>

      <a-col>
        <a-select v-model="sampleRate" :disabled="opened" :style="{ width: '100px' }">
          <a-select-option :value="16000">16 kHz</a-select-option>
        </a-select>
      </a-col>
      <a-col>
        <a-select v-model="bitDepth" :disabled="opened" :style="{ width: '100px' }">
          <a-select-option :value="32">32 bit</a-select-option>
        </a-select>
      </a-col>
      <a-col>
        <a-select v-model="channels" :disabled="opened" :style="{ width: '100px' }">
          <a-select-option :value="1">1 ch</a-select-option>
          <a-select-option :value="2">2 ch</a-select-option>
          <a-select-option :value="3">3 ch</a-select-option>
          <a-select-option :value="4">4 ch</a-select-option>
          <a-select-option :value="5">5 ch</a-select-option>
          <a-select-option :value="6">6 ch</a-select-option>
        </a-select>
      </a-col>
    </a-row>
    <div :style="{ width: '300px', marginTop: '32px' }">
      <a-row type="flex" v-for="(track, index) of tracks" :key="index" :gutter="16" :style="{ marginTop: '8px' }">
        <a-col>
          <a-button size="small" icon="sound" shape="circle" :type="track.muted ? 'default' : 'primary'"
            @click="() => toggleTrackMuted(index)" />
        </a-col>
        <a-col flex="auto">
          <a-progress size="small" status="normal" :show-info="false" :percent="peaks[index]"
            :stroke-color="track.muted ? 'lightgrey' : undefined" />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { throttle } from "throttle-debounce";
import { DateTime, Duration } from "luxon";

import Recorder from "./recorder";
import Player, { ISampleRate, IBitDepth } from "./player";
import Writer from "./writer";

interface ITrack {
  muted: boolean;
}

const PEAK_UPDATE_PERIOD_MS = 100;

@Component
export default class App extends Vue {
  opened = false;
  busy = false;

  recording = false;

  recorder = new Recorder();

  sampleRate: ISampleRate = 16000;
  bitDepth: IBitDepth = 32;
  channels = 6;

  tracks: ITrack[] = [];
  peaks: number[] = [];

  player: Player | null = null;
  writer: Writer | null = null;

  recordTime = "";

  constructor() {
    super();
    this.updatePeaks = throttle(
      PEAK_UPDATE_PERIOD_MS,
      this.updatePeaks.bind(this)
    );
    this.updateRecordTime = throttle(
      PEAK_UPDATE_PERIOD_MS,
      this.updateRecordTime.bind(this)
    );
  }

  mounted(): void {
    this.recorder.on("stateChanged", this.handleStateChange);
    this.recorder.on("samples", this.handleSamples);
    this.onChannelsChanged(this.channels);
  }

  beforeDestroy(): void {
    this.recorder.off("stateChanged", this.handleStateChange);
    this.recorder.off("samples", this.handleSamples);
  }

  handleStateChange(): void {
    this.opened = this.recorder.opened;
    this.busy = false;
  }

  @Watch("channels")
  onChannelsChanged(channels: number): void {
    const tracks: ITrack[] = [];
    for (let i = 0; i < channels; i++) {
      tracks[i] = this.tracks[i] || { muted: false };
    }
    this.tracks = tracks;
  }

  async open(): Promise<void> {
    this.busy = true;

    this.player = new Player(this.sampleRate, this.bitDepth, this.channels);

    for (let i = 0; i < this.channels; i++) {
      this.player.setMute(i, this.tracks[i]?.muted);
    }

    await this.recorder.open(this.sampleRate, this.bitDepth, this.channels);
  }

  async close(): Promise<void> {
    this.busy = true;

    if (this.recording) {
      this.stopRecord();
    }

    if (this.player) {
      this.player.destroy();
      this.player = null;
    }

    await this.recorder.close();
  }

  async startRecord(): Promise<void> {
    const time = DateTime.now().toFormat("yyyy-MM-dd_HHmmss");

    const kHz = this.sampleRate / 1000;
    const format = `${kHz}k${this.bitDepth}b${this.channels}ch`;

    this.writer = new Writer(this.sampleRate, this.bitDepth, this.channels);
    this.writer.request(`${time}_${format}.pcm`);

    this.recording = true;
  }

  stopRecord(): void {
    this.recording = false;
    if (this.writer != null) {
      this.writer.finish();
      this.writer = null;
    }
  }

  toggleTrackMuted(i: number): void {
    this.tracks = {
      ...this.tracks,
      [i]: {
        ...this.tracks[i],
        muted: !this.tracks[i].muted,
      },
    };

    if (this.player) {
      this.player.setMute(i, this.tracks[i].muted);
    }
  }

  handleSamples(samples: Buffer): void {
    if (this.player) {
      this.player.feed(samples);
    }
    if (this.writer) {
      this.updateRecordTime(this.writer.feed(samples));
    }
    this.updatePeaks(samples);
  }

  updateRecordTime(durationMS: number): void {
    this.recordTime = Duration.fromMillis(durationMS).toFormat("mm:ss.SSS");
  }

  updatePeaks(samples: Buffer): void {
    const bytesPerSample = this.bitDepth / 8;

    const peaks: number[] = [];
    for (let i = 0; i < this.channels; i++) {
      const sample = samples.readInt32LE(i * bytesPerSample) / 0xffffffff;
      peaks[i] = Math.abs(sample) * 100 * 20;
    }

    this.peaks = peaks;
  }
}
</script>
