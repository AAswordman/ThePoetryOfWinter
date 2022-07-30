import GlobalScoreBoardCache from "../../modules/exmc/storage/cache/GlobalScoreBoardCache.js";
export default class GlobalSettings extends GlobalScoreBoardCache {
    get playerCanTp() {
        return this.getBoolean("playerCanTp");
    }
    set playerCanTp(value) {
        this.setBoolean("playerCanTp", value);
    }
    get tpNeedItem() {
        return this.getBoolean("tpNeedItem");
    }
    set tpNeedItem(value) {
        this.setBoolean("tpNeedItem", value);
    }
    get gameOpList() {
        return this.getList("gameOpList");
    }
    set gameOpList(value) {
        this.setList("gameOpList", value);
    }
}
//# sourceMappingURL=GlobalSettings.js.map