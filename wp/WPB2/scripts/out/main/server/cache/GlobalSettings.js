import GlobalScoreBoardCache from "../../../modules/exmc/server/storage/cache/GlobalScoreBoardCache.js";
import Random from "../../../modules/exmc/utils/Random.js";
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
    get ownerExists() {
        return this.getBoolean("ownerExists");
    }
    set ownerExists(value) {
        this.setBoolean("ownerExists", value);
    }
    get entityCleanerLeastNum() {
        return this.getNumber("entityCleanerLeastNum") || 200;
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
    get worldSeed() {
        return this.getNumber("worldSeed") || (this.worldSeed = Math.random() * Random.MAX_VALUE);
    }
    set worldSeed(value) {
        this.setNumber("worldSeed", value);
    }
    get ruinsExsitsData() {
        return this.getNumber("ruinsExsitsData") || 0;
    }
    set ruinsExsitsData(value) {
        this.setNumber("ruinsExsitsData", value);
    }
}
//# sourceMappingURL=GlobalSettings.js.map