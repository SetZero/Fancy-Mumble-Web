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
            let tmpBufferLoops: number | undefined = undefined;
            brocker.on("data", (data) => {
                const buf = Buffer.from(data);
                let position = 0;

                if(tmpBufferLoops !== undefined && tmpBufferLoops > 0) {
                    brocker.addToBuffer(buf.slice(0, Math.min(tmpBufferLoops, buf.byteLength)));
                    tmpBufferLoops -= buf.byteLength;
                    if(tmpBufferLoops <= 0) {
                        ws.send(brocker.flushBuffer());
                        position = buf.byteLength + tmpBufferLoops;
                        tmpBufferLoops = undefined;
                    }
                }

                if(tmpBufferLoops === undefined || tmpBufferLoops <= 0){
                    while(position < buf.byteLength) {
                        const type = from16Bit(buf.slice(position, position + 2));
                        const size = from32Bit(buf.slice(position + 2, position + 6)) + 6;
                        if(size <= buf.byteLength) {
                            ws.send(buf.slice(position, position + size));
                            position += size;
                        } else {
                            if(tmpBufferLoops === undefined) {
                                tmpBufferLoops = size - (buf.byteLength - position);
                                brocker.initBuffer(size);
                                brocker.addToBuffer(buf.slice(position, buf.byteLength));
                                break;
                            }
                        }
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