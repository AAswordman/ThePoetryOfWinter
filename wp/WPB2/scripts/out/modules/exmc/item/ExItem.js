export default class ExItem {
    constructor(item) {
        this._item = item;
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
    getEnchantsComponent() {
        return this.getComponent("minecraft:enchants");
    }
    getComponent(str) {
        return this._item.getComponent(str);
    }
}
ExItem.propertyNameCache = "exCache";
//# sourceMappingURL=ExItem.js.map