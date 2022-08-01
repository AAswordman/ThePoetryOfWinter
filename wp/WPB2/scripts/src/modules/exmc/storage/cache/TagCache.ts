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
            } else {
                this.cache = this.recovery(def,res);
                return this.cache;
            }
        }
        
    }
    save() {
        this.manager.removeTag(this.tagFrom);
        this.tagFrom = "__cache:" + JSON.stringify(this.cache);
        this.manager.addTag(this.tagFrom);
    }
    recovery(def: any, res: any) {
        for(let i in res){
            if(def[i] === undefined) {
                def[i] = res[i];
                if(typeof(res[i])==="object" && typeof(def[i])==="object"){
                    this.recovery(def[i], res[i]);
                }
            }
        }
        return def;
    }
}
