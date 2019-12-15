import {Server} from 'ws';

export class WebSocket {
    wss: Server;

    constructor(portnumber: number) {
        console.log("Started!");
        this.wss = new Server({
            port: portnumber
          });
          this.wss.on('connection', (ws) => {
              console.log("new connection");
              ws.on('message', (data) => {
                console.log("Message: %s", data);
                ws.send("ack");
            });
          })
    }
}