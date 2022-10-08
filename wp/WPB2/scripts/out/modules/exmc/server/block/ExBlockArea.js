import Matrix4 from '../../math/Matrix4.js';
import Vector3 from '../../math/Vector3.js';
export class ExBlockArea {
    constructor(a, b, usePoint) {
        this._width = new Vector3();
        this._tmpA = new Vector3();
        this._tmpC = new Vector3();
        this._judgeWidth = new Vector3();
        this._tmpD = new Vector3();
        this.start = a.clone();
        this.end = b.clone();
        if (!usePoint) {
            if (this.end.x < 0 || this.end.y < 0 || this.end.z < 0)
                throw new Error("Invalid value (x,y,z < 0)");
            this.end.add(this.start);
        }
        else {
            if (this.start.x > this.end.x)
                [this.start.x, this.end.x] = [this.end.x, this.start.x];
            if (this.start.y > this.end.y)
                [this.start.y, this.end.y] = [this.end.y, this.start.y];
            if (this.start.z > this.end.z)
                [this.start.z, this.end.z] = [this.end.z, this.start.z];
            this.end.add(1, 1, 1);
        }
        this.resetRotation();
    }
    resetRotation() {
        this.setMatrix4(new Matrix4([
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ]));
    }
    turnUp() {
        this.setMatrix4(this.mat.mul(new Matrix4([
            [1, 0, 0, 0],
            [0, 0, -1, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 1]
        ])));
    }
    turnRight() {
        this.setMatrix4(this.mat = this.mat.mul(new Matrix4([
            [0, 0, -1, 0],
            [0, 1, 0, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 1]
        ])));
    }
    turnFrontClockwise() {
        this.setMatrix4(this.mat.mul(new Matrix4([
            [0, -1, 0, 0],
            [1, 0, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ])));
    }
    pointAtStart(vec) {
        this.end.sub(this.start).add(vec);
        this.start.set(vec);
    }
    calculateWidth() {
        this._width.set(this.end).sub(this.start).mul(this.mat).abs();
        this._judgeWidth.set(1, 1, 1).mul(this.mat);
        return this.getWidth();
    }
    getWidth() {
        return this._width;
    }
    calculateAbsPos(vec, temp = this._tmpA) {
        return this.calculateRelPos(this._tmpC.sub(this.start), temp).add(this.start);
    }
    calculateRelPos(vec, temp = this._tmpA) {
        temp.set(vec).mul(this.mat);
        const box = this.getWidth();
        temp.x = this._judgeWidth.x < 0 ? box.x + temp.x - 1 : temp.x;
        temp.y = this._judgeWidth.y < 0 ? box.y + temp.y - 1 : temp.y;
        temp.z = this._judgeWidth.z < 0 ? box.z + temp.z - 1 : temp.z;
        return temp;
    }
    forEachArea(w, callback) {
        const childArea = w.clone();
        childArea.pointAtStart(this._tmpD.set(0, 0, 0));
        const width = this.getWidth();
        const childWidth = childArea.getWidth();
        for (let x = 0; x <= width.x - childWidth.x; x++) {
            for (let y = 0; y <= width.y - childWidth.y; y++) {
                for (let z = 0; z <= width.z - childWidth.z; z++) {
                    childArea.pointAtStart(this._tmpD.set(x, y, z).add(this.start));
                    callback(childArea);
                }
            }
        }
    }
    clone() {
        const res = new ExBlockArea(this.start.clone(), this.end.clone().sub(1, 1, 1), true);
        res.setMatrix4(this.mat.clone());
        return res;
    }
    setMatrix4(mat) {
        this.mat = mat;
        this.calculateWidth();
    }
}
//# sourceMappingURL=ExBlockArea.js.map