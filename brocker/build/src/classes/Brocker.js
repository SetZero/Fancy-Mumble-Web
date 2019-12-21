"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tls_1 = require("tls");
class Brocker {
    constructor(ip, port) {
        const options = {
            // Necessary only if the server requires client certificate authentication.
            //key: fs.readFileSync('client-key.pem'),
            //cert: fs.readFileSync('client-cert.pem'),
            // Necessary only if the server uses a self-signed certificate.
            //ca: [ fs.readFileSync('server-cert.pem') ],
            // Necessary only if the server's cert isn't for "localhost".
            checkServerIdentity: () => undefined,
            secureProtocol: "TLSv1_method",
            rejectUnauthorized: false
        };
        this.socket = tls_1.connect(port, ip, options, () => {
            console.log('client connected', this.socket.authorized ? 'authorized' : 'unauthorized');
        });
        //this.socket.on("data", (data) => {
        //    console.log("Data: ", data);
        //})
    }
    repack(data) {
        this.socket.write(data);
    }
    on(event, listener) {
        this.socket.on(event, listener);
    }
    close() {
        this.socket.destroy();
    }
}
exports.Brocker = Brocker;
//# sourceMappingURL=Brocker.js.map