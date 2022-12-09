import GlobalScoreBoardCache from "../../../modules/exmc/server/storage/cache/GlobalScoreBoardCache.js";
import Random from "../../../modules/exmc/utils/Random.js";

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
    public get entityCleaner() {
        return this.getBoolean("entityCleaner");
    }
    public set entityCleaner(value: boolean) {
        this.setBoolean("entityCleaner", value);
    }
    public get deathRecord() {
        return this.getBoolean("deathRecord");
    }
    public set deathRecord(value: boolean) {
        this.setBoolean("deathRecord", value);
    }
    public get tpPointRecord() {
        return this.getBoolean("tpPointRecord");
    }
    public set tpPointRecord(value: boolean) {
        this.setBoolean("tpPointRecord", value);
    }
    public get ownerExists() {
        return this.getBoolean("ownerExists");
    }
    public set ownerExists(value: boolean) {
        this.setBoolean("ownerExists", value);
    }
    public get entityCleanerLeastNum() {
        return this.getNumber("entityCleanerLeastNum") || 200;
    }
    public set entityCleanerLeastNum(value: number) {
        this.setNumber("entityCleanerLeastNum", value);
    }

    public get entityCleanerStrength() {
        return this.getNumber("entityCleanerStrength") || 5;
    }
    public set entityCleanerStrength(value: number) {
        this.setNumber("entityCleanerStrength", value);
    }
    public get entityCleanerDelay() {
        return this.getNumber("entityCleanerDelay") || 30;
    }
    public set entityCleanerDelay(value: number) {
        this.setNumber("entityCleanerDelay", value);
    }
    public get worldSeed() {
        return this.getNumber("worldSeed") || (this.worldSeed = Math.floor(Math.random() * Random.MAX_VALUE));
    }
    public set worldSeed(value: number) {
        this.setNumber("worldSeed", value);
    }
    public get ruinsExsitsData() {
        return this.getNumber("ruinsExsitsData") || 0;
    }
    public set ruinsExsitsData(value: number) {
        this.setNumber("ruinsExsitsData", value);
    }

}