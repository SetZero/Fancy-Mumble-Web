import { NetworkMessage } from "./NetworkMessages";
import { Mumble } from "./Mumble";

export class MessageSender {
    sender: Mumble;
    constructor(sender: Mumble) {
        this.sender = sender;
    }

    public sendMessage(message: string) {
        this.sender.addToQueue(NetworkMessage.TextMessage, {
            channel_id: 0,
            message: message
        });
    }
}