import LoreUtil from "../../modules/exmc/item/ExLoreUtil.js";
export default class TalentData {
    constructor() {
        this.occupation = Occupation.EMPTY;
        this.talents = [];
    }
    hasOccupation() {
        return this.occupation !== Occupation.EMPTY;
    }
    chooseOccupation(occupation) {
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
            this.talents.push(new Tanlent(i, 0));
        });
    }
    calculateTalent(manager) {
        var _a;
        let lore = new LoreUtil(manager);
        lore.setFlag(LoreUtil.LoreFlag.MAP);
        for (let t of this.talents) {
            let add;
            switch (t.id) {
                case Tanlent.VIENTIANE:
                    add = t.level * (this.isOccupationTalent(t.id) ? 20 : 10) / 40;
                    break;
                case Tanlent.CLOAD_PIERCING:
                    add = t.level * (this.isOccupationTalent(t.id) ? 80 : 40) / 40;
                    break;
                case Tanlent.ARMOR_BREAKING:
                    add = t.level * (this.isOccupationTalent(t.id) ? 20 : 10) / 40;
                    break;
                case Tanlent.SANCTION:
                    add = t.level * (this.isOccupationTalent(t.id) ? 50 : 25) / 40;
                    break;
                case Tanlent.DEFENSE:
                    add = t.level * (this.isOccupationTalent(t.id) ? 30 : 15) / 40;
                    break;
                case Tanlent.CHARGING:
                    add = t.level * (this.isOccupationTalent(t.id) ? 30 : 15) / 40;
                    break;
                case Tanlent.RELOAD:
                    add = t.level * (this.isOccupationTalent(t.id) ? 25 : 15) / 40;
                    break;
                case Tanlent.SOURCE:
                    add = t.level * (this.isOccupationTalent(t.id) ? 100 : 40) / 40;
                    break;
                case Tanlent.SUDDEN_STRIKE:
                    add = t.level * (this.isOccupationTalent(t.id) ? 80 : 0) / 40;
                    break;
                case Tanlent.REGENERATE:
                    add = t.level * (this.isOccupationTalent(t.id) ? 20 : 0) / 40;
                    break;
                default:
                    add = 0;
                    break;
            }
            lore.set("addition", t.getCharacter(), Math.round((parseFloat((_a = lore.get("enchanting", t.getCharacter())) !== null && _a !== void 0 ? _a : 0) + add) * 10) / 10);
        }
    }
    isOccupationTalent(id) {
        return this.occupation.talentId.indexOf(id) !== -1;
    }
}
export class Tanlent {
    constructor(id, level) {
        this.id = id;
        this.level = level;
    }
    getCharacter() {
        switch (this.id) {
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
    constructor(occupation, talentId) {
        this.id = occupation;
        this.talentId = talentId;
    }
}
Occupation.EMPTY = new Occupation(0, []);
Occupation.GUARD = new Occupation(1, [Tanlent.VIENTIANE, Tanlent.ARMOR_BREAKING]);
Occupation.WARRIOR = new Occupation(2, [Tanlent.SANCTION, Tanlent.DEFENSE]);
Occupation.ASSASSIN = new Occupation(3, [Tanlent.SANCTION, Tanlent.SUDDEN_STRIKE]);
Occupation.ARCHER = new Occupation(4, [Tanlent.CLOAD_PIERCING, Tanlent.ARMOR_BREAKING]);
Occupation.WARLOCK = new Occupation(5, [Tanlent.RELOAD, Tanlent.SOURCE, Tanlent.CHARGING]);
Occupation.PRIEST = new Occupation(6, [Tanlent.SOURCE, Tanlent.REGENERATE]);
//# sourceMappingURL=TalentData.js.map