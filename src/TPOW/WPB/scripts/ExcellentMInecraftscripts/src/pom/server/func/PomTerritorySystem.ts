import Vector3 from "../../../modules/exmc/math/Vector3.js";
import { ExBlockArea } from "../../../modules/exmc/server/block/ExBlockArea.js";
import { Objective } from "../../../modules/exmc/server/entity/ExScoresManager.js";
import ExSystem from "../../../modules/exmc/utils/ExSystem.js";
import TickDelayTask from "../../../modules/exmc/utils/TickDelayTask.js";
import TimeLoopTask from "../../../modules/exmc/utils/TimeLoopTask.js";
import VarOnChangeListener from "../../../modules/exmc/utils/VarOnChangeListener.js";
import { MinecraftDimensionTypes } from "../../../modules/vanilla-data/lib/index.js";
import TerritoryData from "../data/TerritoryData.js";
import BlockPartitioning from "../map/BlockPartitioning.js";
import GameController from "./GameController.js";


export default class PomTerritorySystem extends GameController {
    looper?: TickDelayTask;
    territoryData?: BlockPartitioning<TerritoryData>;
    inTerritotyLevel: number = -1//-1/0/1/2;
    territoryTip = new VarOnChangeListener((b, a) => {
        if (b === "") {
            this.sayTo("§b你离开了 " + a!.split("|")[0] + " §b的领地");
        } else {
            this.sayTo("§b你进入了 " + b!.split("|")[0] + " §b的" + (parseInt(b!.split("|")[1]) === 1 ? "§a" : "§c") + "领地");
        }
    }, "")
    onJoin(): void {
        this.territoryData = new BlockPartitioning(this.globalData.territoryData);
        this.looper = ExSystem.tickTask(() => {
            this.getLocationLevel();
            this.data.territory.data.forEach(e => e.coolingTime = Math.max(0, e.coolingTime - 4));

        }).delay(4 * 20);
        this.looper.start();


    }
    getLocationLevel() {
        let inTerArea: [ExBlockArea, TerritoryData] | undefined = undefined;

        if (this.getDimension().id === MinecraftDimensionTypes.Overworld) {
            inTerArea = this.territoryData?.getAreaIn(this.exPlayer.position);
        }
        this.inTerritotyLevel = this.getLocationLevelToPlayer(inTerArea);
        this.territoryTip.upDate(inTerArea ? (inTerArea[1].ownerName + "|" + String(this.inTerritotyLevel === 2 ? 1 : 0)) : "");
    }
    getLocationLevelToPlayer(loc: Vector3 | [ExBlockArea, TerritoryData] | undefined) {
        let inTerArea: [ExBlockArea, TerritoryData] | undefined = undefined;
        if (loc instanceof Vector3) {
            if (this.getDimension().id === MinecraftDimensionTypes.Overworld) {
                inTerArea = this.territoryData?.getAreaIn(loc);
            }
        } else {
            inTerArea = loc;
        }
        let inTerritotyLevel = -1;
        if (inTerArea) {
            if (this.globalData.socialListGlobalMap[inTerArea[1].ownerId].acceptList.includes(this.gameId)) {
                inTerritotyLevel = 2;
            } else if (this.globalData.socialListGlobalMap[inTerArea[1].ownerId].refuseList.includes(this.gameId)) {
                inTerritotyLevel = 0;
            } else {
                inTerritotyLevel = 1;
            }
        } else {
            inTerritotyLevel = -1;
        }

        return inTerritotyLevel;
    }
    isLocationLevelToPlayer(loc: Vector3) {
        const level = this.getLocationLevelToPlayer(loc);
        return level === 0 || level === 1;
    }

    onLoad(): void {
    }
    onLeave(): void {
        this.looper?.stop();
    }
    updateGlobalList() {
        let list = (this.globalData.socialListGlobalMap[this.gameId] ??
            (this.globalData.socialListGlobalMap[this.gameId] = {
                acceptList: [],
                refuseList: []
            }));
        list.acceptList = this.data.socialList.acceptList.map(e => e[0]);
        list.refuseList = this.data.socialList.refuseList.map(e => e[0]);
    };

}