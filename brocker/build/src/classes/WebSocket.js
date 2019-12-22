"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const Brocker_1 = require("./Brocker");
const BitUtils_1 = require("./utils/BitUtils");
class WebSocket {
    constructor(portnumber) {
        console.log("Started!");
        this.wss = new ws_1.Server({ port: portnumber });
        this.wss.on('connection', (ws) => {
            console.log("new connection");
            const brocker = new Brocker_1.Brocker("nooblounge.net", 64738);
            ws.on('message', (data) => brocker.repack(data));
            brocker.on("data", (data) => {
                const buf = Buffer.from(data);
                //console.log("Expected (%d): %d, Real: %d", type, size, buf.byteLength);
                let position = 0;
                while (position < buf.byteLength) {
                    const type = BitUtils_1.from16Bit(buf.slice(position, position + 2));
                    const size = BitUtils_1.from32Bit(buf.slice(position + 2, position + 6)) + 6;
                    if (size <= buf.byteLength) {
                        ws.send(buf.slice(position, position + size));
                        position += size;
                        //console.log("Expected (%d): %d, Real: %d / %d", type, size, position, buf.byteLength);
                    }
                    else {
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
exports.WebSocket = WebSocket;
//# sourceMappingURL=WebSocket.js.map