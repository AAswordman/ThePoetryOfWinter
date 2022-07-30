import { MinecraftDimensionTypes, world } from "mojang-minecraft";
export default class ExNullEntity {
    constructor(name) {
        this.nameTag = name;
    }
    runCommand(command) {
        return world.getDimension(MinecraftDimensionTypes.overworld).runCommand(command);
    }
}
//# sourceMappingURL=ExNullEntity.js.map