import { Vector, BlockLocation, Location } from "mojang-minecraft";
export default class ExGameVector3 {
    static getVector(vec) {
        if (!this._tempVector) {
            return (this._tempVector = new Vector(vec.x, vec.y, vec.z));
        }
        else {
            this._tempVector.x = vec.x;
            this._tempVector.y = vec.y;
            this._tempVector.z = vec.z;
            return (this._tempVector);
        }
    }
    static getLocation(vec) {
        if (!this._tempLocation) {
            return (this._tempLocation = new Location(vec.x, vec.y, vec.z));
        }
        else {
            this._tempLocation.x = vec.x;
            this._tempLocation.y = vec.y;
            this._tempLocation.z = vec.z;
            return (this._tempLocation);
        }
    }
    static getBlockLocation(vec) {
        if (!this._tempBlockLocation) {
            return (this._tempBlockLocation = new BlockLocation(vec.x, vec.y, vec.z));
        }
        else {
            this._tempBlockLocation.x = vec.x;
            this._tempBlockLocation.y = vec.y;
            this._tempBlockLocation.z = vec.z;
            return (this._tempBlockLocation);
        }
    }
}
//# sourceMappingURL=ExGameVector3.js.map