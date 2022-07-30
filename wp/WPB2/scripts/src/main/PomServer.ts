import ExEntity from "../modules/exmc/entity/ExEntity.js";
import ExGameConfig from "../modules/exmc/ExGameConfig.js";
import ExGameServer from "../modules/exmc/ExGameServer.js";
import ExTransmissionMsg from "../modules/exmc/ExTransmissionMsg.js";
import PomClient from "./PomClient.js";
import { EntityHurtEvent, MinecraftDimensionTypes, Player } from 'mojang-minecraft';

export default class PomServer extends ExGameServer {
	damageListener: (e: EntityHurtEvent) => void;
	constructor() {
		super();

		this.damageListener = (e: EntityHurtEvent) => {
			ExGameConfig.console.log(`${e.damagingEntity == null ? e.cause : e.damagingEntity.id} 对 ${e.hurtEntity.id} 造成 ${e.damage} 点伤害`);
		}
	}
	override newClient(id: string, player: Player): PomClient {
		return new PomClient(this, id, player);
	}

	setDamageListenerOn() {
		this.getEvents().events.entityHurt.subscribe(this.damageListener);
		ExGameConfig.console.info("setDamageListenerOn");
	}
	setDamageListenerOff() {
		this.getEvents().events.entityHurt.unsubscribe(this.damageListener);
		ExGameConfig.console.info("setDamageListenerOff");
	}
	
	override receiveMessage(msg: ExTransmissionMsg<any>) {
		if (msg.message == "setDamageListenerOn") {
			this.setDamageListenerOn();
		} else if (msg.message == "setDamageListenerOff") {
			this.setDamageListenerOff();
		}

	}
}