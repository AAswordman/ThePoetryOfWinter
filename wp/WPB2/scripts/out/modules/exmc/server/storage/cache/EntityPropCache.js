import { DynamicPropertiesDefinition, MinecraftEntityTypes, world } from '@minecraft/server';
import { Serialize } from '../../../utils/Serialize.js';
import GZIPUtil from '../../../utils/GZIPUtil.js';
const cutLength = 980;
world.afterEvents.worldInitialize.subscribe((e) => {
    let def = new DynamicPropertiesDefinition().defineString("__cache0:", 980)
        .defineString("__cache1:", cutLength)
        .defineString("__cache2:", cutLength)
        .defineString("__cache3:", cutLength);
    e.propertyRegistry.registerEntityTypeDynamicProperties(def, MinecraftEntityTypes.player);
});
export default class EntityPropCache {
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
                this.tagFrom = JSON.stringify(this.cache);
                this._setStringCache(this.tagFrom);
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
        var _a, _b, _c, _d;
        return ((_a = this.entity.getDynamicProperty("__cache0:")) !== null && _a !== void 0 ? _a : "") + ((_b = this.entity.getDynamicProperty("__cache1:")) !== null && _b !== void 0 ? _b : "")
            + ((_c = this.entity.getDynamicProperty("__cache2:")) !== null && _c !== void 0 ? _c : "") + ((_d = this.entity.getDynamicProperty("__cache3:")) !== null && _d !== void 0 ? _d : "");
    }
    _setStringCache(str) {
        for (let i = 0; i < 4; i++) {
            let start = i * cutLength, end = (i + 1) * cutLength;
            let is = str.substring(Math.min(start, str.length), Math.min(end, str.length));
            this.entity.setDynamicProperty("__cache" + i + ":", is);
        }
    }
}
//# sourceMappingURL=EntityPropCache.js.map