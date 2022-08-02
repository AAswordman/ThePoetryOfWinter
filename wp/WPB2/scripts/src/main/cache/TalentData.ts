import ExGameConfig from "../../modules/exmc/ExGameConfig.js";
import ExLoreManager from '../../modules/exmc/interface/ExLoreManager.js';
import ExColorLoreUtil from "../../modules/exmc/item/ExColorLoreUtil.js";
import LoreUtil from "../../modules/exmc/item/ExLoreUtil.js";
import MathUtil from "../../modules/exmc/utils/MathUtil.js";

export default class TalentData {
    hasOccupation() {
        return this.occupation !== Occupation.EMPTY;
    }
    occupation: Occupation = Occupation.EMPTY;

    talents: Tanlent[] = [];
    chooseOccupation(occupation: Occupation) {
        this.occupation = occupation;
        let set = new Set<number>([
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

    calculateTalent(manager: ExLoreManager) {
        let lore = new ExColorLoreUtil(manager);
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
            lore.set("addition", t.getCharacter(), Math.round(MathUtil.zeroIfNaN(parseFloat(lore.get("enchanting", t.getCharacter()))) * 10) / 10 + " -> " +
                Math.round(MathUtil.zeroIfNaN(parseFloat(lore.get("enchanting", t.getCharacter())) + add) * 10) / 10
            );
        }

    }
    isOccupationTalent(id: number) {
        return this.occupation.talentId.indexOf(id) !== -1;
    }
}


export class Tanlent {
    public static readonly VIENTIANE = 1;
    public static readonly CLOAD_PIERCING = 2;
    public static readonly ARMOR_BREAKING = 3;
    public static readonly SANCTION = 4;
    public static readonly DEFENSE = 5;
    public static readonly CHARGING = 6;
    public static readonly RELOAD = 7;
    public static readonly SOURCE = 8;
    public static readonly SUDDEN_STRIKE = 9;
    public static readonly REGENERATE = 10;
    id: number;
    level: number;

    constructor(id: number, level: number) {
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

export class Occupation {
    public static readonly EMPTY = new Occupation(0, [], "空");
    public static readonly GUARD = new Occupation(1, [Tanlent.VIENTIANE, Tanlent.ARMOR_BREAKING], "近卫");
    public static readonly WARRIOR = new Occupation(2, [Tanlent.SANCTION, Tanlent.DEFENSE], "战士");
    public static readonly ASSASSIN = new Occupation(3, [Tanlent.SANCTION, Tanlent.SUDDEN_STRIKE], "暗杀者");
    public static readonly ARCHER = new Occupation(4, [Tanlent.CLOAD_PIERCING, Tanlent.ARMOR_BREAKING], "射手");
    public static readonly WARLOCK = new Occupation(5, [Tanlent.RELOAD, Tanlent.SOURCE, Tanlent.CHARGING], "术士");
    public static readonly PRIEST = new Occupation(6, [Tanlent.SOURCE, Tanlent.REGENERATE], "牧师");

    static keys = [Occupation.GUARD, Occupation.WARRIOR, Occupation.ASSASSIN, Occupation.ARCHER, Occupation.WARLOCK, Occupation.PRIEST];

    id: number;
    talentId: number[];
    character: string;
    constructor(occupation: number, talentId: number[], character: string) {
        this.id = occupation;
        this.talentId = talentId;
        this.character = character;
    }
}