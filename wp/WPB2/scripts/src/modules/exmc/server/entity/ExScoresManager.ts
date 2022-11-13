import { Entity, world } from '@minecraft/server';
import ExNullEntity from "./ExNullEntity.js";
import ExGameConfig from '../ExGameConfig.js';
import ExCommandRunner from "../../interface/ExCommandRunner.js";
import { to } from "../ExErrorQueue.js";
import MathUtil from "../../math/MathUtil.js";


export default class ExScoresManager {

    entity: Entity | ExNullEntity;

    constructor(e: Entity | ExNullEntity) {
        this.entity = e;
    }


    getScore(objective: Objective | string): number {
        let name = typeof objective === "string" ? objective : objective.name;
        if (this.entity instanceof ExNullEntity) {
            try {
                let n = parseInt(this.entity.runCommand(`scoreboard players test ${'"' + this.entity.nameTag + '"'} ${name} * *`).statusMessage.split(" ")[1]);
                return (MathUtil.zeroIfNaN(n) || 0);
            } catch (e) {
                return 0;
            }
        } else {
            try {
                return (world.scoreboard.getObjective(name)?.getScore(this.entity.scoreboard)) ?? 0;
            } catch (err) {
                const e = this.entity;
                return (world.scoreboard.getObjective(name).getScores().find((i) => (i.participant === e.scoreboard))?.score) ?? 0;
            }
        }
    }
    setScoreAsync(objective: Objective | string, num: number) {
        let name = typeof objective === "string" ? objective : objective.name;
        this.entity.runCommandAsync(`scoreboard players set ${this.entity instanceof ExNullEntity ? '"' + this.entity.nameTag + '"' : "@s"} ${name} ${num}`);
    }
    addScoreAsync(objective: Objective | string, num: number) {
        let name = typeof objective === "string" ? objective : objective.name;
        this.entity.runCommandAsync(`scoreboard players add ${this.entity instanceof ExNullEntity ? '"' + this.entity.nameTag + '"' : "@s"} ${name} ${num}`);
    }
    removeScoreAsync(objective: Objective | string, num: number) {
        let name = typeof objective === "string" ? objective : objective.name;
        this.entity.runCommandAsync(`scoreboard players remove ${this.entity instanceof ExNullEntity ? '"' + this.entity.nameTag + '"' : "@s"} ${name} ${num}`);
    }
    deleteScoreAsync(objective: Objective | string) {
        let name = typeof objective === "string" ? objective : objective.name;
        this.entity.runCommandAsync(`scoreboard players reset ${this.entity instanceof ExNullEntity ? '"' + this.entity.nameTag + '"' : "@s"} ${name}`);
    }

    setScore(objective: Objective | string, num: number) {
        let name = typeof objective === "string" ? objective : objective.name;
        this.entity.runCommand(`scoreboard players set ${this.entity instanceof ExNullEntity ? '"' + this.entity.nameTag + '"' : "@s"} ${name} ${num}`);
    }
    addScore(objective: Objective | string, num: number) {
        let name = typeof objective === "string" ? objective : objective.name;
        this.entity.runCommand(`scoreboard players add ${this.entity instanceof ExNullEntity ? '"' + this.entity.nameTag + '"' : "@s"} ${name} ${num}`);
    }
    removeScore(objective: Objective | string, num: number) {
        let name = typeof objective === "string" ? objective : objective.name;
        this.entity.runCommand(`scoreboard players remove ${this.entity instanceof ExNullEntity ? '"' + this.entity.nameTag + '"' : "@s"} ${name} ${num}`);
    }
    deleteScore(objective: Objective | string) {
        let name = typeof objective === "string" ? objective : objective.name;
        this.entity.runCommand(`scoreboard players reset ${this.entity instanceof ExNullEntity ? '"' + this.entity.nameTag + '"' : "@s"} ${name}`);
    }

}
export class Objective {
    name: string;
    constructor(name: string) {
        this.name = name;
    }

    create(showName: string) {
        ExGameConfig.runCommand(`scoreboard objectives add ${this.name} dummy "${showName}"`);
        return this;
    }
    delete() {
        ExGameConfig.runCommand(`scoreboard objectives remove ${this.name}`);
    }
    setDisplay(mode = "sidebar", ascending = true) {
        if (mode == "sidebar") {
            ExGameConfig.runCommand(`scoreboard objectives setdisplay ${mode} ${this.name} ${ascending ? "ascending" : "descending"}`);
        } else {
            ExGameConfig.runCommand(`scoreboard objectives setdisplay ${mode} ${this.name}`);
        }
        return this;
    }
};