import ExColorLoreUtil from "../../modules/exmc/item/ExColorLoreUtil.js";
import LoreUtil from "../../modules/exmc/item/ExLoreUtil.js";
import MathUtil from "../../modules/exmc/utils/MathUtil.js";
export default class TalentData {
    constructor() {
        this.isSerializeAble = true;
        this.pointUsed = 0;
        this.occupation = Occupation.EMPTY;
        this.talents = [];
    }
    static getDescription(data, id, level) {
        let s = TalentData.calculateTalent(data, id, level);
        switch (id) {
            case Talent.VIENTIANE: return `生命值增加 §o§e${s}§r 点`;
            case Talent.CLOAD_PIERCING: return `对0 ~ 64距离远处目标造成 §o§e${s}§r 额外伤害，距离越近额外伤害越小`;
            case Talent.ARMOR_BREAKING: return `对目标造成 §o§b${s}％§r * (自身最大生命值) 额外伤害`;
            case Talent.SANCTION: return `对0 ~ 16距离远处目标造成 §o§b${s}％§r 额外伤害，距离越远额外伤害越小`;
            case Talent.DEFENSE: return `受到一切伤害减免 §o§b${s}％§r ，致命伤无效`;
            case Talent.CHARGING: return `武器冷却回复加快 §o§b${s}％§r`;
            case Talent.RELOAD: return `盔甲冷却回复加快 §o§b${s}％§r`;
            case Talent.SOURCE: return `法力值回复加快 §o§b${s}％§r`;
            case Talent.SUDDEN_STRIKE: return `攻击造成额外 §o§b${s}％§r 伤害，该效果冷却10s`;
            case Talent.REGENERATE: return `每10s为18半径内血量最少玩家回复 §o§e${s}§r 点血量，敌对模式下该技能不发动`;
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
    static calculateTalent(data, talentId, level) {
        switch (talentId) {
            case Talent.VIENTIANE:
                return level * (TalentData.isOccupationTalent(data, talentId) ? 20 : 10) / 40;
                break;
            case Talent.CLOAD_PIERCING:
                return level * (TalentData.isOccupationTalent(data, talentId) ? 80 : 40) / 40;
                break;
            case Talent.ARMOR_BREAKING:
                return level * (TalentData.isOccupationTalent(data, talentId) ? 20 : 10) / 40;
                break;
            case Talent.SANCTION:
                return level * (TalentData.isOccupationTalent(data, talentId) ? 50 : 25) / 40;
                break;
            case Talent.DEFENSE:
                return level * (TalentData.isOccupationTalent(data, talentId) ? 45 : 25) / 40;
                break;
            case Talent.CHARGING:
                return level * (TalentData.isOccupationTalent(data, talentId) ? 30 : 15) / 40;
                break;
            case Talent.RELOAD:
                return level * (TalentData.isOccupationTalent(data, talentId) ? 25 : 15) / 40;
                break;
            case Talent.SOURCE:
                return level * (TalentData.isOccupationTalent(data, talentId) ? 100 : 40) / 40;
                break;
            case Talent.SUDDEN_STRIKE:
                return level * (TalentData.isOccupationTalent(data, talentId) ? 80 : 0) / 40;
                break;
            case Talent.REGENERATE:
                return level * (TalentData.isOccupationTalent(data, talentId) ? 20 : 0) / 40;
                break;
            default:
                return 0;
                break;
        }
    }
    static calculateTalentToLore(data, manager) {
        let lore = new ExColorLoreUtil(manager);
        lore.setFlag(LoreUtil.LoreFlag.MAP);
        for (let t of data.talents) {
            let add = 0;
            let level = MathUtil.zeroIfNaN(parseFloat(lore.get("enchanting", Talent.getCharacter(t.id)))) + t.level;
            add = TalentData.calculateTalent(data, t.id, level);
            lore.set("addition", Talent.getCharacter(t.id), MathUtil.zeroIfNaN(parseFloat(lore.get("enchanting", Talent.getCharacter(t.id)))) + " -> " +
                Math.round((MathUtil.zeroIfNaN(parseFloat(lore.get("enchanting", Talent.getCharacter(t.id)))) + add) * 10) / 10);
        }
    }
    static isOccupationTalent(data, id) {
        return data.occupation.talentId.indexOf(id) !== -1;
    }
}
export class Talent {
    constructor(id, level) {
        this.isSerializeAble = true;
        this.id = id;
        this.level = level;
    }
    static getCharacter(id) {
        switch (id) {
            case Talent.VIENTIANE:
                return "万象";
            case Talent.CLOAD_PIERCING:
                return "穿云";
            case Talent.ARMOR_BREAKING:
                return "穿甲";
            case Talent.SANCTION:
                return "制裁";
            case Talent.DEFENSE:
                return "防御";
            case Talent.CHARGING:
                return "充能";
            case Talent.RELOAD:
                return "重装";
            case Talent.SOURCE:
                return "源泉";
            case Talent.SUDDEN_STRIKE:
                return "突袭";
            case Talent.REGENERATE:
                return "再生";
            default:
                return "未知";
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
    constructor(occupation, talentId, character) {
        this.isSerializeAble = true;
        this.id = occupation;
        this.talentId = talentId;
        this.character = character;
    }
}
Occupation.EMPTY = new Occupation(0, [], "空");
Occupation.GUARD = new Occupation(1, [Talent.VIENTIANE, Talent.ARMOR_BREAKING], "近卫");
Occupation.WARRIOR = new Occupation(2, [Talent.SANCTION, Talent.DEFENSE], "战士");
Occupation.ASSASSIN = new Occupation(3, [Talent.SANCTION, Talent.SUDDEN_STRIKE], "暗杀者");
Occupation.ARCHER = new Occupation(4, [Talent.CLOAD_PIERCING, Talent.ARMOR_BREAKING], "射手");
Occupation.WARLOCK = new Occupation(5, [Talent.RELOAD, Talent.SOURCE, Talent.CHARGING], "术士");
Occupation.PRIEST = new Occupation(6, [Talent.SOURCE, Talent.REGENERATE], "牧师");
Occupation.keys = [Occupation.GUARD, Occupation.WARRIOR, Occupation.ASSASSIN, Occupation.ARCHER, Occupation.WARLOCK, Occupation.PRIEST];
//# sourceMappingURL=TalentData.js.map