import { world } from '@minecraft/server';
import ExNullEntity from "./ExNullEntity.js";
import ExGameConfig from '../ExGameConfig.js';
import MathUtil from "../../math/MathUtil.js";
export default class ExScoresManager {
    constructor(e) {
        this.entity = e;
    }
    getScore(objective) {
        var _a, _b, _c, _d;
        let name = typeof objective === "string" ? objective : objective.name;
        if (this.entity instanceof ExNullEntity) {
            try {
                let n = parseInt(this.entity.runCommand(`scoreboard players test ${'"' + this.entity.nameTag + '"'} ${name} * *`).statusMessage.split(" ")[1]);
                return (MathUtil.zeroIfNaN(n) || 0);
            }
            catch (e) {
                return 0;
            }
        }
        else {
            try {
                return (_b = ((_a = world.scoreboard.getObjective(name)) === null || _a === void 0 ? void 0 : _a.getScore(this.entity.scoreboard))) !== null && _b !== void 0 ? _b : 0;
            }
            catch (err) {
                const e = this.entity;
                return (_d = ((_c = world.scoreboard.getObjective(name).getScores().find((i) => (i.participant === e.scoreboard))) === null || _c === void 0 ? void 0 : _c.score)) !== null && _d !== void 0 ? _d : 0;
            }
        }
    }
    setScoreAsync(objective, num) {
        let name = typeof objective === "string" ? objective : objective.name;
        this.entity.runCommandAsync(`scoreboard players set ${this.entity instanceof ExNullEntity ? '"' + this.entity.nameTag + '"' : "@s"} ${name} ${num}`);
    }
    addScoreAsync(objective, num) {
        let name = typeof objective === "string" ? objective : objective.name;
        this.entity.runCommandAsync(`scoreboard players add ${this.entity instanceof ExNullEntity ? '"' + this.entity.nameTag + '"' : "@s"} ${name} ${num}`);
    }
    removeScoreAsync(objective, num) {
        let name = typeof objective === "string" ? objective : objective.name;
        this.entity.runCommandAsync(`scoreboard players remove ${this.entity instanceof ExNullEntity ? '"' + this.entity.nameTag + '"' : "@s"} ${name} ${num}`);
    }
    deleteScoreAsync(objective) {
        let name = typeof objective === "string" ? objective : objective.name;
        this.entity.runCommandAsync(`scoreboard players reset ${this.entity instanceof ExNullEntity ? '"' + this.entity.nameTag + '"' : "@s"} ${name}`);
    }
    setScore(objective, num) {
        let name = typeof objective === "string" ? objective : objective.name;
        this.entity.runCommand(`scoreboard players set ${this.entity instanceof ExNullEntity ? '"' + this.entity.nameTag + '"' : "@s"} ${name} ${num}`);
    }
    addScore(objective, num) {
        let name = typeof objective === "string" ? objective : objective.name;
        this.entity.runCommand(`scoreboard players add ${this.entity instanceof ExNullEntity ? '"' + this.entity.nameTag + '"' : "@s"} ${name} ${num}`);
    }
    removeScore(objective, num) {
        let name = typeof objective === "string" ? objective : objective.name;
        this.entity.runCommand(`scoreboard players remove ${this.entity instanceof ExNullEntity ? '"' + this.entity.nameTag + '"' : "@s"} ${name} ${num}`);
    }
    deleteScore(objective) {
        let name = typeof objective === "string" ? objective : objective.name;
        this.entity.runCommand(`scoreboard players reset ${this.entity instanceof ExNullEntity ? '"' + this.entity.nameTag + '"' : "@s"} ${name}`);
    }
}
export class Objective {
    constructor(name) {
        this.name = name;
    }
    create(showName) {
        ExGameConfig.runCommand(`scoreboard objectives add ${this.name} dummy "${showName}"`);
        return this;
    }
    delete() {
        ExGameConfig.runCommand(`scoreboard objectives remove ${this.name}`);
    }
    setDisplay(mode = "sidebar", ascending = true) {
        if (mode == "sidebar") {
            ExGameConfig.runCommand(`scoreboard objectives setdisplay ${mode} ${this.name} ${ascending ? "ascending" : "descending"}`);
        }
        else {
            ExGameConfig.runCommand(`scoreboard objectives setdisplay ${mode} ${this.name}`);
        }
        return this;
    }
}
;
//# sourceMappingURL=ExScoresManager.js.map