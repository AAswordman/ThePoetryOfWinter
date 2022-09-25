import Vector3 from '../../utils/Vector3.js';
import { Dimension } from 'mojang-minecraft';
import Vector2 from '../../utils/Vector2.js';
export default class ExStructure{
    structureId : string;
    mirror = false;
    position: Vector3;
    rotation: Vector2;

    constructor(id:string, pos: Vector3,rotation:Vector2 = new Vector2()){
        this.structureId = id;
        this.position = pos;
        this.rotation = rotation;
    }
    generate(dim:Dimension){
        let rot = this.rotation.x;
        dim.runCommand(`structure load ${this.structureId} ${this.position.x} ${this.position.y} ${this.position.z} ${Math.round(rot)}_degrees` )
    }
}