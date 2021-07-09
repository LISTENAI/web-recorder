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
const USB_READ_LENGTH = 640;

export default class Recorder extends EventEmitter {

  private device: USBDevice | null = null;

  get opened(): boolean {
    return !!this.device;
  }

  async open(): Promise<void> {
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

      process.nextTick(this.read.bind(this));
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

  private async read(): Promise<void> {
    while (this.device && this.device.opened) {
      const { data } = await this.device.transferIn(USB_EP_IN, USB_READ_LENGTH);
      this.emit('samples', Buffer.from(data.buffer));
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
