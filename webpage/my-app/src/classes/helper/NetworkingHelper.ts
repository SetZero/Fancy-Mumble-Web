    export function to16Bit(num: number) {
        let arr = new Uint8Array(2);
        arr[0] = (num >> 8) & 0xFF;
        arr[1] = num & 0xFF;

        return arr;
    }

    export function from16Bit(num: ArrayBuffer) {
        const numArray = new Uint8Array(num);

        return (numArray[0] << 8) | numArray[1];
    }

    export function from32Bit(num: ArrayBuffer) {
        const numArray = new Uint8Array(num);

        return (numArray[0] << 24) |
        (numArray[1] << 16) |
        (numArray[2] << 8) |
         numArray[3];
    }

    export function to32Bit(num: number) {
        let arr = new Uint8Array(4);

        arr[0] = (num >> 24) & 0xFF;
        arr[1] = (num >> 16) & 0xFF;
        arr[2] = (num >> 8) & 0xFF;
        arr[3] = num & 0xFF;

        return arr;
    }