import { Items, ItemStack, MinecraftBlockTypes, MinecraftItemTypes } from "@minecraft/server";
import Vector3 from "../../../modules/exmc/math/Vector3.js";
import ExBlock from "../../../modules/exmc/server/block/ExBlock.js";
import ExColorLoreUtil from "../../../modules/exmc/server/item/ExColorLoreUtil.js";
import ExItem from "../../../modules/exmc/server/item/ExItem.js";
import ExGameVector3 from "../../../modules/exmc/server/math/ExGameVector3.js";
import GameController from "./GameController.js";
export default class PomEnChantSystem extends GameController {
    constructor() {
        super(...arguments);
        this.blockTranslateData = new Map();
    }
    onJoin() {
        this.getEvents().exEvents.itemOnHandChange.subscribe((e) => {
            const bag = this.exPlayer.getBag();
            if (e.afterItem) {
                let lore = new ExColorLoreUtil(ExItem.getInstance(e.afterItem));
                if (lore.search("enchants") !== null) {
                    for (let i of lore.entries("enchants")) {
                        try {
                            this.player.runCommandAsync("enchant @s " + i[0].replace(/[A-Z]/g, (s) => {
                                return "_" + s.toLowerCase();
                            }) + " " + i[1]);
                        }
                        catch (e) {
                        }
                    }
                    let item = bag.getItemOnHand();
                    if (item != null) {
                        lore = new ExColorLoreUtil(new ExItem(item));
                        lore.delete("enchants");
                        this.exPlayer.getBag().setItem(this.player.selectedSlot, item);
                    }
                }
            }
        });
        //附魔
        this.getEvents().exEvents.onceItemUseOn.subscribe((e) => {
            let pos = new Vector3(e.blockLocation);
            let block = this.getExDimension().getBlock(pos);
            if (!block || block.typeId === MinecraftBlockTypes.air.id)
                return;
            //ExGameConfig.console.log(block.typeId,e.item.typeId);
            if (block.typeId === "wb:block_translate") {
                e.cancel = true;
                let bag = this.exPlayer.getBag();
                let item = bag.getItemOnHand();
                let item2 = bag.getItemOnHand();
                if (item && item2) {
                    if (item.typeId === "wb:book_cache") {
                        this.blockTranslateData.set(new Vector3(block).toString(), item);
                        ExBlock.getInstance(block).transTo("wb:block_translate_book");
                        item2.amount--;
                        bag.setItem(this.exPlayer.selectedSlot, item2);
                    }
                }
            }
            else if (block.typeId === "wb:block_translate_book") {
                e.cancel = true;
                let bag = this.exPlayer.getBag();
                let item = bag.getItemOnHand();
                let saveItem = this.blockTranslateData.get(new Vector3(block).toString());
                if (!saveItem)
                    return ExBlock.getInstance(block).transTo("wb:block_translate");
                if (item && item.amount === 1) {
                    let exHandItem = ExItem.getInstance(item);
                    let exSaveItem = ExItem.getInstance(saveItem);
                    saveItem.data++;
                    let exNewItem = new ExItem(new ItemStack(saveItem.data >= 4 ? MinecraftItemTypes.enchantedBook : Items.get("wb:book_cache")));
                    exNewItem.getItem().data = saveItem.data;
                    // hand -> new
                    // save -> hand
                    let lore = new ExColorLoreUtil(exNewItem);
                    exNewItem.setLore([...exHandItem.getLore()]);
                    if (exHandItem.hasEnchantsComponent()) {
                        for (let i of exHandItem.getEnchantsComponent().enchantments) {
                            lore.setValueUseMap("enchants", i.type.id, i.level + "");
                        }
                        exHandItem.getEnchantsComponent().removeAllEnchantments();
                    }
                    lore = new ExColorLoreUtil(exHandItem);
                    lore.setLore([...exSaveItem.getLore()]);
                    if (exSaveItem.hasEnchantsComponent()) {
                        for (let i of exSaveItem.getEnchantsComponent().enchantments) {
                            lore.setValueUseMap("enchants", i.type.id, i.level + "");
                        }
                        exSaveItem.getEnchantsComponent().removeAllEnchantments();
                    }
                    this.blockTranslateData.delete(new Vector3(block).toString());
                    ExBlock.getInstance(block).transTo("wb:block_translate");
                    bag.setItem(this.exPlayer.selectedSlot, item);
                    this.getDimension().spawnItem(exNewItem.getItem(), ExGameVector3.getBlockLocation(pos).above());
                }
            }
        });
    }
    onLoaded() {
    }
    onLeave() {
    }
}
//# sourceMappingURL=PomEnchantSystem.js.map