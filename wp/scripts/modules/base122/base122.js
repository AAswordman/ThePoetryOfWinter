// Provides functions for encoding/decoding data to and from base-122.
const kString = 0, kUint8Array = 1, kDefaultMimeType = "image/jpeg", kDebug = false, kIllegals = [
    0 // null
    ,
    10 // newline
    ,
    13 // carriage return
    ,
    34 // double quote
    ,
    38 // ampersand
    ,
    92 // backslash
], kShortened = 0b111 // Uses the illegal index to signify the last two-byte char encodes <= 7 bits.
;
/**
 * Encodes raw data into base-122.
 * @param {Uint8Array|Buffer|Array|String} rawData - The data to be encoded. This can be an array
 * or Buffer with raw data bytes or a string of bytes (i.e. the type of argument to btoa())
 * @returns {Array} The base-122 encoded data as a regular array of UTF-8 character byte values.
 */
function encode(rawData) {
    let dataType = typeof (rawData) == 'string' ? kString : kUint8Array, curIndex = 0, curBit = 0 // Points to current bit needed
    , curMask = 0b10000000, outData = [], getByte = dataType == kString ? (i) => rawData.codePointAt(i) : (i) => rawData[i];
    // Get seven bits of input data. Returns false if there is no input left.
    function get7() {
        if (curIndex >= rawData.length)
            return false;
        // Shift, mask, unshift to get first part.
        let firstByte = getByte(curIndex);
        let firstPart = ((0b11111110 >>> curBit) & firstByte) << curBit;
        // Align it to a seven bit chunk.
        firstPart >>= 1;
        // Check if we need to go to the next byte for more bits.
        curBit += 7;
        if (curBit < 8)
            return firstPart; // Do not need next byte.
        curBit -= 8;
        curIndex++;
        // Now we want bits [0..curBit] of the next byte if it exists.
        if (curIndex >= rawData.length)
            return firstPart;
        let secondByte = getByte(curIndex);
        let secondPart = ((0xFF00 >>> curBit) & secondByte) & 0xFF;
        // Align it.
        secondPart >>= 8 - curBit;
        return firstPart | secondPart;
    }
    while (true) {
        // Grab 7 bits.
        let bits = get7();
        if (bits === false)
            break;
        let illegalIndex = kIllegals.indexOf(bits);
        if (illegalIndex != -1) {
            // Since this will be a two-byte character, get the next chunk of seven bits.
            let nextBits = get7();
            let b1 = 0b11000010, b2 = 0b10000000;
            if (nextBits === false) {
                b1 |= (0b111 & kShortened) << 2;
                nextBits = bits; // Encode these bits after the shortened signifier.
            }
            else {
                b1 |= (0b111 & illegalIndex) << 2;
            }
            // Push first bit onto first byte, remaining 6 onto second.
            let firstBit = (nextBits & 0b01000000) > 0 ? 1 : 0;
            b1 |= firstBit;
            b2 |= nextBits & 0b00111111;
            outData.push(b1);
            outData.push(b2);
        }
        else {
            outData.push(bits);
        }
    }
    return outData;
}
/**
 * Re-encodes a base-64 encoded string into base-122.
 * @param {String} base64String - A base-64 encoded string.
 * @returns {Array} - The base-122 encoded data.
 */
function encodeFromBase64(base64String) {
    // "binary" encoding encodes each byte in a separate character.
    let strData = Buffer.from(base64String, 'base64').toString('binary');
    return encode(strData);
}
/**
 * Decodes base-122 encoded data back to the original data.
 * @param {Uint8Array|Buffer|String} rawData - The data to be decoded. This can be a Uint8Array
 * or Buffer with raw data bytes or a string of bytes (i.e. the type of argument to btoa())
 * @returns {Array} The data in a regular array representing byte values.
 */
function decode(base122Data) {
    let strData = typeof (base122Data) == 'string' ? base122Data : utf8DataToString(base122Data), decoded = [], decodedIndex = 0, curByte = 0, bitOfByte = 0;
    function push7(byte) {
        byte <<= 1;
        // Align this byte to offset for current byte.
        curByte |= (byte >>> bitOfByte);
        bitOfByte += 7;
        if (bitOfByte >= 8) {
            decoded.push(curByte);
            bitOfByte -= 8;
            // Now, take the remainder, left shift by what has been taken.
            curByte = (byte << (7 - bitOfByte)) & 255;
        }
    }
    for (let i = 0; i < strData.length; i++) {
        let c = strData.charCodeAt(i);
        // Check if this is a two-byte character.
        if (c > 127) {
            // Note, the charCodeAt will give the codePoint, thus
            // 0b110xxxxx 0b10yyyyyy will give => xxxxxyyyyyy
            let illegalIndex = (c >>> 8) & 7; // 7 = 0b111.
            // We have to first check if this is a shortened two-byte character, i.e. if it only
            // encodes <= 7 bits.
            if (illegalIndex != kShortened)
                push7(kIllegals[illegalIndex]);
            // Always push the rest.
            push7(c & 127);
        }
        else {
            // One byte characters can be pushed directly.
            push7(c);
        }
    }
    return decoded;
}
/**
 * Converts a sequence of UTF-8 bytes to a string.
 * @param {Uint8Array|Buffer} data - The UTF-8 data.
 * @returns {String} A string with each character representing a code point.
 */
function utf8DataToString(data) {
    return Buffer.from(data).toString('utf-8');
}
// For debugging.
function debugLog() {
    if (kDebug)
        console.log(...arguments);
}
// For debugging.
function print7Bits(num) {
    return "0000000".substring(num.toString(2).length) + num.toString(2);
}
// For debugging.
function print8Bits(num) {
    return "00000000".substring(num.toString(2).length) + num.toString(2);
}
export default {
    encode: encode,
    decode: decode,
    encodeFromBase64: encodeFromBase64,
    utf8DataToString: utf8DataToString
};
//# sourceMappingURL=base122.js.map