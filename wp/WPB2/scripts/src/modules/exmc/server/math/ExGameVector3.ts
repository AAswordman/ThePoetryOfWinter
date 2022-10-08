import { Vector, BlockLocation,Location } from "mojang-minecraft";
import Vector3 from '../../math/Vector3.js';

export default class ExGameVector3{
    
    private static _tempVector?: Vector;
    private static _tempLocation?: Location;
    private static _tempBlockLocation?: BlockLocation;
    public static getVector(vec:Vector3) {
        if (!this._tempVector) {
            return (this._tempVector = new Vector(vec.x, vec.y, vec.z));
        } else {
            this._tempVector.x = vec.x;
            this._tempVector.y = vec.y;
            this._tempVector.z = vec.z;
            return (this._tempVector);
        }
    }
    public static getLocation(vec:Vector3) {
        if (!this._tempLocation) {
            return (this._tempLocation = new Location(vec.x, vec.y, vec.z));
        } else {
            this._tempLocation.x = vec.x;
            this._tempLocation.y = vec.y;
            this._tempLocation.z = vec.z;
            return (this._tempLocation);
        }
    }
    public static getBlockLocation(vec:Vector3) {
        if (!this._tempBlockLocation) {
            return (this._tempBlockLocation = new BlockLocation(vec.x, vec.y, vec.z));
        } else {
            this._tempBlockLocation.x = vec.x;
            this._tempBlockLocation.y = vec.y;
            this._tempBlockLocation.z = vec.z;
            return (this._tempBlockLocation);
        }
    }

}