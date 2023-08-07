import { MinecraftDimensionTypes, world } from "@minecraft/server";
import ExScoresManager from "./ExScoresManager.js";
import ExCommand from '../env/ExCommand.js';
export default class ExNullEntity {
    constructor(name) {
        this.command = new ExCommand(this);
        this.nameTag = name;
    }
    runCommandAsync(command) {
        return world.getDimension(MinecraftDimensionTypes.overworld).runCommandAsync(command);
    }
    getScoresManager() {
        return new ExScoresManager(this);
    }
}
//# sourceMappingURL=ExNullEntity.js.map