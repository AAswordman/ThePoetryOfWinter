import { BlockLocation, Location, Vector } from "mojang-minecraft";
export default class Vector3 {
    constructor(a, b, c) {
        if (a !== undefined && b !== undefined && c !== undefined) {
            this.x = a;
            this.y = b;
            this.z = c;
        }
        else {
            this.x = a.x;
            this.y = a.y;
            this.z = a.z;
        }
    }
    add(x, y, z) {
        if (x instanceof Vector3 || x instanceof Vector3) {
            this.add(x.x, x.y, x.z);
        }
        else if (y !== undefined && z !== undefined) {
            this.x += x;
            this.y += y;
            this.z += z;
        }
        return this;
    }
    sub(x, y, z) {
        if (x instanceof Vector3 || x instanceof Vector3) {
            this.sub(x.x, x.y, x.z);
        }
        else if (y !== undefined && z !== undefined) {
            this.x -= x;
            this.y -= y;
            this.z -= z;
        }
        return this;
    }
    mul(n) {
        this.x *= n;
        this.y *= n;
        this.z *= n;
        return this;
    }
    div(n) {
        this.x /= n;
        this.y /= n;
        this.z /= n;
        return this;
    }
    len() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
    }
    len2() {
        return Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2);
    }
    equals(other) {
        return this.x === other.x && this.y === other.y && this.z === other.z;
    }
    distance(vec) {
        return this.clone().sub(vec).len();
    }
    toString() {
        return `(${this.x}, ${this.y}, ${this.z})`;
    }
    [Symbol.toStringTag]() {
        return this.toString();
    }
    floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);
        return this;
    }
    round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);
        return this;
    }
    ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.z = Math.ceil(this.z);
        return this;
    }
    getVector() {
        return new Vector(this.x, this.y, this.z);
    }
    clone() {
        return new Vector3(this.x, this.y, this.z);
    }
    getLocation() {
        return new Location(this.x, this.y, this.z);
    }
    getBlockLocation() {
        return new BlockLocation(this.x, this.y, this.z);
    }
}
//# sourceMappingURL=Vector3.js.map