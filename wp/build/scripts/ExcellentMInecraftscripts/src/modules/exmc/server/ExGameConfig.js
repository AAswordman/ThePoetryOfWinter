import { world, MinecraftDimensionTypes } from '@minecraft/server';
export default class ExGameConfig {
    static async runCommandAsync(str) {
        try {
            return world.getDimension(MinecraftDimensionTypes.overworld).runCommandAsync(str);
        }
        catch (e) {
            console.warn("Console error:", e);
        }
    }
}
