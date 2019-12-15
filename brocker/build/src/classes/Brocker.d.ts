/// <reference types="node" />
import { Socket } from 'net';
export declare class Brocker {
    client: Socket;
    constructor(ip: string, port: number);
}
