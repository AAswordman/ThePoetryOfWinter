import ExGameConfig from "../../modules/exmc/ExGameConfig.js";
import ExLoreManager from '../../modules/exmc/interface/ExLoreManager.js';
import ExColorLoreUtil from "../../modules/exmc/item/ExColorLoreUtil.js";
import LoreUtil from "../../modules/exmc/item/ExLoreUtil.js";
import MathUtil from "../../modules/exmc/utils/MathUtil.js";
import { SerializeAble } from "../../modules/exmc/utils/Serialize.js";

export default class TalentData implements SerializeAble {
	static getLevel(data: TalentData,id: number): number {
		for(let i of data.talents) {
            if(i.id===id) return i.level;
        }
        return 0;
	}
    isSerializeAble: true = true;
	pointUsed: number | undefined;
    static hasOccupation(data: TalentData) {
        return data.occupation.id !== Occupation.EMPTY.id;
    }
    occupation: Occupation = Occupation.EMPTY;

    talents: Tanlent[] = [];
    static chooseOccupation(data: TalentData, occupation: Occupation) {
        data.occupation = occupation;
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
            data.talents.push(new Tanlent(i, 0));
        });
    }
    static calculateTalent(data: TalentData,talentId: number,level:number) {
        switch (talentId) {
            case Tanlent.VIENTIANE:
                return level * (TalentData.isOccupationTalent(data,talentId) ? 20 : 10) / 40;
                break;
            case Tanlent.CLOAD_PIERCING:
                return level * (TalentData.isOccupationTalent(data,talentId) ? 80 : 40) / 40;
                break;
            case Tanlent.ARMOR_BREAKING:
                return level * (TalentData.isOccupationTalent(data,talentId) ? 20 : 10) / 40;
                break;
            case Tanlent.SANCTION:
                return level * (TalentData.isOccupationTalent(data,talentId) ? 50 : 25) / 40;
                break;
            case Tanlent.DEFENSE:
                return level * (TalentData.isOccupationTalent(data,talentId) ? 45 : 25) / 40;
                break;
            case Tanlent.CHARGING:
                return level * (TalentData.isOccupationTalent(data,talentId) ? 30 : 15) / 40;
                break;
            case Tanlent.RELOAD:
                return level * (TalentData.isOccupationTalent(data,talentId) ? 25 : 15) / 40;
                break;
            case Tanlent.SOURCE:
                return level * (TalentData.isOccupationTalent(data,talentId) ? 100 : 40) / 40;
                break;
            case Tanlent.SUDDEN_STRIKE:
                return level * (TalentData.isOccupationTalent(data,talentId) ? 80 : 0) / 40;
                break;
            case Tanlent.REGENERATE:
                return level * (TalentData.isOccupationTalent(data,talentId) ? 20 : 0) / 40;
                break;
            default:
                return 0;
                break;
        }
    }
    static calculateTalentToLore(data: TalentData, manager: ExLoreManager) {
        let lore = new ExColorLoreUtil(manager);
        lore.setFlag(LoreUtil.LoreFlag.MAP);

        for (let t of data.talents) {
            let add = 0;
            let level = MathUtil.zeroIfNaN(parseFloat(lore.get("enchanting", Tanlent.getCharacter(t.id)))) + t.level;
            
            add = TalentData.calculateTalent(data,t.id ,level);

            lore.set("addition", Tanlent.getCharacter(t.id),MathUtil.zeroIfNaN(parseFloat(lore.get("enchanting", Tanlent.getCharacter(t.id)))) + " -> " +
                Math.round((MathUtil.zeroIfNaN(parseFloat(lore.get("enchanting", Tanlent.getCharacter(t.id)))) + add) * 10) / 10
            );
        }

    }
    static isOccupationTalent(data: TalentData, id: number) {
        return data.occupation.talentId.indexOf(id) !== -1;
    }
}


export class Tanlent implements SerializeAble {
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
    isSerializeAble: true = true;

    static getCharacter(id:number) {
        switch (id) {
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

export class Occupation implements SerializeAble {
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
    isSerializeAble: true = true;
}