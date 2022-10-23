import Vector3 from '../../../math/Vector3.js';
import { Dimension } from 'mojang-minecraft';
import Vector2 from '../../../math/Vector2.js';
import ExDimension from '../../ExDimension.js';
export default class ExStructure {
    structureId: string;
    mirror = false;
    position: Vector3;
    rotation: number;

    constructor(id: string, pos: Vector3, rotation = 0) {
        this.structureId = id;
        this.position = pos;
        this.rotation = rotation;
    }
    generate(dim: Dimension) {
        let rot = this.rotation;
        let exdim = ExDimension.getInstance(dim);
        exdim.runCommand(`structure load ${this.structureId} ${this.position.x} ${this.position.y} ${this.position.z} ${Math.round(rot)}_degrees`);
    }
}