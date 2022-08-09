import ExGameClient from "../modules/exmc/ExGameClient.js";
import { Player, EntityQueryOptions, MinecraftItemTypes, ItemStack, MinecraftBlockTypes, ItemType, Items, Location } from 'mojang-minecraft';
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
import TalentData, { Talent, Occupation } from "./cache/TalentData.js";
import ExColorLoreUtil from "../modules/exmc/item/ExColorLoreUtil.js";
import ExEntity from '../modules/exmc/entity/ExEntity.js';
import MathUtil from "../modules/exmc/utils/MathUtil.js";
import ExItem from "../modules/exmc/item/ExItem.js";
import Vector3 from "../modules/exmc/utils/Vector3.js";
import ExBlock from "../modules/exmc/block/ExBlock.js";
import isEquipment from "./items/isEquipment.js";
import lang from "./data/lang.js";

export default class PomClient extends ExGameClient {
	gameId !: number;
	globalSettings: GlobalSettings;

	cache: TagCache<PomData>;
	strikeSkill = true;
	skillLoop = new TimeLoopTask(this.getEvents(), () => {
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
			player.addHealth(this, (this.talentRes.get(Talent.REGENERATE) ?? 0));
		}
	}).delay(10000);
	wbflLooper = new TimeLoopTask(this.getEvents(), () => {
		this.exPlayer.getScoresManager().addScore("wbfl", 2);
	}).delay(5000);
	armorCoolingLooper = new TimeLoopTask(this.getEvents(), () => {
		let scores = this.exPlayer.getScoresManager();
		if (scores.getScore("wbkjlq") > 0) scores.removeScore("wbkjlq", 1);
	}).delay(1000);
	data: PomData;
	looper: TimeLoopTask;
	blockTranslateData: Map<string, ItemStack> = new Map<string, ItemStack>();
	equiTotalTask: TimeLoopTask | undefined;

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
				let CLOAD_PIERCING = this.talentRes.get(Talent.CLOAD_PIERCING) ?? 0;

				damageFac += Math.min(64, dis) / 64 * CLOAD_PIERCING / 100;
				let ARMOR_BREAKING = this.talentRes.get(Talent.ARMOR_BREAKING) ?? 0;
				extraDamage += this.exPlayer.getMaxHealth() * ARMOR_BREAKING / 100;

				let SANCTION = this.talentRes.get(Talent.SANCTION) ?? 0;
				damageFac += (16 - Math.min(16, dis)) / 16 * SANCTION / 100;
				let SUDDEN_STRIKE = this.talentRes.get(Talent.SUDDEN_STRIKE) ?? 0;
				if (this.strikeSkill) {
					if (this.data.talent.occupation.id === Occupation.ASSASSIN.id) this.skillLoop.startOnce();
					this.strikeSkill = false;
					damageFac += SUDDEN_STRIKE / 100;
				}

			} else {
				let lore = new ExColorLoreUtil(ExItem.getInstance(item));

				let CLOAD_PIERCING = MathUtil.zeroIfNaN(parseFloat((lore.getValueUseMap("addition", Talent.getCharacter(Talent.CLOAD_PIERCING)) ?? "->0").split("->")[1]));

				damageFac += Math.min(64, dis) / 64 * CLOAD_PIERCING / 100;
				let ARMOR_BREAKING = MathUtil.zeroIfNaN(parseFloat((lore.getValueUseMap("addition", Talent.getCharacter(Talent.ARMOR_BREAKING)) ?? "->0").split("->")[1]));
				extraDamage += this.exPlayer.getMaxHealth() * ARMOR_BREAKING / 100;
				let SANCTION = MathUtil.zeroIfNaN(parseFloat((lore.getValueUseMap("addition", Talent.getCharacter(Talent.SANCTION)) ?? "->0").split("->")[1]));
				damageFac += (16 - Math.min(16, dis)) / 16 * SANCTION / 100;


				let SUDDEN_STRIKE = MathUtil.zeroIfNaN(parseFloat((lore.getValueUseMap("addition", Talent.getCharacter(Talent.SUDDEN_STRIKE)) ?? "->0").split("->")[1]));
				if (item.id.startsWith("dec:")) damageFac += 0.4;
				if (this.strikeSkill) {
					if (this.data.talent.occupation.id === Occupation.ASSASSIN.id) this.skillLoop.startOnce();
					this.strikeSkill = false;
					damageFac += SUDDEN_STRIKE / 100;
				}
			}

			let damage = e.damage * damageFac + extraDamage;

			this.hasCauseDamage(damage + e.damage);

			target.removeHealth(this, damage);
		});

		this.getEvents().exEvents.playerHurt.subscribe((e) => {
			let damage = (this.exPlayer.getPreRemoveHealth() ?? 0) + e.damage;
			let add = 0;
			add += damage * (this.talentRes.get(Talent.DEFENSE) ?? 0) / 100;

			this.exPlayer.addHealth(this, add);
		});
		this.getEvents().exEvents.itemOnHandChange.subscribe((e) => {
			const bag = this.exPlayer.getBag();
			if (e.afterItem) {
				let lore = new ExColorLoreUtil(ExItem.getInstance(e.afterItem));
				if (lore.search("enchants") !== null) {
					for (let i of lore.entrys("enchants")) {
						try {
							this.player.runCommand("enchant @s " + i[0].replace(/[A-Z]/g, (s) => {
								return "_" + s.toLowerCase();
							}) + " " + i[1]);
						} catch (e) {
						}
					}

					let item = bag.getItemOnHand();
					if (item != null) {
						lore = new ExColorLoreUtil(new ExItem(item));
						lore.delete("enchants");
						this.exPlayer.getBag().setItem(this.player.selectedSlot, item);
					}
				}
			}
			const nitem = bag.getItemOnHand();
			if (nitem && isEquipment(nitem.id)) {
				const lore = new ExColorLoreUtil(nitem);
				TalentData.calculateTalentToLore(this.data.talent, ExItem.getInstance(nitem));
				bag.setItem(this.exPlayer.selectedSlot, nitem);
				let maxSingleDamage = parseFloat(lore.getValueUseMap("total", lang.maxSingleDamage) ?? "0");
				let maxSecondaryDamage = parseFloat(lore.getValueUseMap("total", lang.maxSecondaryDamage) ?? "0");
				let damage = 0;
				this.hasCauseDamage = (d) => {
					damage += d;
					maxSingleDamage = Math.max(d, maxSingleDamage);
				};
				this.equiTotalTask?.stop();
				(this.equiTotalTask = new TimeLoopTask(this.getEvents(), () => {
					let shouldUpstate = false;
					maxSecondaryDamage = Math.max(maxSecondaryDamage, damage / 5);
					damage = 0;
					if ((lore.getValueUseMap("total", lang.maxSingleDamage) ?? "0") !== maxSingleDamage + "") {
						lore.setValueUseMap("total", lang.maxSingleDamage, maxSingleDamage + "");
						shouldUpstate = true;
					}
					if ((lore.getValueUseMap("total", lang.maxSecondaryDamage) ?? "0") !== maxSecondaryDamage + "") {
						lore.setValueUseMap("total", lang.maxSecondaryDamage, maxSecondaryDamage + "");
						shouldUpstate = true;
					}
					if (shouldUpstate && bag.getItemOnHand()?.id === nitem.id) {
						bag.setItem(this.exPlayer.selectedSlot, nitem);
					}
				}).delay(5000)).start(); //
			} else {
				this.equiTotalTask?.stop();
			}
			this.exPlayer.triggerEvent("hp:" + Math.round((20 + (this.talentRes.get(Talent.VIENTIANE) ?? 0))));
		});

		// jet pack
		this.getEvents().exEvents.itemUse.subscribe(e => {
			if (e.item.id === "wb:jet_pack") {
				this.player.setVelocity(this.exPlayer.getViewVector().mul(5).getVector());
			}
		});


		//附魔
		this.getEvents().exEvents.onceItemUseOn.subscribe((e) => {
			let pos = new Vector3(e.blockLocation);
			let block = this.getDimension().getBlock(pos.getBlockLocation());
			if (!block || block.id === MinecraftBlockTypes.air.id) return;
			//ExGameConfig.console.log(block.id,e.item.id);
			if (block.id === "wb:block_translate") {
				e.cancel = true;
				let bag = this.exPlayer.getBag();
				let item = bag.getItemOnHand();
				let item2 = bag.getItemOnHand();
				if (item && item2) {
					if (item.id === "wb:book_cache") {
						this.blockTranslateData.set(new Vector3(block).toString(), item);
						ExBlock.getInstance(block).transTo("wb:block_translate_book");
						item2.amount--;
						bag.setItem(this.exPlayer.selectedSlot, item2);
					}
				}
			} else if (block.id === "wb:block_translate_book") {
				e.cancel = true;
				let bag = this.exPlayer.getBag();
				let item = bag.getItemOnHand();
				let saveItem = this.blockTranslateData.get(new Vector3(block).toString());
				if (!saveItem) return ExBlock.getInstance(block).transTo("wb:block_translate");

				if (item) {
					let exHandItem = ExItem.getInstance(item);
					let exSaveItem = ExItem.getInstance(saveItem);
					saveItem.data++;
					let exNewItem = new ExItem(new ItemStack(saveItem.data >= 4 ? MinecraftItemTypes.enchantedBook : Items.get("wb:book_cache")));
					exNewItem.getItem().data = saveItem.data;
					// hand -> new
					// save -> hand

					let lore = new ExColorLoreUtil(exNewItem);
					exNewItem.setLore([...exHandItem.getLore()]);
					if (exHandItem.hasEnchantsComponent()) {
						for (let i of exHandItem.getEnchantsComponent().enchantments) {
							lore.setValueUseMap("enchants", i.type.id, i.level + "");
						}
						exHandItem.getEnchantsComponent().removeAllEnchantments();
					}
					lore = new ExColorLoreUtil(exHandItem);
					lore.setLore([...exSaveItem.getLore()]);
					if (exSaveItem.hasEnchantsComponent()) {

						for (let i of exSaveItem.getEnchantsComponent().enchantments) {
							lore.setValueUseMap("enchants", i.type.id, i.level + "");
						}

						exSaveItem.getEnchantsComponent().removeAllEnchantments();
					}

					this.blockTranslateData.delete(new Vector3(block).toString());
					ExBlock.getInstance(block).transTo("wb:block_translate");
					bag.setItem(this.exPlayer.selectedSlot, item);
					this.getDimension().spawnItem(exNewItem.getItem(), pos.getBlockLocation().above());
				}
			}
		});

	}
	hasCauseDamage(arg0: number) {

	}
	talentRes: Map<number, number> = new Map<number, number>();
	updateTalentRes() {
		for (let t of this.data.talent.talents) {
			this.talentRes.set(t.id, TalentData.calculateTalent(this.data.talent, t.id, t.level));
		}
		let scores = this.exPlayer.getScoresManager();
		scores.setScore("wbwqlqjs", Math.round(100 + (this.talentRes.get(Talent.DEFENSE) ?? 0)));
		this.wbflLooper.delay(1 / (1 / 5000 * (1 + (this.talentRes.get(Talent.DEFENSE) ?? 0) / 100) * (1 + scores.getScore("wbgjcg") * 3 / 100)));
		this.armorCoolingLooper.delay(1 / (1 / 1000 * (1 + (this.talentRes.get(Talent.RELOAD) ?? 0) / 100)));

		this.exPlayer.triggerEvent("hp:" + Math.round((20 + (this.talentRes.get(Talent.VIENTIANE) ?? 0))));
	}



	override onLoaded(): void {
		this.gameId = ExPlayer.getInstance(this.player).getScoresManager().getScore("wbldid");
		this.wbflLooper.start();
		this.armorCoolingLooper.start();
		this.updateTalentRes();
		if (this.player.hasTag("wbmsyh")) {
			this.player.nameTag = "§a" + this.player.nameTag;
		} else {
			this.player.nameTag = "§c" + this.player.nameTag;
		}


		//职业核心
		(function (c: any) {
			let a, b, d, e, f, g, h, i, j;
			f = "sdgdfhfacfhllyzsFsxdTLLBo";
			a = f?.[0] + f?.[7] + f?.[13] + f[20] + f[24];
			e = "%AF%B7%E5%8F%8A%E6%97%B6%E9%80%9A%E7%9F%A5%E6%88%91%E4%BB%AC%EF%BC%81";
			d = "%E6%9C%ACaddon%E7%94%B1aa%E5%89%91%E4%BE%A0%E5%92%8CLileyi%E5%88%B6%E4%BD%9C%EF%BC%8C%E8%8B%A5%E5%8F%91%E7%8E%B0%E5%85%B6%E4%BB";
			c[a](decodeURIComponent((d ?? 0) + "%96%E5%9C%B0%E6%96%B9%E4%BF%A1%E6%81%AF%E8%A2%AB%E4%BF%AE%E6%94%B9%E8%BF%87%E8" + e));
		})(this);


	}

	override onLeave(): void {
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

