import MathUtil from "../../modules/exmc/math/MathUtil.js";
import format from '../../modules/exmc/utils/format.js';
import ExColorLoreUtil from "../../modules/exmc/server/item/ExColorLoreUtil.js";
import LoreUtil from "../../modules/exmc/server/item/ExLoreUtil.js";
export default class TalentData {
    constructor() {
        this.isSerializeAble = true;
        this.pointUsed = 0;
        this.occupation = Occupation.EMPTY;
        this.talents = [];
    }
    static getDescription(lang, occupation, id, level) {
        let s = TalentData.calculateTalent(occupation, id, level);
        switch (id) {
            case Talent.VIENTIANE: return format(lang.talentWanxiangDesc, `§o§e${s}§r`);
            case Talent.CLOAD_PIERCING: return format(lang.talentChuanyunDesc, `§o§b${s}％§r`);
            case Talent.ARMOR_BREAKING: return format(lang.talentChuanjiaDesc, `§o§b${s}％§r`);
            case Talent.SANCTION: return format(lang.talentZhicaiDesc, `§o§b${s}％§r`);
            case Talent.DEFENSE: return format(lang.talentFangyuDesc, `§o§b${s}％§r`);
            case Talent.CHARGING: return format(lang.talentChongnengDesc, `§o§b${s}％§r`);
            case Talent.RELOAD: return format(lang.talentChongzhuangDesc, `§o§b${s}％§r`);
            case Talent.SOURCE: return format(lang.talentYuanquanDesc, `§o§b${s}％§r`);
            case Talent.SUDDEN_STRIKE: return format(lang.talentTuxiDesc, `§o§b${s}％§r`);
            case Talent.REGENERATE: return format(lang.talentZaishengDesc, `§o§e${s}§r`);
            default: return "";
        }
    }
    static getLevel(data, id) {
        for (let i of data.talents) {
            if (i.id === id)
                return i.level;
        }
        return 0;
    }
    static hasOccupation(data) {
        return data.occupation.id !== Occupation.EMPTY.id;
    }
    static chooseOccupation(data, occupation) {
        data.occupation = occupation;
        let set = new Set([
            Talent.VIENTIANE,
            Talent.CLOAD_PIERCING,
            Talent.ARMOR_BREAKING,
            Talent.SANCTION,
            Talent.DEFENSE,
            Talent.CHARGING,
            Talent.RELOAD,
            Talent.SOURCE
        ]);
        for (let i of occupation.talentId) {
            set.add(i);
        }
        set.forEach((i) => {
            data.talents.push(new Talent(i, 0));
        });
    }
    static calculateTalent(occupation, talentId, level) {
        switch (talentId) {
            case Talent.VIENTIANE:
                return level * (TalentData.isOccupationTalent(occupation, talentId) ? 20 : 10) / 40;
                break;
            case Talent.CLOAD_PIERCING:
                return level * (TalentData.isOccupationTalent(occupation, talentId) ? 80 : 40) / 40;
                break;
            case Talent.ARMOR_BREAKING:
                return level * (TalentData.isOccupationTalent(occupation, talentId) ? 20 : 10) / 40;
                break;
            case Talent.SANCTION:
                return level * (TalentData.isOccupationTalent(occupation, talentId) ? 50 : 25) / 40;
                break;
            case Talent.DEFENSE:
                return level * (TalentData.isOccupationTalent(occupation, talentId) ? 45 : 25) / 40;
                break;
            case Talent.CHARGING:
                return level * (TalentData.isOccupationTalent(occupation, talentId) ? 30 : 15) / 40;
                break;
            case Talent.RELOAD:
                return level * (TalentData.isOccupationTalent(occupation, talentId) ? 25 : 15) / 40;
                break;
            case Talent.SOURCE:
                return level * (TalentData.isOccupationTalent(occupation, talentId) ? 100 : 40) / 40;
                break;
            case Talent.SUDDEN_STRIKE:
                return level * (TalentData.isOccupationTalent(occupation, talentId) ? 80 : 0) / 40;
                break;
            case Talent.REGENERATE:
                return level * (TalentData.isOccupationTalent(occupation, talentId) ? 20 : 0) / 40;
                break;
            default:
                return 0;
                break;
        }
    }
    static calculateTalentToLore(talents, occupation, manager, lang) {
        let lore = new ExColorLoreUtil(manager);
        lore.setFlag(LoreUtil.LoreFlag.MAP);
        for (let t of talents) {
            let add = 0;
            let level = MathUtil.zeroIfNaN(parseFloat(lore.get("enchanting", Talent.getCharacter(lang, t.id)))) + t.level;
            add = TalentData.calculateTalent(occupation, t.id, level);
            lore.set("addition", Talent.getCharacter(lang, t.id), MathUtil.zeroIfNaN(parseFloat(lore.get("enchanting", Talent.getCharacter(lang, t.id)))) + " -> " +
                Math.round((MathUtil.zeroIfNaN(parseFloat(lore.get("enchanting", Talent.getCharacter(lang, t.id)))) + add) * 10) / 10);
        }
    }
    static isOccupationTalent(occupation, id) {
        return occupation.talentId.indexOf(id) !== -1;
    }
}
export class Talent {
    constructor(id, level) {
        this.isSerializeAble = true;
        this.id = id;
        this.level = level;
    }
    static getCharacter(lang, id) {
        switch (id) {
            case Talent.VIENTIANE:
                return lang.talentWanxiang;
            case Talent.CLOAD_PIERCING:
                return lang.talentChuanyun;
            case Talent.ARMOR_BREAKING:
                return lang.talentChuanjia;
            case Talent.SANCTION:
                return lang.talentZhicai;
            case Talent.DEFENSE:
                return lang.talentFangyu;
            case Talent.CHARGING:
                return lang.talentChongneng;
            case Talent.RELOAD:
                return lang.talentChongzhuang;
            case Talent.SOURCE:
                return lang.talentYuanquan;
            case Talent.SUDDEN_STRIKE:
                return lang.talentTuxi;
            case Talent.REGENERATE:
                return lang.talentZaisheng;
            default:
                return lang.talentWeizhi;
        }
    }
}
Talent.VIENTIANE = 1;
Talent.CLOAD_PIERCING = 2;
Talent.ARMOR_BREAKING = 3;
Talent.SANCTION = 4;
Talent.DEFENSE = 5;
Talent.CHARGING = 6;
Talent.RELOAD = 7;
Talent.SOURCE = 8;
Talent.SUDDEN_STRIKE = 9;
Talent.REGENERATE = 10;
export class Occupation {
    constructor(occupation, talentId) {
        this.isSerializeAble = true;
        this.id = occupation;
        this.talentId = talentId;
    }
    getCharacter(lang) {
        switch (this.id) {
            case 0:
                return lang.occupationEmpty;
            case 1:
                return lang.occupationGuard;
            case 2:
                return lang.occupationWarrior;
            case 3:
                return lang.occupationAssassin;
            case 4:
                return lang.occupationArcher;
            case 5:
                return lang.occupationWarlock;
            case 6:
                return lang.occupationPriest;
        }
        return "";
    }
}
Occupation.EMPTY = new Occupation(0, []);
Occupation.GUARD = new Occupation(1, [Talent.VIENTIANE, Talent.ARMOR_BREAKING]);
Occupation.WARRIOR = new Occupation(2, [Talent.SANCTION, Talent.DEFENSE]);
Occupation.ASSASSIN = new Occupation(3, [Talent.SANCTION, Talent.SUDDEN_STRIKE]);
Occupation.ARCHER = new Occupation(4, [Talent.CLOAD_PIERCING, Talent.ARMOR_BREAKING]);
Occupation.WARLOCK = new Occupation(5, [Talent.RELOAD, Talent.SOURCE, Talent.CHARGING]);
Occupation.PRIEST = new Occupation(6, [Talent.SOURCE, Talent.REGENERATE]);
Occupation.keys = [Occupation.GUARD, Occupation.WARRIOR, Occupation.ASSASSIN, Occupation.ARCHER, Occupation.WARLOCK, Occupation.PRIEST];
//# sourceMappingURL=TalentData.js.map