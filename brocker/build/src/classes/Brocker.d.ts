/// <reference types="node" />
import { TLSSocket } from 'tls';
export declare class Brocker {
    socket: TLSSocket;
    constructor(ip: string, port: number);
    repack(data: import("ws").Data): void;
    on(event: string, listener: (...args: any[]) => void): void;
}
