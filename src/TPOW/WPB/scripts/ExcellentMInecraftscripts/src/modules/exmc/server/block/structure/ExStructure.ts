import Vector3 from '../../../math/Vector3.js';
import { Dimension } from '@minecraft/server';
import Vector2 from '../../../math/Vector2.js';
import ExDimension from '../../ExDimension.js';
import { to } from '../../ExErrorQueue.js';
export default class ExStructure {
    structureId: string;
    mirror: "x"|"z"|"xz"|"none" = "none";
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
        to(exdim.command.run(`structure load ${this.structureId} ${this.position.x} ${this.position.y} ${this.position.z} ${Math.round(rot)}_degrees ${this.mirror}`));
    }
}