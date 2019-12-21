export declare class Brocker {
    private socket;
    constructor(ip: string, port: number);
    repack(data: import("ws").Data): void;
    on(event: string, listener: (...args: any[]) => void): void;
    close(): void;
}
