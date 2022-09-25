import Vector2 from '../../utils/Vector2.js';
export default class ExStructure {
    constructor(id, pos, rotation = new Vector2()) {
        this.mirror = false;
        this.structureId = id;
        this.position = pos;
        this.rotation = rotation;
    }
    generate(dim) {
        let rot = this.rotation.x;
        dim.runCommand(`structure load ${this.structureId} ${this.position.x} ${this.position.y} ${this.position.z} ${Math.round(rot)}_degrees`);
    }
}
//# sourceMappingURL=ExStructure.js.map