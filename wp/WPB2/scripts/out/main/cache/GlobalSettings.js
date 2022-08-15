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
    get entityCleaner() {
        return this.getBoolean("entityCleaner");
    }
    set entityCleaner(value) {
        this.setBoolean("entityCleaner", value);
    }
    get deathRecord() {
        return this.getBoolean("deathRecord");
    }
    set deathRecord(value) {
        this.setBoolean("deathRecord", value);
    }
    get tpPointRecord() {
        return this.getBoolean("tpPointRecord");
    }
    set tpPointRecord(value) {
        this.setBoolean("tpPointRecord", value);
    }
    get entityCleanerLeastNum() {
        return this.getNumber("entityCleanerLeastNum") || 350;
    }
    set entityCleanerLeastNum(value) {
        this.setNumber("entityCleanerLeastNum", value);
    }
    get entityCleanerStrength() {
        return this.getNumber("entityCleanerStrength") || 5;
    }
    set entityCleanerStrength(value) {
        this.setNumber("entityCleanerStrength", value);
    }
    get entityCleanerDelay() {
        return this.getNumber("entityCleanerDelay") || 30;
    }
    set entityCleanerDelay(value) {
        this.setNumber("entityCleanerDelay", value);
    }
}
//# sourceMappingURL=GlobalSettings.js.map