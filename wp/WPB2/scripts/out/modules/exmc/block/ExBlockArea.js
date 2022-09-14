import Matrix4 from '../utils/Matrix4.js';
import Vector3 from '../utils/Vector3.js';
export class ExBlockArea {
    constructor(start, end) {
        this._tmpA = new Vector3();
        this._tmpB = new Vector3();
        this._tmpC = new Vector3();
        this.start = start.clone();
        this.end = end.clone();
        if (this.start.x > this.end.x)
            [this.start.x, this.end.x] = [this.end.x, this.start.x];
        if (this.start.y > this.end.y)
            [this.start.y, this.end.y] = [this.end.y, this.start.y];
        if (this.start.z > this.end.z)
            [this.start.z, this.end.z] = [this.end.z, this.start.z];
        this.resetRotation();
    }
    resetRotation() {
        this.mat = new Matrix4([
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ]);
    }
    setRotation() {
    }
    calculateWidth(temp = this._tmpB) {
        return temp.set(this.end).sub(this.start).mul(this.mat);
    }
    calculateAbsPos(vec, temp = this._tmpA) {
        return this.calculateRelPos(this._tmpC.sub(this.start), temp).add(this.start);
    }
    calculateRelPos(vec, temp = this._tmpA) {
        temp.set(vec).mul(this.mat);
        return temp;
    }
}
//# sourceMappingURL=ExBlockArea.js.map