import jsonMerge from "../../../modules/exmc/utils/jsonMerge.js";
export class ArmorData {
    constructor(head, chest, legs, boots) {
        this.head = head;
        this.chest = chest;
        this.legs = legs;
        this.boots = boots;
    }
    detect(p) {
        return p.detectAllArmor(this.head, this.chest, this.legs, this.boots);
    }
}
export let ArmorPlayerDec = {
    rupert: new ArmorData("dec:rupert_helmet", "dec:rupert_chestplate", "dec:rupert_leggings", "dec:rupert_boots"),
    lava: new ArmorData("dec:lava_helmet", "dec:lava_chestplate", "dec:lava_leggings", "dec:lava_boots"),
    crying: new ArmorData("dec:crying_helmet", "dec:crying_chestplate", "dec:crying_leggings", "dec:crying_boots"),
    everlasting_winter: new ArmorData("dec:everlasting_winter_helmet", "dec:everlasting_winter_chestplate", "dec:everlasting_winter_leggings", "dec:everlasting_winter_boots"),
    amethyst: new ArmorData("dec:amethyst_helmet", "dec:amethyst_chestplate", "dec:amethyst_leggings", "dec:amethyst_boots"),
    turtle: new ArmorData("minecraft:turtle_helmet", "dec:turtle_chestplate", "dec:turtle_leggings", "dec:turtle_boots"),
    wood: new ArmorData("dec:wood_helmet", "dec:wood_chestplate", "dec:wood_leggings", "dec:wood_boots")
};
let ArmorPlayerPomFrom = {
    bloodsucking: new ArmorData("wb:armor_bloodsucking_helmet", "wb:armor_bloodsucking_chestplate", "wb:armor_bloodsucking_leggings", "wb:armor_bloodsucking_boots"),
    ink: new ArmorData("wb:armor_ink_helmet", "wb:armor_ink_chestplate", "wb:armor_ink_leggings", "wb:armor_ink_boots"),
    forget: new ArmorData("wb:armor_forget_helmet", "wb:armor_forget_chestplate", "wb:armor_forget_leggings", "wb:armor_forget_boots"),
    seal: new ArmorData("wb:armor_seal_helmet", "wb:armor_seal_chestplate", "wb:armor_seal_leggings", "wb:armor_seal_boots"),
    equipment: new ArmorData("wb:armor_equipment_helmet", "wb:armor_equipment_chestplate", "wb:armor_equipment_leggings", "wb:armor_equipment_boots"),
    water: new ArmorData("wb:armor_water_helmet", "wb:armor_water_chestplate", "wb:armor_water_leggings", "wb:armor_water_boots"),
    senior_bloodsucking: new ArmorData("wb:armor_senior_bloodsucking_helmet", "wb:armor_senior_bloodsucking_chestplate", "wb:armor_senior_bloodsucking_leggings", "wb:armor_senior_bloodsucking_boots"),
    senior_ink: new ArmorData("wb:armor_senior_ink_helmet", "wb:armor_senior_ink_chestplate", "wb:armor_senior_ink_leggings", "wb:armor_senior_ink_boots"),
    senior_forget: new ArmorData("wb:armor_senior_forget_helmet", "wb:armor_senior_forget_chestplate", "wb:armor_senior_forget_leggings", "wb:armor_senior_forget_boots"),
    senior_seal: new ArmorData("wb:armor_senior_seal_helmet", "wb:armor_senior_seal_chestplate", "wb:armor_senior_seal_leggings", "wb:armor_senior_seal_boots"),
    senior_equipment: new ArmorData("wb:armor_senior_equipment_helmet", "wb:armor_senior_equipment_chestplate", "wb:armor_senior_equipment_leggings", "wb:armor_senior_equipment_boots"),
    senior_water: new ArmorData("wb:armor_senior_water_helmet", "wb:armor_senior_water_chestplate", "wb:armor_senior_water_leggings", "wb:armor_senior_water_boots")
};
export let ArmorPlayerPom = jsonMerge(ArmorPlayerPomFrom, ArmorPlayerDec);
let ArmorToName = new Map();
for (let k in ArmorPlayerPom) {
    ArmorPlayerPom[k].name = k;
    ArmorToName.set(ArmorPlayerPom[k], k);
}
export { ArmorToName };
//# sourceMappingURL=ArmorData.js.map