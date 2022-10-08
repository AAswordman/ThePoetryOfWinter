import { MinecraftDimensionTypes, world } from "mojang-minecraft";
import ExCommandRunner from '../../interface/ExCommandRunner.js';
import ExScoresManager from "./ExScoresManager.js";

export default class ExNullEntity implements ExCommandRunner{
    nameTag;
    constructor(name: string){
        this.nameTag = name;
    }

    runCommand(command: string){
        return world.getDimension(MinecraftDimensionTypes.overworld).runCommand(command);
    }
    runCommandAsync(command: string){
        return world.getDimension(MinecraftDimensionTypes.overworld).runCommandAsync(command);
    }
    getScoresManager() {
		return new ExScoresManager(this);
	}
}