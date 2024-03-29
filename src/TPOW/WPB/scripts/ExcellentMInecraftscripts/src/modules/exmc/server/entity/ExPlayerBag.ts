import ExPlayer from "./ExPlayer.js";
import ExEntityBag from './ExEntityBag.js';

export default class ExPlayerBag extends ExEntityBag {
    private _player: ExPlayer;
    constructor(player: ExPlayer) {
        super(player);
        this._player = player;
    }
    getSelectedSlot() {
        return this._player.selectedSlot;
    }
}