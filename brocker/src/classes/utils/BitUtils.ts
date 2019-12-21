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