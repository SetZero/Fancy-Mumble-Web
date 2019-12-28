import {Server} from 'ws';
import { Brocker } from './Brocker';
import {from16Bit, from32Bit} from './utils/BitUtils';
import {createServer} from 'https'
import {readFileSync} from 'fs'

export class WebSocket {
    private wss: Server;
    private static readonly PORT: number = Number(process.env.MUMBLE_PORT) ?? 64738;
    private static readonly SERVER: string  = process.env.MUMBLE_SERVER || "nooblounge.net";
    private static readonly CERT: string = process.env.MUMBLE_WEB_CERT || "";
    private static readonly KEY: string = process.env.MUMBLE_WEB_KEY || "";

    constructor(portnumber: number) {
        if(WebSocket.CERT !== "" && WebSocket.KEY !== "") {
            const server = createServer({
                cert: readFileSync(WebSocket.CERT),
                key: readFileSync(WebSocket.KEY)
              });
              this.wss = new Server({ port: portnumber, server });
        } else {
            this.wss = new Server({ port: portnumber });
        }

        this.wss.on('connection', (ws) => {
            console.log("new connection");

            const brocker = new Brocker(WebSocket.SERVER, WebSocket.PORT);
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
                        //const type = from16Bit(buf.slice(position, position + 2));
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

            brocker.on('error', (err) => {
                console.log(err);
            });

            ws.on('close', () => {
                brocker.close();
            });
        });
    }
}