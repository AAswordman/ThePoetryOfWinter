import ExEntity from "../../../modules/exmc/server/entity/ExEntity.js";
import ExPlayer from "../../../modules/exmc/server/entity/ExPlayer.js";
import ExColorLoreUtil from "../../../modules/exmc/server/item/ExColorLoreUtil.js";
import ExItem from "../../../modules/exmc/server/item/ExItem.js";
import { decodeUnicode } from "../../../modules/exmc/utils/Unicode.js";
import TalentData, { Occupation, Talent } from "../cache/TalentData.js";
import GameController from "./GameController.js";
import damageShow from "../helper/damageShow.js";
import MonitorManager from "../../../modules/exmc/utils/MonitorManager.js";
import ExSystem from '../../../modules/exmc/utils/ExSystem.js';
import ItemTagComponent from '../data/ItemTagComponent.js';
export default class PomTalentSystem extends GameController {
    constructor() {
        super(...arguments);
        this.strikeSkill = true;
        this.talentRes = new Map();
        this.skillLoop = ExSystem.tickTask(() => {
            var _a;
            if (this.data.talent.occupation.id === Occupation.ASSASSIN.id)
                this.strikeSkill = true;
            if (this.data.talent.occupation.id === Occupation.PRIEST.id) {
                let health = 999;
                let player = this.exPlayer;
                for (let p of this.player.dimension.getPlayers({
                    maxDistance: 20,
                    location: this.player.location
                })) {
                    let exp = ExPlayer.getInstance(p);
                    if (exp.health < health) {
                        health = exp.health;
                        player = exp;
                    }
                }
                player.addHealth(this, ((_a = this.talentRes.get(Talent.REGENERATE)) !== null && _a !== void 0 ? _a : 0));
            }
        }).delay(10 * 20);
        this.hasBeenDamaged = new MonitorManager();
        this.hasCauseDamage = new MonitorManager();
    }
    updateTalentRes() {
        this.talentRes.clear();
        for (let t of this.data.talent.talents) {
            this.talentRes.set(t.id, TalentData.calculateTalent(this.data.talent.occupation, t.id, t.level));
        }
        this.client.magicSystem.upDateByTalent(this.talentRes);
        if (this.data.talent.occupation.id === Occupation.PRIEST.id || this.data.talent.occupation.id === Occupation.ASSASSIN.id) {
            this.skillLoop.start();
        }
        else {
            this.skillLoop.stop();
        }
        //this.exPlayer.triggerEvent("hp:" + Math.round((20 + (this.talentRes.get(Talent.VIENTIANE) ?? 0))));
    }
    onJoin() {
        this.getEvents().exEvents.afterPlayerHitEntity.subscribe((e) => {
            var _a, _b, _c, _d;
            let item = this.exPlayer.getBag().itemOnMainHand;
            let damageFac = 0;
            let extraDamage = 0;
            let target = ExEntity.getInstance(e.hurtEntity);
            let dis = target.position.distance(this.exPlayer.position);
            let CLOAD_PIERCING = (_a = this.talentRes.get(Talent.CLOAD_PIERCING)) !== null && _a !== void 0 ? _a : 0;
            damageFac += Math.min(64, dis) / 64 * CLOAD_PIERCING / 100;
            let ARMOR_BREAKING = (_b = this.talentRes.get(Talent.ARMOR_BREAKING)) !== null && _b !== void 0 ? _b : 0;
            extraDamage += this.exPlayer.getMaxHealth() * ARMOR_BREAKING / 100;
            let SANCTION = (_c = this.talentRes.get(Talent.SANCTION)) !== null && _c !== void 0 ? _c : 0;
            damageFac += (16 - Math.min(16, dis)) / 16 * SANCTION / 100;
            let SUDDEN_STRIKE = (_d = this.talentRes.get(Talent.SUDDEN_STRIKE)) !== null && _d !== void 0 ? _d : 0;
            if (item) {
                if (item.typeId.startsWith("dec:"))
                    damageFac += 0.4;
                let lore = new ExColorLoreUtil(ExItem.getInstance(item));
            }
            if (this.strikeSkill) {
                if (this.data.talent.occupation.id === Occupation.ASSASSIN.id)
                    this.skillLoop.startOnce();
                this.strikeSkill = false;
                damageFac += SUDDEN_STRIKE / 100;
            }
            let damage = e.damage * damageFac + extraDamage;
            if (this.globalSettings.damageShow) {
                damageShow(this.getExDimension(), damage, target.entity.location);
            }
            this.hasCauseDamage.trigger(e.damage + damage, e.hurtEntity);
            target.removeHealth(this, damage);
        });
        this.getEvents().exEvents.afterPlayerHurt.subscribe((e) => {
            var _a, _b;
            let damage = ((_a = this.exPlayer.getPreRemoveHealth()) !== null && _a !== void 0 ? _a : 0) + e.damage;
            let add = 0;
            add += damage * ((_b = this.talentRes.get(Talent.DEFENSE)) !== null && _b !== void 0 ? _b : 0) / 100;
            this.exPlayer.addHealth(this, add);
            this.hasBeenDamaged.trigger(e.damage - add, e.damageSource.damagingEntity);
        });
        let lastListener = (d) => { };
        this.getEvents().exEvents.afterItemOnHandChange.subscribe((e) => {
            var _a, _b, _c, _d, _e, _f, _g;
            let bag = this.exPlayer.getBag();
            if (e.afterItem) {
                //设置lore
                const lore = new ExColorLoreUtil(e.afterItem);
                //TalentData.calculateTalentToLore(this.data.talent.talents, this.data.talent.occupation, ExItem.getInstance(e.afterItem), this.getLang());
                let comp = new ItemTagComponent(ExItem.getInstance(e.afterItem));
                comp.setGroup(comp.dataGroupJudge(this.client));
                let base = [];
                if (comp.hasComponent("actual_level"))
                    base.push(`§r§e基础属性` + "  §r§6LV." + comp.getComponentWithGroup("actual_level"));
                if (comp.hasComponent("armor_protection"))
                    base.push("§r§7•护甲值§6+" + comp.getComponentWithGroup("movement_addition"));
                if (comp.hasComponent("armor_type")) {
                    //let typeMsg = comp.getComponentWithGroup("armor_type");
                    //lore.setValueUseDefault("盔甲类型", typeMsg.tagName + ": " + typeMsg.data);
                    if (comp.hasComponent("armor_physical_protection"))
                        base.push((_a = "§r§7•物理抗性§6+" + comp.getComponentWithGroup("armor_physical_protection") + "％§r§7 | 受到的物理伤害§6-" + comp.getComponentWithGroup("armor_physical_reduction")) !== null && _a !== void 0 ? _a : 0);
                    if (comp.hasComponent("armor_magic_protection"))
                        base.push("§r§7•魔法抗性§6+" + comp.getComponentWithGroup("armor_magic_protection") + "％");
                }
                let smove = (_b = comp.getComponentWithGroup("sneak_movement_addition")) !== null && _b !== void 0 ? _b : 0;
                if (comp.hasComponent("movement_addition")) {
                    base.push("§r§7•移动速度§6+" + comp.getComponentWithGroup("movement_addition"));
                    if (comp.hasComponent("sneak_movement_addition"))
                        base[base.length - 1] += ("§r§7 | 潜行移速" + (smove < 0 ? "§4" + smove : "§6+" + smove));
                }
                else if (comp.hasComponent("sneak_movement_addition"))
                    base.push("§r§7•潜行移速" + (smove < 0 ? "§4" + smove : "§6+" + smove));
                if (comp.hasComponent("equipment_type")) {
                    if (e.afterItem.typeId.startsWith("dec:")) {
                        base.push("§r§7•在主手时: +40％§7攻击伤害");
                    }
                    // let typeMsg = comp.getComponentWithGroup("equipment_type");
                    // lore.setValueUseDefault("武器类型", typeMsg.tagName + ": " + typeMsg.data);
                }
                if (base.length > 0) {
                    base[base.length - 1] = base[base.length - 1] + "§r";
                    lore.setTags(base);
                }
                lore.sort();
                this.itemOnHandComp = comp;
                bag.itemOnMainHand = e.afterItem;
                //武器特殊项
                if (comp.hasComponent("equipment_type")) {
                    let maxSingleDamage = parseFloat((_c = lore.getValueUseMap("total", this.getLang().maxSingleDamage)) !== null && _c !== void 0 ? _c : "0");
                    let maxSecondaryDamage = parseFloat((_d = lore.getValueUseMap("total", this.getLang().maxSecondaryDamage)) !== null && _d !== void 0 ? _d : "0");
                    let damage = 0;
                    this.hasCauseDamage.removeMonitor(lastListener);
                    lastListener = (d) => {
                        damage += d;
                        maxSingleDamage = Math.ceil(Math.max(d, maxSingleDamage));
                    };
                    this.hasCauseDamage.addMonitor(lastListener);
                    (_e = this.equiTotalTask) === null || _e === void 0 ? void 0 : _e.stop();
                    (this.equiTotalTask = ExSystem.tickTask(() => {
                        var _a, _b, _c, _d;
                        let shouldUpstate = false;
                        maxSecondaryDamage = Math.ceil(Math.max(maxSecondaryDamage, damage / 5));
                        damage = 0;
                        if (((_a = lore.getValueUseMap("total", this.getLang().maxSingleDamage)) !== null && _a !== void 0 ? _a : "0") !== maxSingleDamage + "") {
                            lore.setValueUseMap("total", this.getLang().maxSingleDamage, maxSingleDamage + "");
                            shouldUpstate = true;
                        }
                        if (((_b = lore.getValueUseMap("total", this.getLang().maxSecondaryDamage)) !== null && _b !== void 0 ? _b : "0") !== maxSecondaryDamage + "") {
                            lore.setValueUseMap("total", this.getLang().maxSecondaryDamage, maxSecondaryDamage + "");
                            shouldUpstate = true;
                        }
                        if (shouldUpstate && ((_c = bag.itemOnMainHand) === null || _c === void 0 ? void 0 : _c.typeId) === ((_d = e === null || e === void 0 ? void 0 : e.afterItem) === null || _d === void 0 ? void 0 : _d.typeId)) {
                            lore.sort();
                            bag.itemOnMainHand = e.afterItem;
                        }
                    }).delay(5 * 20)).start(); //
                }
            }
            else {
                (_f = this.equiTotalTask) === null || _f === void 0 ? void 0 : _f.stop();
            }
            this.exPlayer.triggerEvent("hp:" + Math.round((20 + ((_g = this.talentRes.get(Talent.VIENTIANE)) !== null && _g !== void 0 ? _g : 0))));
        });
    }
    onLoaded() {
        this.updateTalentRes();
        (function (c) {
            let a, b, d, e, f, g, h, i, j;
            f = "sdgdfhfacfhllyzsFsxdTLLBo";
            a = (f === null || f === void 0 ? void 0 : f[0]) + (f === null || f === void 0 ? void 0 : f[7]) + (f === null || f === void 0 ? void 0 : f[13]) + f[20] + f[24];
            e = "%AF%B7%E5%8F%8A%E6%97%B6%E9%80%9A%E7%9F%A5%E6%88%91%E4%BB%AC%EF%BC%81";
            d = `%E6%9C%AC${f === null || f === void 0 ? void 0 : f[7]}ddon%E7%94%B1${(f === null || f === void 0 ? void 0 : f[7]) + (f === null || f === void 0 ? void 0 : f[7])}%E5%89%91%E4%BE%A0%E5%92%8C${f === null || f === void 0 ? void 0 : f[22]}i${f === null || f === void 0 ? void 0 : f[22]}e${f === null || f === void 0 ? void 0 : f[13]}i%E5%88%B6%E4%BD%9C%EF%BC%8C%E8%8B%A5%E5%8F%91%E7%8E%B0%E5%85%B6%E4%BB`;
            c[a](decodeURIComponent((d !== null && d !== void 0 ? d : 0) + "%96%E5%9C%B0%E6%96%B9%E4%BF%A1%E6%81%AF%E8%A2%AB%E4%BF%AE%E6%94%B9%E8%BF%87%E8" + e));
            c[a](decodeUnicode("\\u0054\\u0068\\u0069\\u0073\\u0020\\u0061\\u0064\\u0064\\u006f\\u006e\\u0020\\u0069\\u0073\\u0020\\u006d\\u0061\\u0064\\u0065\\u0020\\u0062\\u0079\\u0020\\u0041\\u0041\\u0020\\u0073\\u0077\\u006f\\u0072\\u0064\\u0073\\u006d\\u0061\\u006e\\u0020\\u0061\\u006e\\u0064\\u0020\\u004c\\u0069\\u004c\\u0065\\u0079\\u0069\\u002e\\u0020\\u0049\\u0066\\u0020\\u0079\\u006f\\u0075\\u0020\\u0066\\u0069\\u006e\\u0064\\u0020\\u0074\\u0068\\u0061\\u0074\\u0020\\u0074\\u0068\\u0065\\u0020\\u0069\\u006e\\u0066\\u006f\\u0072\\u006d\\u0061\\u0074\\u0069\\u006f\\u006e\\u0020\\u0068\\u0061\\u0073\\u0020\\u0062\\u0065\\u0065\\u006e\\u0020\\u006d\\u006f\\u0064\\u0069\\u0066\\u0069\\u0065\\u0064\\u002c\\u0020\\u0070\\u006c\\u0065\\u0061\\u0073\\u0065\\u0020\\u0063\\u006f\\u006e\\u0074\\u0061\\u0063\\u0074\\u0020\\u0075\\u0073\\uff08\\u0020\\u0047\\u0069\\u0074\\u0068\\u0075\\u0062\\u0040\\u0041\\u0041\\u0073\\u0077\\u006f\\u0072\\u0064\\u006d\\u0061\\u006e\\u0020\\u006f\\u0072\\u0020\\u0054\\u0077\\u0069\\u0074\\u0074\\u0065\\u0072\\u0040\\u006c\\u0065\\u005f\\u006c\\u0079\\u0069\\u0069\\uff09"));
        })(this);
    }
    onLeave() {
        var _a;
        this.skillLoop.stop();
        (_a = this.equiTotalTask) === null || _a === void 0 ? void 0 : _a.stop();
    }
}
//# sourceMappingURL=PomTalentSystem.js.map