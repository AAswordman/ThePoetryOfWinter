import ExDimension from '../../ExDimension.js';
export default class ExStructure {
    constructor(id, pos, rotation = 0) {
        this.mirror = false;
        this.structureId = id;
        this.position = pos;
        this.rotation = rotation;
    }
    generate(dim) {
        let rot = this.rotation;
        let exdim = ExDimension.getInstance(dim);
        console.warn(JSON.stringify(exdim.runCommand(`structure load ${this.structureId} ${this.position.x} ${this.position.y} ${this.position.z} ${Math.round(rot)}_degrees`)));
    }
}
//# sourceMappingURL=ExStructure.js.map