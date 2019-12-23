import { WebSocketClient } from "../WebSocketClient";
import { NetworkMessage } from "./NetworkMessages";
import {from16Bit, from32Bit, to16Bit, to32Bit} from "../helper/NetworkingHelper";
import {Version, Authenticate, CryptSetup, ChannelState, UserState, ServerSync, TextMessage, Ping} from "../../generated/Mumble_pb";
import { User } from "./User";
import { Channel } from "./Channel";
import { LiteEvent } from "../helper/EventHandler";

export class Mumble {
    private readonly client: WebSocketClient;
    private serverMessageListener: Map<NetworkMessage, Array<(data: any) => void>> = new Map();

    private readonly channelListener = new LiteEvent<void>();
    private readonly textListener = new LiteEvent<TextMessage>(); 

    private mySessionID: number | undefined;
    private userList: Map<number, User> = new Map();
    private channelList: Map<number, Channel> = new Map();

    constructor(location: string, username: string) {
        this.client = new WebSocketClient(location);
        this.setup(username);
        this.initPing()

        this.client.addMessageListener((msg) => this.messageListener(msg));

        this.on(NetworkMessage.ChannelState, (data) => this.manageChannels(data as UserState));
        this.on(NetworkMessage.UserState, (data) => this.manageUsers(data as UserState));
        this.on(NetworkMessage.ServerSync, (data) => { this.mySessionID = (data as ServerSync).getSession(); });
        this.on(NetworkMessage.TextMessage, (data) => {this.textListener.trigger(data)});
    }

    manageChannels(channelInfo: UserState): void {
        const id = channelInfo.getChannelId();
        if(id !== undefined) {
            const channel = this.channelList.get(id);
            if(channel !== undefined) {
                //TODO!
            } else {
                let channel = new Channel(id, channelInfo.getName() as string);
                this.channelList.set(id, channel);
            }
        }
    }


    /**
     * Getter $userList
     * @return {Map<number, User> }
     */
	public get $userList(): Map<number, User>  {
		return this.userList;
	}


    /**
     * Getter $channelList
     * @return {Map<number, Channel> }
     */
	public get $channelList(): Map<number, Channel>  {
		return this.channelList;
	}


    private manageUsers(userInfo: UserState): void {
        const id = userInfo.getSession();
        if(id !== undefined) {
            const user = this.userList.get(id);
            if(user !== undefined) {
                this.updateChannels(user, userInfo);
                this.modifyUser(user, userInfo);
            } else if(userInfo.getName() !== undefined && userInfo.getChannelId() !== undefined) {
                // New User
                const userChannel = userInfo.getChannelId() as number;
                let user = new User(id, userInfo.getName() as string, userChannel);
                this.modifyUser(user, userInfo);
                this.updateChannels(user, userInfo);
                this.userList.set(id, user);
            }
            this.channelListener.trigger();
        }
    }

    private updateChannels(oldUserInfo: User, newUserInfo: UserState) {
        const channels = this.channelList.get(oldUserInfo.$channel);
        if(channels !== undefined) {
            channels.$users = channels.$users.filter((user) => user.$session !== newUserInfo.getSession());
        }
        const userChannel = newUserInfo.getChannelId() as number;
        const channel = this.channelList.get(userChannel);
        channel?.$users.push(oldUserInfo);

        console.log(channels?.$users);
        this.channelListener.trigger();
    }

    private modifyUser(user: User, userInfo: UserState) {
        if(userInfo.getMute() !== undefined) user.$mute = userInfo.getMute() as boolean;
        if(userInfo.getDeaf() !== undefined) user.$deaf = userInfo.getDeaf() as boolean;
        if(userInfo.getSelfMute() !== undefined) user.$selfMute = userInfo.getSelfMute() as boolean;
        if(userInfo.getSelfDeaf() !== undefined) user.$selfDeaf = userInfo.getSelfDeaf() as boolean;
        if(userInfo.getChannelId() !== undefined) user.$channel = userInfo.getChannelId() as number;
        if(userInfo.getSession() !== undefined) user.$session = userInfo.getSession() as number;
    }

    public getUserById(id: number) {
        return this.userList.get(id);
    }

    public getUserByName(name: string): User | undefined {
        const user = Array.from(this.userList).find( (entry) => entry[1].$username === name);
        return user !== undefined ? user[1] : undefined;
    }

    public getAllUser() {
        return Array.from(this.userList.values());
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
        if(this.mySessionID !== undefined) {
            let users = this.getAllUser().filter((p) => p.$session !== this.mySessionID);
            users.forEach((user) =>{
                let tm = new TextMessage();
                tm.setMessage(message);
                tm.setActor(this.mySessionID as number);
                tm.setSessionList([user.$userID]);
                this.setUpSend(NetworkMessage.TextMessage, tm.serializeBinary());
            });
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

    private on(type: NetworkMessage, messageListener: ((msg: any) => void)) {
        if(!this.serverMessageListener.has(type)) this.serverMessageListener.set(type, []);
        this.serverMessageListener.get(type)?.push(messageListener);
    }

    public get channelEvent() { return this.channelListener.expose() }
    public get textMessage() { return this.textListener.expose() }

}