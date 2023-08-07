import { world } from '@minecraft/server';
import ExNullEntity from "./ExNullEntity.js";
import ExGameConfig from '../ExGameConfig.js';
export default class ExScoresManager {
    constructor(e) {
        this.entity = e;
    }
    getIdentity(objective) {
        var _a;
        if (this.entity instanceof ExNullEntity) {
            const e = this.entity;
            return (_a = world.scoreboard.getObjective(objective).getScores().find(i => i.participant.displayName === e.nameTag)) === null || _a === void 0 ? void 0 : _a.participant;
        }
        else {
            return this.entity.scoreboardIdentity;
        }
    }
    getScore(objective) {
        var _a;
        let name = typeof objective === "string" ? objective : objective.name;
        let id = this.getIdentity(name);
        if (!id)
            return 0;
        try {
            return (_a = world.scoreboard.getObjective(name).getScore(id)) !== null && _a !== void 0 ? _a : 0;
        }
        catch (e) {
            return 0;
        }
        ;
    }
    hasScore(objective) {
        let name = typeof objective === "string" ? objective : objective.name;
        let id = this.getIdentity(name);
        if (!id)
            return false;
        try {
            return world.scoreboard.getObjective(name).hasParticipant(id);
        }
        catch (e) {
            return false;
        }
        ;
    }
    setScore(objective, num) {
        let name = typeof objective === "string" ? objective : objective.name;
        let id = this.getIdentity(name);
        if (!id && this.entity instanceof ExNullEntity) {
            this.entity.runCommandAsync(`scoreboard players set ${'"' + this.entity.nameTag + '"'} ${name} ${num}`);
        }
        if (!id)
            return false;
        world.scoreboard.getObjective(name).setScore(id, num);
        return true;
    }
    addScore(objective, num) {
        return this.setScore(objective, this.getScore(objective) + num);
    }
    removeScore(objective, num) {
        return this.setScore(objective, this.getScore(objective) - num);
    }
    deleteScore(objective) {
        const name = typeof objective === "string" ? objective : objective.name;
        const identity = this.getIdentity(name);
        if (!identity)
            return false;
        world.scoreboard.getObjective(name).removeParticipant(identity);
        return true;
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