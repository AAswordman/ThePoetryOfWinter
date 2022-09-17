import { BlockLocation, Location, Vector } from "mojang-minecraft";
import Matrix4 from './Matrix4.js';

export default class Vector3 {
    private _tempVector?: Vector;
    private _tempLocation?: Location;
    private _tempBlockLocation?: BlockLocation;

    constructor()
    constructor(v: IVector3)
    constructor(x: number, y: number, z: number)
    constructor(a?: any, b?: any, c?: any) {
        if (typeof a === "number" && typeof b === "number" && typeof c === "number") {
            this.x = a;
            this.y = b;
            this.z = c;
        } else if (a === undefined && b === undefined && c === undefined) {
            this.x = 0;
            this.y = 0;
            this.z = 0;
        } else {
            this.x = a.x;
            this.y = a.y;
            this.z = a.z;
        }
    }
    x: number;
    y: number;
    z: number;

    public set(x: number, y: number, z: number): Vector3;
    public set(x: IVector3): Vector3;
    public set(x: number | IVector3, y?: number, z?: number) {
        if (typeof x === 'number') {
            if (typeof y === 'number' && typeof z === 'number') {
                this.x = x;
                this.y = y;
                this.z = z;
            }
        } else {
            this.set(x.x, x.y, x.z);
        }
        return this;
    }

    public add(x: IVector3): Vector3
    public add(x: number, y: number, z: number): Vector3
    public add(x: IVector3 | number, y?: number, z?: number) {
        if (typeof x === 'number') {
            if (typeof y === 'number' && typeof z === 'number') {
                this.x += x;
                this.y += y;
                this.z += z;
            }
        } else {
            this.add(x.x, x.y, x.z);
        }
        return this;
    }
    public sub(x: IVector3): Vector3
    public sub(x: number, y: number, z: number): Vector3
    public sub(x: IVector3 | number, y?: number, z?: number) {
        if (typeof x === 'number') {
            if (typeof y === 'number' && typeof z === 'number') {
                this.x -= x;
                this.y -= y;
                this.z -= z;
            }
        } else {
            this.sub(x.x, x.y, x.z);
        }
        return this;
    }

    public scl(x: number): Vector3;
    public scl(x: IVector3): Vector3;
    public scl(x: number, y: number, z: number): Vector3
    public scl(x: number | IVector3, y?: number, z?: number): Vector3 {
        if (typeof x === 'number') {
            if (typeof y === 'number' && typeof z === 'number') {
                this.x *= x;
                this.y *= y;
                this.z *= z;
            } else if (y === undefined && z === undefined) {
                this.x *= x;
                this.y *= x;
                this.z *= x;
            }
        } else {
            this.sub(x.x, x.y, x.z);
        }
        return this;
    }
    public div(n: number) {
        this.x /= n;
        this.y /= n;
        this.z /= n;
        return this;
    }
    public len() {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    }
    public len2() {
        return this.x ** 2 + this.y ** 2 + this.z ** 2;
    }
    public equals(other: Vector3) {
        return this.x === other.x && this.y === other.y && this.z === other.z;
    }
    public distance(vec: Vector3) {
        return this.clone().sub(vec).len();
    }
    public toString() {
        return `(${this.x}, ${this.y}, ${this.z})`;
    }
    [Symbol.toStringTag]() {
        return this.toString();
    }
    public floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);
        return this;
    }
    public round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);
        return this;
    }
    public ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.z = Math.ceil(this.z);
        return this;
    }
    public abs() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        this.z = Math.abs(this.z);
        return this;
    }

    private static _tempA = new Vector3(0, 0, 0);

    public mul(n: IVector3): number;
    public mul(n: Matrix4): Vector3;
    public mul(n: IVector3 | Matrix4) {
        if (n instanceof Matrix4) {
            const mat = n.val;
            return this.set(
                this.x * mat[0][0] + this.y * mat[0][1] + this.z * mat[0][2] + mat[0][3],
                this.x * mat[1][0] + this.y * mat[1][1] + this.z * mat[1][2] + mat[1][3],
                this.x * mat[2][0] + this.y * mat[2][1] + this.z * mat[2][2] + mat[2][3]
            );
        } else {
            return n.x * this.x + n.y * this.y + n.z * this.z;
        }
    }


    public clone() {
        return new Vector3(this.x, this.y, this.z);
    }

    public getVector() {
        if (!this._tempVector) {
            return (this._tempVector = new Vector(this.x, this.y, this.z));
        } else {
            this._tempVector.x = this.x;
            this._tempVector.y = this.y;
            this._tempVector.z = this.z;
            return (this._tempVector);
        }
    }
    public getLocation() {
        if (!this._tempLocation) {
            return (this._tempLocation = new Location(this.x, this.y, this.z));
        } else {
            this._tempLocation.x = this.x;
            this._tempLocation.y = this.y;
            this._tempLocation.z = this.z;
            return (this._tempLocation);
        }
    }
    public getBlockLocation() {
        if (!this._tempBlockLocation) {
            return (this._tempBlockLocation = new BlockLocation(this.x, this.y, this.z));
        } else {
            this._tempBlockLocation.x = this.x;
            this._tempBlockLocation.y = this.y;
            this._tempBlockLocation.z = this.z;
            return (this._tempBlockLocation);
        }
    }
}

export interface IVector3 {
    x: number;
    y: number;
    z: number;
}