"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const Brocker_1 = require("./Brocker");
class WebSocket {
    constructor(portnumber) {
        console.log("Started!");
        this.wss = new ws_1.Server({ port: portnumber });
        this.wss.on('connection', (ws) => {
            console.log("new connection");
            const brocker = new Brocker_1.Brocker("nooblounge.net", 64738);
            ws.on('message', (data) => brocker.repack(data));
            brocker.on("data", (data) => {
                ws.send(data);
            });
        });
    }
}
exports.WebSocket = WebSocket;
//# sourceMappingURL=WebSocket.js.map