import { Serialize } from '../../../utils/Serialize.js';
import GZIPUtil from '../../../utils/GZIPUtil.js';
export default class ExEntityCacheKeeper {
    constructor(entity) {
        this.entity = entity;
    }
    load() {
        let tag = this._getStringCache();
        if (tag !== undefined && tag !== "") {
            try {
                tag = GZIPUtil.unzipString(tag);
            }
            catch (e) {
                console.warn("Unable to unzip cache as " + this.entity.typeId);
                return undefined;
            }
            this.tagFrom = tag;
            return tag;
        }
        return undefined;
    }
    get(def) {
        if (this.cache) {
            return this.cache;
        }
        else {
            let res = this.load();
            if (!res) {
                this.cache = def;
                this.save();
                return def;
            }
            else {
                this.cache = Serialize.from(res, def);
                return this.cache;
            }
        }
    }
    save() {
        let nfrom = Serialize.to(this.cache);
        if (nfrom !== this.tagFrom) {
            let m = GZIPUtil.zipString(nfrom);
            this._setStringCache(m);
            // ExGameConfig.console.info("setDynamicProperty len "+m.length);
            // ExGameConfig.console.info("setDynamicO len "+nfrom.length);
            this.tagFrom = nfrom;
        }
    }
    _getStringCache() {
        var _a;
        return ((_a = this.entity.getDynamicProperty("__cache0:")) !== null && _a !== void 0 ? _a : "");
        //  + (this.entity.getDynamicProperty("__cache1:") as string ?? "")
        //     + (this.entity.getDynamicProperty("__cache2:") as string ?? "") + (this.entity.getDynamicProperty("__cache3:") as string ?? "");
    }
    _setStringCache(str) {
        // for (let i = 0; i < 1; i++) {
        //     let start = i * cutLength, end = (i + 1) * cutLength;
        //     let is = str.substring(Math.min(start, str.length), Math.min(end, str.length));
        //     this.entity.setDynamicProperty("__cache" + i + ":", is);
        // }
        this.entity.setDynamicProperty("__cache0:", str);
    }
}
//# sourceMappingURL=ExEntityCacheKeeper.js.map