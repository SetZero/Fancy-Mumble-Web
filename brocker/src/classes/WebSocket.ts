import * as ws from "ws";
import * as http from "http";
import * as url from "url";
import * as tmp from "tmp";
import * as fs from "fs";
import * as path from "path";
import * as mime from "mime-types"
import { Brocker } from './Brocker';
import { MumbleDataHelper } from "./MumbleDataHelper";


export class WebSocket {
    private static readonly PORT: number = Number(process.env.MUMBLE_PORT) || 64738;
    private static readonly SERVER: string  = process.env.MUMBLE_SERVER || "nooblounge.net";
    private static readonly BASEPATH: string  = process.env.MUMBLE_SERVER_BASEPATH || "mmbl";
    private static readonly MAX_IMAGE_SIZE: number = 10 * 1024 * 1024;
    private readonly httpServer: http.Server;
    private mainMumbleSocket: ws.Server;
    private helperSocket: ws.Server;
    private readonly dir = tmp.dirSync({prefix: "mmbl_images_"});
    private readonly httpServerPort: number;

    constructor(mainPort: number, helperPort: number, webServerPort: number) {
        this.httpServer = http.createServer((req, res) => {this.handleWebConnection(req, res)});
        this.mainMumbleSocket = new ws.Server({ port: mainPort, noServer: true });
        this.helperSocket = new ws.Server({ port: helperPort, noServer: true, perMessageDeflate: {
            zlibDeflateOptions: {
              // See zlib defaults.
              chunkSize: 1024,
              memLevel: 7,
              level: 3
            },
            zlibInflateOptions: {
              chunkSize: 10 * 1024
            },
            // Other options settable:
            clientNoContextTakeover: true, // Defaults to negotiated value.
            serverNoContextTakeover: true, // Defaults to negotiated value.
            serverMaxWindowBits: 10, // Defaults to negotiated value.
            // Below options specified as default values.
            concurrencyLimit: 10, // Limits zlib concurrency for perf.
            threshold: 1024 // Size (in bytes) below which messages
            // should not be compressed.
          }
        });

        this.mainMumbleSocket.on('connection', (ws) => {this.handleMainConnection(ws)});
        this.helperSocket.on('connection', (ws) => {this.handleHelperConnection(ws)});

        this.httpServer.on('upgrade', (request, socket, head) => this.upgrade(request, socket, head) );
        this.httpServer.listen(webServerPort);
        this.httpServerPort = Number(process.env.MUMBLE_SERVER_WEB_PORT) || webServerPort;
    }

    private handleMainConnection(ws: ws) {
            console.log("new connection");

            const brocker = new Brocker(WebSocket.SERVER, WebSocket.PORT);
            const dataHelper: MumbleDataHelper = new MumbleDataHelper(brocker, ws);

            brocker.on("data", (data) => {dataHelper.handleInput(data)});
            brocker.on('uncaughtException', (err) => { console.log(err); });
            brocker.on('error', (err) => { console.log(err); });

            ws.on('message', (data) =>  brocker.repack(data));
            ws.on('close', () => { brocker.close(); });
    }

    private handleHelperConnection(ws: ws) {
        //TODO!
        ws.on('message', (data) =>  {
            const message = JSON.parse(data.toString());
            if(message.messageType === "image") {
                //const payload = this.urltoFile(message.payload);
                const payload = Buffer.from(message.payload.split(';base64,').pop());
                console.log(payload.byteLength);
                if(payload.byteLength >= WebSocket.MAX_IMAGE_SIZE) {
                    console.log("Failure!");
                    ws.send(JSON.stringify({messageType: "error", payload: "Maximum image size exceeded!", timestamp: message.timestamp}));
                    return;
                }
                const extention = "." + (mime.extension(message.type) || "txt");
                const tmpobj = tmp.fileSync({dir: this.dir.name, postfix: extention});
                fs.writeFile(tmpobj.fd, payload.toString(), {encoding: 'base64'}, (err) => {
                    if(err) {
                        console.log("Error on write: ", err);
                    } else {
                        const filename = message.protocol + "//" + message.host + ":" + this.httpServerPort + "/" + path.join(WebSocket.BASEPATH, path.basename(tmpobj.name));
                        ws.send(JSON.stringify({messageType: message.messageType, payload: filename, timestamp: message.timestamp}));
                    }
                })
            }
        });
    }

    private urltoFile(url: string){
        const regex = /^data:.+\/(.+);base64,(.*)$/;
        const matches = url.match(regex);
        if(matches && matches.length > 2) {
            const ext = matches[1];
            const data = matches[2];
            const buffer = Buffer.from(data, 'base64');
            return buffer;
        }
        return null;
    }

    upgrade(request: any, socket: any, head: any): void {
        const pathname = url.parse(request.url).pathname;

        switch(pathname) {
            case "/":
                this.mainMumbleSocket.handleUpgrade(request, socket, head, (ws) => {
                    this.mainMumbleSocket.emit('connection', ws, request);
                });
                break;
            case "/helper":
                this.helperSocket.handleUpgrade(request, socket, head, (ws) => {
                    this.helperSocket.emit('connection', ws, request);
                });
                break;
            default:
                socket.destroy();
                break;
        }
    }

    handleWebConnection(request: any, resource: any): void {
        const pathname = url.parse(request.url).pathname;
        const filename = path.parse(pathname ?? "").base;

        if(pathname?.startsWith("/" + WebSocket.BASEPATH)) {
            const fullName = path.join(this.dir.name, filename);
            const type = mime.lookup(fullName);
            fs.exists(fullName, (exist) => {
                fs.readFile(fullName, (err, data) => {
                    resource.setHeader('Content-type', type || 'text/plain' );
                    resource.end(data);
                });
            })
        }
    }
}