import MathUtil from "../../../modules/exmc/math/MathUtil.js";
import ExEntity from "../../../modules/exmc/server/entity/ExEntity.js";
import ExPlayer from "../../../modules/exmc/server/entity/ExPlayer.js";
import ExColorLoreUtil from "../../../modules/exmc/server/item/ExColorLoreUtil.js";
import ExItem from "../../../modules/exmc/server/item/ExItem.js";
import TimeLoopTask from "../../../modules/exmc/utils/TimeLoopTask.js";
import { decodeUnicode } from "../../../modules/exmc/utils/Unicode.js";
import TalentData, { Occupation, Talent } from "../cache/TalentData.js";
import isEquipment from "../items/isEquipment.js";
import GameController from "./GameController.js";
import ExGameVector3 from '../../../modules/exmc/server/math/ExGameVector3';
export default class PomTalentSystem extends GameController {
    constructor() {
        super(...arguments);
        this.strikeSkill = true;
        this.talentRes = new Map();
        this.skillLoop = new TimeLoopTask(this.getEvents(), () => {
            var _a;
            if (this.data.talent.occupation.id === Occupation.ASSASSIN.id)
                this.strikeSkill = true;
            if (this.data.talent.occupation.id === Occupation.PRIEST.id) {
                let query = {
                    maxDistance: 20,
                    location: ExGameVector3.getLocation(this.player.location)
                };
                let health = 999;
                let player = this.exPlayer;
                for (let p of this.player.dimension.getPlayers(query)) {
                    let exp = ExPlayer.getInstance(p);
                    if (exp.getHealth() < health) {
                        health = exp.getHealth();
                        player = exp;
                    }
                }
                player.addHealth(this, ((_a = this.talentRes.get(Talent.REGENERATE)) !== null && _a !== void 0 ? _a : 0));
            }
        }).delay(10000);
        this.hasBeenDamaged = [];
        this.hasCauseDamage = [];
    }
    updateTalentRes() {
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
        this.getEvents().exEvents.playerHitEntity.subscribe((e) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            let item = this.exPlayer.getBag().getItemOnHand();
            let damageFac = 0;
            let extraDamage = 0;
            let target = ExEntity.getInstance(e.hurtEntity);
            let dis = target.getPosition().distance(this.exPlayer.getPosition());
            if (!item) {
                let CLOAD_PIERCING = (_a = this.talentRes.get(Talent.CLOAD_PIERCING)) !== null && _a !== void 0 ? _a : 0;
                damageFac += Math.min(64, dis) / 64 * CLOAD_PIERCING / 100;
                let ARMOR_BREAKING = (_b = this.talentRes.get(Talent.ARMOR_BREAKING)) !== null && _b !== void 0 ? _b : 0;
                extraDamage += this.exPlayer.getMaxHealth() * ARMOR_BREAKING / 100;
                let SANCTION = (_c = this.talentRes.get(Talent.SANCTION)) !== null && _c !== void 0 ? _c : 0;
                damageFac += (16 - Math.min(16, dis)) / 16 * SANCTION / 100;
                let SUDDEN_STRIKE = (_d = this.talentRes.get(Talent.SUDDEN_STRIKE)) !== null && _d !== void 0 ? _d : 0;
                if (this.strikeSkill) {
                    if (this.data.talent.occupation.id === Occupation.ASSASSIN.id)
                        this.skillLoop.startOnce();
                    this.strikeSkill = false;
                    damageFac += SUDDEN_STRIKE / 100;
                }
            }
            else {
                let lore = new ExColorLoreUtil(ExItem.getInstance(item));
                let CLOAD_PIERCING = MathUtil.zeroIfNaN(parseFloat(((_e = lore.getValueUseMap("addition", Talent.getCharacter(this.getLang(), Talent.CLOAD_PIERCING))) !== null && _e !== void 0 ? _e : "->0").split("->")[1]));
                damageFac += Math.min(64, dis) / 64 * CLOAD_PIERCING / 100;
                let ARMOR_BREAKING = MathUtil.zeroIfNaN(parseFloat(((_f = lore.getValueUseMap("addition", Talent.getCharacter(this.getLang(), Talent.ARMOR_BREAKING))) !== null && _f !== void 0 ? _f : "->0").split("->")[1]));
                extraDamage += this.exPlayer.getMaxHealth() * ARMOR_BREAKING / 100;
                let SANCTION = MathUtil.zeroIfNaN(parseFloat(((_g = lore.getValueUseMap("addition", Talent.getCharacter(this.getLang(), Talent.SANCTION))) !== null && _g !== void 0 ? _g : "->0").split("->")[1]));
                damageFac += (16 - Math.min(16, dis)) / 16 * SANCTION / 100;
                let SUDDEN_STRIKE = MathUtil.zeroIfNaN(parseFloat(((_h = lore.getValueUseMap("addition", Talent.getCharacter(this.getLang(), Talent.SUDDEN_STRIKE))) !== null && _h !== void 0 ? _h : "->0").split("->")[1]));
                if (item.typeId.startsWith("dec:"))
                    damageFac += 0.4;
                if (this.strikeSkill) {
                    if (this.data.talent.occupation.id === Occupation.ASSASSIN.id)
                        this.skillLoop.startOnce();
                    this.strikeSkill = false;
                    damageFac += SUDDEN_STRIKE / 100;
                }
            }
            let damage = e.damage * damageFac + extraDamage;
            this.hasCauseDamage.forEach(i => i(e.damage + damage));
            target.removeHealth(this, damage);
        });
        this.getEvents().exEvents.playerHurt.subscribe((e) => {
            var _a, _b;
            let damage = ((_a = this.exPlayer.getPreRemoveHealth()) !== null && _a !== void 0 ? _a : 0) + e.damage;
            let add = 0;
            add += damage * ((_b = this.talentRes.get(Talent.DEFENSE)) !== null && _b !== void 0 ? _b : 0) / 100;
            this.exPlayer.addHealth(this, add);
            this.hasBeenDamaged.forEach(i => i(e.damage - add));
        });
        let lastListener = (d) => { };
        this.getEvents().exEvents.itemOnHandChange.subscribe((e) => {
            var _a, _b, _c, _d, _e;
            let bag = this.exPlayer.getBag();
            if (e.afterItem && isEquipment(e.afterItem.typeId)) {
                const lore = new ExColorLoreUtil(e.afterItem);
                TalentData.calculateTalentToLore(this.data.talent.talents, this.data.talent.occupation, ExItem.getInstance(e.afterItem), this.getLang());
                bag.setItem(this.exPlayer.selectedSlot, e.afterItem);
                let maxSingleDamage = parseFloat((_a = lore.getValueUseMap("total", this.getLang().maxSingleDamage)) !== null && _a !== void 0 ? _a : "0");
                let maxSecondaryDamage = parseFloat((_b = lore.getValueUseMap("total", this.getLang().maxSecondaryDamage)) !== null && _b !== void 0 ? _b : "0");
                let damage = 0;
                this.hasCauseDamage.splice(this.hasCauseDamage.indexOf(lastListener), 1);
                lastListener = (d) => {
                    damage += d;
                    maxSingleDamage = Math.max(d, maxSingleDamage);
                };
                this.hasCauseDamage.push(lastListener);
                (_c = this.equiTotalTask) === null || _c === void 0 ? void 0 : _c.stop();
                (this.equiTotalTask = new TimeLoopTask(this.getEvents(), () => {
                    var _a, _b, _c, _d;
                    let shouldUpstate = false;
                    maxSecondaryDamage = Math.max(maxSecondaryDamage, damage / 5);
                    damage = 0;
                    if (((_a = lore.getValueUseMap("total", this.getLang().maxSingleDamage)) !== null && _a !== void 0 ? _a : "0") !== maxSingleDamage + "") {
                        lore.setValueUseMap("total", this.getLang().maxSingleDamage, maxSingleDamage + "");
                        shouldUpstate = true;
                    }
                    if (((_b = lore.getValueUseMap("total", this.getLang().maxSecondaryDamage)) !== null && _b !== void 0 ? _b : "0") !== maxSecondaryDamage + "") {
                        lore.setValueUseMap("total", this.getLang().maxSecondaryDamage, maxSecondaryDamage + "");
                        shouldUpstate = true;
                    }
                    if (shouldUpstate && ((_c = bag.getItemOnHand()) === null || _c === void 0 ? void 0 : _c.typeId) === ((_d = e === null || e === void 0 ? void 0 : e.afterItem) === null || _d === void 0 ? void 0 : _d.typeId)) {
                        bag.setItem(this.exPlayer.selectedSlot, e.afterItem);
                    }
                }).delay(5000)).start(); //
            }
            else {
                (_d = this.equiTotalTask) === null || _d === void 0 ? void 0 : _d.stop();
            }
            this.exPlayer.triggerEvent("hp:" + Math.round((20 + ((_e = this.talentRes.get(Talent.VIENTIANE)) !== null && _e !== void 0 ? _e : 0))));
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
    }
}
//# sourceMappingURL=PomTalentSystem.js.map