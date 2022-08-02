import ExColorLoreUtil from "../../modules/exmc/item/ExColorLoreUtil.js";
import LoreUtil from "../../modules/exmc/item/ExLoreUtil.js";
import MathUtil from "../../modules/exmc/utils/MathUtil.js";
export default class TalentData {
    constructor() {
        this.isSerializeAble = true;
        this.occupation = Occupation.EMPTY;
        this.talents = [];
    }
    static hasOccupation(data) {
        return data.occupation.id !== Occupation.EMPTY.id;
    }
    static chooseOccupation(data, occupation) {
        data.occupation = occupation;
        let set = new Set([
            Tanlent.VIENTIANE,
            Tanlent.CLOAD_PIERCING,
            Tanlent.ARMOR_BREAKING,
            Tanlent.SANCTION,
            Tanlent.DEFENSE,
            Tanlent.CHARGING,
            Tanlent.RELOAD,
            Tanlent.SOURCE
        ]);
        for (let i of occupation.talentId) {
            set.add(i);
        }
        set.forEach((i) => {
            data.talents.push(new Tanlent(i, 0));
        });
    }
    static calculateTalent(data, manager) {
        let lore = new ExColorLoreUtil(manager);
        lore.setFlag(LoreUtil.LoreFlag.MAP);
        for (let t of data.talents) {
            let add;
            switch (t.id) {
                case Tanlent.VIENTIANE:
                    add = t.level * (TalentData.isOccupationTalent(data, t.id) ? 20 : 10) / 40;
                    break;
                case Tanlent.CLOAD_PIERCING:
                    add = t.level * (TalentData.isOccupationTalent(data, t.id) ? 80 : 40) / 40;
                    break;
                case Tanlent.ARMOR_BREAKING:
                    add = t.level * (TalentData.isOccupationTalent(data, t.id) ? 20 : 10) / 40;
                    break;
                case Tanlent.SANCTION:
                    add = t.level * (TalentData.isOccupationTalent(data, t.id) ? 50 : 25) / 40;
                    break;
                case Tanlent.DEFENSE:
                    add = t.level * (TalentData.isOccupationTalent(data, t.id) ? 30 : 15) / 40;
                    break;
                case Tanlent.CHARGING:
                    add = t.level * (TalentData.isOccupationTalent(data, t.id) ? 30 : 15) / 40;
                    break;
                case Tanlent.RELOAD:
                    add = t.level * (TalentData.isOccupationTalent(data, t.id) ? 25 : 15) / 40;
                    break;
                case Tanlent.SOURCE:
                    add = t.level * (TalentData.isOccupationTalent(data, t.id) ? 100 : 40) / 40;
                    break;
                case Tanlent.SUDDEN_STRIKE:
                    add = t.level * (TalentData.isOccupationTalent(data, t.id) ? 80 : 0) / 40;
                    break;
                case Tanlent.REGENERATE:
                    add = t.level * (TalentData.isOccupationTalent(data, t.id) ? 20 : 0) / 40;
                    break;
                default:
                    add = 0;
                    break;
            }
            lore.set("addition", Tanlent.getCharacter(t), Math.round(MathUtil.zeroIfNaN(parseFloat(lore.get("enchanting", Tanlent.getCharacter(t)))) * 10) / 10 + " -> " +
                Math.round(MathUtil.zeroIfNaN(parseFloat(lore.get("enchanting", Tanlent.getCharacter(t))) + add) * 10) / 10);
        }
    }
    static isOccupationTalent(data, id) {
        return data.occupation.talentId.indexOf(id) !== -1;
    }
}
export class Tanlent {
    constructor(id, level) {
        this.isSerializeAble = true;
        this.id = id;
        this.level = level;
    }
    static getCharacter(data) {
        switch (data.id) {
            case Tanlent.VIENTIANE:
                return "万象";
            case Tanlent.CLOAD_PIERCING:
                return "穿云";
            case Tanlent.ARMOR_BREAKING:
                return "穿甲";
            case Tanlent.SANCTION:
                return "制裁";
            case Tanlent.DEFENSE:
                return "防御";
            case Tanlent.CHARGING:
                return "充能";
            case Tanlent.RELOAD:
                return "重装";
            case Tanlent.SOURCE:
                return "源泉";
            case Tanlent.SUDDEN_STRIKE:
                return "突袭";
            case Tanlent.REGENERATE:
                return "再生";
            default:
                return "未知";
        }
    }
}
Tanlent.VIENTIANE = 1;
Tanlent.CLOAD_PIERCING = 2;
Tanlent.ARMOR_BREAKING = 3;
Tanlent.SANCTION = 4;
Tanlent.DEFENSE = 5;
Tanlent.CHARGING = 6;
Tanlent.RELOAD = 7;
Tanlent.SOURCE = 8;
Tanlent.SUDDEN_STRIKE = 9;
Tanlent.REGENERATE = 10;
export class Occupation {
    constructor(occupation, talentId, character) {
        this.isSerializeAble = true;
        this.id = occupation;
        this.talentId = talentId;
        this.character = character;
    }
}
Occupation.EMPTY = new Occupation(0, [], "空");
Occupation.GUARD = new Occupation(1, [Tanlent.VIENTIANE, Tanlent.ARMOR_BREAKING], "近卫");
Occupation.WARRIOR = new Occupation(2, [Tanlent.SANCTION, Tanlent.DEFENSE], "战士");
Occupation.ASSASSIN = new Occupation(3, [Tanlent.SANCTION, Tanlent.SUDDEN_STRIKE], "暗杀者");
Occupation.ARCHER = new Occupation(4, [Tanlent.CLOAD_PIERCING, Tanlent.ARMOR_BREAKING], "射手");
Occupation.WARLOCK = new Occupation(5, [Tanlent.RELOAD, Tanlent.SOURCE, Tanlent.CHARGING], "术士");
Occupation.PRIEST = new Occupation(6, [Tanlent.SOURCE, Tanlent.REGENERATE], "牧师");
Occupation.keys = [Occupation.GUARD, Occupation.WARRIOR, Occupation.ASSASSIN, Occupation.ARCHER, Occupation.WARLOCK, Occupation.PRIEST];
//# sourceMappingURL=TalentData.js.map