import * as ws from "ws";
import * as http from "http";
import * as url from "url";
import * as tmp from "tmp";
import * as fs from "fs";
import * as path from "path";
import * as mime from "mime-types"
import { Brocker } from './Brocker';
import { MumbleDataHelper } from "./MumbleDataHelper";
import { PageCrawler } from "./utils/PageCrawler";
import { Url } from "url";
import WebSocket = require("ws");

class WebSocketStatus {
    readonly status: Map<WebSocket, boolean> = new Map();
}

enum WebSocketTypes {
    MUMBLE_MAIN,
    HELPER
}

export class WebSocketHelper {
    private static readonly PORT: number = Number(process.env.MUMBLE_PORT) || 64738;
    private static readonly SERVER: string  = process.env.MUMBLE_SERVER || "nooblounge.net";
    private static readonly BASEPATH: string  = process.env.MUMBLE_SERVER_BASEPATH || "mmbl";
    private static readonly MAX_IMAGE_SIZE: number = 10 * 1024 * 1024;

    private readonly httpServerPort: number;
    private readonly httpServer: http.Server;
    private mainMumbleSocket: ws.Server;
    private helperSocket: ws.Server;

    private socketStatus: Map<WebSocketTypes, WebSocketStatus> = new Map();
    private readonly dir = tmp.dirSync({prefix: "mmbl_images_"});
    private readonly crawler: PageCrawler = new PageCrawler();

    constructor(mainPort: number, helperPort: number, webServerPort: number) {
        this.socketStatus.set(WebSocketTypes.MUMBLE_MAIN, new WebSocketStatus());
        this.socketStatus.set(WebSocketTypes.HELPER, new WebSocketStatus());

        this.httpServer = http.createServer((req, res) => {this.handleWebConnection(req, res)});
        this.mainMumbleSocket = new ws.Server({ port: mainPort, noServer: true });
        this.helperSocket = new ws.Server({ port: helperPort, noServer: true });
        setInterval(() => { this.pingClients() }, 30000);

        this.mainMumbleSocket.on('connection', (socket) => {this.handleMainConnection(socket as ws)});
        this.helperSocket.on('connection', (socket) => {this.handleHelperConnection(socket as ws)});

        this.httpServer.on('upgrade', (request, socket, head) => this.upgrade(request, socket, head) );
        this.httpServer.listen(webServerPort);
        this.httpServerPort = Number(process.env.MUMBLE_SERVER_WEB_PORT) || webServerPort;
    }

    private handlePingStatus(socket: WebSocket, type: WebSocketTypes) {
        if (this.socketStatus.get(type)?.status.get(socket) === false) {
            this.socketStatus.get(type)?.status.delete(socket);
            return socket.terminate();
        }

        this.socketStatus.get(type)?.status.set(socket, false);
        socket.ping((err: Error) => { });
    }

    pingClients() {
        this.helperSocket.clients.forEach((socket) => { this.handlePingStatus(socket, WebSocketTypes.HELPER) } );
        this.mainMumbleSocket.clients.forEach((socket) => { this.handlePingStatus(socket, WebSocketTypes.MUMBLE_MAIN) } );
    }

    private refreshPing(socket: WebSocket, type: WebSocketTypes) {
        this.socketStatus.get(type)?.status.set(socket, true);
        socket.on('pong', () => {
            this.socketStatus.get(type)?.status.set(socket, true);
        });
    }

    private handleMainConnection(socket: ws) {
        this.refreshPing(socket, WebSocketTypes.MUMBLE_MAIN);
        console.log("new connection");

        const brocker = new Brocker(WebSocketHelper.SERVER, WebSocketHelper.PORT);
        const dataHelper: MumbleDataHelper = new MumbleDataHelper(brocker, socket);

        brocker.on("data", (data) => {dataHelper.handleInput(data)});
        brocker.on('uncaughtException', (err) => { console.log(err); });
        brocker.on('error', (err) => { console.log(err); });

        socket.on('message', (data) =>  brocker.repack(data));
        socket.on('close', () => { brocker.close(); });
    }

    private handleHelperConnection(socket: ws) {
        this.refreshPing(socket, WebSocketTypes.HELPER);
        //TODO!
        socket.on('message', (data) =>  {
            const message = JSON.parse(data.toString());
            switch(message.messageType) {
                case "image":
                    this.imageProcessing(socket, message);
                    break;
                case "link":
                    this.linkProcessing(socket, message);
                    break;
                default:
                    console.log("Unknown Message Type: " + message.messageType);
            }
        });
    }

    linkProcessing(ws: ws, message: any) {
        this.crawler.getWebpage(url.parse(message.payload, true), (info) => {
             console.log("Got Info!");
             ws.send(JSON.stringify({messageType: message.messageType, timestamp: message.timestamp, payload: info}));
        });
    }

    private imageProcessing(ws: ws, message: any) {
        //const payload = this.urltoFile(message.payload);
        const payload = Buffer.from(message.payload.split(';base64,').pop());
        if(payload.byteLength >= WebSocketHelper.MAX_IMAGE_SIZE) {
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
                const filename = message.protocol + "//" + message.host + ":" + this.httpServerPort + "/" + path.join(WebSocketHelper.BASEPATH, path.basename(tmpobj.name));
                console.log(filename);
                ws.send(JSON.stringify({messageType: message.messageType, payload: filename, timestamp: message.timestamp}));
            }
        });
    }

    upgrade(request: any, socket: any, head: any): void {
        const pathname = url.parse(request.url).pathname;
        console.log("Got Request: %s", request.url)

        switch(pathname) {
            case "/ws/main":
            case "/ws/main/":
                this.mainMumbleSocket.handleUpgrade(request, socket, head, (ws) => {
                    this.mainMumbleSocket.emit('connection', ws, request);
                });
                break;
            case "/ws/helper":
            case "/ws/helper/":
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

        if(pathname?.startsWith("/" + WebSocketHelper.BASEPATH)) {
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