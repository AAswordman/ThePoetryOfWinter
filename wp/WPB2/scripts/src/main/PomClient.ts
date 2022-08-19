import ExGameClient from "../modules/exmc/ExGameClient.js";
import { Player } from 'mojang-minecraft';
import ExGameServer from '../modules/exmc/ExGameServer.js';
import ExPlayer from "../modules/exmc/entity/ExPlayer.js";
import GlobalSettings from "./cache/GlobalSettings.js";
import { Objective } from "../modules/exmc/entity/ExScoresManager.js";
import TagCache from "../modules/exmc/storage/cache/TagCache.js";
import PomData from "./cache/PomData.js";
import TimeLoopTask from "../modules/exmc/utils/TimeLoopTask.js";
import lang from "./data/lang.js";
import { langType } from "./data/langType.js";
import PomEnchantSystem from "./func/PomEnchantSystem.js";
import PomTalentSystem from "./func/PomTalentSystem.js";
import PomMagicSystem from "./func/PomMagicSystem.js";
import GameController from "./func/GameController.js";
import SimpleItemUseFunc from "./func/SimpleItemUseFunc.js";


export default class PomClient extends ExGameClient {
	gameControllers:GameController[] = [];
	gameId !: number;
	globalSettings: GlobalSettings;
	cache: TagCache<PomData>;
	data: PomData;
	looper: TimeLoopTask;

	enchantSystem = new PomEnchantSystem(this);
	talentSystem = new PomTalentSystem(this);
	magicSystem = new PomMagicSystem(this);
	itemUseFunc = new SimpleItemUseFunc(this);


	constructor(server: ExGameServer, id: string, player: Player) {
		super(server, id, player);
		this.globalSettings = new GlobalSettings(new Objective("wpsetting"));
		this.cache = new TagCache(this.exPlayer);
		this.looper = new TimeLoopTask(this.getEvents(), () => {
			this.cache.save();
		});
		this.looper.delay(10000);
		this.looper.start();
		this.data = this.cache.get(new PomData());

		this.addCtrller(this.enchantSystem);
		this.addCtrller(this.magicSystem);
		this.addCtrller(this.talentSystem);
		this.addCtrller(this.itemUseFunc);

		this.gameControllers.forEach(controller => controller.onJoin());
	}

	addCtrller(system: GameController) {
		this.gameControllers.push(system);
	}
	getLang(): langType {
		return lang[this.data.lang ?? "en"];
	}

	override onLoaded(): void {
		this.gameId = ExPlayer.getInstance(this.player).getScoresManager().getScore("wbldid");
		this.gameControllers.forEach(controller => controller.onLoaded());

		if (this.player.hasTag("wbmsyh")) {
			this.player.nameTag = "§a" + this.player.nameTag;
		} else {
			this.player.nameTag = "§c" + this.player.nameTag;
		}

	}

	override onLeave(): void {
		this.gameControllers.forEach(controller => controller.onLeave());
		this.looper.stop();
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
