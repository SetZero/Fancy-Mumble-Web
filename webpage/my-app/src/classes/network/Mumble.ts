import { WebSocketClient } from "../WebSocketClient";
import { NetworkMessage } from "./NetworkMessages";
import {from16Bit, from32Bit, to16Bit, to32Bit} from "../helper/NetworkingHelper";
import {Version, Authenticate, CryptSetup, ChannelState, UserState, ServerSync, TextMessage, Ping} from "../../generated/Mumble_pb";
import { User } from "./User";
import { UserInfo } from "os";

export class Mumble {
    private client: WebSocketClient;
    private serverMessageListener: Map<NetworkMessage, Array<(data: any) => void>> = new Map();
    private mySessionID: number | undefined;
    private userList: Map<number, User> = new Map();

    constructor(location: string, username: string) {
        this.client = new WebSocketClient(location);
        this.setup(username);
        this.initPing()

        this.client.addMessageListener((msg) => this.messageListener(msg));
        //this.on(NetworkMessage.Version, (data) => console.log("Version", (data as Version).getOsVersion()));
        //this.on(NetworkMessage.CryptSetup, (data) => console.log("Crypt", (data as CryptSetup).getKey()));
        this.on(NetworkMessage.ChannelState, (data) => console.log("Channel %s (%d)", (data as ChannelState).getName(), (data as ChannelState).getChannelId()));
        this.on(NetworkMessage.UserState, (data) => this.manageUsers(data as UserState));
        this.on(NetworkMessage.ServerSync, (data) => { this.mySessionID = (data as ServerSync).getSession(); });
        //this.on(NetworkMessage.TextMessage, (data) => { console.log((data as TextMessage).getMessage()); });
    }

    get getSessionID() {
        return this.mySessionID;
    }

    private manageUsers(userInfo: UserState): void {
        const id = userInfo.getSession();
        if(id !== undefined) {
            const user = this.userList.get(id);
            if(user !== undefined) {
                this.modifyUser(user, userInfo);
            } else if(userInfo.getName() !== undefined && userInfo.getChannelId() !== undefined) {
                let user = new User(id, userInfo.getName() as string, userInfo.getChannelId() as number);
                this.modifyUser(user, userInfo);
                this.userList.set(id, user);
            }
        }
    }

    private modifyUser(user: User, userInfo: UserState) {
        if(userInfo.getMute() !== undefined) user.$mute = userInfo.getMute() as boolean;
        if(userInfo.getDeaf() !== undefined) user.$deaf = userInfo.getDeaf() as boolean;
        if(userInfo.getSelfMute() !== undefined) user.$selfMute = userInfo.getSelfMute() as boolean;
        if(userInfo.getSelfDeaf() !== undefined) user.$selfDeaf = userInfo.getSelfDeaf() as boolean;
        if(userInfo.getChannelId() !== undefined) user.$channel = userInfo.getChannelId() as number;
    }

    public getUserById(id: number) {
        return this.userList.get(id);
    }

    public getUserByName(name: string): User | undefined {
        const user = Array.from(this.userList).find( (entry) => entry[1].$username === name);
        return user !== undefined ? user[1] : undefined;
    }

    private initPing() {
        setInterval(() =>  this.sendPing(), 15000);
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

        this.client.sendMessage(msg);
    }

    private sendPing() {
        let ping = new Ping()
        ping.setTimestamp(Math.floor(Date.now() / 1000));
        this.setUpSend(NetworkMessage.Ping, ping.serializeBinary());
    }

    public sendMessage(message: string) {
        console.log("ID: %s", this.getSessionID);
        if(this.getSessionID !== undefined) {
            let userB = this.getUserByName("NoNoN");
            if(userB) {
                let tm = new TextMessage();
                tm.setMessage(message);
                tm.setActor(this.getSessionID);
                tm.setSessionList([userB.$userID]); //1069
                this.setUpSend(NetworkMessage.TextMessage, tm.serializeBinary());
            }
        }
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