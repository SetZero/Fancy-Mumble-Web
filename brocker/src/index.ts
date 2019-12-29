import {WebSocket} from "./classes/WebSocket"
import { Brocker } from "./classes/Brocker";

console.log("Starting Server...");
const wsPort: number = Number(process.env.MUMBLE_WEB_KEY) || 8080;
/*const socket =*/ new WebSocket(wsPort);