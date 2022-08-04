import { BlockLocation, Location, Vector } from "mojang-minecraft";
export default class Vector3 {
    constructor(a, b, c) {
        if (a instanceof Vector) {
            this.vector = a;
        }
        else if (a !== undefined && b !== undefined && c !== undefined) {
            this.vector = new Vector(a, b, c);
        }
        else {
            this.vector = new Vector(a.x, a.y, a.z);
        }
    }
    get x() { return this.vector.x; }
    get y() { return this.vector.y; }
    get z() { return this.vector.z; }
    set x(x) { this.vector.x = x; }
    set y(y) { this.vector.y = y; }
    set z(z) { this.vector.z = z; }
    add(vec) {
        return new Vector3(Vector.add(this.vector, vec instanceof Vector3 ? vec.vector : vec));
    }
    sub(vec) {
        return new Vector3(Vector.subtract(this.vector, vec instanceof Vector3 ? vec.vector : vec));
    }
    mul(vec) {
        return new Vector3(Vector.multiply(this.vector, vec instanceof Vector3 ? vec.vector : vec));
    }
    div(vec) {
        return new Vector3(Vector.divide(this.vector, vec instanceof Vector3 ? vec.vector : vec));
    }
    len() {
        return this.vector.length();
    }
    equals(other) {
        return this.vector.equals(other instanceof Vector3 ? other.vector : other);
    }
    distance(vec) {
        return Vector.distance(this.vector, vec instanceof Vector3 ? vec.vector : vec);
    }
    toString() {
        return `(${this.vector.x}, ${this.vector.y}, ${this.vector.z})`;
    }
    [Symbol.toStringTag]() {
        return this.toString();
    }
    floor() {
        this.vector.x = Math.floor(this.vector.x);
        this.vector.y = Math.floor(this.vector.y);
        this.vector.z = Math.floor(this.vector.z);
        return this;
    }
    round() {
        this.vector.x = Math.round(this.vector.x);
        this.vector.y = Math.round(this.vector.y);
        this.vector.z = Math.round(this.vector.z);
        return this;
    }
    ceil() {
        this.vector.x = Math.ceil(this.vector.x);
        this.vector.y = Math.ceil(this.vector.y);
        this.vector.z = Math.ceil(this.vector.z);
        return this;
    }
    getVector() {
        return this.vector;
    }
    getLocation() {
        return new Location(this.x, this.y, this.z);
    }
    getBlockLocation() {
        return new BlockLocation(this.x, this.y, this.z);
    }
}
//# sourceMappingURL=Vector3.js.map