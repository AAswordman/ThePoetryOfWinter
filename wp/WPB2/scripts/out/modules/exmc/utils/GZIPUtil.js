import pako from '../../pako/pako.js';
import Base64Util from './Base64Util.js';
export default class GZIPUtil {
    //zip string
    static zipString(str) {
        const compressed = pako.deflate(str, { to: 'string' });
        if (!compressed)
            return undefined;
        return Base64Util.arrayBufferToBase64(compressed);
    }
    //unzip string
    static unzipString(str) {
        const decompressed = pako.inflate(Base64Util.base64ToArrayBuffer(str), { to: 'string' });
        return decompressed;
    }
}
//# sourceMappingURL=GZIPUtil.js.map