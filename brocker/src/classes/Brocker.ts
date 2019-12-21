import {Socket} from 'net';
import {connect, TLSSocket} from 'tls';

export class Brocker {
  private socket: TLSSocket;
  constructor(ip: string, port: number) {
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

      this.socket = connect(port, ip, options, () => {
        console.log('client connected',
              this.socket.authorized ? 'authorized' : 'unauthorized');
      });
      //this.socket.on("data", (data) => {
      //    console.log("Data: ", data);
      //})
  }

  repack(data: import("ws").Data): void {
    this.socket.write(data);
  }

  on(event: string, listener: (...args: any[]) => void) {
    this.socket.on(event, listener);
  }

  close() {
    this.socket.destroy();
  }
}