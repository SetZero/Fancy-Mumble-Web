import {} from 'ws';

export class WebSocketClient {
    private ws: WebSocket;
    private messageQueue: Array<string>;
    private ready: boolean = false;

    constructor(host: string) {
        this.ws = new WebSocket(host);
        this.messageQueue = [];

        this.ws.addEventListener("open", () => { this.workOnQueue(); });
    }

    sendMessage(message: string) {
        if(!this.ready) {
            this.messageQueue.push(message);
        } else {
            this.ws.send(message);
        }
    }

    private workOnQueue() {
        this.ready = true;
        if(this.messageQueue === undefined) return;

        let element;
        while((element = this.messageQueue.pop()) !== undefined) {
            if(element !== undefined) {
                this.ws.send(element);
                console.log("send...");
            }
        }
    }
}