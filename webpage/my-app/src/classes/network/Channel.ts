import {User} from "./User"

export class Channel {
    private users: Array<User> = [];
    private id: number;
    private name: string;


	constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
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
     * Setter $id
     * @param {number} value
     */
	public set $id(value: number) {
		this.id = value;
	}

    /**
     * Setter $name
     * @param {string} value
     */
	public set $name(value: string) {
		this.name = value;
	}

}