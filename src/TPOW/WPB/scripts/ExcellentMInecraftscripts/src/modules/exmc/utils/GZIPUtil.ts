import pako from '../../pako/pako.js';
import Base64Util from './Base64Util.js';
export default class GZIPUtil {
    //zip string
    public static zipString(str: string) {
        const compressed = pako.deflate(str, { to: 'string' });
        return Base64Util.arrayBufferToBase64(compressed);
    }
    //unzip string
    public static unzipString(str: string) :string{
        const decompressed = pako.inflate(Base64Util.base64ToArrayBuffer(str), { to: 'string' });
        return decompressed;
    }
}