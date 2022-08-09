import ExEntity from "../modules/exmc/entity/ExEntity.js";
import ExGameConfig from "../modules/exmc/ExGameConfig.js";
import ExGameServer from "../modules/exmc/ExGameServer.js";
import ExTransmissionMsg from "../modules/exmc/ExTransmissionMsg.js";
import PomClient from "./PomClient.js";
import { Entity, EntityHitEvent, EntityHurtEvent, MinecraftDimensionTypes, Player } from 'mojang-minecraft';
import GlobalSettings from './cache/GlobalSettings.js';
import { Objective } from "../modules/exmc/entity/ExScoresManager.js";
import TimeLoopTask from "../modules/exmc/utils/TimeLoopTask.js";

export default class PomServer extends ExGameServer {
	setting;
	entityCleaner: TimeLoopTask;
	constructor() {
		super();
		this.setting = new GlobalSettings(new Objective("wpsetting"));
		this.entityCleaner = new TimeLoopTask(this.getEvents(), () => {
			let entities: Entity[] = Array.from(this.getDimension(MinecraftDimensionTypes.overworld).getEntities())
				.concat(Array.from(this.getDimension(MinecraftDimensionTypes.theEnd).getEntities()))
				.concat(Array.from(this.getDimension(MinecraftDimensionTypes.nether).getEntities()));

			ExGameConfig.console.log("当前实体数：" + entities.length);
			let map = new Map<string, number>();
			if (entities.length > 300) {
				entities.forEach(e => {
					map.set(e.id, (map.get(e.id) ?? 0) + 1);
				});
			}
			let max = [0, ""];
			map.forEach((v, k) => {
				if (v > max[0]) {
					max[0] = v;
					max[1] = k;
				}
			});
			ExGameConfig.console.log("最多实体数：" + max[0]);
			ExGameConfig.console.log("最多实体数：" + max[1]);
		}).delay(10000);
		this.upDateEntityCleaner();
	}
	upDateEntityCleaner() {
		if (this.setting.entityCleaner) {
			this.entityCleaner.start();
		} else {
			this.entityCleaner.stop();
		}
	}
	override newClient(id: string, player: Player): PomClient {
		return new PomClient(this, id, player);
	}
}