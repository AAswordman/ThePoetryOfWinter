import ExEntity from "./ExEntity.js";
import { ExPlayerBag } from "./ExEntityBag.js";
export default class ExPlayer extends ExEntity {
    get selectedSlot() {
        return this.entity.selectedSlot;
    }
    set selectedSlot(value) {
        this.entity.selectedSlot = value;
    }
    constructor(player) {
        super(player);
    }
    getBag() {
        return new ExPlayerBag(this);
    }
    static getInstance(source) {
        let entity = source;
        if (this.propertyNameCache in entity) {
            return entity[this.propertyNameCache];
        }
        return (entity[this.propertyNameCache] = new ExPlayer(entity));
    }
}
//# sourceMappingURL=ExPlayer.js.map