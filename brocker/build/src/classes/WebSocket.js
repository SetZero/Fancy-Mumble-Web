"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
class WebSocket {
    constructor(portnumber) {
        console.log("Started!");
        this.wss = new ws_1.Server({
            port: portnumber
        });
        this.wss.on('connection', (ws) => {
            console.log("new connection");
            ws.on('message', (data) => {
                console.log("Message: %s", data);
                ws.send("ack");
            });
        });
    }
}
exports.WebSocket = WebSocket;
//# sourceMappingURL=WebSocket.js.map