import { load } from "protobufjs";
import { WebSocketClient } from "../WebSocketClient";
import { NetworkMessage } from "./NetworkMessages";
import {from16Bit, from32Bit, to16Bit, to32Bit} from "../helper/NetworkingHelper";
import {MessageHolder} from "../helper/MessageHolder";
import { MessageSender } from "./MessageSender";

export class Mumble {
    private client: WebSocketClient;
    private sender: MessageSender = new MessageSender(this);
    private textMessageListener: Map<NetworkMessage, Array<(data: any) => void>> = new Map();
    private networkQueue: Array<MessageHolder> = [];
    private protobufRoot: any = undefined;

    constructor(location: string) {
        this.client = new WebSocketClient(location);
        this.setup();

        load(require("./../../protos/Mumble.proto"))
        .then((root) => {
            this.networkQueue.forEach(element => {
                this.sendMessage(root, element.messageType, element.message);
            });
            this.protobufRoot = root;
        })
        .catch((error) => {
            throw error;
        });
        this.client.addMessageListener((msg) => this.messageListener(msg));
        this.on(NetworkMessage.Version, (data) => console.log("Version Length:", data));
    }

    get getSender() {
        return this.sender;
    }

    private setup() {
        this.addToQueue(NetworkMessage.Version, {
            version: (1 << 16) | (3 << 8),
            release: "1.3.0",
            os: "WinDOS",
            osVersion: "11"
        });

        this.addToQueue(NetworkMessage.Authenticate, {
                username: "WebTest",
                opus: true,
                celt_versions: [-2147483637, -2147483632]
        });
    }

    public addToQueue(type: NetworkMessage, data: any) {
        if(this.protobufRoot === undefined) {
            this.networkQueue.push(new MessageHolder(type, data));
        } else {
            this.sendMessage(this.protobufRoot, type, data);
        }
    }

    private sendMessage(root: any, type: NetworkMessage, payload: any) {
        let myMessage = root.lookupType("MumbleProto." + NetworkMessage[type]);

        let errMsg = myMessage.verify(payload);
        if (errMsg)
            throw Error(errMsg);
        var message = myMessage.create(payload);
        var buffer = myMessage.encode(message).finish();

        this.setUpSend(type, buffer);
    }

    private setUpSend(type: NetworkMessage, buffer: Uint8Array) {
        let versionMsgType = type.valueOf();
        let length = buffer.length;

        let msg = new Uint8Array(2 + 4 + length);
        msg.set(to16Bit(versionMsgType), 0);
        msg.set(to32Bit(length), 2);
        msg.set(buffer, 6);

        console.log(to32Bit(length));

        this.client.sendMessage(msg);
    }

    private messageListener(msg: ArrayBuffer) {
        const typeNum = from16Bit(msg.slice(0, 2));
        const type: NetworkMessage = (NetworkMessage as any)[typeNum];
        const size = from32Bit(msg.slice(2, 6));

        this.textMessageListener.get(typeNum)?.forEach(element => element(size));
    }

    public on(type: NetworkMessage, messageListener: ((msg: any) => void)) {
        if(!this.textMessageListener.has(type)) this.textMessageListener.set(type, []);
        this.textMessageListener.get(type)?.push(messageListener);
    }
}