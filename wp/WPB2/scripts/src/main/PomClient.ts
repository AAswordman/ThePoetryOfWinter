import ExGameClient from "../modules/exmc/ExGameClient.js";
import { MinecraftItemTypes, Player } from 'mojang-minecraft';
import MenuUIAlert from "./ui/MenuUIAlert.js";
import menuFunctionUI from "./data/menuFunctionUI.js";
import ExGameServer from '../modules/exmc/ExGameServer.js';
import ExPlayer from "../modules/exmc/entity/ExPlayer.js";
import GlobalSettings from "./cache/GlobalSettings.js";
import { Objective } from "../modules/exmc/entity/ExScoresManager.js";
import ExGameConfig from '../modules/exmc/ExGameConfig.js';
import { to } from "../modules/exmc/ExErrorStack.js";

export default class PomClient extends ExGameClient {
	gameId !: number;
	globalSettings: GlobalSettings;
	constructor(server: ExGameServer, id: string, player: Player) {
		super(server, id, player);
		this.globalSettings = new GlobalSettings(new Objective("wpsetting"));
		if(ExGameConfig.debug){
			this.globalSettings.debug();
		}
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
	}
	override onLoaded(): void {
		this.gameId = ExPlayer.getInstance(this.player).getScoresManager().getScore("wbldid");
		if (this.player.hasTag("wbmsyh")) {
			this.player.nameTag = "§a" + this.player.nameTag;
		} else {
			this.player.nameTag = "§c" + this.player.nameTag;
		}
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

