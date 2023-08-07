import { Vector } from "@minecraft/server";
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
}
//# sourceMappingURL=ExGameVector3.js.map