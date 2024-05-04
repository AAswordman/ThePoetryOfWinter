import { Serialize } from '../../../utils/Serialize.js';
import GZIPUtil from '../../../utils/GZIPUtil.js';
import ExSystem from '../../../utils/ExSystem.js';
export default class ExPropCache {
    constructor(e) {
        this.keyInterval = "-|-";
        this.keyCache = "";
        this.compareObject = {};
        this.manager = e;
    }
    get(def = {}) {
        if (this.cache) {
            return this.cache;
        }
        else {
            let res = this._getCache(def);
            this.cache = res;
            return res;
        }
    }
    save() {
        this._setCache(this.cache);
    }
    _getCache(def) {
        var _a, _b;
        let old = this.manager.getDynamicProperty("__cache0:");
        if (old) {
            try {
                //transform save
                this.manager.setDynamicProperty("__cache0:", undefined);
                let obj = Serialize.from(GZIPUtil.unzipString(old));
                this.compareObject = ExSystem.deepClone(obj);
                this.keyCache = Object.keys(obj).join(this.keyInterval);
                this.manager.setDynamicProperty("__cache0:keys", this.keyCache);
                return obj;
            }
            catch (e) {
                console.warn("Unable to unzip cache");
                //use def
            }
        }
        let keys = (this.keyCache = ((_a = this.manager.getDynamicProperty("__cache0:keys")) !== null && _a !== void 0 ? _a : "")).split(this.keyInterval);
        if (keys.length === 0) {
            this.compareObject = ExSystem.deepClone(def);
            this.keyCache = Object.keys(def).join(this.keyInterval);
            this.manager.setDynamicProperty("__cache0:keys", this.keyCache);
            return def;
        }
        const obj = {};
        for (let key of keys) {
            let tag = ((_b = this.manager.getDynamicProperty("__cache0:" + key)) !== null && _b !== void 0 ? _b : "");
            if (tag !== undefined && tag !== "") {
                if ((typeof tag === "number") || (typeof tag === "boolean")) {
                    obj[key] = tag;
                }
                else {
                    try {
                        tag = GZIPUtil.unzipString(tag);
                    }
                    catch (e) {
                        console.warn("Unable to unzip cache");
                        continue;
                    }
                    let msg = Serialize.from(tag, undefined);
                    if (msg) {
                        obj[key] = msg;
                    }
                }
            }
        }
        this.compareObject = ExSystem.deepClone(obj);
        this.keyCache = Object.keys(obj).join(this.keyInterval);
        return obj;
    }
    _setCache(obj) {
        for (let key in obj) {
            if (!(key in this.compareObject) || !ExSystem.deepEqual(obj[key], this.compareObject[key])) {
                this._setCacheByKey(key, obj[key]);
                this.compareObject[key] = ExSystem.deepClone(obj[key]);
            }
        }
        let keys = Object.keys(obj).join(this.keyInterval);
        if (this.keyCache !== keys) {
            this.keyCache = keys;
            this.manager.setDynamicProperty("__cache0:keys", this.keyCache);
        }
    }
    _setCacheByKey(key, obj) {
        if ((typeof obj === "number") || (typeof obj === "boolean")) {
            this.manager.setDynamicProperty("__cache0:" + key, obj);
        }
        let nfrom = Serialize.to(obj);
        let m = GZIPUtil.zipString(nfrom);
        this.manager.setDynamicProperty("__cache0:" + key, m);
    }
}
//# sourceMappingURL=ExPropCache.js.map