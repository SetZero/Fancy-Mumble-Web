import {WebSocketHelper} from "./classes/WebSocket"
import { Brocker } from "./classes/Brocker";

console.log("Starting Server...");
const webServerPort: number = Number(process.env.MUMBLE_WEB_WS_WEB_PORT) || 8080;
const wsPort: number = Number(process.env.MUMBLE_WEB_WS_PORT) || 8081;
const helperPort: number = Number(process.env.MUMBLE_WEB_WS_HELPER_PORT) || 8082;
/*const socket =*/ new WebSocketHelper(wsPort, helperPort, webServerPort);
console.log("Started Server, listening on Port %d, %d, %d", webServerPort, wsPort, helperPort);