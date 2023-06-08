import { world } from '@minecraft/server';
import ExNullEntity from "./ExNullEntity.js";
import ExGameConfig from '../ExGameConfig.js';
export default class ExScoresManager {
    constructor(e) {
        this.entity = e;
    }
    getIdentity(objective) {
        if (this.entity instanceof ExNullEntity) {
            const e = this.entity;
            return world.scoreboard.getObjective(objective).getParticipants().find((i) => (i.displayName === e.nameTag));
        }
        else {
            return this.entity.scoreboardIdentity;
        }
    }
    getScore(objective) {
        let name = typeof objective === "string" ? objective : objective.name;
        let id = this.getIdentity(name);
        if (!id)
            return 0;
        try {
            return world.scoreboard.getObjective(name).getScore(id);
        }
        catch (e) {
            return 0;
        }
        ;
    }
    setScore(objective, num) {
        let name = typeof objective === "string" ? objective : objective.name;
        let id = this.getIdentity(name);
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