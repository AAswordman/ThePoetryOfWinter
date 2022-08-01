import ExGameClient from "../modules/exmc/ExGameClient.js";
import { Player } from 'mojang-minecraft';
import MenuUIAlert from "./ui/MenuUIAlert.js";
import menuFunctionUI from "./data/menuFunctionUI.js";
import ExGameServer from '../modules/exmc/ExGameServer.js';
import ExPlayer from "../modules/exmc/entity/ExPlayer.js";
import GlobalSettings from "./cache/GlobalSettings.js";
import { Objective } from "../modules/exmc/entity/ExScoresManager.js";
import ExGameConfig from '../modules/exmc/ExGameConfig.js';
import TagCache from "../modules/exmc/storage/cache/TagCache.js";
import PomData from "./cache/PomData.js";
import TimeLoopTask from "../modules/exmc/utils/TimeLoopTask.js";

export default class PomClient extends ExGameClient {
	gameId !: number;
	globalSettings: GlobalSettings;
	cache: TagCache<PomData>;
	data: PomData;
	looper: TimeLoopTask;
	constructor(server: ExGameServer, id: string, player: Player) {
		super(server, id, player);
		this.globalSettings = new GlobalSettings(new Objective("wpsetting"));
		if (ExGameConfig.debug) {
			this.globalSettings.debug();
		}

		this.cache = new TagCache(this.exPlayer);
		this.looper = new TimeLoopTask(this, () => {
			this.cache.save();
		});
		this.looper.delay(10000);
		this.looper.start();
		this.data = this.cache.get(new PomData());
		this.register();
	}
	register() {
		this.getEvents().exEvents.itemUse.subscribe((e) => {
			const {
				item
			} = e;

			if (item.id == "wb:power") {
				new MenuUIAlert(this, menuFunctionUI).showPage(["main", "notice"]);
			}
		});
		this.getEvents().exEvents.playerHitEntity.subscribe((e) => {
			ExGameConfig.console.info("hit" + e.damage);
		});
		this.getEvents().exEvents.tick.subscribe((e) => {

		});
		this.getEvents().exEvents.playerHurt.subscribe((e) => {
			let beforeHealth = (<any>this.exPlayer)["nowHealth"] ?? this.exPlayer.getMaxHealth();
			let realDamage = Math.max(0, beforeHealth - this.exPlayer.getHealth());

			
			ExGameConfig.console.info("hurt by" + e.damage + " health:");
			(<any>this.exPlayer)["nowHealth"] = this.exPlayer.getHealth();
		});

		this.getEvents().exEvents.itemOnHandChange.subscribe((e) => {
			ExGameConfig.console.info("onHandChange:"+e.beforeItem?.id+" -> " + e.afterItem?.id);
			if(e.afterItem?.id.startsWith("wb:sword_")){
				console.warn(this.data.talent);
				console.warn(this.data.talent.calculateTalent);
				this.data.talent.calculateTalent(e.afterItem);
				
				//this.exPlayer.getBag().setItem(this.exPlayer.selectedSlot, e.afterItem);
			}
		});
	}
	override onLoaded(): void {
		this.gameId = ExPlayer.getInstance(this.player).getScoresManager().getScore("wbldid");
		if (this.player.hasTag("wbmsyh")) {
			this.player.nameTag = "§a" + this.player.nameTag;
		} else {
			this.player.nameTag = "§c" + this.player.nameTag;
		}

	}

	override onLeave(): void {
		this.looper.stop();
		this.cache.save();
		super.onLeave();
	}

	getPlayersAndIds() {
		return this.runOnServer<[Player, number][]>((server) => {
			let arr: [Player, number][] = [];
			for (let i of server.getClients()) {
				arr.push([i.player, (<PomClient>i).gameId]);
			}
			return arr;
		});
	}

	sayTo(str: string, p = this.player) {
		p.runCommand(`tellraw @s {"rawtext": [{"text": "${str}"}]}`);
	}
}

