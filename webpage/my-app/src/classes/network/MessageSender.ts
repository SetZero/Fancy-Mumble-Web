import { NetworkMessage } from "./NetworkMessages";
import { Mumble } from "./Mumble";
import {TextMessage, Ping} from "../../generated/Mumble_pb";

export class MessageSender {
    sender: Mumble;
    constructor(sender: Mumble) {
        this.sender = sender;

        setInterval(() => {
            this.sendPing();
            console.log("Ping...");
        }, 15000);
    }

    private sendPing() {
        let ping = new Ping()
        ping.setTimestamp(Math.floor(Date.now() / 1000));
        this.sender.setUpSend(NetworkMessage.Ping, ping.serializeBinary());
    }

    public sendMessage(message: string) {
        console.log("ID: %s", this.sender.getSessionID);
        if(this.sender.getSessionID != undefined) {


            let tm = new TextMessage();
            tm.setMessage(message);
            tm.setActor(this.sender.getSessionID);
            tm.setSessionList([20]);
            this.sender.setUpSend(NetworkMessage.TextMessage, tm.serializeBinary());
        }
    }
}