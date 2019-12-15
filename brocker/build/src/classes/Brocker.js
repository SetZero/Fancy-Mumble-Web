"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = require("net");
class Brocker {
    constructor(ip, port) {
        this.client = new net_1.Socket();
        this.client.connect(port, ip, () => {
            console.log('Connected');
            this.client.write('Hello, server! Love, Client.');
        });
    }
}
exports.Brocker = Brocker;
//# sourceMappingURL=Brocker.js.map