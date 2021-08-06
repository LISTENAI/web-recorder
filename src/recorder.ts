import EventEmitter from 'events';

import {
  USBDevice,
  USBConfiguration,
  USBInterface,
  USBAlternateInterface,
} from './webusb';

const USB = navigator.usb;

const USB_VID = 0x4658;
const USB_PID = 0x3143;

const USB_EP_IN = 3;

const READ_MS = 2;

export default class Recorder extends EventEmitter {

  private device: USBDevice | null = null;

  private samplesPerMs = (16000 / 1000);
  private bytesPerSample = (32 / 8);
  private channels = 6;

  private buffer: Buffer = Buffer.alloc(0);

  get opened(): boolean {
    return !!this.device;
  }

  async open(sampleRate: number, bitDepth: number, channels: number): Promise<void> {
    try {
      this.device = await USB.requestDevice({
        filters: [
          { vendorId: USB_VID, productId: USB_PID },
        ],
      });

      await this.device.open();

      const match = findAlternate(this.device, 255, 1, 255);
      if (!match) {
        this.device = null;
        return;
      }

      await this.device.selectConfiguration(match.conf.configurationValue);
      await this.device.claimInterface(match.intf.interfaceNumber);
      await this.device.selectAlternateInterface(match.intf.interfaceNumber, match.alt.alternateSetting);

      this.samplesPerMs = sampleRate / 1000;
      this.bytesPerSample = bitDepth / 8;
      this.channels = channels;

      const readBytes = this.samplesPerMs * this.bytesPerSample * this.channels * READ_MS;
      process.nextTick(this.read.bind(this, readBytes));
    } catch (e) {
      this.device = null;
    } finally {
      this.emit('stateChanged', this.opened);
    }
  }

  async close(): Promise<void> {
    if (this.device) {
      this.device.close();
      this.device = null;
    }
    process.nextTick(() => {
      this.emit('stateChanged', this.opened);
    });
  }

  private async read(bytesLength: number): Promise<void> {
    while (this.device && this.device.opened) {
      const { data } = await this.device.transferIn(USB_EP_IN, bytesLength);
      const samples = Buffer.from(data.buffer);

      const queue: Buffer[] = [];
      const bytesPerFrame = this.bytesPerSample * this.channels;

      const offset = findFirstChannel(this.buffer, samples, this.bytesPerSample, this.channels);
      if (offset == -1) {
        console.error('Cannot find first channel');
        continue;
      }

      const head = Buffer.concat([this.buffer, samples.slice(0, offset)]);
      if (head.length == bytesPerFrame) {
        queue.push(head);
      }

      const length = Math.floor((samples.length - offset) / bytesPerFrame) * bytesPerFrame;
      queue.push(samples.slice(offset, offset + length));

      this.buffer = samples.slice(offset + length);

      this.emit('samples', Buffer.concat(queue));
    }
  }
}

function findAlternate(device: USBDevice, classId: number, subclassId: number, protocolId: number)
  : { conf: USBConfiguration, intf: USBInterface, alt: USBAlternateInterface } | null {
  for (const conf of device.configurations || []) {
    for (const intf of conf.interfaces) {
      for (const alt of intf.alternates) {
        if (classId == alt.interfaceClass &&
          subclassId == alt.interfaceSubclass &&
          protocolId == alt.interfaceProtocol) {
          return { conf, intf, alt };
        }
      }
    }
  }
  return null;
}

function findFirstChannel(head: Buffer, samples: Buffer, bytesPerSample: number, channels: number): number {
  const bytesPerFrame = bytesPerSample * channels;

  if (samples[0] == 1) {
    return 0;
  }

  if (samples[bytesPerFrame - head.length] == 1) {
    return bytesPerFrame - head.length;
  }

  for (let i = 0; i < bytesPerFrame; i += bytesPerSample) {
    if (samples[i] == 1) {
      return i;
    }
  }

  return -1;
}
