import {User} from "./User"
import { UserState } from "../../generated/Mumble_pb";
import { Mumble } from "./Mumble";
import { NetworkMessage } from "./NetworkMessages";

export class Channel {
    private readonly id: number;
    private readonly mumbleConnection: Mumble;
    private users: Array<User> = [];
    private name: string;


	constructor(id: number, name: string, mumbleConnection: Mumble) {
        this.id = id;
        this.name = name;
        this.mumbleConnection = mumbleConnection;
	}

    public join() {
        let state = new UserState();
        let myID = this.mumbleConnection.$mySessionID;
        if(myID) {
            state.setChannelId(this.$id);
            state.setActor(myID);
            this.mumbleConnection.setUpSend(NetworkMessage.UserState, state.serializeBinary());
        }
    }

    /**
     * Getter $users
     * @return {Array<Users> }
     */
	public get $users(): Array<User>  {
		return this.users;
	}

    /**
     * Getter $id
     * @return {number}
     */
	public get $id(): number {
		return this.id;
	}

    /**
     * Getter $name
     * @return {string}
     */
	public get $name(): string {
		return this.name;
	}

    /**
     * Setter $users
     * @param {Array<Users> } value
     */
	public set $users(value: Array<User> ) {
		this.users = value;
	}

    /**
     * Setter $name
     * @param {string} value
     */
	public set $name(value: string) {
		this.name = value;
	}

}