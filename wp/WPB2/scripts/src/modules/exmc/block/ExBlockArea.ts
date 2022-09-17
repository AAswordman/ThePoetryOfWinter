import ExGameConfig from '../ExGameConfig.js';
import Matrix4 from '../utils/Matrix4.js';
import Vector3 from '../utils/Vector3.js';
export class ExBlockArea {
    start: Vector3;
    end: Vector3;
    mat!: Matrix4;

    constructor(start: Vector3, end: Vector3, usePoint: true)
    constructor(start: Vector3, width: Vector3)
    constructor(a: Vector3, b: Vector3, usePoint?: true) {
        this.start = a.clone();
        this.end = b.clone();
        if (!usePoint) {
            if (this.end.x < 0 || this.end.y < 0 || this.end.z < 0) throw new Error("Invalid value (x,y,z < 0)");

            this.end.add(this.start);
        } else {
            if (this.start.x > this.end.x) [this.start.x, this.end.x] = [this.end.x, this.start.x];
            if (this.start.y > this.end.y) [this.start.y, this.end.y] = [this.end.y, this.start.y];
            if (this.start.z > this.end.z) [this.start.z, this.end.z] = [this.end.z, this.start.z];
            this.end.add(1,1,1);
        }

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

    turnUp() {
        this.mat = this.mat.mul(new Matrix4([
            [1, 0, 0, 0],
            [0, 0, -1, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 1]
        ]));
    }
    turnRight() {
        this.mat = this.mat.mul(new Matrix4([
            [0, 0, -1, 0],
            [0, 1, 0, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 1]
        ]));
    }
    turnFrontClockwise() {
        this.mat = this.mat.mul(new Matrix4([
            [0, -1, 0, 0],
            [1, 0, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ]))
    }

    pointAtStart(vec: Vector3) {
        this.end.sub(this.start).add(vec);
        this.start.set(vec);
    }

    calculateWidth(temp = this._tmpB) {
        return temp.set(this.end).sub(this.start).mul(this.mat).abs();
    }

    private _tmpA = new Vector3();
    private _tmpB = new Vector3();
    private _tmpC = new Vector3();
    private _tmpD = new Vector3();


    calculateAbsPos(vec: Vector3, temp = this._tmpA) {
        return this.calculateRelPos(this._tmpC.sub(this.start), temp).add(this.start);
    }
    calculateRelPos(vec: Vector3, temp = this._tmpA) {
        temp.set(vec).mul(this.mat);
        this._tmpC.set(1,1,1).mul(this.mat);
        
        const box = this.calculateWidth();
        temp.x = this._tmpC.x < 0 ? box.x + temp.x - 1 : temp.x;
        temp.y = this._tmpC.y < 0 ? box.y + temp.y - 1 : temp.y;
        temp.z = this._tmpC.z < 0 ? box.z + temp.z - 1 : temp.z;
        return temp;
    }
    forEachArea(w: ExBlockArea, callback: (res: ExBlockArea) => void) {
        const childArea = w.clone();
        childArea.pointAtStart(this._tmpD.set(0, 0, 0));
        const width = this.calculateWidth(new Vector3());
        
        const childWidth = childArea.calculateWidth(new Vector3());
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
        const res = new ExBlockArea(this.start.clone(), this.end.clone().sub(1,1,1), true);
        res.setMatrix4(this.mat.clone());
        return res;
    }
    setMatrix4(mat: Matrix4) {
        this.mat = mat;
    }
}