import ExGameClient from "../modules/exmc/ExGameClient.js";
import { Player, EntityQueryOptions } from 'mojang-minecraft';
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
import TalentData, { Tanlent, Occupation } from "./cache/TalentData.js";
import ExColorLoreUtil from "../modules/exmc/item/ExColorLoreUtil.js";
import ExEntity from '../modules/exmc/entity/ExEntity';
import MathUtil from "../modules/exmc/utils/MathUtil.js";

export default class PomClient extends ExGameClient {
	gameId !: number;
	globalSettings: GlobalSettings;

	cache: TagCache<PomData>;
	strikeSkill = true;
	skillLoop = new TimeLoopTask(this, () => {
		if (this.data.talent.occupation.id === Occupation.ASSASSIN.id) this.strikeSkill = true;
		if (this.data.talent.occupation.id === Occupation.PRIEST.id) {
			let query = new EntityQueryOptions();
			query.maxDistance = 20;
			query.location = this.player.location;
			let health = 999;
			let player: ExPlayer = this.exPlayer;
			for (let p of this.player.dimension.getPlayers(query)) {
				let exp = ExPlayer.getInstance(p);
				if (exp.getHealth() < health) {
					health = exp.getHealth();
					player = exp;
				}
			}
			player.addHealth(this, 20);
		}
	}).delay(10000);

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
		
		if (this.data.talent.occupation.id === Occupation.PRIEST.id) this.skillLoop.start();
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



		//职业
		this.getEvents().exEvents.playerHitEntity.subscribe((e) => {
			let item = this.exPlayer.getBag().getItemOnHand();
			let damageFac = 0;
			let extraDamage = 0;
			let target = ExEntity.getInstance(e.hurtEntity);
			let dis = target.getPosition().distance(this.exPlayer.getPosition());
			if (!item) {
				let CLOAD_PIERCING = this.talentRes.get(Tanlent.CLOAD_PIERCING) ?? 0;

				damageFac += Math.min(64, dis) / 64 * CLOAD_PIERCING / 100;
				let ARMOR_BREAKING = this.talentRes.get(Tanlent.ARMOR_BREAKING) ?? 0;
				extraDamage += this.exPlayer.getMaxHealth() * ARMOR_BREAKING / 100;

				let SANCTION = this.talentRes.get(Tanlent.SANCTION) ?? 0;
				damageFac += (16 - Math.min(16, dis)) / 16 * SANCTION / 100;
				let SUDDEN_STRIKE = this.talentRes.get(Tanlent.SUDDEN_STRIKE) ?? 0;
				if (this.strikeSkill) {
					if (this.data.talent.occupation.id === Occupation.ASSASSIN.id) this.skillLoop.startOnce();
					this.strikeSkill = false;
					damageFac += SUDDEN_STRIKE / 100;
				}

			} else {
				let lore = new ExColorLoreUtil(item);

				let CLOAD_PIERCING = MathUtil.zeroIfNaN(parseFloat((lore.getValueUseMap("addition", Tanlent.getCharacter(Tanlent.CLOAD_PIERCING)) ?? "->0").split("->")[1]));

				damageFac += Math.min(64, dis) / 64 * CLOAD_PIERCING / 100;
				let ARMOR_BREAKING = MathUtil.zeroIfNaN(parseFloat((lore.getValueUseMap("addition", Tanlent.getCharacter(Tanlent.ARMOR_BREAKING)) ?? "->0").split("->")[1]));
				extraDamage += this.exPlayer.getMaxHealth() * ARMOR_BREAKING / 100;
				let SANCTION = MathUtil.zeroIfNaN(parseFloat((lore.getValueUseMap("addition", Tanlent.getCharacter(Tanlent.SANCTION)) ?? "->0").split("->")[1]));
				damageFac += (16 - Math.min(16, dis)) / 16 * SANCTION / 100;


				let SUDDEN_STRIKE = MathUtil.zeroIfNaN(parseFloat((lore.getValueUseMap("addition", Tanlent.getCharacter(Tanlent.SUDDEN_STRIKE)) ?? "->0").split("->")[1]));
				if (item.id.startsWith("dec:")) damageFac += 0.4;
				if (this.strikeSkill) {
					if (this.data.talent.occupation.id === Occupation.ASSASSIN.id) this.skillLoop.startOnce();
					this.strikeSkill = false;
					damageFac += SUDDEN_STRIKE / 100;
				}
			}

			let damage = e.damage * damageFac + extraDamage;
			target.removeHealth(this, damage);
			ExGameConfig.console.info("hit" + (e.damage + damage), `damageFac:${damageFac} extraDamage:${extraDamage}`);
		});

		this.getEvents().exEvents.playerHurt.subscribe((e) => {
			let damage = (this.exPlayer.getPreRemoveHealth() ?? 0) + e.damage;
			let add = 0;
			add += damage * (this.talentRes.get(Tanlent.DEFENSE) ?? 0) / 100;

			this.exPlayer.addHealth(this, add);

			ExGameConfig.console.info("hurt by" + e.damage + " - " + add);
		});
		this.getEvents().exEvents.itemOnHandChange.subscribe((e) => {
			ExGameConfig.console.info("onHandChange:" + e.beforeItem?.id + " -> " + e.afterItem?.id);
			if (e.afterItem?.id.startsWith("wb:sword_") || e.afterItem?.id.startsWith("wb:staff_")) {
				TalentData.calculateTalentToLore(this.data.talent, e.afterItem);
				this.exPlayer.getBag().setItem(this.exPlayer.selectedSlot, e.afterItem);
			}
		});

	}
	talentRes: Map<number, number> = new Map<number, number>();
	updateTalentRes() {
		for (let t of this.data.talent.talents) {
			this.talentRes.set(t.id, TalentData.calculateTalent(this.data.talent, t.id, t.level));
		}
		this.exPlayer.getScoresManager().setScore("wbwqlqjs", Math.round(100 + (this.talentRes.get(Tanlent.DEFENSE) ?? 0)));


	}



	override onLoaded(): void {
		this.gameId = ExPlayer.getInstance(this.player).getScoresManager().getScore("wbldid");
		this.updateTalentRes();
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

