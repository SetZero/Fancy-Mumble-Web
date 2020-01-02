import {} from 'ws';
import { LiteEvent } from './helper/EventHandler';

export class WebSocketClient<T extends string | ArrayBuffer> {
    private dummy: T;
    private ws: WebSocket;
    private messageOutQueue: Array<T> = [];
    private ready: boolean = false;
    private eventListener = new LiteEvent<T>();
    private pingTimeout: NodeJS.Timeout | undefined;
    private host: string;
    private enableHeartbeat: boolean;

    constructor(host: string, dummy: T, enableHeartbeat: boolean = false) {
        this.dummy = dummy;
        this.host = host;
        this.enableHeartbeat = enableHeartbeat;
        this.ws = new WebSocket(host);
        this.startSocket(host, enableHeartbeat);
    }

    private startSocket(host: string, enableHeartbeat: boolean = false, initSocket: boolean = false) {
        if(initSocket) this.ws = new WebSocket(host);
        this.messageOutQueue = [];

        this.ws.addEventListener("open", () => {
            this.workOnQueue();

            if(enableHeartbeat)
                this.heartbeat();
        });
        this.ws.addEventListener("message", (event) => { this.handleMessage(event); })
        this.ws.addEventListener("close", () => {this.ready = false;});
        if(enableHeartbeat) {
            this.ws.addEventListener('ping', this.heartbeat);
            this.ws.addEventListener('close', () => {
                if(this.pingTimeout !== undefined) clearTimeout(this.pingTimeout);
            });
        }
    }

    public sendMessage(message: T) {
        if(!this.ready) {
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
        this.ready = true;
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
        if(this.pingTimeout !== undefined) 
            clearTimeout(this.pingTimeout);

        this.pingTimeout = setTimeout(() => {
            console.error("Helper Socket Closed!");
            this.ws.close();
            this.startSocket(this.host, this.enableHeartbeat, true);
        }, 30000 + 1000);
      }
}