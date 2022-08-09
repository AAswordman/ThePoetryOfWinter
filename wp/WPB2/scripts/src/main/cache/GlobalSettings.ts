import GlobalScoreBoardCache from "../../modules/exmc/storage/cache/GlobalScoreBoardCache.js";

export default class GlobalSettings extends GlobalScoreBoardCache {
    public get playerCanTp(): boolean {
        return this.getBoolean("playerCanTp");
    }
    public set playerCanTp(value: boolean) {
        this.setBoolean("playerCanTp", value);
    }
    public get tpNeedItem() {
        return this.getBoolean("tpNeedItem");
    }
    public set tpNeedItem(value: boolean) {
        this.setBoolean("tpNeedItem", value);
    }

    public get gameOpList() {
        return this.getList("gameOpList");
    }
    public set gameOpList(value: number[]) {
        this.setList("gameOpList", value);
    }
    public get entityCleaner() {
        return this.getBoolean("entityCleaner");
    }
    public set entityCleaner(value: boolean) {
        this.setBoolean("entityCleaner", value);
    }
}