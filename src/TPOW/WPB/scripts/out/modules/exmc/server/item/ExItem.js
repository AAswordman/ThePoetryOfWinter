import { ItemCooldownComponent, ItemDurabilityComponent, ItemEnchantableComponent, ItemStack } from "@minecraft/server";
if (ItemStack.prototype === undefined)
    ItemStack.prototype = {};
const compId = {
    [ItemDurabilityComponent.componentId]: ItemDurabilityComponent,
    [ItemEnchantableComponent.componentId]: ItemEnchantableComponent,
    [ItemCooldownComponent.componentId]: ItemCooldownComponent
};
Object.assign(ItemStack.prototype, {
    addTag: function (tag) {
        throw new Error("cant add tag");
    },
    removeTag: function (tag) {
        throw new Error("cant remove tag");
    },
    hasComponentById(key) {
        return this.hasComponent(key);
    },
    getComponentById(key) {
        return this.getComponent(key);
    },
    isWillBeRemoved: false
});
//# sourceMappingURL=ExItem.js.map