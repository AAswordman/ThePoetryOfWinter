import ExGameClient from "../modules/exmc/ExGameClient.js";
import MenuUIAlert from "./ui/MenuUIAlert.js";
import menuFunctionUI from "./data/menuFunctionUI.js";
import ExPlayer from "../modules/exmc/entity/ExPlayer.js";
import GlobalSettings from "./cache/GlobalSettings.js";
import { Objective } from "../modules/exmc/entity/ExScoresManager.js";
import ExGameConfig from '../modules/exmc/ExGameConfig.js';
import TagCache from "../modules/exmc/storage/cache/TagCache.js";
import PomData from "./cache/PomData.js";
import TimeLoopTask from "../modules/exmc/utils/TimeLoopTask.js";
import TalentData, { Tanlent } from "./cache/TalentData.js";
import ExColorLoreUtil from "../modules/exmc/item/ExColorLoreUtil.js";
import ExEntity from '../modules/exmc/entity/ExEntity';
import MathUtil from "../modules/exmc/utils/MathUtil.js";
export default class PomClient extends ExGameClient {
    constructor(server, id, player) {
        super(server, id, player);
        this.strikeSkill = true;
        this.strikeLoop = new TimeLoopTask(this, () => {
            this.strikeSkill = true;
        }).delay(10000);
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
            const { item } = e;
            if (item.id == "wb:power") {
                new MenuUIAlert(this, menuFunctionUI).showPage(["main", "notice"]);
            }
        });
        this.getEvents().exEvents.playerHitEntity.subscribe((e) => {
            var _a, _b, _c, _d;
            let item = this.exPlayer.getBag().getItemOnHand();
            if (!item)
                return;
            let lore = new ExColorLoreUtil(item);
            let damageFac = 0;
            let extraDamage = 0;
            let target = ExEntity.getInstance(e.hurtEntity);
            let CLOAD_PIERCING = MathUtil.zeroIfNaN(parseFloat(((_a = lore.getValueUseMap("addtion", Tanlent.getCharacter(Tanlent.CLOAD_PIERCING))) !== null && _a !== void 0 ? _a : "->0").split("->")[1]));
            let dis = target.getPosition().distance(this.exPlayer.getPosition());
            damageFac += Math.min(64, dis) / 64 * CLOAD_PIERCING / 100;
            let ARMOR_BREAKING = MathUtil.zeroIfNaN(parseFloat(((_b = lore.getValueUseMap("addtion", Tanlent.getCharacter(Tanlent.ARMOR_BREAKING))) !== null && _b !== void 0 ? _b : "->0").split("->")[1]));
            extraDamage += this.exPlayer.getMaxHealth() * ARMOR_BREAKING / 100;
            let SANCTION = MathUtil.zeroIfNaN(parseFloat(((_c = lore.getValueUseMap("addtion", Tanlent.getCharacter(Tanlent.SANCTION))) !== null && _c !== void 0 ? _c : "->0").split("->")[1]));
            damageFac += (16 - Math.min(16, dis)) / 16 * SANCTION / 100;
            let SUDDEN_STRIKE = MathUtil.zeroIfNaN(parseFloat(((_d = lore.getValueUseMap("addtion", Tanlent.getCharacter(Tanlent.SUDDEN_STRIKE))) !== null && _d !== void 0 ? _d : "->0").split("->")[1]));
            if (item.id.startsWith("dec:"))
                damageFac += 0.4;
            if (this.strikeSkill) {
                this.strikeLoop.startOnce();
                this.strikeSkill = false;
                damageFac += SUDDEN_STRIKE / 100;
            }
            let damage = e.damage * damageFac + extraDamage;
            target.removeHealth(this, damage);
            ExGameConfig.console.info("hit" + (e.damage + damage), `damageFac:${damageFac} extraDamage:${extraDamage}`);
        });
        this.getEvents().exEvents.playerHurt.subscribe((e) => {
            var _a;
            let beforeHealth = (_a = this.exPlayer["nowHealth"]) !== null && _a !== void 0 ? _a : this.exPlayer.getMaxHealth();
            let realDamage = Math.max(0, beforeHealth - this.exPlayer.getHealth());
            ExGameConfig.console.info("hurt by" + e.damage + " health:");
            this.exPlayer["nowHealth"] = this.exPlayer.getHealth();
        });
        this.getEvents().exEvents.itemOnHandChange.subscribe((e) => {
            var _a, _b, _c, _d;
            ExGameConfig.console.info("onHandChange:" + ((_a = e.beforeItem) === null || _a === void 0 ? void 0 : _a.id) + " -> " + ((_b = e.afterItem) === null || _b === void 0 ? void 0 : _b.id));
            if (((_c = e.afterItem) === null || _c === void 0 ? void 0 : _c.id.startsWith("wb:sword_")) || ((_d = e.afterItem) === null || _d === void 0 ? void 0 : _d.id.startsWith("wb:staff_"))) {
                TalentData.calculateTalent(this.data.talent, e.afterItem);
                this.exPlayer.getBag().setItem(this.exPlayer.selectedSlot, e.afterItem);
            }
        });
    }
    onLoaded() {
        this.gameId = ExPlayer.getInstance(this.player).getScoresManager().getScore("wbldid");
        if (this.player.hasTag("wbmsyh")) {
            this.player.nameTag = "§a" + this.player.nameTag;
        }
        else {
            this.player.nameTag = "§c" + this.player.nameTag;
        }
    }
    onLeave() {
        this.looper.stop();
        this.cache.save();
        super.onLeave();
    }
    getPlayersAndIds() {
        return this.runOnServer((server) => {
            let arr = [];
            for (let i of server.getClients()) {
                arr.push([i.player, i.gameId]);
            }
            return arr;
        });
    }
    sayTo(str, p = this.player) {
        p.runCommand(`tellraw @s {"rawtext": [{"text": "${str}"}]}`);
    }
}
//# sourceMappingURL=PomClient.js.map