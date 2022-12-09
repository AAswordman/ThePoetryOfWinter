import { world } from '@minecraft/server';
import ExNullEntity from "./ExNullEntity.js";
import ExGameConfig from '../ExGameConfig.js';
export default class ExScoresManager {
    constructor(e) {
        this.entity = e;
    }
    getScore(objective) {
        var _a, _b, _c, _d, _e, _f;
        let name = typeof objective === "string" ? objective : objective.name;
        if (this.entity instanceof ExNullEntity) {
            const e = this.entity;
            return (_b = ((_a = world.scoreboard.getObjective(name).getScores().find((i) => (i.participant.displayName === e.nameTag))) === null || _a === void 0 ? void 0 : _a.score)) !== null && _b !== void 0 ? _b : 0;
        }
        else {
            try {
                return (_d = ((_c = world.scoreboard.getObjective(name)) === null || _c === void 0 ? void 0 : _c.getScore(this.entity.scoreboard))) !== null && _d !== void 0 ? _d : 0;
            }
            catch (err) {
                const e = this.entity;
                return (_f = ((_e = world.scoreboard.getObjective(name).getScores().find((i) => (i.participant === e.scoreboard))) === null || _e === void 0 ? void 0 : _e.score)) !== null && _f !== void 0 ? _f : 0;
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
}
export class Objective {
    constructor(name) {
        this.name = name;
    }
    create(showName) {
        try {
            world.scoreboard.addObjective(this.name, showName);
        }
        catch (e) { }
        // ExGameConfig.runCommandAsync(`scoreboard objectives add ${this.name} dummy "${showName}"`);
        return this;
    }
    delete() {
        ExGameConfig.runCommandAsync(`scoreboard objectives remove ${this.name}`);
    }
    setDisplay(mode = "sidebar", ascending = true) {
        if (mode == "sidebar") {
            ExGameConfig.runCommandAsync(`scoreboard objectives setdisplay ${mode} ${this.name} ${ascending ? "ascending" : "descending"}`);
        }
        else {
            ExGameConfig.runCommandAsync(`scoreboard objectives setdisplay ${mode} ${this.name}`);
        }
        return this;
    }
}
;
//# sourceMappingURL=ExScoresManager.js.map