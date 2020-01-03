import {} from 'ws';
import { LiteEvent } from './helper/EventHandler';

export class WebSocketClient<T extends string | ArrayBuffer> {
    private dummy: T;
    private ws: WebSocket;
    private messageOutQueue: Array<T> = [];
    private eventListener = new LiteEvent<T>();
    private host: string;
    private enableHeartbeat: boolean;
    private readonly timeoutListener = new LiteEvent<string>();

    constructor(host: string, dummy: T, enableHeartbeat: boolean = false) {
        this.dummy = dummy;
        this.host = host;
        this.enableHeartbeat = enableHeartbeat;
        this.ws = new WebSocket(host);
        this.ws.onerror = () => { this.timeoutListener.trigger("unable to connect"); };
        this.startSocket(host, enableHeartbeat);
    }

    private startSocket(host: string, enableHeartbeat: boolean = false, initSocket: boolean = false) {
        if(initSocket) this.ws = new WebSocket(host);
        this.messageOutQueue = [];

        this.ws.addEventListener("open", () => { this.workOnQueue(); });
        this.ws.addEventListener("message", (event) => { this.handleMessage(event); })
        //this.ws.addEventListener("close", () => {this.ready = false;});
        if(enableHeartbeat) {
           setInterval(() => {this.heartbeat()}, 30000);
        }
    }

    public sendMessage(message: T) {
        if(this.ws.readyState !== WebSocket.OPEN) {
            this.messageOutQueue.push(message);
        } else {
            this.ws.send(message);
        }
    }

    public handleMessage(event: MessageEvent) {
        if(this.dummy instanceof ArrayBuffer) {
            var reader = new FileReader();
            reader.readAsArrayBuffer(event.data);
            reader.addEventListener("loadend", () => {
                if(reader.result instanceof ArrayBuffer) {
                    this.eventListener.trigger(reader.result as T)
                }
            });
        } else {
            //this.messageListener.forEach(element => element(reader.result as T));
            this.eventListener.trigger(event.data as T);
        }
    }

    public addMessageListener(listener: (data: T | undefined) => any) {
        this.eventListener.on(listener);
    }

    private workOnQueue() {
        if(this.messageOutQueue === undefined) return;

        let element;
        while((element = this.messageOutQueue.pop()) !== undefined) {
            if(element !== undefined) {
                this.ws.send(element);
                console.log("send...");
            }
        }
    }

    private heartbeat() {
        if(this.ws.readyState === WebSocket.CLOSED) {
            console.error("WS Closed!");
            this.timeoutListener.trigger("Timeout");
            this.startSocket(this.host, this.enableHeartbeat, true);
        }
    }

    addTimeoutListener(listener: (str: string | undefined) => any) {
        this.timeoutListener.on(listener);
    }
}