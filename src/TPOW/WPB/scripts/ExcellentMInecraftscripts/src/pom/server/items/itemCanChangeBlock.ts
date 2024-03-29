const idSet = new Set(["dec:god_of_destroy", "dec:destroy_staff", "wb:pickaxex_equipment_a", "wb:axex_equipment_a" ,"dec:everlasting_winter_pickaxe_axe"]);

export default function itemCanChangeBlock(id: string) {
    return idSet.has(id);
}