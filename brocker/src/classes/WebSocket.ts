import {Server} from 'ws';
import { Brocker } from './Brocker';

export class WebSocket {
    private wss: Server;

    constructor(portnumber: number) {
        console.log("Started!");
        this.wss = new Server({ port: portnumber });
        this.wss.on('connection', (ws) => {
            console.log("new connection");

            const brocker = new Brocker("nooblounge.net", 64738);
            ws.on('message', (data) => brocker.repack(data));
            brocker.on("data", (data) => {
              ws.send(data);
            });
        });
    }
}