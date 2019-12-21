// package: MumbleProto
// file: src/protos/Mumble.proto

import * as jspb from "google-protobuf";

export class Version extends jspb.Message {
  hasVersion(): boolean;
  clearVersion(): void;
  getVersion(): number | undefined;
  setVersion(value: number): void;

  hasRelease(): boolean;
  clearRelease(): void;
  getRelease(): string | undefined;
  setRelease(value: string): void;

  hasOs(): boolean;
  clearOs(): void;
  getOs(): string | undefined;
  setOs(value: string): void;

  hasOsVersion(): boolean;
  clearOsVersion(): void;
  getOsVersion(): string | undefined;
  setOsVersion(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Version.AsObject;
  static toObject(includeInstance: boolean, msg: Version): Version.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Version, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Version;
  static deserializeBinaryFromReader(message: Version, reader: jspb.BinaryReader): Version;
}

export namespace Version {
  export type AsObject = {
    version?: number,
    release?: string,
    os?: string,
    osVersion?: string,
  }
}

export class UDPTunnel extends jspb.Message {
  hasPacket(): boolean;
  clearPacket(): void;
  getPacket(): Uint8Array | string;
  getPacket_asU8(): Uint8Array;
  getPacket_asB64(): string;
  setPacket(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UDPTunnel.AsObject;
  static toObject(includeInstance: boolean, msg: UDPTunnel): UDPTunnel.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UDPTunnel, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UDPTunnel;
  static deserializeBinaryFromReader(message: UDPTunnel, reader: jspb.BinaryReader): UDPTunnel;
}

export namespace UDPTunnel {
  export type AsObject = {
    packet: Uint8Array | string,
  }
}

export class Authenticate extends jspb.Message {
  hasUsername(): boolean;
  clearUsername(): void;
  getUsername(): string | undefined;
  setUsername(value: string): void;

  hasPassword(): boolean;
  clearPassword(): void;
  getPassword(): string | undefined;
  setPassword(value: string): void;

  clearTokensList(): void;
  getTokensList(): Array<string>;
  setTokensList(value: Array<string>): void;
  addTokens(value: string, index?: number): string;

  clearCeltVersionsList(): void;
  getCeltVersionsList(): Array<number>;
  setCeltVersionsList(value: Array<number>): void;
  addCeltVersions(value: number, index?: number): number;

  hasOpus(): boolean;
  clearOpus(): void;
  getOpus(): boolean | undefined;
  setOpus(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Authenticate.AsObject;
  static toObject(includeInstance: boolean, msg: Authenticate): Authenticate.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Authenticate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Authenticate;
  static deserializeBinaryFromReader(message: Authenticate, reader: jspb.BinaryReader): Authenticate;
}

export namespace Authenticate {
  export type AsObject = {
    username?: string,
    password?: string,
    tokensList: Array<string>,
    celtVersionsList: Array<number>,
    opus?: boolean,
  }
}

export class Ping extends jspb.Message {
  hasTimestamp(): boolean;
  clearTimestamp(): void;
  getTimestamp(): number | undefined;
  setTimestamp(value: number): void;

  hasGood(): boolean;
  clearGood(): void;
  getGood(): number | undefined;
  setGood(value: number): void;

  hasLate(): boolean;
  clearLate(): void;
  getLate(): number | undefined;
  setLate(value: number): void;

  hasLost(): boolean;
  clearLost(): void;
  getLost(): number | undefined;
  setLost(value: number): void;

  hasResync(): boolean;
  clearResync(): void;
  getResync(): number | undefined;
  setResync(value: number): void;

  hasUdpPackets(): boolean;
  clearUdpPackets(): void;
  getUdpPackets(): number | undefined;
  setUdpPackets(value: number): void;

  hasTcpPackets(): boolean;
  clearTcpPackets(): void;
  getTcpPackets(): number | undefined;
  setTcpPackets(value: number): void;

  hasUdpPingAvg(): boolean;
  clearUdpPingAvg(): void;
  getUdpPingAvg(): number | undefined;
  setUdpPingAvg(value: number): void;

  hasUdpPingVar(): boolean;
  clearUdpPingVar(): void;
  getUdpPingVar(): number | undefined;
  setUdpPingVar(value: number): void;

  hasTcpPingAvg(): boolean;
  clearTcpPingAvg(): void;
  getTcpPingAvg(): number | undefined;
  setTcpPingAvg(value: number): void;

  hasTcpPingVar(): boolean;
  clearTcpPingVar(): void;
  getTcpPingVar(): number | undefined;
  setTcpPingVar(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Ping.AsObject;
  static toObject(includeInstance: boolean, msg: Ping): Ping.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Ping, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Ping;
  static deserializeBinaryFromReader(message: Ping, reader: jspb.BinaryReader): Ping;
}

export namespace Ping {
  export type AsObject = {
    timestamp?: number,
    good?: number,
    late?: number,
    lost?: number,
    resync?: number,
    udpPackets?: number,
    tcpPackets?: number,
    udpPingAvg?: number,
    udpPingVar?: number,
    tcpPingAvg?: number,
    tcpPingVar?: number,
  }
}

export class Reject extends jspb.Message {
  hasType(): boolean;
  clearType(): void;
  getType(): Reject.RejectTypeMap[keyof Reject.RejectTypeMap] | undefined;
  setType(value: Reject.RejectTypeMap[keyof Reject.RejectTypeMap]): void;

  hasReason(): boolean;
  clearReason(): void;
  getReason(): string | undefined;
  setReason(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Reject.AsObject;
  static toObject(includeInstance: boolean, msg: Reject): Reject.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Reject, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Reject;
  static deserializeBinaryFromReader(message: Reject, reader: jspb.BinaryReader): Reject;
}

export namespace Reject {
  export type AsObject = {
    type?: Reject.RejectTypeMap[keyof Reject.RejectTypeMap],
    reason?: string,
  }

  export interface RejectTypeMap {
    NONE: 0;
    WRONGVERSION: 1;
    INVALIDUSERNAME: 2;
    WRONGUSERPW: 3;
    WRONGSERVERPW: 4;
    USERNAMEINUSE: 5;
    SERVERFULL: 6;
    NOCERTIFICATE: 7;
    AUTHENTICATORFAIL: 8;
  }

  export const RejectType: RejectTypeMap;
}

export class ServerSync extends jspb.Message {
  hasSession(): boolean;
  clearSession(): void;
  getSession(): number | undefined;
  setSession(value: number): void;

  hasMaxBandwidth(): boolean;
  clearMaxBandwidth(): void;
  getMaxBandwidth(): number | undefined;
  setMaxBandwidth(value: number): void;

  hasWelcomeText(): boolean;
  clearWelcomeText(): void;
  getWelcomeText(): string | undefined;
  setWelcomeText(value: string): void;

  hasPermissions(): boolean;
  clearPermissions(): void;
  getPermissions(): number | undefined;
  setPermissions(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ServerSync.AsObject;
  static toObject(includeInstance: boolean, msg: ServerSync): ServerSync.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ServerSync, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ServerSync;
  static deserializeBinaryFromReader(message: ServerSync, reader: jspb.BinaryReader): ServerSync;
}

export namespace ServerSync {
  export type AsObject = {
    session?: number,
    maxBandwidth?: number,
    welcomeText?: string,
    permissions?: number,
  }
}

export class ChannelRemove extends jspb.Message {
  hasChannelId(): boolean;
  clearChannelId(): void;
  getChannelId(): number | undefined;
  setChannelId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChannelRemove.AsObject;
  static toObject(includeInstance: boolean, msg: ChannelRemove): ChannelRemove.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChannelRemove, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChannelRemove;
  static deserializeBinaryFromReader(message: ChannelRemove, reader: jspb.BinaryReader): ChannelRemove;
}

export namespace ChannelRemove {
  export type AsObject = {
    channelId?: number,
  }
}

export class ChannelState extends jspb.Message {
  hasChannelId(): boolean;
  clearChannelId(): void;
  getChannelId(): number | undefined;
  setChannelId(value: number): void;

  hasParent(): boolean;
  clearParent(): void;
  getParent(): number | undefined;
  setParent(value: number): void;

  hasName(): boolean;
  clearName(): void;
  getName(): string | undefined;
  setName(value: string): void;

  clearLinksList(): void;
  getLinksList(): Array<number>;
  setLinksList(value: Array<number>): void;
  addLinks(value: number, index?: number): number;

  hasDescription(): boolean;
  clearDescription(): void;
  getDescription(): string | undefined;
  setDescription(value: string): void;

  clearLinksAddList(): void;
  getLinksAddList(): Array<number>;
  setLinksAddList(value: Array<number>): void;
  addLinksAdd(value: number, index?: number): number;

  clearLinksRemoveList(): void;
  getLinksRemoveList(): Array<number>;
  setLinksRemoveList(value: Array<number>): void;
  addLinksRemove(value: number, index?: number): number;

  hasTemporary(): boolean;
  clearTemporary(): void;
  getTemporary(): boolean | undefined;
  setTemporary(value: boolean): void;

  hasPosition(): boolean;
  clearPosition(): void;
  getPosition(): number | undefined;
  setPosition(value: number): void;

  hasDescriptionHash(): boolean;
  clearDescriptionHash(): void;
  getDescriptionHash(): Uint8Array | string;
  getDescriptionHash_asU8(): Uint8Array;
  getDescriptionHash_asB64(): string;
  setDescriptionHash(value: Uint8Array | string): void;

  hasMaxUsers(): boolean;
  clearMaxUsers(): void;
  getMaxUsers(): number | undefined;
  setMaxUsers(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChannelState.AsObject;
  static toObject(includeInstance: boolean, msg: ChannelState): ChannelState.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChannelState, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChannelState;
  static deserializeBinaryFromReader(message: ChannelState, reader: jspb.BinaryReader): ChannelState;
}

export namespace ChannelState {
  export type AsObject = {
    channelId?: number,
    parent?: number,
    name?: string,
    linksList: Array<number>,
    description?: string,
    linksAddList: Array<number>,
    linksRemoveList: Array<number>,
    temporary?: boolean,
    position?: number,
    descriptionHash: Uint8Array | string,
    maxUsers?: number,
  }
}

export class UserRemove extends jspb.Message {
  hasSession(): boolean;
  clearSession(): void;
  getSession(): number | undefined;
  setSession(value: number): void;

  hasActor(): boolean;
  clearActor(): void;
  getActor(): number | undefined;
  setActor(value: number): void;

  hasReason(): boolean;
  clearReason(): void;
  getReason(): string | undefined;
  setReason(value: string): void;

  hasBan(): boolean;
  clearBan(): void;
  getBan(): boolean | undefined;
  setBan(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserRemove.AsObject;
  static toObject(includeInstance: boolean, msg: UserRemove): UserRemove.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserRemove, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserRemove;
  static deserializeBinaryFromReader(message: UserRemove, reader: jspb.BinaryReader): UserRemove;
}

export namespace UserRemove {
  export type AsObject = {
    session?: number,
    actor?: number,
    reason?: string,
    ban?: boolean,
  }
}

export class UserState extends jspb.Message {
  hasSession(): boolean;
  clearSession(): void;
  getSession(): number | undefined;
  setSession(value: number): void;

  hasActor(): boolean;
  clearActor(): void;
  getActor(): number | undefined;
  setActor(value: number): void;

  hasName(): boolean;
  clearName(): void;
  getName(): string | undefined;
  setName(value: string): void;

  hasUserId(): boolean;
  clearUserId(): void;
  getUserId(): number | undefined;
  setUserId(value: number): void;

  hasChannelId(): boolean;
  clearChannelId(): void;
  getChannelId(): number | undefined;
  setChannelId(value: number): void;

  hasMute(): boolean;
  clearMute(): void;
  getMute(): boolean | undefined;
  setMute(value: boolean): void;

  hasDeaf(): boolean;
  clearDeaf(): void;
  getDeaf(): boolean | undefined;
  setDeaf(value: boolean): void;

  hasSuppress(): boolean;
  clearSuppress(): void;
  getSuppress(): boolean | undefined;
  setSuppress(value: boolean): void;

  hasSelfMute(): boolean;
  clearSelfMute(): void;
  getSelfMute(): boolean | undefined;
  setSelfMute(value: boolean): void;

  hasSelfDeaf(): boolean;
  clearSelfDeaf(): void;
  getSelfDeaf(): boolean | undefined;
  setSelfDeaf(value: boolean): void;

  hasTexture(): boolean;
  clearTexture(): void;
  getTexture(): Uint8Array | string;
  getTexture_asU8(): Uint8Array;
  getTexture_asB64(): string;
  setTexture(value: Uint8Array | string): void;

  hasPluginContext(): boolean;
  clearPluginContext(): void;
  getPluginContext(): Uint8Array | string;
  getPluginContext_asU8(): Uint8Array;
  getPluginContext_asB64(): string;
  setPluginContext(value: Uint8Array | string): void;

  hasPluginIdentity(): boolean;
  clearPluginIdentity(): void;
  getPluginIdentity(): string | undefined;
  setPluginIdentity(value: string): void;

  hasComment(): boolean;
  clearComment(): void;
  getComment(): string | undefined;
  setComment(value: string): void;

  hasHash(): boolean;
  clearHash(): void;
  getHash(): string | undefined;
  setHash(value: string): void;

  hasCommentHash(): boolean;
  clearCommentHash(): void;
  getCommentHash(): Uint8Array | string;
  getCommentHash_asU8(): Uint8Array;
  getCommentHash_asB64(): string;
  setCommentHash(value: Uint8Array | string): void;

  hasTextureHash(): boolean;
  clearTextureHash(): void;
  getTextureHash(): Uint8Array | string;
  getTextureHash_asU8(): Uint8Array;
  getTextureHash_asB64(): string;
  setTextureHash(value: Uint8Array | string): void;

  hasPrioritySpeaker(): boolean;
  clearPrioritySpeaker(): void;
  getPrioritySpeaker(): boolean | undefined;
  setPrioritySpeaker(value: boolean): void;

  hasRecording(): boolean;
  clearRecording(): void;
  getRecording(): boolean | undefined;
  setRecording(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserState.AsObject;
  static toObject(includeInstance: boolean, msg: UserState): UserState.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserState, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserState;
  static deserializeBinaryFromReader(message: UserState, reader: jspb.BinaryReader): UserState;
}

export namespace UserState {
  export type AsObject = {
    session?: number,
    actor?: number,
    name?: string,
    userId?: number,
    channelId?: number,
    mute?: boolean,
    deaf?: boolean,
    suppress?: boolean,
    selfMute?: boolean,
    selfDeaf?: boolean,
    texture: Uint8Array | string,
    pluginContext: Uint8Array | string,
    pluginIdentity?: string,
    comment?: string,
    hash?: string,
    commentHash: Uint8Array | string,
    textureHash: Uint8Array | string,
    prioritySpeaker?: boolean,
    recording?: boolean,
  }
}

export class BanList extends jspb.Message {
  clearBansList(): void;
  getBansList(): Array<BanList.BanEntry>;
  setBansList(value: Array<BanList.BanEntry>): void;
  addBans(value?: BanList.BanEntry, index?: number): BanList.BanEntry;

  hasQuery(): boolean;
  clearQuery(): void;
  getQuery(): boolean | undefined;
  setQuery(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BanList.AsObject;
  static toObject(includeInstance: boolean, msg: BanList): BanList.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BanList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BanList;
  static deserializeBinaryFromReader(message: BanList, reader: jspb.BinaryReader): BanList;
}

export namespace BanList {
  export type AsObject = {
    bansList: Array<BanList.BanEntry.AsObject>,
    query?: boolean,
  }

  export class BanEntry extends jspb.Message {
    hasAddress(): boolean;
    clearAddress(): void;
    getAddress(): Uint8Array | string;
    getAddress_asU8(): Uint8Array;
    getAddress_asB64(): string;
    setAddress(value: Uint8Array | string): void;

    hasMask(): boolean;
    clearMask(): void;
    getMask(): number | undefined;
    setMask(value: number): void;

    hasName(): boolean;
    clearName(): void;
    getName(): string | undefined;
    setName(value: string): void;

    hasHash(): boolean;
    clearHash(): void;
    getHash(): string | undefined;
    setHash(value: string): void;

    hasReason(): boolean;
    clearReason(): void;
    getReason(): string | undefined;
    setReason(value: string): void;

    hasStart(): boolean;
    clearStart(): void;
    getStart(): string | undefined;
    setStart(value: string): void;

    hasDuration(): boolean;
    clearDuration(): void;
    getDuration(): number | undefined;
    setDuration(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BanEntry.AsObject;
    static toObject(includeInstance: boolean, msg: BanEntry): BanEntry.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BanEntry, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BanEntry;
    static deserializeBinaryFromReader(message: BanEntry, reader: jspb.BinaryReader): BanEntry;
  }

  export namespace BanEntry {
    export type AsObject = {
      address: Uint8Array | string,
      mask?: number,
      name?: string,
      hash?: string,
      reason?: string,
      start?: string,
      duration?: number,
    }
  }
}

export class TextMessage extends jspb.Message {
  hasActor(): boolean;
  clearActor(): void;
  getActor(): number | undefined;
  setActor(value: number): void;

  clearSessionList(): void;
  getSessionList(): Array<number>;
  setSessionList(value: Array<number>): void;
  addSession(value: number, index?: number): number;

  clearChannelIdList(): void;
  getChannelIdList(): Array<number>;
  setChannelIdList(value: Array<number>): void;
  addChannelId(value: number, index?: number): number;

  clearTreeIdList(): void;
  getTreeIdList(): Array<number>;
  setTreeIdList(value: Array<number>): void;
  addTreeId(value: number, index?: number): number;

  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): string | undefined;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TextMessage.AsObject;
  static toObject(includeInstance: boolean, msg: TextMessage): TextMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TextMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TextMessage;
  static deserializeBinaryFromReader(message: TextMessage, reader: jspb.BinaryReader): TextMessage;
}

export namespace TextMessage {
  export type AsObject = {
    actor?: number,
    sessionList: Array<number>,
    channelIdList: Array<number>,
    treeIdList: Array<number>,
    message?: string,
  }
}

export class PermissionDenied extends jspb.Message {
  hasPermission(): boolean;
  clearPermission(): void;
  getPermission(): number | undefined;
  setPermission(value: number): void;

  hasChannelId(): boolean;
  clearChannelId(): void;
  getChannelId(): number | undefined;
  setChannelId(value: number): void;

  hasSession(): boolean;
  clearSession(): void;
  getSession(): number | undefined;
  setSession(value: number): void;

  hasReason(): boolean;
  clearReason(): void;
  getReason(): string | undefined;
  setReason(value: string): void;

  hasType(): boolean;
  clearType(): void;
  getType(): PermissionDenied.DenyTypeMap[keyof PermissionDenied.DenyTypeMap] | undefined;
  setType(value: PermissionDenied.DenyTypeMap[keyof PermissionDenied.DenyTypeMap]): void;

  hasName(): boolean;
  clearName(): void;
  getName(): string | undefined;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PermissionDenied.AsObject;
  static toObject(includeInstance: boolean, msg: PermissionDenied): PermissionDenied.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PermissionDenied, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PermissionDenied;
  static deserializeBinaryFromReader(message: PermissionDenied, reader: jspb.BinaryReader): PermissionDenied;
}

export namespace PermissionDenied {
  export type AsObject = {
    permission?: number,
    channelId?: number,
    session?: number,
    reason?: string,
    type?: PermissionDenied.DenyTypeMap[keyof PermissionDenied.DenyTypeMap],
    name?: string,
  }

  export interface DenyTypeMap {
    TEXT: 0;
    PERMISSION: 1;
    SUPERUSER: 2;
    CHANNELNAME: 3;
    TEXTTOOLONG: 4;
    H9K: 5;
    TEMPORARYCHANNEL: 6;
    MISSINGCERTIFICATE: 7;
    USERNAME: 8;
    CHANNELFULL: 9;
    NESTINGLIMIT: 10;
    CHANNELCOUNTLIMIT: 11;
  }

  export const DenyType: DenyTypeMap;
}

export class ACL extends jspb.Message {
  hasChannelId(): boolean;
  clearChannelId(): void;
  getChannelId(): number | undefined;
  setChannelId(value: number): void;

  hasInheritAcls(): boolean;
  clearInheritAcls(): void;
  getInheritAcls(): boolean | undefined;
  setInheritAcls(value: boolean): void;

  clearGroupsList(): void;
  getGroupsList(): Array<ACL.ChanGroup>;
  setGroupsList(value: Array<ACL.ChanGroup>): void;
  addGroups(value?: ACL.ChanGroup, index?: number): ACL.ChanGroup;

  clearAclsList(): void;
  getAclsList(): Array<ACL.ChanACL>;
  setAclsList(value: Array<ACL.ChanACL>): void;
  addAcls(value?: ACL.ChanACL, index?: number): ACL.ChanACL;

  hasQuery(): boolean;
  clearQuery(): void;
  getQuery(): boolean | undefined;
  setQuery(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ACL.AsObject;
  static toObject(includeInstance: boolean, msg: ACL): ACL.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ACL, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ACL;
  static deserializeBinaryFromReader(message: ACL, reader: jspb.BinaryReader): ACL;
}

export namespace ACL {
  export type AsObject = {
    channelId?: number,
    inheritAcls?: boolean,
    groupsList: Array<ACL.ChanGroup.AsObject>,
    aclsList: Array<ACL.ChanACL.AsObject>,
    query?: boolean,
  }

  export class ChanGroup extends jspb.Message {
    hasName(): boolean;
    clearName(): void;
    getName(): string | undefined;
    setName(value: string): void;

    hasInherited(): boolean;
    clearInherited(): void;
    getInherited(): boolean | undefined;
    setInherited(value: boolean): void;

    hasInherit(): boolean;
    clearInherit(): void;
    getInherit(): boolean | undefined;
    setInherit(value: boolean): void;

    hasInheritable(): boolean;
    clearInheritable(): void;
    getInheritable(): boolean | undefined;
    setInheritable(value: boolean): void;

    clearAddList(): void;
    getAddList(): Array<number>;
    setAddList(value: Array<number>): void;
    addAdd(value: number, index?: number): number;

    clearRemoveList(): void;
    getRemoveList(): Array<number>;
    setRemoveList(value: Array<number>): void;
    addRemove(value: number, index?: number): number;

    clearInheritedMembersList(): void;
    getInheritedMembersList(): Array<number>;
    setInheritedMembersList(value: Array<number>): void;
    addInheritedMembers(value: number, index?: number): number;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ChanGroup.AsObject;
    static toObject(includeInstance: boolean, msg: ChanGroup): ChanGroup.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ChanGroup, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ChanGroup;
    static deserializeBinaryFromReader(message: ChanGroup, reader: jspb.BinaryReader): ChanGroup;
  }

  export namespace ChanGroup {
    export type AsObject = {
      name?: string,
      inherited?: boolean,
      inherit?: boolean,
      inheritable?: boolean,
      addList: Array<number>,
      removeList: Array<number>,
      inheritedMembersList: Array<number>,
    }
  }

  export class ChanACL extends jspb.Message {
    hasApplyHere(): boolean;
    clearApplyHere(): void;
    getApplyHere(): boolean | undefined;
    setApplyHere(value: boolean): void;

    hasApplySubs(): boolean;
    clearApplySubs(): void;
    getApplySubs(): boolean | undefined;
    setApplySubs(value: boolean): void;

    hasInherited(): boolean;
    clearInherited(): void;
    getInherited(): boolean | undefined;
    setInherited(value: boolean): void;

    hasUserId(): boolean;
    clearUserId(): void;
    getUserId(): number | undefined;
    setUserId(value: number): void;

    hasGroup(): boolean;
    clearGroup(): void;
    getGroup(): string | undefined;
    setGroup(value: string): void;

    hasGrant(): boolean;
    clearGrant(): void;
    getGrant(): number | undefined;
    setGrant(value: number): void;

    hasDeny(): boolean;
    clearDeny(): void;
    getDeny(): number | undefined;
    setDeny(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ChanACL.AsObject;
    static toObject(includeInstance: boolean, msg: ChanACL): ChanACL.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ChanACL, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ChanACL;
    static deserializeBinaryFromReader(message: ChanACL, reader: jspb.BinaryReader): ChanACL;
  }

  export namespace ChanACL {
    export type AsObject = {
      applyHere?: boolean,
      applySubs?: boolean,
      inherited?: boolean,
      userId?: number,
      group?: string,
      grant?: number,
      deny?: number,
    }
  }
}

export class QueryUsers extends jspb.Message {
  clearIdsList(): void;
  getIdsList(): Array<number>;
  setIdsList(value: Array<number>): void;
  addIds(value: number, index?: number): number;

  clearNamesList(): void;
  getNamesList(): Array<string>;
  setNamesList(value: Array<string>): void;
  addNames(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryUsers.AsObject;
  static toObject(includeInstance: boolean, msg: QueryUsers): QueryUsers.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryUsers, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryUsers;
  static deserializeBinaryFromReader(message: QueryUsers, reader: jspb.BinaryReader): QueryUsers;
}

export namespace QueryUsers {
  export type AsObject = {
    idsList: Array<number>,
    namesList: Array<string>,
  }
}

export class CryptSetup extends jspb.Message {
  hasKey(): boolean;
  clearKey(): void;
  getKey(): Uint8Array | string;
  getKey_asU8(): Uint8Array;
  getKey_asB64(): string;
  setKey(value: Uint8Array | string): void;

  hasClientNonce(): boolean;
  clearClientNonce(): void;
  getClientNonce(): Uint8Array | string;
  getClientNonce_asU8(): Uint8Array;
  getClientNonce_asB64(): string;
  setClientNonce(value: Uint8Array | string): void;

  hasServerNonce(): boolean;
  clearServerNonce(): void;
  getServerNonce(): Uint8Array | string;
  getServerNonce_asU8(): Uint8Array;
  getServerNonce_asB64(): string;
  setServerNonce(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CryptSetup.AsObject;
  static toObject(includeInstance: boolean, msg: CryptSetup): CryptSetup.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CryptSetup, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CryptSetup;
  static deserializeBinaryFromReader(message: CryptSetup, reader: jspb.BinaryReader): CryptSetup;
}

export namespace CryptSetup {
  export type AsObject = {
    key: Uint8Array | string,
    clientNonce: Uint8Array | string,
    serverNonce: Uint8Array | string,
  }
}

export class ContextActionModify extends jspb.Message {
  hasAction(): boolean;
  clearAction(): void;
  getAction(): string | undefined;
  setAction(value: string): void;

  hasText(): boolean;
  clearText(): void;
  getText(): string | undefined;
  setText(value: string): void;

  hasContext(): boolean;
  clearContext(): void;
  getContext(): number | undefined;
  setContext(value: number): void;

  hasOperation(): boolean;
  clearOperation(): void;
  getOperation(): ContextActionModify.OperationMap[keyof ContextActionModify.OperationMap] | undefined;
  setOperation(value: ContextActionModify.OperationMap[keyof ContextActionModify.OperationMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContextActionModify.AsObject;
  static toObject(includeInstance: boolean, msg: ContextActionModify): ContextActionModify.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContextActionModify, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContextActionModify;
  static deserializeBinaryFromReader(message: ContextActionModify, reader: jspb.BinaryReader): ContextActionModify;
}

export namespace ContextActionModify {
  export type AsObject = {
    action?: string,
    text?: string,
    context?: number,
    operation?: ContextActionModify.OperationMap[keyof ContextActionModify.OperationMap],
  }

  export interface ContextMap {
    SERVER: 1;
    CHANNEL: 2;
    USER: 4;
  }

  export const Context: ContextMap;

  export interface OperationMap {
    ADD: 0;
    REMOVE: 1;
  }

  export const Operation: OperationMap;
}

export class ContextAction extends jspb.Message {
  hasSession(): boolean;
  clearSession(): void;
  getSession(): number | undefined;
  setSession(value: number): void;

  hasChannelId(): boolean;
  clearChannelId(): void;
  getChannelId(): number | undefined;
  setChannelId(value: number): void;

  hasAction(): boolean;
  clearAction(): void;
  getAction(): string | undefined;
  setAction(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContextAction.AsObject;
  static toObject(includeInstance: boolean, msg: ContextAction): ContextAction.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContextAction, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContextAction;
  static deserializeBinaryFromReader(message: ContextAction, reader: jspb.BinaryReader): ContextAction;
}

export namespace ContextAction {
  export type AsObject = {
    session?: number,
    channelId?: number,
    action?: string,
  }
}

export class UserList extends jspb.Message {
  clearUsersList(): void;
  getUsersList(): Array<UserList.User>;
  setUsersList(value: Array<UserList.User>): void;
  addUsers(value?: UserList.User, index?: number): UserList.User;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserList.AsObject;
  static toObject(includeInstance: boolean, msg: UserList): UserList.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserList;
  static deserializeBinaryFromReader(message: UserList, reader: jspb.BinaryReader): UserList;
}

export namespace UserList {
  export type AsObject = {
    usersList: Array<UserList.User.AsObject>,
  }

  export class User extends jspb.Message {
    hasUserId(): boolean;
    clearUserId(): void;
    getUserId(): number | undefined;
    setUserId(value: number): void;

    hasName(): boolean;
    clearName(): void;
    getName(): string | undefined;
    setName(value: string): void;

    hasLastSeen(): boolean;
    clearLastSeen(): void;
    getLastSeen(): string | undefined;
    setLastSeen(value: string): void;

    hasLastChannel(): boolean;
    clearLastChannel(): void;
    getLastChannel(): number | undefined;
    setLastChannel(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): User.AsObject;
    static toObject(includeInstance: boolean, msg: User): User.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): User;
    static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
  }

  export namespace User {
    export type AsObject = {
      userId?: number,
      name?: string,
      lastSeen?: string,
      lastChannel?: number,
    }
  }
}

export class VoiceTarget extends jspb.Message {
  hasId(): boolean;
  clearId(): void;
  getId(): number | undefined;
  setId(value: number): void;

  clearTargetsList(): void;
  getTargetsList(): Array<VoiceTarget.Target>;
  setTargetsList(value: Array<VoiceTarget.Target>): void;
  addTargets(value?: VoiceTarget.Target, index?: number): VoiceTarget.Target;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VoiceTarget.AsObject;
  static toObject(includeInstance: boolean, msg: VoiceTarget): VoiceTarget.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: VoiceTarget, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VoiceTarget;
  static deserializeBinaryFromReader(message: VoiceTarget, reader: jspb.BinaryReader): VoiceTarget;
}

export namespace VoiceTarget {
  export type AsObject = {
    id?: number,
    targetsList: Array<VoiceTarget.Target.AsObject>,
  }

  export class Target extends jspb.Message {
    clearSessionList(): void;
    getSessionList(): Array<number>;
    setSessionList(value: Array<number>): void;
    addSession(value: number, index?: number): number;

    hasChannelId(): boolean;
    clearChannelId(): void;
    getChannelId(): number | undefined;
    setChannelId(value: number): void;

    hasGroup(): boolean;
    clearGroup(): void;
    getGroup(): string | undefined;
    setGroup(value: string): void;

    hasLinks(): boolean;
    clearLinks(): void;
    getLinks(): boolean | undefined;
    setLinks(value: boolean): void;

    hasChildren(): boolean;
    clearChildren(): void;
    getChildren(): boolean | undefined;
    setChildren(value: boolean): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Target.AsObject;
    static toObject(includeInstance: boolean, msg: Target): Target.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Target, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Target;
    static deserializeBinaryFromReader(message: Target, reader: jspb.BinaryReader): Target;
  }

  export namespace Target {
    export type AsObject = {
      sessionList: Array<number>,
      channelId?: number,
      group?: string,
      links?: boolean,
      children?: boolean,
    }
  }
}

export class PermissionQuery extends jspb.Message {
  hasChannelId(): boolean;
  clearChannelId(): void;
  getChannelId(): number | undefined;
  setChannelId(value: number): void;

  hasPermissions(): boolean;
  clearPermissions(): void;
  getPermissions(): number | undefined;
  setPermissions(value: number): void;

  hasFlush(): boolean;
  clearFlush(): void;
  getFlush(): boolean | undefined;
  setFlush(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PermissionQuery.AsObject;
  static toObject(includeInstance: boolean, msg: PermissionQuery): PermissionQuery.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PermissionQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PermissionQuery;
  static deserializeBinaryFromReader(message: PermissionQuery, reader: jspb.BinaryReader): PermissionQuery;
}

export namespace PermissionQuery {
  export type AsObject = {
    channelId?: number,
    permissions?: number,
    flush?: boolean,
  }
}

export class CodecVersion extends jspb.Message {
  hasAlpha(): boolean;
  clearAlpha(): void;
  getAlpha(): number | undefined;
  setAlpha(value: number): void;

  hasBeta(): boolean;
  clearBeta(): void;
  getBeta(): number | undefined;
  setBeta(value: number): void;

  hasPreferAlpha(): boolean;
  clearPreferAlpha(): void;
  getPreferAlpha(): boolean | undefined;
  setPreferAlpha(value: boolean): void;

  hasOpus(): boolean;
  clearOpus(): void;
  getOpus(): boolean | undefined;
  setOpus(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CodecVersion.AsObject;
  static toObject(includeInstance: boolean, msg: CodecVersion): CodecVersion.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CodecVersion, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CodecVersion;
  static deserializeBinaryFromReader(message: CodecVersion, reader: jspb.BinaryReader): CodecVersion;
}

export namespace CodecVersion {
  export type AsObject = {
    alpha?: number,
    beta?: number,
    preferAlpha?: boolean,
    opus?: boolean,
  }
}

export class UserStats extends jspb.Message {
  hasSession(): boolean;
  clearSession(): void;
  getSession(): number | undefined;
  setSession(value: number): void;

  hasStatsOnly(): boolean;
  clearStatsOnly(): void;
  getStatsOnly(): boolean | undefined;
  setStatsOnly(value: boolean): void;

  clearCertificatesList(): void;
  getCertificatesList(): Array<Uint8Array | string>;
  getCertificatesList_asU8(): Array<Uint8Array>;
  getCertificatesList_asB64(): Array<string>;
  setCertificatesList(value: Array<Uint8Array | string>): void;
  addCertificates(value: Uint8Array | string, index?: number): Uint8Array | string;

  hasFromClient(): boolean;
  clearFromClient(): void;
  getFromClient(): UserStats.Stats | undefined;
  setFromClient(value?: UserStats.Stats): void;

  hasFromServer(): boolean;
  clearFromServer(): void;
  getFromServer(): UserStats.Stats | undefined;
  setFromServer(value?: UserStats.Stats): void;

  hasUdpPackets(): boolean;
  clearUdpPackets(): void;
  getUdpPackets(): number | undefined;
  setUdpPackets(value: number): void;

  hasTcpPackets(): boolean;
  clearTcpPackets(): void;
  getTcpPackets(): number | undefined;
  setTcpPackets(value: number): void;

  hasUdpPingAvg(): boolean;
  clearUdpPingAvg(): void;
  getUdpPingAvg(): number | undefined;
  setUdpPingAvg(value: number): void;

  hasUdpPingVar(): boolean;
  clearUdpPingVar(): void;
  getUdpPingVar(): number | undefined;
  setUdpPingVar(value: number): void;

  hasTcpPingAvg(): boolean;
  clearTcpPingAvg(): void;
  getTcpPingAvg(): number | undefined;
  setTcpPingAvg(value: number): void;

  hasTcpPingVar(): boolean;
  clearTcpPingVar(): void;
  getTcpPingVar(): number | undefined;
  setTcpPingVar(value: number): void;

  hasVersion(): boolean;
  clearVersion(): void;
  getVersion(): Version | undefined;
  setVersion(value?: Version): void;

  clearCeltVersionsList(): void;
  getCeltVersionsList(): Array<number>;
  setCeltVersionsList(value: Array<number>): void;
  addCeltVersions(value: number, index?: number): number;

  hasAddress(): boolean;
  clearAddress(): void;
  getAddress(): Uint8Array | string;
  getAddress_asU8(): Uint8Array;
  getAddress_asB64(): string;
  setAddress(value: Uint8Array | string): void;

  hasBandwidth(): boolean;
  clearBandwidth(): void;
  getBandwidth(): number | undefined;
  setBandwidth(value: number): void;

  hasOnlinesecs(): boolean;
  clearOnlinesecs(): void;
  getOnlinesecs(): number | undefined;
  setOnlinesecs(value: number): void;

  hasIdlesecs(): boolean;
  clearIdlesecs(): void;
  getIdlesecs(): number | undefined;
  setIdlesecs(value: number): void;

  hasStrongCertificate(): boolean;
  clearStrongCertificate(): void;
  getStrongCertificate(): boolean | undefined;
  setStrongCertificate(value: boolean): void;

  hasOpus(): boolean;
  clearOpus(): void;
  getOpus(): boolean | undefined;
  setOpus(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserStats.AsObject;
  static toObject(includeInstance: boolean, msg: UserStats): UserStats.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserStats, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserStats;
  static deserializeBinaryFromReader(message: UserStats, reader: jspb.BinaryReader): UserStats;
}

export namespace UserStats {
  export type AsObject = {
    session?: number,
    statsOnly?: boolean,
    certificatesList: Array<Uint8Array | string>,
    fromClient?: UserStats.Stats.AsObject,
    fromServer?: UserStats.Stats.AsObject,
    udpPackets?: number,
    tcpPackets?: number,
    udpPingAvg?: number,
    udpPingVar?: number,
    tcpPingAvg?: number,
    tcpPingVar?: number,
    version?: Version.AsObject,
    celtVersionsList: Array<number>,
    address: Uint8Array | string,
    bandwidth?: number,
    onlinesecs?: number,
    idlesecs?: number,
    strongCertificate?: boolean,
    opus?: boolean,
  }

  export class Stats extends jspb.Message {
    hasGood(): boolean;
    clearGood(): void;
    getGood(): number | undefined;
    setGood(value: number): void;

    hasLate(): boolean;
    clearLate(): void;
    getLate(): number | undefined;
    setLate(value: number): void;

    hasLost(): boolean;
    clearLost(): void;
    getLost(): number | undefined;
    setLost(value: number): void;

    hasResync(): boolean;
    clearResync(): void;
    getResync(): number | undefined;
    setResync(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Stats.AsObject;
    static toObject(includeInstance: boolean, msg: Stats): Stats.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Stats, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Stats;
    static deserializeBinaryFromReader(message: Stats, reader: jspb.BinaryReader): Stats;
  }

  export namespace Stats {
    export type AsObject = {
      good?: number,
      late?: number,
      lost?: number,
      resync?: number,
    }
  }
}

export class RequestBlob extends jspb.Message {
  clearSessionTextureList(): void;
  getSessionTextureList(): Array<number>;
  setSessionTextureList(value: Array<number>): void;
  addSessionTexture(value: number, index?: number): number;

  clearSessionCommentList(): void;
  getSessionCommentList(): Array<number>;
  setSessionCommentList(value: Array<number>): void;
  addSessionComment(value: number, index?: number): number;

  clearChannelDescriptionList(): void;
  getChannelDescriptionList(): Array<number>;
  setChannelDescriptionList(value: Array<number>): void;
  addChannelDescription(value: number, index?: number): number;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RequestBlob.AsObject;
  static toObject(includeInstance: boolean, msg: RequestBlob): RequestBlob.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RequestBlob, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RequestBlob;
  static deserializeBinaryFromReader(message: RequestBlob, reader: jspb.BinaryReader): RequestBlob;
}

export namespace RequestBlob {
  export type AsObject = {
    sessionTextureList: Array<number>,
    sessionCommentList: Array<number>,
    channelDescriptionList: Array<number>,
  }
}

export class ServerConfig extends jspb.Message {
  hasMaxBandwidth(): boolean;
  clearMaxBandwidth(): void;
  getMaxBandwidth(): number | undefined;
  setMaxBandwidth(value: number): void;

  hasWelcomeText(): boolean;
  clearWelcomeText(): void;
  getWelcomeText(): string | undefined;
  setWelcomeText(value: string): void;

  hasAllowHtml(): boolean;
  clearAllowHtml(): void;
  getAllowHtml(): boolean | undefined;
  setAllowHtml(value: boolean): void;

  hasMessageLength(): boolean;
  clearMessageLength(): void;
  getMessageLength(): number | undefined;
  setMessageLength(value: number): void;

  hasImageMessageLength(): boolean;
  clearImageMessageLength(): void;
  getImageMessageLength(): number | undefined;
  setImageMessageLength(value: number): void;

  hasMaxUsers(): boolean;
  clearMaxUsers(): void;
  getMaxUsers(): number | undefined;
  setMaxUsers(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ServerConfig.AsObject;
  static toObject(includeInstance: boolean, msg: ServerConfig): ServerConfig.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ServerConfig, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ServerConfig;
  static deserializeBinaryFromReader(message: ServerConfig, reader: jspb.BinaryReader): ServerConfig;
}

export namespace ServerConfig {
  export type AsObject = {
    maxBandwidth?: number,
    welcomeText?: string,
    allowHtml?: boolean,
    messageLength?: number,
    imageMessageLength?: number,
    maxUsers?: number,
  }
}

export class SuggestConfig extends jspb.Message {
  hasVersion(): boolean;
  clearVersion(): void;
  getVersion(): number | undefined;
  setVersion(value: number): void;

  hasPositional(): boolean;
  clearPositional(): void;
  getPositional(): boolean | undefined;
  setPositional(value: boolean): void;

  hasPushToTalk(): boolean;
  clearPushToTalk(): void;
  getPushToTalk(): boolean | undefined;
  setPushToTalk(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SuggestConfig.AsObject;
  static toObject(includeInstance: boolean, msg: SuggestConfig): SuggestConfig.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SuggestConfig, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SuggestConfig;
  static deserializeBinaryFromReader(message: SuggestConfig, reader: jspb.BinaryReader): SuggestConfig;
}

export namespace SuggestConfig {
  export type AsObject = {
    version?: number,
    positional?: boolean,
    pushToTalk?: boolean,
  }
}

