export class User {
    private channel: number = -1;
    private deaf: boolean = false;
    private hash: string = "";
    private userID: number = -1;
    private mute: boolean = false;
    private username: string = "";
    private prioritySpeaker: boolean = false;
    private recording: boolean = false;
    private selfDeaf: boolean = false;
    private selfMute: boolean = false;
    private session: number = -1;
    private supress: boolean = false;
    private texture: string = "";

    constructor(id: number, username: string, channel: number) {
        this.userID = id;
        this.username = username;
        this.channel = channel;
    }


    /**
     * Getter $texture
     * @return {string }
     */
	public get $texture(): string  {
		return this.texture;
	}

    /**
     * Setter $texture
     * @param {string } value
     */
	public set $texture(value: string ) {
		this.texture = value;
	}


    /**
     * Getter $channel
     * @return {number}
     */
	public get $channel(): number {
		return this.channel;
	}

    /**
     * Getter $deaf
     * @return {boolean}
     */
	public get $deaf(): boolean {
		return this.deaf;
	}

    /**
     * Getter $hash
     * @return {string}
     */
	public get $hash(): string {
		return this.hash;
	}

    /**
     * Getter $userID
     * @return {number}
     */
	public get $userID(): number {
		return this.userID;
	}

    /**
     * Getter $mute
     * @return {boolean}
     */
	public get $mute(): boolean {
		return this.mute;
	}

    /**
     * Getter $username
     * @return {string}
     */
	public get $username(): string {
		return this.username;
	}

    /**
     * Getter $prioritySpeaker
     * @return {boolean}
     */
	public get $prioritySpeaker(): boolean {
		return this.prioritySpeaker;
	}

    /**
     * Getter $recording
     * @return {boolean}
     */
	public get $recording(): boolean {
		return this.recording;
	}

    /**
     * Getter $selfDeaf
     * @return {boolean}
     */
	public get $selfDeaf(): boolean {
		return this.selfDeaf;
	}

    /**
     * Getter $selfMute
     * @return {boolean}
     */
	public get $selfMute(): boolean {
		return this.selfMute;
	}

    /**
     * Getter $session
     * @return {string}
     */
	public get $session(): number {
		return this.session;
	}

    /**
     * Getter $supress
     * @return {boolean}
     */
	public get $supress(): boolean {
		return this.supress;
	}

    /**
     * Setter $channel
     * @param {number} value
     */
	public set $channel(value: number) {
		this.channel = value;
	}

    /**
     * Setter $deaf
     * @param {boolean} value
     */
	public set $deaf(value: boolean) {
		this.deaf = value;
	}

    /**
     * Setter $hash
     * @param {string} value
     */
	public set $hash(value: string) {
		this.hash = value;
	}

    /**
     * Setter $userID
     * @param {number} value
     */
	public set $userID(value: number) {
		this.userID = value;
	}

    /**
     * Setter $mute
     * @param {boolean} value
     */
	public set $mute(value: boolean) {
		this.mute = value;
	}

    /**
     * Setter $username
     * @param {string} value
     */
	public set $username(value: string) {
		this.username = value;
	}

    /**
     * Setter $prioritySpeaker
     * @param {boolean} value
     */
	public set $prioritySpeaker(value: boolean) {
		this.prioritySpeaker = value;
	}

    /**
     * Setter $recording
     * @param {boolean} value
     */
	public set $recording(value: boolean) {
		this.recording = value;
	}

    /**
     * Setter $selfDeaf
     * @param {boolean} value
     */
	public set $selfDeaf(value: boolean) {
		this.selfDeaf = value;
	}

    /**
     * Setter $selfMute
     * @param {boolean} value
     */
	public set $selfMute(value: boolean) {
		this.selfMute = value;
	}

    /**
     * Setter $session
     * @param {string} value
     */
	public set $session(value: number) {
		this.session = value;
	}

    /**
     * Setter $supress
     * @param {boolean} value
     */
	public set $supress(value: boolean) {
		this.supress = value;
	}

}