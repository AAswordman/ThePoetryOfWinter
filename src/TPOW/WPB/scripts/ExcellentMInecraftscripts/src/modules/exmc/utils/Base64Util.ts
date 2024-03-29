export default class Base64Util {
    public static arrayBufferToBase64(array: Iterable<number>) {
        const uintArray = new Uint8Array(array);
        const length = uintArray.byteLength;
        const table = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        let base64Str = '';
        let i = 0;
        while (i < length) {
            const num1 = uintArray[i++];
            const num2 = uintArray[i++];
            const num3 = uintArray[i++];
            base64Str += table.charAt(num1 >> 2)
                + table.charAt(((num1 & 0b11) << 4) | (num2 >> 4))
                + (isNaN(num2) ? '=' : table.charAt(((num2 & 0b1111) << 2) | (num3 >> 6)))
                + (isNaN(num3) ? '=' : table.charAt(num3 & 0b111111));
        }
        return base64Str;
    }
    public static base64ToArrayBuffer(str: string): ArrayBuffer {
        var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

        var c1, c2, c3, c4;
        var i, len, out;
        len = str.length;
        i = 0;
        out = [];
        while (i < len) {
            do {
                c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
            } while (i < len && c1 == -1);
            if (c1 == -1) break;
            do {
                c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
            } while (i < len && c2 == -1);
            if (c2 == -1) break;
            out.push((c1 << 2) | ((c2 & 0x30) >> 4));
            do {
                c3 = str.charCodeAt(i++) & 0xff;
                if (c3 == 61) return new Uint8Array(out);
                c3 = base64DecodeChars[c3];
            } while (i < len && c3 == -1);
            if (c3 == -1) break;
            out.push(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
            do {
                c4 = str.charCodeAt(i++) & 0xff;
                if (c4 == 61) return new Uint8Array(out);
                c4 = base64DecodeChars[c4];
            } while (i < len && c4 == -1);
            if (c4 == -1) break;
            out.push(((c3 & 0x03) << 6) | c4);
        }
        return new Uint8Array(out);
    }

}


// const buffer = new Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]);
// const base64 = Base64Util.arrayBufferToBase64(buffer);
// console.log(base64);

// console.log(Base64Util.base64ToArrayBuffer(base64));