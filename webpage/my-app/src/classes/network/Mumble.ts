import { WebSocketClient } from "../WebSocketClient";
import { NetworkMessage } from "./NetworkMessages";
import {from16Bit, from32Bit, to16Bit, to32Bit} from "../helper/NetworkingHelper";
import { MessageSender } from "./MessageSender";
import {Version, Authenticate, CryptSetup, ChannelState, UserState, ServerSync, TextMessage} from "../../generated/Mumble_pb";

export class Mumble {
    private client: WebSocketClient;
    private sender: MessageSender = new MessageSender(this);
    private serverMessageListener: Map<NetworkMessage, Array<(data: any) => void>> = new Map();
    private mySessionID: number | undefined;

    constructor(location: string, username: string) {
        this.client = new WebSocketClient(location);
        this.setup(username);

        this.client.addMessageListener((msg) => this.messageListener(msg));
        this.on(NetworkMessage.Version, (data) => console.log("Version", (data as Version).getOsVersion()));
        this.on(NetworkMessage.CryptSetup, (data) => console.log("Crypt", (data as CryptSetup).getKey()));
        this.on(NetworkMessage.ChannelState, (data) => console.log("Channel %s (%d)", (data as ChannelState).getName(), (data as ChannelState).getChannelId()));
        this.on(NetworkMessage.UserState, (data) => console.log("User: %s (%d)", (data as UserState).getName(), (data as UserState).getSession()));
        this.on(NetworkMessage.ServerSync, (data) => { this.mySessionID = (data as ServerSync).getSession(); });
        //this.on(NetworkMessage.TextMessage, (data) => { console.log((data as TextMessage).getMessage()); });
    }

    get getSender() {
        return this.sender;
    }

    get getSessionID() {
        return this.mySessionID;
    }

    private setup(username: string) {
        let version = new Version();
        version.setOs("Web");
        version.setRelease("1.3.0");
        version.setOsVersion("11");
        version.setVersion((1 << 16) | (3 << 8));
        this.setUpSend(NetworkMessage.Version, version.serializeBinary());

        let auth = new Authenticate();
        auth.setOpus(true);
        auth.setCeltVersionsList([-2147483637, -2147483632]);
        auth.setUsername(username);
        this.setUpSend(NetworkMessage.Authenticate, auth.serializeBinary());
    }

    public setUpSend(type: NetworkMessage, buffer: Uint8Array) {
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
        const buffer = msg.slice(6, 6 + size);
        if(type === undefined) {console.log("Ups...", msg.byteLength)}
        let data: any = undefined
        switch(typeNum) {
            case NetworkMessage.Version:
                data = Version.deserializeBinary(new Uint8Array(buffer));
                break;
            case NetworkMessage.CryptSetup:
                data = CryptSetup.deserializeBinary(new Uint8Array(buffer));
                break;
            case NetworkMessage.ChannelState:
                data = ChannelState.deserializeBinary(new Uint8Array(buffer));
                break;
            case NetworkMessage.UserState:
                data = UserState.deserializeBinary(new Uint8Array(buffer));
                break;
            case NetworkMessage.ServerSync:
                data = ServerSync.deserializeBinary(new Uint8Array(buffer));
                break;
            case NetworkMessage.TextMessage:
                data = TextMessage.deserializeBinary(new Uint8Array(buffer));
                break;
        }

        this.serverMessageListener.get(typeNum)?.forEach(element => element(data));
    }

    public on(type: NetworkMessage, messageListener: ((msg: any) => void)) {
        if(!this.serverMessageListener.has(type)) this.serverMessageListener.set(type, []);
        this.serverMessageListener.get(type)?.push(messageListener);
    }
}