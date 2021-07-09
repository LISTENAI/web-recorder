declare global {
    interface Navigator {
        readonly usb: USB;
    }

    interface WorkerNavigator {
        readonly usb: USB;
    }
}

export interface USBDeviceFilter {
    vendorId?: number;
    productId?: number;
    classCode?: number;
    subclassCode?: number;
    protocolCode?: number;
    serialNumber?: string;
}
export interface USBDeviceRequestOptions {
    filters: Array<USBDeviceFilter>;
}

export interface USB extends EventTarget {
    onconnect: EventHandler;
    ondisconnect: EventHandler;
    getDevices(): Promise<Array<USBDevice>>;
    requestDevice(options: USBDeviceRequestOptions): Promise<USBDevice>;
}

export interface USBConnectionEventInit extends EventInit {
    device: USBDevice;
}

export interface USBConnectionEvent extends Event {
    new(type: string, eventInitDict: USBConnectionEventInit);
    readonly device: USBDevice;
}

export interface USBDevice {
    readonly usbVersionMajor: number;
    readonly usbVersionMinor: number;
    readonly usbVersionSubminor: number;
    readonly deviceClass: number;
    readonly deviceSubclass: number;
    readonly deviceProtocol: number;
    readonly vendorId: number;
    readonly productId: number;
    readonly deviceVersionMajor: number;
    readonly deviceVersionMinor: number;
    readonly deviceVersionSubminor: number;
    readonly manufacturerName: string;
    readonly productName: string;
    readonly serialNumber: string;
    readonly configuration: USBConfiguration;
    readonly configurations: ReadonlyArray<USBConfiguration>;
    readonly opened: boolean;
    open(): Promise<undefined>;
    close(): Promise<undefined>;
    selectConfiguration(configurationValue: number): Promise<undefined>;
    claimInterface(interfaceNumber: number): Promise<undefined>;
    releaseInterface(interfaceNumber: number): Promise<undefined>;
    selectAlternateInterface(interfaceNumber: number, alternateSetting: number): Promise<undefined>;
    controlTransferIn(setup: USBControlTransferParameters, length: number): Promise<USBInTransferResult>;
    controlTransferOut(setup: USBControlTransferParameters, data?: BufferSource): Promise<USBOutTransferResult>;
    clearHalt(direction: USBDirection, endpointNumber: number): Promise<undefined>;
    transferIn(endpointNumber: number, length: number): Promise<USBInTransferResult>;
    transferOut(endpointNumber: number, data: BufferSource): Promise<USBOutTransferResult>;
    isochronousTransferIn(endpointNumber: number, packetLengths: Array<number>): Promise<USBIsochronousInTransferResult>;
    isochronousTransferOut(endpointNumber: number, data: BufferSource, packetLengths: Array<number>): Promise<USBIsochronousOutTransferResult>;
    reset(): Promise<undefined>;
}

export type USBRequestType = "standard" | "class" | "vendor";
export type USBRecipient = "device" | "interface" | "endpoint" | "other";
export type USBTransferStatus = "ok" | "stall" | "babble";

export interface USBControlTransferParameters {
    requestType: USBRequestType;
    recipient: USBRecipient;
    request: number;
    value: number;
    index: number;
}

export interface USBInTransferResult {
    new(status: USBTransferStatus, data?: DataView);
    readonly data: DataView;
    readonly status: USBTransferStatus;
}

export interface USBOutTransferResult {
    new(status: USBTransferStatus, bytesWritten?: number);
    readonly bytesWritten: number;
    readonly status: USBTransferStatus;
}

export interface USBIsochronousInTransferPacket {
    new(status: USBTransferStatus, data?: DataView);
    readonly data: DataView;
    readonly status: USBTransferStatus;
}

export interface USBIsochronousInTransferResult {
    new(packets: Array<USBIsochronousInTransferPacket>, data?: DataView);
    readonly data: DataView;
    readonly packets: ReadonlyArray<USBIsochronousInTransferPacket>;
}

export interface USBIsochronousOutTransferPacket {
    new(status: USBTransferStatus, bytesWritten?: number);
    readonly bytesWritten: number;
    readonly status: USBTransferStatus;
}

export interface USBIsochronousOutTransferResult {
    new(packets: Array<USBIsochronousOutTransferPacket>);
    readonly packets: ReadonlyArray<USBIsochronousOutTransferPacket>;
}

export interface USBConfiguration {
    new(device: USBDevice, configurationValue: number);
    readonly configurationValue: number;
    readonly configurationName: string;
    readonly interfaces: ReadonlyArray<USBInterface>;
}

export interface USBInterface {
    new(configuration: USBConfiguration, interfaceNumber: number);
    readonly interfaceNumber: number;
    readonly alternate: USBAlternateInterface;
    readonly alternates: ReadonlyArray<USBAlternateInterface>;
    readonly claimed: boolean;
}

export interface USBAlternateInterface {
    new(deviceInterface: USBInterface, alternateSetting: number);
    readonly alternateSetting: number;
    readonly interfaceClass: number;
    readonly interfaceSubclass: number;
    readonly interfaceProtocol: number;
    readonly interfaceName: string;
    readonly endpoints: ReadonlyArray<USBEndpoint>;
}

export type USBDirection = "in" | "out";
export type USBEndpointType = "bulk" | "interrupt" | "isochronous";

export interface USBEndpoint {
    new(alternate: USBAlternateInterface, endpointNumber: number, direction: USBDirection);
    readonly endpointNumber: number;
    readonly direction: USBDirection;
    readonly type: USBEndpointType;
    readonly packetSize: number;
}

export interface USBPermissionDescriptor extends PermissionDescriptor {
    filters?: Array<USBDeviceFilter>;
}

export interface AllowedUSBDevice {
    vendorId: number;
    productId: number;
    serialNumber?: string;
}

export interface USBPermissionStorage {
    allowedDevices?: Array<AllowedUSBDevice>;
}

export interface USBPermissionResult extends PermissionStatus {
    devices: ReadonlyArray<USBDevice>;
}
