import { Serialize } from '../../utils/Serialize.js';
export default class TagCache {
    constructor(manager) {
        this.manager = manager;
    }
    load() {
        for (const tag of this.manager.getTags()) {
            if (tag.startsWith("__cache:")) {
                this.tagFrom = tag;
                return tag.substring("__cache:".length);
            }
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
                this.tagFrom = "__cache:" + JSON.stringify(this.cache);
                this.manager.addTag(this.tagFrom);
                return def;
            }
            else {
                this.cache = Serialize.fromJSON(res, def);
                return this.cache;
            }
        }
    }
    save() {
        this.manager.removeTag(this.tagFrom);
        this.tagFrom = "__cache:" + Serialize.toJSON(this.cache);
        this.manager.addTag(this.tagFrom);
    }
}
//# sourceMappingURL=TagCache.js.map