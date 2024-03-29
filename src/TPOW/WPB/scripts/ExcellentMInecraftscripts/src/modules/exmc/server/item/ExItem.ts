import { ItemCooldownComponent, ItemDurabilityComponent, ItemEnchantableComponent, ItemStack } from "@minecraft/server";
import ExLoreManager from "../../interface/ExLoreManager.js";
import ExTagManager from "../../interface/ExTagManager.js";
import { AlsoInstanceType } from "../../utils/tool.js";
if (ItemStack.prototype === undefined) ItemStack.prototype = {} as any;

const compId = {
    [ItemDurabilityComponent.componentId]: ItemDurabilityComponent,
    [ItemEnchantableComponent.componentId]: ItemEnchantableComponent,
    [ItemCooldownComponent.componentId]: ItemCooldownComponent
};
type CompId = typeof compId;

declare module "@minecraft/server" {
    export interface ItemStack extends ExLoreManager, ExTagManager {
        addTag(tag: string): string;
        removeTag(tag: string): string;
        getComponentById<T extends keyof CompId>(key: T): AlsoInstanceType<CompId[T]> | undefined;
        hasComponentById<T extends keyof CompId>(key: T): boolean;
        isWillBeRemoved: boolean;
    }
}
Object.assign(ItemStack.prototype, {
    addTag: function (tag: string): string {
        throw new Error("cant add tag");
    },
    removeTag: function (tag: string): string {
        throw new Error("cant remove tag");
    },
    hasComponentById<T extends keyof CompId>(key: T): boolean {
        return (this as ItemStack).hasComponent(key);
    },
    getComponentById<T extends keyof CompId>(key: T) {
        return (this as ItemStack).getComponent(key);
    },
    isWillBeRemoved: false
});