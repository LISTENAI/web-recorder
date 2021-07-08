import EventEmitter from 'events';

export default class Recorder extends EventEmitter {

  public opened = false;

  async open(): Promise<void> {
    setTimeout(() => {
      this.opened = true;
      this.emit("stateChanged", this.opened);
    }, 2000);
  }

  async close(): Promise<void> {
    setTimeout(() => {
      this.opened = false;
      this.emit("stateChanged", this.opened);
    }, 1000);
  }

}
