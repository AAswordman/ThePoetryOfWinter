export default class ExItem {
    constructor(item) {
        this._item = item;
    }
    getItem() {
        return this._item;
    }
    static getInstance(source) {
        let item = source;
        if (this.propertyNameCache in item) {
            return item[this.propertyNameCache];
        }
        return (item[this.propertyNameCache] = new ExItem(item));
    }
    getLore() {
        var _a;
        return (_a = this._item.getLore()) !== null && _a !== void 0 ? _a : [];
    }
    setLore(lore) {
        lore.splice(lore.indexOf(""), 1);
        this._item.setLore(lore.length == 0 ? [Math.random() > 0.9 ? "mojang nmsl" : ""] : lore);
    }
    getComponent(str) {
        return this._item.getComponent(str);
    }
    hasComponent(str) {
        return this._item.hasComponent(str);
    }
    getEnchantsComponent() {
        return this.getComponent("minecraft:enchantments");
    }
    hasEnchantsComponent() {
        return this.hasComponent("minecraft:enchantments");
    }
}
ExItem.propertyNameCache = "exCache";
//# sourceMappingURL=ExItem.js.map