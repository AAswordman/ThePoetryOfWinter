import ExEntity from "../modules/exmc/entity/ExEntity.js";
import ExGameConfig from "../modules/exmc/ExGameConfig.js";
import ExGameServer from "../modules/exmc/ExGameServer.js";
import ExTransmissionMsg from "../modules/exmc/ExTransmissionMsg.js";
import PomClient from "./PomClient.js";
import { Entity, EntityHitEvent, EntityHurtEvent, MinecraftDimensionTypes, MinecraftEntityTypes, Player, MinecraftItemTypes, Items } from 'mojang-minecraft';
import GlobalSettings from './cache/GlobalSettings.js';
import { Objective } from "../modules/exmc/entity/ExScoresManager.js";
import TimeLoopTask from "../modules/exmc/utils/TimeLoopTask.js";

export default class PomServer extends ExGameServer {
	setting;
	entityCleaner: TimeLoopTask;
	tpsListener: TimeLoopTask;
	tps = 20;
	entityCleanerPre: TimeLoopTask;
	constructor() {
		super();
		this.setting = new GlobalSettings(new Objective("wpsetting"));
		this.entityCleanerPre = new TimeLoopTask(this.getEvents(), () => {
			this.entityCleaner.start();
		});
		this.entityCleaner = new TimeLoopTask(this.getEvents(), () => {
			let entities: Entity[] = Array.from(this.getDimension(MinecraftDimensionTypes.overworld).getEntities())
				.concat(Array.from(this.getDimension(MinecraftDimensionTypes.theEnd).getEntities()))
				.concat(Array.from(this.getDimension(MinecraftDimensionTypes.nether).getEntities()));

			//ExGameConfig.console.log("当前实体数：" + entities.length);
			let map = new Map<string, number>();
			entities.forEach(e => {
				if(e?.id == undefined) return;
				map.set(e.id, (map.get(e.id) ?? 0) + 1);
			});

			let max = [0, ""];
			map.forEach((v, k) => {
				if (v > max[0] && [MinecraftEntityTypes.player.id,MinecraftEntityTypes.villager.id,MinecraftEntityTypes.villagerV2.id].indexOf(k) === -1) {
					max[0] = v;
					max[1] = k;
				}
			});
			ExGameConfig.console.log("最多实体数：" + max[0]);
			ExGameConfig.console.log("最多实体数：" + max[1]);

			if(entities.length > this.setting.entityCleanerLeastNum){
				entities.forEach(e => {
					if(!e|| !e.id) return;
					if(e.id === "minecraft:item" && e.viewVector.y !== 0) return;
					if(e.id === max[1] && !e.nameTag) e.kill();
				});
			}
			if(this.tps <= 12) this.entityCleaner.delay(200);
		}).delay(8000);
		this.upDateEntityCleaner();


		let ticks = 0;
		this.tpsListener = new TimeLoopTask(this.getEvents(), () => {
			this.tps = ticks;
			//ExGameConfig.console.log("tps：" + this.tps);
			this.entityCleanerPre.delay(2 ** (this.tps));
			if(this.tps > 17) this.entityCleaner.delay(8000).stop();
			ticks = 0;
		}).delay(1000);

		this.getEvents().events.tick.subscribe(e => {
			ticks++;
		});

		this.tpsListener.start();
	}
	upDateEntityCleaner() {
		if (this.setting.entityCleaner) {
			this.entityCleanerPre.start();
		} else {
			this.entityCleanerPre.stop();
		}
	}
	override newClient(id: string, player: Player): PomClient {
		return new PomClient(this, id, player);
	}
}