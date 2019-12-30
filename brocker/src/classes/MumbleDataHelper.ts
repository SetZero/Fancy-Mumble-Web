import {from16Bit, from32Bit} from './utils/BitUtils';
import { Brocker } from './Brocker';
import * as ws from "ws";

export class MumbleDataHelper {
    private tmpBufferLoops: number | undefined = undefined;
    private brocker: Brocker;
    private ws: ws;

    constructor(brocker: Brocker, ws: ws) {
        this.brocker = brocker;
        this.ws = ws;
    }

    public handleInput(data: any) {
        const buf = Buffer.from(data);
        let position = 0;

        if(this.tmpBufferLoops !== undefined && this.tmpBufferLoops > 0) {
            this.brocker.addToBuffer(buf.slice(0, Math.min(this.tmpBufferLoops, buf.byteLength)));
            this.tmpBufferLoops -= buf.byteLength;
            if(this.tmpBufferLoops <= 0) {
               this. ws.send(this.brocker.flushBuffer());
                position = buf.byteLength + this.tmpBufferLoops;
                this.tmpBufferLoops = undefined;
            }
        }

        if(this.tmpBufferLoops === undefined || this.tmpBufferLoops <= 0){
            while(position < buf.byteLength) {
                //const type = from16Bit(buf.slice(position, position + 2));
                const size = from32Bit(buf.slice(position + 2, position + 6)) + 6;
                if(size <= buf.byteLength) {
                    this.ws.send(buf.slice(position, position + size));
                    position += size;
                } else {
                    if(this.tmpBufferLoops === undefined) {
                        this.tmpBufferLoops = size - (buf.byteLength - position);
                        this.brocker.initBuffer(size);
                        this.brocker.addToBuffer(buf.slice(position, buf.byteLength));
                        break;
                    }
                }
            }
        }
    }
}