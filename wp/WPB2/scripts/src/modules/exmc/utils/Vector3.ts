import { BlockLocation, Location, Vector } from "mojang-minecraft";

export default class Vector3 {
    constructor(v: { x: number; y: number; z: number })
    constructor(x: number, y: number, z: number)
    constructor(a: any, b?: any, c?: any) {
        if (a !== undefined && b !== undefined && c !== undefined) {
            this.x = a;
            this.y = b;
            this.z = c;
        } else {
            this.x = a.x;
            this.y = a.y;
            this.z = a.z;
        }
    }
    x: number;
    y: number;
    z: number;

    public add(vec: Vector3 | Vector): Vector3
    public add(x: number, y: number, z: number): Vector3
    public add(x: any, y?: number, z?: number) {
        if (x instanceof Vector3 || x instanceof Vector3) {
            this.add(x.x, x.y, x.z);
        } else if (y !== undefined && z !== undefined) {
            this.x += x;
            this.y += y;
            this.z += z;
        }
        return this;
    }
    public sub(vec: Vector3): Vector3
    public sub(x: number, y: number, z: number): Vector3
    public sub(x: any, y?: number, z?: number) {
        if (x instanceof Vector3 || x instanceof Vector3) {
            this.sub(x.x, x.y, x.z);
        } else if (y !== undefined && z !== undefined) {
            this.x -= x;
            this.y -= y;
            this.z -= z;
        }
        return this;
    }
    public mul(n:number) {
        this.x *= n;
        this.y *= n;
        this.z *= n;
        return this;
    }
    public div(n: number) {
        this.x /= n;
        this.y /= n;
        this.z /= n;
        return this;
    }
    public len() {
        return Math.sqrt(this.x**2+this.y**2+this.z**2);
    }
    public len2() {
        return this.x**2+this.y**2+this.z**2;
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

    public getVector() {
        return new Vector(this.x,this.y,this.z);
    }
    public clone(){
        return new Vector3(this.x,this.y,this.z);
    }

    public getLocation() {
        return new Location(this.x, this.y, this.z);
    }
    public getBlockLocation() {
        return new BlockLocation(this.x, this.y, this.z);
    }
}