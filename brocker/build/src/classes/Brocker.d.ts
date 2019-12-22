/// <reference types="node" />
export declare class Brocker {
    private socket;
    private tmpBuffer;
    constructor(ip: string, port: number);
    initBuffer(size: number): void;
    addToBuffer(content: Buffer): void;
    flushBuffer(): Buffer | undefined;
    repack(data: import("ws").Data): void;
    on(event: string, listener: (...args: any[]) => void): void;
    close(): void;
}
