import ExEntityBag from './ExEntityBag.js';
export default class ExPlayerBag extends ExEntityBag {
    constructor(player) {
        super(player);
        this._player = player;
    }
    getSelectedSlot() {
        return this._player.selectedSlot;
    }
}
//# sourceMappingURL=ExPlayerBag.js.map