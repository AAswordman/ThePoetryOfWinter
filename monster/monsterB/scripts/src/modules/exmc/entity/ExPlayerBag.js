import ExEntityComponentId from './ExEntityComponentId.js';
export default class ExPlayerBag {
    constructor(player) {
        this._player = player;
        this.bagComponent = player.getComponent(ExEntityComponentId.inventory);
    }
    getItem(num) {
        return this.bagComponent.container.getItem(num);
    }
    getAllItems() {
        let items = [];
        for (let i = 0; i < this.bagComponent.inventorySize; i++) {
            items.push(this.bagComponent.container.getItem(i));
        }
        ;
        return items;
    }
    setItem(num, item) {
        return this.bagComponent.container.setItem(num, item);
    }
    getItemOnHand() {
        return this.getItem(this._player.selectedSlot);
    }
}
//# sourceMappingURL=ExPlayerBag.js.map