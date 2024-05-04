import ExDimension from '../../ExDimension.js';
import { to } from '../../ExErrorQueue.js';
export default class ExStructure {
    constructor(id, pos, rotation = 0) {
        this.mirror = "none";
        this.structureId = id;
        this.position = pos;
        this.rotation = rotation;
    }
    generate(dim) {
        let rot = this.rotation;
        let exdim = ExDimension.getInstance(dim);
        to(exdim.command.run(`structure load ${this.structureId} ${this.position.x} ${this.position.y} ${this.position.z} ${Math.round(rot)}_degrees ${this.mirror}`));
    }
}
//# sourceMappingURL=ExStructure.js.map