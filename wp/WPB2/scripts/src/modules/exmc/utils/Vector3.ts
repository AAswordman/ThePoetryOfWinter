import { BlockLocation, Location, Vector } from "mojang-minecraft";

export default class Vector3 {
    private vector: Vector;

    constructor(v: {x:number; y:number; z:number})
    constructor(v: Location)
    constructor(x: number, y: number, z: number)
    constructor(a: any, b?: any, c?: any) {
        if (a instanceof Vector) {
            this.vector = a;
        }else if (a !== undefined && b !== undefined && c !== undefined) {
            this.vector = new Vector(a, b, c);
        } else {
            this.vector = new Vector(a.x, a.y, a.z);
        }
    }
    public get x(): number { return this.vector.x; }
    public get y(): number { return this.vector.y; }
    public get z(): number { return this.vector.z; }

    public set x(x: number) { this.vector.x = x; }
    public set y(y: number) { this.vector.y = y; }
    public set z(z: number) { this.vector.z = z; }

    public add(vec: Vector3 | Vector) : Vector3
    public add(x: number, y: number, z: number): Vector3
    public add(x: any, y?: number, z?: number) {
        if(x instanceof Vector3 || x instanceof Vector3) {
            this.add(x.x,x.y,x.z);
        }else if(y !== undefined && z !== undefined) {
            this.x += x;
            this.y += y;
            this.z += z;
        }
        return this;
    }
    public sub(vec: Vector3) : Vector3
    public sub(x: number, y: number, z: number): Vector3
    public sub(x: any, y?: number, z?: number) {
        if(x instanceof Vector3 || x instanceof Vector3) {
            this.sub(x.x,x.y,x.z);
        }else if(y !== undefined && z !== undefined) {
            this.x -= x;
            this.y -= y;
            this.z -= z;
        }
        return this;
    }
    public mul(vec: Vector3 | Vector | number) {
        return new Vector3(Vector.multiply(this.vector, vec instanceof Vector3 ? vec.vector : vec));
    }
    public div(vec: Vector3 | Vector | number) {
        return new Vector3(Vector.divide(this.vector, vec instanceof Vector3 ? vec.vector : vec));
    }
    public len() {
        return this.vector.length();
    }
    public equals(other: Vector3 | Vector) {
        return this.vector.equals(other instanceof Vector3 ? other.vector : other);
    }
    public distance(vec:  Vector3 | Vector) {
        return Vector.distance(this.vector, vec instanceof Vector3 ? vec.vector : vec);
    }
    public toString(){
        return `(${this.vector.x}, ${this.vector.y}, ${this.vector.z})`;
    }
    [Symbol.toStringTag](){
        return this.toString();
    }
    public floor(){
        this.vector.x = Math.floor(this.vector.x);
        this.vector.y = Math.floor(this.vector.y);
        this.vector.z = Math.floor(this.vector.z);
        return this;
    }
    public round(){
        this.vector.x = Math.round(this.vector.x);
        this.vector.y = Math.round(this.vector.y);
        this.vector.z = Math.round(this.vector.z);
        return this;
    }
    public ceil(){
        this.vector.x = Math.ceil(this.vector.x);
        this.vector.y = Math.ceil(this.vector.y);
        this.vector.z = Math.ceil(this.vector.z);
        return this;
    }

    public getVector(){
        return this.vector;
    }

    public getLocation(){
        return new Location(this.x, this.y, this.z);
    }
    public getBlockLocation(){
        return new BlockLocation(this.x, this.y, this.z);
    }
}