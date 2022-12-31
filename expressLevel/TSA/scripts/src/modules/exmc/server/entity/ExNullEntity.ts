import { MinecraftDimensionTypes, world } from "@minecraft/server";
import { ExCommandNativeRunner } from '../../interface/ExCommandRunner.js';
import ExScoresManager from "./ExScoresManager.js";
import ExCommand from '../env/ExCommand.js';

export default class ExNullEntity implements ExCommandNativeRunner {
    public command = new ExCommand(this);
    nameTag;
    constructor(name: string) {
        this.nameTag = name;
    }
    runCommandAsync(command: string) {
        return world.getDimension(MinecraftDimensionTypes.overworld).runCommandAsync(command);
    }
    getScoresManager() {
        return new ExScoresManager(this);
    }
}