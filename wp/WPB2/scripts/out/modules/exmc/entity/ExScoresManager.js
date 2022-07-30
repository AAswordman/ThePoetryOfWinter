import ExGameConfig from '../ExGameConfig.js';
export default class ExScoresManager {
    constructor(e) {
        this.entity = e;
    }
    getScore(objective) {
        let name = typeof objective === "string" ? objective : objective.name;
        try {
            let n = parseInt(this.entity.runCommand(`scoreboard players test "${this.entity.nameTag}" ${name} * *`).statusMessage.split(" ")[1]);
            if (n !== n) {
                return 0;
            }
            else {
                return n;
            }
        }
        catch (e) {
            return 0;
        }
    }
    setScore(objective, num) {
        let name = typeof objective === "string" ? objective : objective.name;
        this.entity.runCommand(`scoreboard players set "${this.entity.nameTag}" ${name} ${num}`);
    }
    addScore(objective, num) {
        let name = typeof objective === "string" ? objective : objective.name;
        this.entity.runCommand(`scoreboard players add "${this.entity.nameTag}" ${name} ${num}`);
    }
    removeScore(objective, num) {
        let name = typeof objective === "string" ? objective : objective.name;
        this.entity.runCommand(`scoreboard players remove "${this.entity.nameTag}" ${name} ${num}`);
    }
    deleteScore(objective) {
        let name = typeof objective === "string" ? objective : objective.name;
        this.entity.runCommand(`scoreboard players reset "${this.entity.nameTag}" ${name}`);
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