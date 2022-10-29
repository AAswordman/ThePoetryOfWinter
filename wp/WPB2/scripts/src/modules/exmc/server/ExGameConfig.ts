import { world, MinecraftDimensionTypes } from '@minecraft/server';
import ExConfig from '../ExConfig.js';
import ExCommandRunner from '../interface/ExCommandRunner.js';
import GameConsole from '../interface/GameConsole.js';

export default class ExGameConfig {
    static config: ExConfig;

    static console: GameConsole;

    static runCommand(str: string) {
        try {
            return world.getDimension(MinecraftDimensionTypes.overworld).runCommand(str);
        } catch (e) {
            console.warn("Console error:", e);
        }
    }
    static async runCommandAsync(str: string) {
        try {
            return world.getDimension(MinecraftDimensionTypes.overworld).runCommandAsync(str);
        } catch (e) {
            console.warn("Console error:", e);
        }
    }
}