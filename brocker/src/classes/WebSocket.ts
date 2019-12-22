import {Server} from 'ws';
import { Brocker } from './Brocker';
import {from16Bit, from32Bit} from './utils/BitUtils';

export class WebSocket {
    private wss: Server;

    constructor(portnumber: number) {
        console.log("Started!");
        this.wss = new Server({ port: portnumber });
        this.wss.on('connection', (ws) => {
            console.log("new connection");

            const brocker = new Brocker("nooblounge.net", 64738);
            ws.on('message', (data) =>  brocker.repack(data));
            brocker.on("data", (data) => {
                const buf = Buffer.from(data);
                //console.log("Expected (%d): %d, Real: %d", type, size, buf.byteLength);
                let position = 0;
                while(position < buf.byteLength) {
                    const type = from16Bit(buf.slice(position, position + 2));
                    const size = from32Bit(buf.slice(position + 2, position + 6)) + 6;
                    if(size <= buf.byteLength) {
                        ws.send(buf.slice(position, position + size));
                        position += size;
                        //console.log("Expected (%d): %d, Real: %d / %d", type, size, position, buf.byteLength);
                    } else {
                        //TODO: Fix me
                        //ws.send(buf.slice(position, buf.byteLength - position));
                        break;
                    }
                }
            });

            brocker.on('uncaughtException', (err) => {
                console.log(err);
            });

            ws.on('close', () => {
                brocker.close();
            });
        });
    }
}