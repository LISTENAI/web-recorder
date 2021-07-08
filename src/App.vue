<template>
  <div :style="{ padding: '16px' }">
    <a-row type="flex" :gutter="16">
      <a-col>
        <a-button
          icon="usb"
          @click="open"
          :loading="busy"
          v-if="!opened"
          type="primary"
        >
          打开设备
        </a-button>
        <a-button icon="disconnect" @click="close" :loading="busy" v-else>
          关闭设备
        </a-button>
      </a-col>

      <a-col>
        <a-select default-value="16000" :style="{ width: '100px' }">
          <a-select-option value="16000">16 kHz</a-select-option>
        </a-select>
      </a-col>

      <a-col>
        <a-select default-value="32" :style="{ width: '100px' }">
          <a-select-option value="32">32 bit</a-select-option>
        </a-select>
      </a-col>

      <a-col>
        <a-select default-value="6" :style="{ width: '100px' }">
          <a-select-option value="6">6 ch</a-select-option>
        </a-select>
      </a-col>
    </a-row>
    <div :style="{ width: '300px', marginTop: '32px' }">
      <a-row
        type="flex"
        v-for="(track, index) of tracks"
        :key="index"
        :gutter="16"
        :style="{ marginTop: '8px' }"
      >
        <a-col>
          <a-button
            size="small"
            icon="sound"
            shape="circle"
            :type="track.muted ? 'default' : 'primary'"
            @click="() => toggleTrackMuted(index)"
          />
        </a-col>
        <a-col flex="auto">
          <a-progress
            size="small"
            status="normal"
            :showInfo="false"
            :percent="track.value"
          />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Recorder from "./recorder";

@Component
export default class App extends Vue {
  opened = false;
  busy = false;

  recorder = new Recorder();

  tracks = [
    { muted: false, value: 30 },
    { muted: false, value: 40 },
    { muted: false, value: 70 },
    { muted: false, value: 90 },
  ];

  mounted(): void {
    this.recorder.on("stateChanged", this.handleStateChange);
  }

  beforeDestroy(): void {
    this.recorder.off("stateChanged", this.handleStateChange);
  }

  handleStateChange(): void {
    this.opened = this.recorder.opened;
    this.busy = false;
  }

  async open(): Promise<void> {
    this.busy = true;
    await this.recorder.open();
  }

  async close(): Promise<void> {
    this.busy = true;
    await this.recorder.close();
  }

  toggleTrackMuted(i: number): void {
    this.tracks = {
      ...this.tracks,
      [i]: {
        ...this.tracks[i],
        muted: !this.tracks[i].muted,
      },
    };
  }
}
</script>
