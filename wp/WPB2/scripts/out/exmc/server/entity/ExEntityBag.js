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
export class ExPlayerBag extends ExEntityBag {
    constructor(player) {
        super(player);
        this._player = player;
    }
    getItemOnHand() {
        return this.getItem(this._player.selectedSlot);
    }
    setItemOnHand(i) {
        return this.setItem(this._player.selectedSlot, i);
    }
}
//# sourceMappingURL=ExEntityBag.js.map