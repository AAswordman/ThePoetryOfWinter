import ExEntity from "./ExEntity.js";
import ExPlayerBag from "./ExPlayerBag.js";
export default class ExPlayer extends ExEntity {
    constructor(player) {
        super(player);
    }
    getBag() {
        return new ExPlayerBag(this.entity);
    }
}
//# sourceMappingURL=ExPlayer.js.map