import { Entity, MinecraftDimensionTypes, MinecraftEntityTypes, Player } from "mojang-minecraft";
import ExConfig from "../../modules/exmc/ExConfig.js";
import { Objective } from "../../modules/exmc/server/entity/ExScoresManager.js";
import ExDimension from "../../modules/exmc/server/ExDimension.js";
import ExGameConfig from "../../modules/exmc/server/ExGameConfig.js";
import ExGameServer from "../../modules/exmc/server/ExGameServer.js";
import TimeLoopTask from "../../modules/exmc/utils/TimeLoopTask.js";
import GlobalSettings from "./cache/GlobalSettings.js";
import PomClient from "./PomClient.js";


export default class PomServer extends ExGameServer {
	setting;
	entityCleaner: TimeLoopTask;
	tpsListener: TimeLoopTask;
	tps = 20;
	private _mtps = 20;

	clearEntityNumUpdate: TimeLoopTask;
	entityCleanerLeastNum!: number;
	entityCleanerStrength!: number;
	entityCleanerDelay!: number;
	constructor(config:ExConfig) {
		super(config);
		this.setting = new GlobalSettings(new Objective("wpsetting"));

		(this.clearEntityNumUpdate = new TimeLoopTask(this.getEvents(), () => {
			this.updateClearEntityNum();
		}).delay(10000)).start();

		this.updateClearEntityNum();

		this.entityCleaner = new TimeLoopTask(this.getEvents(), () => {
			let entities: Entity[] = Array.from(ExDimension.getInstance(this.getDimension(MinecraftDimensionTypes.overworld)).getEntities())
				.concat(Array.from(ExDimension.getInstance(this.getDimension(MinecraftDimensionTypes.theEnd)).getEntities()))
				.concat(Array.from(ExDimension.getInstance(this.getDimension(MinecraftDimensionTypes.nether)).getEntities()));

			//ExGameConfig.console.log("当前实体数：" + entities.length);
			let map = new Map<string, number>();
			entities.forEach(e => {
				if (e?.id == undefined) return;
				map.set(e.id, (map.get(e.id) ?? 0) + 1);
			});

			let max = [0, ""];
			map.forEach((v, k) => {
				if (v > max[0] && [MinecraftEntityTypes.player.id, MinecraftEntityTypes.villager.id, MinecraftEntityTypes.villagerV2.id].indexOf(k) === -1) {
					max[0] = v;
					max[1] = k;
				}
			});

			if (entities.length > this.entityCleanerLeastNum) {

				ExGameConfig.console.log("最多实体数：" + max[0]);
				ExGameConfig.console.log("最多实体数：" + max[1]);
				
				entities.forEach(e => {
					if (!e || !e.id || e.id !== max[1]) return;
					if (e.id === "minecraft:item" && e.viewVector.y !== 0) return;
					//if (e.nameTag) return;
					e.kill();
				});
			}
		}).delay(8000);
		this.upDateEntityCleaner();


		let ticks = 0;
		this.tpsListener = new TimeLoopTask(this.getEvents(), () => {
			this.tps = ticks;

			let liner = (this.tps - this._mtps) > 0 ? this.entityCleanerStrength : 11 - this.entityCleanerStrength;
			this._mtps = this._mtps * (liner - 1) / liner + this.tps / liner;

			//ExGameConfig.console.log("tps：" + this.tps, "myps : " + this._mtps,"delay:"+this.entityCleanerDelay ** (this._mtps));
			this.entityCleaner.delay(this.entityCleanerDelay ** (this._mtps));
			ticks = 0;
		}).delay(1000);


		this.getEvents().events.tick.subscribe(e => {
			ticks++;
		});

		this.tpsListener.start();



	}
	updateClearEntityNum() {
		this.entityCleanerStrength = this.setting.entityCleanerStrength;
		this.entityCleanerLeastNum = this.setting.entityCleanerLeastNum;
		this.entityCleanerDelay = (60 - this.setting.entityCleanerDelay) / 100 + 1.8;
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