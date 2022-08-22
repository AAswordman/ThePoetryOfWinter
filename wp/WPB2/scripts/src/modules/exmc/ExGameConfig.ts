import { world, MinecraftDimensionTypes } from 'mojang-minecraft';
import ExCommandRunner from './interface/ExCommandRunner.js';
import GameConsole from './interface/GameConsole.js';

export default class ExGameConfig{
	static gameVersion = "1.9.20";
	static addonVersion = "1.6.31";
	static debug = false;

	static console: GameConsole;

	static serverId = "Server";

	static transmissionType = {
		sendToServer: 0,
		sendToClient: 1,
		runOnServer: 2,
		runOnClient: 3
	}

	static runCommand(str: string) {
		try {
			return world.getDimension(MinecraftDimensionTypes.overworld).runCommand(str);
		} catch (e) {
			console.warn("Console error:",e);
		}
	}
	static async runCommandAsync(str: string) {
		try {
			return world.getDimension(MinecraftDimensionTypes.overworld).runCommandAsync(str);
		} catch (e) {
			console.warn("Console error:",e);
		}
	}
}