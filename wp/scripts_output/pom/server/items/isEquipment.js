export default function isEquipment(id) {
    if (id.startsWith("wb:sword_") || id.startsWith("wb:staff_")) {
        return true;
    }
    if (id.startsWith("minecraft:")) {
        if (id === "minecraft:bow" || id === "minecraft:cross_bow" || id.indexOf("_sword") !== -1) {
            return true;
        }
    }
    if (id.startsWith("dec:")) {
        if (id.endsWith("_sword") || id.endsWith("_dagger") || id.endsWith("_sickle") || id.endsWith("_staff") || id.endsWith("_axe") || id.endsWith("_battleaxe") || id.endsWith("flintlock") || id.startsWith("sword_of_") || id.endsWith("_dart"))
            return true;
        let arr = ["bamboo_yataghan", "absolute_zero", "growth", "angel_purification", "blood_mare", "blue_of_the_sea", "candy_cane",
            "cudgel", "lollipop", "hard_lollipop", "mace", "long_bread", "scimitar", "sharp_coral", "village_guardian",
            "flare_magic_book", "snowball_magic_book", "wave_magic_book", "giant_ivy", "god_of_sun", "night_mare", "natural_spear", "radiate_spreader",
            "thunder_rapier", "ghost_summoner"];
        for (let i of arr) {
            if ("dec:" + i === id)
                return true;
        }
    }
    return false;
}
//# sourceMappingURL=isEquipment.js.map