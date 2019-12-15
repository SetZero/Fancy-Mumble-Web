import {Socket} from 'net';

export class Brocker {
    client: Socket;
  constructor(ip: string, port: number) {
      this.client = new Socket();
      this.client.connect(port, ip, () => {
        console.log('Connected');
        this.client.write('Hello, server! Love, Client.');
    });
  }
}