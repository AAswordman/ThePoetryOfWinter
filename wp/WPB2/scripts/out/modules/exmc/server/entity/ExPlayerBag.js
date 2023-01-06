import ExEntityBag from './ExEntityBag.js';
export default class ExPlayerBag extends ExEntityBag {
    constructor(player) {
        super(player);
        this._player = player;
        this.bagComponent = player.getInventoryComponent();
    }
    getItemOnHand() {
        return this.getItem(this._player.selectedSlot);
    }
    setItemOnHand(item) {
        return this.setItem(this._player.selectedSlot, item);
    }
}
//# sourceMappingURL=ExPlayerBag.js.map