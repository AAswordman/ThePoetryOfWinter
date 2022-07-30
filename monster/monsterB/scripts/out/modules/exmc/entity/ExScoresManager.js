import ExGameConfig from '../ExGameConfig.js';
export default class ExScoresManager {
    constructor(e) {
        this.entity = e;
    }
    getScore(objective) {
        return this.entity.runCommand(`scoreboard players test "${this.entity.nameTag}" ${objective.name} * *`).statusMessage.split(" ")[1];
    }
    setScore(objective, num) {
        this.entity.runCommand(`scoreboard players set "${this.entity.nameTag}" ${objective.name} ${num}`);
    }
    addScore(objective, num) {
        this.entity.runCommand(`scoreboard players add "${this.entity.nameTag}" ${objective.name} ${num}`);
    }
    removeScore(objective, num) {
        this.entity.runCommand(`scoreboard players remove "${this.entity.nameTag}" ${objective.name} ${num}`);
    }
    deleteScore(objective, num) {
        this.entity.runCommand(`scoreboard players reset "${this.entity.nameTag}" ${objective.name} ${num}`);
    }
}
export class Objective {
    constructor(name) {
        this.name = name;
    }
    create(showName) {
        ExGameConfig.runCommand(`scoreboard objectives add ${this.name} dummy ${showName}`);
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