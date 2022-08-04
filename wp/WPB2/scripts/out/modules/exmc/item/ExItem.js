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
        return this._item.getLore();
    }
    setLore(lore) {
        this._item.setLore(lore);
    }
    getComponent(str) {
        return this._item.getComponent(str);
    }
    hasComponent(str) {
        return this._item.hasComponent(str);
    }
    getEnchantsComponent() {
        return this.getComponent("minecraft:enchants");
    }
    hasEnchantsComponent() {
        return this.hasComponent("minecraft:enchants");
    }
}
ExItem.propertyNameCache = "exCache";
//# sourceMappingURL=ExItem.js.map