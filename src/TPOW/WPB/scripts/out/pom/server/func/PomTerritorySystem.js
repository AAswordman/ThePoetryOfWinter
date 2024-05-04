import Vector3 from "../../../modules/exmc/math/Vector3.js";
import ExSystem from "../../../modules/exmc/utils/ExSystem.js";
import VarOnChangeListener from "../../../modules/exmc/utils/VarOnChangeListener.js";
import { MinecraftDimensionTypes } from "../../../modules/vanilla-data/lib/index.js";
import BlockPartitioning from "../map/BlockPartitioning.js";
import GameController from "./GameController.js";
export default class PomTerritorySystem extends GameController {
    constructor() {
        super(...arguments);
        this.inTerritotyLevel = -1; //-1/0/1/2;
        this.territoryTip = new VarOnChangeListener((b, a) => {
            if (b === "") {
                this.sayTo("§b你离开了 " + a.split("|")[0] + " §b的领地");
            }
            else {
                this.sayTo("§b你进入了 " + b.split("|")[0] + " §b的" + (parseInt(b.split("|")[1]) === 1 ? "§a" : "§c") + "领地");
            }
        }, "");
    }
    onJoin() {
        this.territoryData = new BlockPartitioning(this.globalData.territoryData);
        this.looper = ExSystem.tickTask(() => {
            this.getLocationLevel();
            this.data.territory.data.forEach(e => e.coolingTime = Math.max(0, e.coolingTime - 4));
        }).delay(4 * 20);
        this.looper.start();
    }
    getLocationLevel() {
        var _a;
        let inTerArea = undefined;
        if (this.getDimension().id === MinecraftDimensionTypes.Overworld) {
            inTerArea = (_a = this.territoryData) === null || _a === void 0 ? void 0 : _a.getAreaIn(this.exPlayer.position);
        }
        this.inTerritotyLevel = this.getLocationLevelToPlayer(inTerArea);
        this.territoryTip.upDate(inTerArea ? (inTerArea[1].ownerName + "|" + String(this.inTerritotyLevel === 2 ? 1 : 0)) : "");
    }
    getLocationLevelToPlayer(loc) {
        var _a;
        let inTerArea = undefined;
        if (loc instanceof Vector3) {
            if (this.getDimension().id === MinecraftDimensionTypes.Overworld) {
                inTerArea = (_a = this.territoryData) === null || _a === void 0 ? void 0 : _a.getAreaIn(loc);
            }
        }
        else {
            inTerArea = loc;
        }
        let inTerritotyLevel = -1;
        if (inTerArea) {
            if (this.globalData.socialListGlobalMap[inTerArea[1].ownerId].acceptList.includes(this.gameId)) {
                inTerritotyLevel = 2;
            }
            else if (this.globalData.socialListGlobalMap[inTerArea[1].ownerId].refuseList.includes(this.gameId)) {
                inTerritotyLevel = 0;
            }
            else {
                inTerritotyLevel = 1;
            }
        }
        else {
            inTerritotyLevel = -1;
        }
        return inTerritotyLevel;
    }
    isLocationLevelToPlayer(loc) {
        const level = this.getLocationLevelToPlayer(loc);
        return level === 0 || level === 1;
    }
    onLoad() {
    }
    onLeave() {
        var _a;
        (_a = this.looper) === null || _a === void 0 ? void 0 : _a.stop();
    }
    updateGlobalList() {
        var _a;
        let list = ((_a = this.globalData.socialListGlobalMap[this.gameId]) !== null && _a !== void 0 ? _a : (this.globalData.socialListGlobalMap[this.gameId] = {
            acceptList: [],
            refuseList: []
        }));
        list.acceptList = this.data.socialList.acceptList.map(e => e[0]);
        list.refuseList = this.data.socialList.refuseList.map(e => e[0]);
    }
    ;
}
//# sourceMappingURL=PomTerritorySystem.js.map