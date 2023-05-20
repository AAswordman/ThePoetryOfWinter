import ExEntityBag from './ExEntityBag.js';
export default class ExPlayerBag extends ExEntityBag {
    constructor(player) {
        super(player);
        this._player = player;
    }
    getItemOnHand() {
        return this.getItem(this.getSelectedSlot());
    }
    setItemOnHand(item) {
        return this.setItem(this.getSelectedSlot(), item);
    }
    getSelectedSlot() {
        return this._player.selectedSlot;
    }
}
//# sourceMappingURL=ExPlayerBag.js.map