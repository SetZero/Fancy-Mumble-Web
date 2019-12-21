"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function from16Bit(num) {
    const numArray = new Uint8Array(num);
    return (numArray[0] << 8) | numArray[1];
}
exports.from16Bit = from16Bit;
function from32Bit(num) {
    const numArray = new Uint8Array(num);
    return (numArray[0] << 24) |
        (numArray[1] << 16) |
        (numArray[2] << 8) |
        numArray[3];
}
exports.from32Bit = from32Bit;
//# sourceMappingURL=BitUtils.js.map