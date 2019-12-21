import {} from 'ws';

export class WebSocketClient {
    private ws: WebSocket;
    private messageOutQueue: Array<ArrayBuffer>;
    private messageListener: Array<(data: ArrayBuffer) => any>;
    private ready: boolean = false;

    constructor(host: string) {
        this.ws = new WebSocket(host);
        this.messageOutQueue = [];
        this.messageListener = [];

        this.ws.addEventListener("open", () => { this.workOnQueue(); });
        this.ws.addEventListener("message", (event) => { this.handleMessage(event); })
        this.ws.addEventListener("close", () => {this.ready = false;});
    }

    public sendMessage(message: ArrayBuffer) {
        if(!this.ready) {
            this.messageOutQueue.push(message);
        } else {
            this.ws.send(message);
        }
    }

    public handleMessage(event: MessageEvent) {
        var reader = new FileReader();
        reader.readAsArrayBuffer(event.data);
        reader.addEventListener("loadend", () => {
            if(reader.result instanceof ArrayBuffer) {
                this.messageListener.forEach(element => element(reader.result as ArrayBuffer));
            }
        });
        //element.apply(new ArrayBuffer(event.data))
    }

    public addMessageListener(listener: (data: ArrayBuffer) => any) {
        this.messageListener.push(listener);
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
}