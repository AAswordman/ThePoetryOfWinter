import { ItemStack, ItemTypes, MinecraftBlockTypes, MinecraftItemTypes } from "@minecraft/server";
import Vector3 from "../../../modules/exmc/math/Vector3.js";
import "../../../modules/exmc/server/block/ExBlock.js";
import ExColorLoreUtil from "../../../modules/exmc/server/item/ExColorLoreUtil.js";
import "../../../modules/exmc/server/item/ExItem.js";
import GameController from "./GameController.js";
export default class PomEnChantSystem extends GameController {
    onJoin() {
        /*
        this.getEvents().exEvents.afterItemOnHandChange.subscribe((e) => {
            const bag = this.exPlayer.getBag();
            if (e.afterItem) {
                let lore = new ExColorLoreUtil(e.afterItem);
                if (lore.search("enchants") !== null) {
                    for (let i of lore.entries("enchants")) {
                        try {
                            this.player.runCommandAsync("enchant @s " + i[0].replace(/[A-Z]/g, (s) => {
                                return "_" + s.toLowerCase();
                            }) + " " + i[1]);
                        } catch (e) {
                        }
                    }

                    let item = bag.itemOnMainHand;
                    if (item != null) {
                        lore = new ExColorLoreUtil(item);
                        lore.delete("enchants");
                        this.exPlayer.getBag().setItem(this.player.selectedSlot, item);
                    }
                }
            }
        });
        */
        //附魔
        this.getEvents().exEvents.beforeItemUseOn.subscribe((e) => {
            const pos = new Vector3(e.block);
            const block = this.getExDimension().getBlock(pos);
            if (!block || block.typeId === MinecraftBlockTypes.air.id)
                return;
            //ExGameConfig.console.log(block.typeId,e.item.typeId);
            if (block.typeId === "wb:block_translate") {
                e.cancel = true;
                let bag = this.exPlayer.getBag();
                let item = e.itemStack;
                if (item) {
                    if (item.typeId === "wb:book_cache") {
                        PomEnChantSystem.blockTranslateData.set(new Vector3(block).toString(), item);
                        this.setTimeout(() => {
                            block.transTo("wb:block_translate_book");
                            bag.clearItem(bag.getSelectedSlot(), 1);
                        }, 0);
                    }
                }
            }
            else if (block.typeId === "wb:block_translate_book") {
                e.cancel = true;
                let bag = this.exPlayer.getBag();
                const item = e.itemStack;
                const saveItem = PomEnChantSystem.blockTranslateData.get(new Vector3(block).toString());
                if (!saveItem) {
                    this.setTimeout(() => {
                        block.transTo("wb:block_translate");
                    }, 0);
                    return;
                }
                if (saveItem) {
                    if (item && item.amount === 1) {
                        PomEnChantSystem.blockTranslateData.delete(new Vector3(block).toString());
                        this.setTimeout(() => {
                            let exHandItem = item;
                            let exSaveItem = saveItem;
                            let d = exSaveItem.getComponentById("minecraft:durability").damage;
                            let exNewItem = new ItemStack(d >= 4 ? MinecraftItemTypes.enchantedBook : ItemTypes.get("wb:book_cache"));
                            if (exNewItem.hasComponentById("minecraft:durability")) {
                                (exNewItem.getComponentById("minecraft:durability")).damage = d + 1;
                            }
                            // hand -> new
                            // save -> hand
                            let lore = new ExColorLoreUtil(exNewItem);
                            exNewItem.setLore([...exHandItem.getLore()]);
                            if (exHandItem.hasComponentById("minecraft:enchantments")) {
                                for (let i of exHandItem.getComponentById("minecraft:enchantments").enchantments) {
                                    lore.setValueUseMap("enchants", i.type.id, i.level + "");
                                }
                                exHandItem.getComponentById("minecraft:enchantments").removeAllEnchantments();
                            }
                            lore = new ExColorLoreUtil(exHandItem);
                            lore.setLore([...exSaveItem.getLore()]);
                            if (exSaveItem.hasComponentById("minecraft:enchantments") && exNewItem.hasComponentById("minecraft:enchantments")) {
                                for (let i of exSaveItem.getComponentById("minecraft:enchantments").enchantments) {
                                    if (exNewItem.getComponentById("minecraft:enchantments").enchantments.canAddEnchantment(i)) {
                                        exNewItem.getComponentById("minecraft:enchantments").enchantments.addEnchantment(i);
                                    }
                                }
                                exSaveItem.getComponentById("minecraft:enchantments").removeAllEnchantments();
                            }
                            block.transTo("wb:block_translate");
                            bag.setItem(this.exPlayer.selectedSlot, item);
                            this.getDimension().spawnItem(exNewItem, pos.add(0, 1, 0));
                        }, 0);
                    }
                }
            }
        });
    }
    onLoaded() {
    }
    onLeave() {
    }
}
PomEnChantSystem.blockTranslateData = new Map();
//# sourceMappingURL=PomEnchantSystem.js.map