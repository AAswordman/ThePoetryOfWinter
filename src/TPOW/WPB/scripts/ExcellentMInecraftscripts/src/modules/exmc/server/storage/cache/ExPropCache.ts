import { Serialize } from '../../../utils/Serialize.js';
import GZIPUtil from '../../../utils/GZIPUtil.js';
import ExSystem from '../../../utils/ExSystem.js';
import DynamicPropertyManager from '../../../interface/DynamicPropertyManager.js';



export default class ExPropCache<T extends object> {
    cache!: T;
    manager: DynamicPropertyManager;
    constructor(e: DynamicPropertyManager) {
        this.manager = e;

    }
    get(def: T = {} as T) {
        if (this.cache) {
            return this.cache;
        } else {
            let res = this._getCache(def);
            this.cache = res;
            return res;
        }
    }

    save() {
        this._setCache(this.cache);
    }

    public keyInterval = "-|-";
    public keyCache = "";
    private compareObject: T = {} as T;
    _getCache(def: T) {
        let old = (this.manager.getDynamicProperty("__cache0:") as string | undefined);
        if (old) {
            try {
                //transform save
                this.manager.setDynamicProperty("__cache0:", undefined);
                let obj = Serialize.from(GZIPUtil.unzipString(old)) as T;
                this.compareObject = ExSystem.deepClone(obj);
                this.keyCache = Object.keys(obj).join(this.keyInterval);
                this.manager.setDynamicProperty("__cache0:keys", this.keyCache);
                return obj;
            } catch (e) {
                console.warn("Unable to unzip cache");
                //use def
            }
        }
        let keys = (this.keyCache = (this.manager.getDynamicProperty("__cache0:keys") as string ?? "")).split(this.keyInterval);

        if (keys.length === 0) {
            this.compareObject = ExSystem.deepClone(def);
            this.keyCache = Object.keys(def).join(this.keyInterval);
            this.manager.setDynamicProperty("__cache0:keys", this.keyCache);
            return def;
        }
        const obj: { [x: string]: unknown } = {}
        for (let key of keys) {
            let tag = (this.manager.getDynamicProperty("__cache0:" + key) as string ?? "");
            if (tag !== undefined && tag !== "") {
                if ((typeof tag === "number") || (typeof tag === "boolean")) {
                    obj[key] = tag;
                } else {
                    try {
                        tag = GZIPUtil.unzipString(tag);
                    } catch (e) {
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
        return obj as T;
    }
    _setCache(obj: any) {
        for (let key in obj) {
            if (!(key in this.compareObject) || !ExSystem.deepEqual(obj[key], (this.compareObject as any)[key])) {
                this._setCacheByKey(key, obj[key]);
                (this.compareObject as any)[key] = ExSystem.deepClone(obj[key]);
            }
        }
        let keys = Object.keys(obj).join(this.keyInterval);
        if (this.keyCache !== keys) {
            this.keyCache = keys;
            this.manager.setDynamicProperty("__cache0:keys", this.keyCache);
        }
    }
    _setCacheByKey(key: string, obj: any) {
        if ((typeof obj === "number") || (typeof obj === "boolean")) {
            this.manager.setDynamicProperty("__cache0:" + key, obj)
        }
        let nfrom = Serialize.to(obj);
        let m = GZIPUtil.zipString(nfrom);
        this.manager.setDynamicProperty("__cache0:" + key, m);
    }
}
