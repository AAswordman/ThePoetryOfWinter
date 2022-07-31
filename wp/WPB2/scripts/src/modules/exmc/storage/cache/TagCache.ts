import ExTagManager from '../../interface/ExTagManager.js';
export default class TagCache<T>{
    manager: ExTagManager;
    cache!: T;
    tagFrom!: string;
    constructor(manager: ExTagManager) {
        this.manager = manager;

    }
    load() {
        for (const tag of this.manager.getTags()) {
            if (tag.startsWith("__cache:")) {
                this.tagFrom = tag;
                return <T>(this.cache = JSON.parse(tag.substring("__cache:".length)));
            }
        }
        return undefined;
    }
    get(def:T) {
        if (this.cache) {
            return this.cache;
        } else {
            let res = this.load();
            if (!res) {
                this.cache = def;
                this.tagFrom = "__cache:" + JSON.stringify(this.cache);
                this.manager.addTag(this.tagFrom);
                return def;
            } else { return res; }
        }
    }
    save() {
        this.manager.removeTag(this.tagFrom);
        this.tagFrom = "__cache:" + JSON.stringify(this.cache);
        this.manager.addTag(this.tagFrom);
    }
}