
import MathUtil from "../../modules/exmc/math/MathUtil.js";
import { SerializeAble } from "../../modules/exmc/utils/Serialize.js";
import { langType } from '../data/langType.js';
import format from '../../modules/exmc/utils/format.js';
import ExLoreManager from "../../modules/exmc/interface/ExLoreManager.js";
import ExColorLoreUtil from "../../modules/exmc/server/item/ExColorLoreUtil.js";
import LoreUtil from "../../modules/exmc/server/item/ExLoreUtil.js";
export default class TalentData implements SerializeAble {
	static getDescription(lang:langType, occupation: Occupation, id: number, level: number): string {
		let s=TalentData.calculateTalent(occupation,id,level);
        switch(id){
            case Talent.VIENTIANE: return format(lang.talentWanxiangDesc,`§o§e${s}§r`);
            case Talent.CLOAD_PIERCING: return format(lang.talentChuanyunDesc,`§o§b${s}％§r`);
            case Talent.ARMOR_BREAKING: return format(lang.talentChuanjiaDesc,`§o§b${s}％§r`);
            case Talent.SANCTION: return format(lang.talentZhicaiDesc,`§o§b${s}％§r`);
            case Talent.DEFENSE: return format(lang.talentFangyuDesc,`§o§b${s}％§r`);
            case Talent.CHARGING: return format(lang.talentChongnengDesc,`§o§b${s}％§r`);
            case Talent.RELOAD: return format(lang.talentChongzhuangDesc,`§o§b${s}％§r`);
            case Talent.SOURCE: return format(lang.talentYuanquanDesc,`§o§b${s}％§r`);
            case Talent.SUDDEN_STRIKE: return format(lang.talentTuxiDesc,`§o§b${s}％§r`);
            case Talent.REGENERATE: return format(lang.talentZaishengDesc,`§o§e${s}§r`);
            default: return "";
        }
	}
	static getLevel(data: TalentData,id: number): number {
		for(let i of data.talents) {
            if(i.id===id) return i.level;
        }
        return 0;
	}
    isSerializeAble: true = true;
	pointUsed: number | undefined = 0;
    static hasOccupation(data: TalentData) {
        return data.occupation.id !== Occupation.EMPTY.id;
    }
    occupation: Occupation = Occupation.EMPTY;

    talents: Talent[] = [];
    static chooseOccupation(data: TalentData, occupation: Occupation) {
        data.occupation = occupation;
        let set = new Set<number>([
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
    static calculateTalent(occupation:Occupation,talentId: number,level:number) {
        switch (talentId) {
            case Talent.VIENTIANE:
                return level * (TalentData.isOccupationTalent(occupation,talentId) ? 20 : 10) / 40;
                break;
            case Talent.CLOAD_PIERCING:
                return level * (TalentData.isOccupationTalent(occupation,talentId) ? 80 : 40) / 40;
                break;
            case Talent.ARMOR_BREAKING:
                return level * (TalentData.isOccupationTalent(occupation,talentId) ? 20 : 10) / 40;
                break;
            case Talent.SANCTION:
                return level * (TalentData.isOccupationTalent(occupation,talentId) ? 50 : 25) / 40;
                break;
            case Talent.DEFENSE:
                return level * (TalentData.isOccupationTalent(occupation,talentId) ? 45 : 25) / 40;
                break;
            case Talent.CHARGING:
                return level * (TalentData.isOccupationTalent(occupation,talentId) ? 30 : 15) / 40;
                break;
            case Talent.RELOAD:
                return level * (TalentData.isOccupationTalent(occupation,talentId) ? 25 : 15) / 40;
                break;
            case Talent.SOURCE:
                return level * (TalentData.isOccupationTalent(occupation,talentId) ? 100 : 40) / 40;
                break;
            case Talent.SUDDEN_STRIKE:
                return level * (TalentData.isOccupationTalent(occupation,talentId) ? 80 : 0) / 40;
                break;
            case Talent.REGENERATE:
                return level * (TalentData.isOccupationTalent(occupation,talentId) ? 20 : 0) / 40;
                break;
            default:
                return 0;
                break;
        }
    }
    static calculateTalentToLore(talents: Talent[],occupation:Occupation, manager: ExLoreManager,lang:langType) {
        let lore = new ExColorLoreUtil(manager);
        lore.setFlag(LoreUtil.LoreFlag.MAP);

        for (let t of talents) {
            let add = 0;
            let level = MathUtil.zeroIfNaN(parseFloat(lore.get("enchanting", Talent.getCharacter(lang,t.id)))) + t.level;
            
            add = TalentData.calculateTalent(occupation,t.id ,level);

            lore.set("addition", Talent.getCharacter(lang,t.id),MathUtil.zeroIfNaN(parseFloat(lore.get("enchanting", Talent.getCharacter(lang,t.id)))) + " -> " +
                Math.round((MathUtil.zeroIfNaN(parseFloat(lore.get("enchanting", Talent.getCharacter(lang,t.id)))) + add) * 10) / 10
            );
        }

    }
    static isOccupationTalent(occupation: Occupation, id: number) {
        return occupation.talentId.indexOf(id) !== -1;
    }
}


export class Talent implements SerializeAble {
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

    
    static getCharacter(lang:langType, id:number) {
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

export class Occupation implements SerializeAble {
    public static readonly EMPTY = new Occupation(0, []);
    public static readonly GUARD = new Occupation(1, [Talent.VIENTIANE, Talent.ARMOR_BREAKING]);
    public static readonly WARRIOR = new Occupation(2, [Talent.SANCTION, Talent.DEFENSE]);
    public static readonly ASSASSIN = new Occupation(3, [Talent.SANCTION, Talent.SUDDEN_STRIKE]);
    public static readonly ARCHER = new Occupation(4, [Talent.CLOAD_PIERCING, Talent.ARMOR_BREAKING]);
    public static readonly WARLOCK = new Occupation(5, [Talent.RELOAD, Talent.SOURCE, Talent.CHARGING]);
    public static readonly PRIEST = new Occupation(6, [Talent.SOURCE, Talent.REGENERATE]);

    static keys = [Occupation.GUARD, Occupation.WARRIOR, Occupation.ASSASSIN, Occupation.ARCHER, Occupation.WARLOCK, Occupation.PRIEST];

    id: number;
    talentId: number[];
    public getCharacter(lang:langType): string {
        switch(this.id){
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
    constructor(occupation: number, talentId: number[]) {
        this.id = occupation;
        this.talentId = talentId;
    }
    isSerializeAble: true = true;
}