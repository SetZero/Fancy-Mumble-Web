import {WebSocket} from "./classes/WebSocket"
import { Brocker } from "./classes/Brocker";

console.log("Starting Server...");
const webServerPort: number = Number(process.env.MUMBLE_WEB_WS_WEB_PORT) || 8080;
const wsPort: number = Number(process.env.MUMBLE_WEB_WS_PORT) || 8081;
const helperPort: number = Number(process.env.MUMBLE_WEB_WS_HELPER_PORT) || 8082;
/*const socket =*/ new WebSocket(wsPort, helperPort, webServerPort);