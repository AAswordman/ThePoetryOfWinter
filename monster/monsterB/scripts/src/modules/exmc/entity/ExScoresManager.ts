import { Entity } from "mojang-minecraft";
import ExNullEntity from "./ExNullEntity.js";
import ExGameConfig from '../ExGameConfig.js';
import ExCommandRunner from "../interface/ExCommandRunner.js";


export default class ExScoresManager {

	entity: ExCommandRunner & { nameTag: string; };

	constructor(e: ExCommandRunner & { nameTag: string }) {
		this.entity = e;
	}

	getScore(objective: Objective) {
		return this.entity.runCommand(`scoreboard players test "${this.entity.nameTag}" ${objective.name} * *`).statusMessage.split(" ")[1];
	}
	setScore(objective: Objective, num: number) {
		this.entity.runCommand(`scoreboard players set "${this.entity.nameTag}" ${objective.name} ${num}`);
	}
	addScore(objective: Objective, num: number) {
		this.entity.runCommand(`scoreboard players add "${this.entity.nameTag}" ${objective.name} ${num}`);
	}
	removeScore(objective: Objective, num: number) {
		this.entity.runCommand(`scoreboard players remove "${this.entity.nameTag}" ${objective.name} ${num}`);
	}
	deleteScore(objective: Objective, num: number) {
		this.entity.runCommand(`scoreboard players reset "${this.entity.nameTag}" ${objective.name} ${num}`);
	}
}
export class Objective {
	name: string;
	constructor(name: string) {
		this.name = name;
	}

	create(showName: string) {
		ExGameConfig.runCommand(`scoreboard objectives add ${this.name} dummy ${showName}`);
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