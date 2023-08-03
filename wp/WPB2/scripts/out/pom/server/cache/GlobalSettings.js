import GlobalScoreBoardCache from "../../../modules/exmc/server/storage/cache/GlobalScoreBoardCache.js";
import Random from "../../../modules/exmc/utils/Random.js";
export default class GlobalSettings extends GlobalScoreBoardCache {
    get uiUpdateDelay() {
        return this.getNumber("uiUpdateDelay") || 10;
    }
    set uiUpdateDelay(value) {
        this.setNumber("uiUpdateDelay", value);
    }
    get gameDifficulty() {
        return this.getNumber("gameDifficulty") || 3;
    }
    set gameDifficulty(value) {
        this.setNumber("gameDifficulty", value);
    }
    get playerTpListShowPos() {
        return this.getBoolean("playerTpListShowPos");
    }
    set playerTpListShowPos(value) {
        this.setBoolean("playerTpListShowPos", value);
    }
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
    get damageShow() {
        return this.getBoolean("damageShow");
    }
    set damageShow(value) {
        this.setBoolean("damageShow", value);
    }
    get chainMining() {
        return this.getBoolean("chainMining");
    }
    set chainMining(value) {
        this.setBoolean("chainMining", value);
    }
    get initialMagicPickaxe() {
        return this.getBoolean("initialMagicPickaxe");
    }
    set initialMagicPickaxe(value) {
        this.setBoolean("initialMagicPickaxe", value);
    }
    get ownerExists() {
        return this.getBoolean("ownerExists");
    }
    set ownerExists(value) {
        this.setBoolean("ownerExists", value);
    }
    get entityCleanerLeastNum() {
        var _a;
        return (_a = this.getNumber("entityCleanerLeastNum")) !== null && _a !== void 0 ? _a : 200;
    }
    set entityCleanerLeastNum(value) {
        this.setNumber("entityCleanerLeastNum", value);
    }
    get entityCleanerStrength() {
        var _a;
        return (_a = this.getNumber("entityCleanerStrength")) !== null && _a !== void 0 ? _a : 5;
    }
    set entityCleanerStrength(value) {
        this.setNumber("entityCleanerStrength", value);
    }
    get entityCleanerDelay() {
        var _a;
        return (_a = this.getNumber("entityCleanerDelay")) !== null && _a !== void 0 ? _a : 30;
    }
    set entityCleanerDelay(value) {
        this.setNumber("entityCleanerDelay", value);
    }
    get worldSeed() {
        return Math.abs(this.getNumber("worldSeed") || (this.worldSeed = Math.floor(Math.random() * Random.MAX_VALUE)));
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