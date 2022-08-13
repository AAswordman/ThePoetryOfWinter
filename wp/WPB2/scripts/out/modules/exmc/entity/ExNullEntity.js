import { MinecraftDimensionTypes, world } from "mojang-minecraft";
import ExScoresManager from "./ExScoresManager.js";
export default class ExNullEntity {
    constructor(name) {
        this.nameTag = name;
    }
    runCommand(command) {
        return world.getDimension(MinecraftDimensionTypes.overworld).runCommand(command);
    }
    runCommandAsync(command) {
        return world.getDimension(MinecraftDimensionTypes.overworld).runCommandAsync(command);
    }
    getScoresManager() {
        return new ExScoresManager(this);
    }
}
//# sourceMappingURL=ExNullEntity.js.map