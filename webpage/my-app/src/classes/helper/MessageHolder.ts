import { NetworkMessage } from "../network/NetworkMessages";

export class MessageHolder {
    private _messageType: NetworkMessage;
    private _message: any;

    constructor(messageType: NetworkMessage, message: any) {
        this._messageType = messageType;
        this._message = message;
    }

    get messageType(): NetworkMessage {
        return this._messageType;
    }

    get message(): any {
        return this._message;
    }
}