import { world } from '@minecraft/server';
import ExNullEntity from "./ExNullEntity.js";
import ExGameConfig from '../ExGameConfig.js';
export default class ExScoresManager {
    constructor(e) {
        this.entity = e;
    }
    getIdentity(objective) {
        var _a, _b;
        if (this.entity instanceof ExNullEntity) {
            const e = this.entity;
            return (_b = (_a = world.scoreboard.getObjective(objective)) === null || _a === void 0 ? void 0 : _a.getScores().find(i => i.participant.displayName === e.nameTag)) === null || _b === void 0 ? void 0 : _b.participant;
        }
        else {
            return this.entity.scoreboardIdentity;
        }
    }
    getScore(objective) {
        var _a, _b;
        let name = typeof objective === "string" ? objective : objective.name;
        let id = this.getIdentity(name);
        if (!id)
            return 0;
        try {
            return (_b = (_a = world.scoreboard.getObjective(name)) === null || _a === void 0 ? void 0 : _a.getScore(id)) !== null && _b !== void 0 ? _b : 0;
        }
        catch (e) {
            return 0;
        }
        ;
    }
    hasScore(objective) {
        var _a;
        let name = typeof objective === "string" ? objective : objective.name;
        let id = this.getIdentity(name);
        if (!id)
            return false;
        try {
            return (_a = world.scoreboard.getObjective(name)) === null || _a === void 0 ? void 0 : _a.hasParticipant(id);
        }
        catch (e) {
            return false;
        }
        ;
    }
    setScore(objective, num) {
        var _a;
        let name = typeof objective === "string" ? objective : objective.name;
        let id = this.getIdentity(name);
        if (!id && this.entity instanceof ExNullEntity) {
            this.entity.runCommandAsync(`scoreboard players set ${'"' + this.entity.nameTag + '"'} ${name} ${num}`);
        }
        if (!id)
            return false;
        (_a = world.scoreboard.getObjective(name)) === null || _a === void 0 ? void 0 : _a.setScore(id, num);
        return true;
    }
    addScore(objective, num) {
        return this.setScore(objective, this.getScore(objective) + num);
    }
    removeScore(objective, num) {
        return this.setScore(objective, this.getScore(objective) - num);
    }
    deleteScore(objective) {
        var _a;
        const name = typeof objective === "string" ? objective : objective.name;
        const identity = this.getIdentity(name);
        if (!identity)
            return false;
        (_a = world.scoreboard.getObjective(name)) === null || _a === void 0 ? void 0 : _a.removeParticipant(identity);
        return true;
    }
    /**
     * @LiLeyi
     * 用来初始化计分板上某一项的值。若未初始化返回true，初始化了返回false
     * */
    initializeScore(name, value) {
        if (!this.hasScore(name)) {
            this.setScore(name, value);
            return true;
        }
        else {
            return false;
        }
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
        return this;
    }
    delete() {
        world.scoreboard.removeObjective(this.name);
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
//# sourceMappingURL=ExScoresManager.js.map