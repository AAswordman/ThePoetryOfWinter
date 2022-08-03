import ExEntity from "../modules/exmc/entity/ExEntity.js";
import ExGameConfig from "../modules/exmc/ExGameConfig.js";
import ExGameServer from "../modules/exmc/ExGameServer.js";
import ExTransmissionMsg from "../modules/exmc/ExTransmissionMsg.js";
import PomClient from "./PomClient.js";
import { EntityHitEvent, EntityHurtEvent, MinecraftDimensionTypes, Player } from 'mojang-minecraft';

export default class PomServer extends ExGameServer {
	constructor() {
		super();
	
	}
	override newClient(id: string, player: Player): PomClient {
		return new PomClient(this, id, player);
	}
}