import ExEntity from "./ExEntity.js";
import { ExPlayerBag } from "./ExEntityBag.js";
export default class ExPlayer extends ExEntity {
    title(title, subtitle) {
        this.runCommandAsync(`titleraw @s title {"rawtext":[{"text":"${title}"}]}`);
        if (subtitle)
            this.runCommandAsync(`titleraw @s subtitle {"rawtext":[{"text":"${subtitle}"}]}`);
    }
    titleActionBar(str) {
        this.runCommandAsync(`titleraw @s actionbar {"rawtext":[{"text":"${str}"}]}`);
    }
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