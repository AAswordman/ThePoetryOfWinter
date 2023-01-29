export default class ExEntityBag {
    constructor(entity) {
        this._entity = entity;
        this.bagComponent = entity.getInventoryComponent();
    }
    getItem(arg) {
        if (typeof (arg) === "number") {
            return this.bagComponent.container.getItem(arg);
        }
        let search = this.searchItem(arg);
        if (search === -1) {
            return undefined;
        }
        return this.bagComponent.container.getItem(search);
    }
    searchItem(id) {
        let items = this.getAllItems();
        for (let i = 0; i < items.length; i++) {
            if (items[i] === undefined) {
                continue;
            }
            if (items[i].typeId === id) {
                return i;
            }
        }
        return -1;
    }
    getAllItems() {
        let items = [];
        for (let i = 0; i < this.size(); i++) {
            items.push(this.bagComponent.container.getItem(i));
        }
        ;
        return items;
    }
    countAllItems() {
        var _a;
        let items = new Map();
        for (let i = 0; i < this.size(); i++) {
            let item = this.getItem(i);
            if (item)
                items.set(item.typeId, item.amount + ((_a = items.get(item.typeId)) !== null && _a !== void 0 ? _a : 0));
        }
        ;
        return items;
    }
    clearItem(id, amount) {
        for (let i = 0; i < this.size(); i++) {
            let item = this.getItem(i);
            if ((item === null || item === void 0 ? void 0 : item.typeId) === id) {
                let rem = amount - item.amount;
                if (rem > 0) {
                    this.setItem(i, undefined);
                    amount = rem;
                }
                else {
                    item.amount -= amount;
                    this.setItem(i, item);
                    break;
                }
            }
        }
        ;
    }
    size() {
        return this.bagComponent.inventorySize;
    }
    type() {
        return this.bagComponent.containerType;
    }
    isPrivate() {
        return this.bagComponent.private;
    }
    isRestrictToOwner() {
        return this.bagComponent.restrictToOwner;
    }
    setItem(slot, item) {
        return this.bagComponent.container.setItem(slot, item);
    }
    hasItem(itemId) {
        return this.searchItem(itemId) !== -1;
    }
}
//# sourceMappingURL=ExEntityBag.js.map