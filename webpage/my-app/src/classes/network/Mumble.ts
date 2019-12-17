import { load } from "protobufjs";
import { WebSocketClient } from "../WebSocketClient";
import { NetworkMessage } from "./NetworkMessages";

export class Mumble {
    private client: WebSocketClient;
    constructor(location: string) {
        this.client = new WebSocketClient(location);

        load(require("./../../protos/Mumble.proto"))
        .then((root) => {
            let myMessage = root.lookupType("MumbleProto.Version");
            let payload = {
                version: (1 << 6) | (3 << 8),
                release: "1.3.0",
                os: "WinDos",
                osVersion: "11"
            };

            let errMsg = myMessage.verify(payload);
            if (errMsg)
             throw Error(errMsg);

            var message = myMessage.create(payload);
            var buffer = myMessage.encode(message).finish();
            let versionMsgType = NetworkMessage.Version.valueOf();
            let length = buffer.length;
            console.log(buffer);
            //TODO: build message
            let msg = new Uint8Array(2 + 4 + length);
            //msg.set(this.to16Bit(versionMsgType), 0)
        })
        .catch((error) => {
            console.log("ERROR!");
            throw error;
        });
    }

    private to16Bit(num: number) {
        let arr = new ArrayBuffer(2); // an Uint16 takes 4 bytes
        let view = new DataView(arr);
        view.setUint16(0, num, false);
        return arr;
    }

    private to32Bit(num: number) {
        let arr = new ArrayBuffer(4); // an Int32 takes 4 bytes
        let view = new DataView(arr);
        view.setUint32(0, num, false); // byteOffset = 0; litteEndian = false
        return arr;
    }

    sendMessage(value: string) {
        throw new Error("Method not implemented.");
    }
}