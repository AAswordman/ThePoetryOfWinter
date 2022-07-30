import ExEntityComponentId from './ExEntityComponentId.js';
export default class ExPlayerBag {
    constructor(player) {
        this._player = player;
        this.bagComponent = player.getComponent(ExEntityComponentId.inventory);
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
            if (items[i].id === id) {
                return i;
            }
        }
        return -1;
    }
    getAllItems() {
        let items = [];
        for (let i = 0; i < this.bagComponent.inventorySize; i++) {
            items.push(this.bagComponent.container.getItem(i));
        }
        ;
        return items;
    }
    setItem(slot, item) {
        return this.bagComponent.container.setItem(slot, item);
    }
    getItemOnHand() {
        return this.getItem(this._player.selectedSlot);
    }
    hasItem(itemId) {
        return this.searchItem(itemId) !== -1;
    }
}
//# sourceMappingURL=ExPlayerBag.js.map