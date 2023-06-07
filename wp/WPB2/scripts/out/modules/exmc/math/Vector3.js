import Matrix4 from './Matrix4.js';
export default class Vector3 {
    constructor(a, b, c) {
        if (typeof a === "number" && typeof b === "number" && typeof c === "number") {
            this.x = a;
            this.y = b;
            this.z = c;
        }
        else if (a === undefined && b === undefined && c === undefined) {
            this.x = 0;
            this.y = 0;
            this.z = 0;
        }
        else {
            this.x = a.x;
            this.y = a.y;
            this.z = a.z;
        }
    }
    set(x, y, z) {
        if (typeof x === 'number') {
            if (typeof y === 'number' && typeof z === 'number') {
                this.x = x;
                this.y = y;
                this.z = z;
            }
            else {
                this.x = x;
                this.y = x;
                this.z = x;
            }
        }
        else {
            this.set(x.x, x.y, x.z);
        }
        return this;
    }
    min(x, y, z) {
        if (typeof x === 'number') {
            if (typeof y === 'number' && typeof z === 'number') {
                this.x = Math.min(this.x, x);
                this.y = Math.min(this.y, y);
                this.z = Math.min(this.z, z);
            }
            else {
                this.x = Math.min(this.x, x);
                this.y = Math.min(this.y, x);
                this.z = Math.min(this.z, x);
            }
        }
        else {
            this.min(x.x, x.y, x.z);
        }
        return this;
    }
    add(x, y, z) {
        if (typeof x === 'number') {
            if (typeof y === 'number' && typeof z === 'number') {
                this.x += x;
                this.y += y;
                this.z += z;
            }
            else {
                this.x += x;
                this.y += x;
                this.z += x;
            }
        }
        else {
            this.add(x.x, x.y, x.z);
        }
        return this;
    }
    sub(x, y, z) {
        if (typeof x === 'number') {
            if (typeof y === 'number' && typeof z === 'number') {
                this.x -= x;
                this.y -= y;
                this.z -= z;
            }
            else {
                this.y -= x;
                this.z -= x;
                this.x -= x;
            }
        }
        else {
            this.sub(x.x, x.y, x.z);
        }
        return this;
    }
    scl(x, y, z) {
        if (typeof x === 'number') {
            if (typeof y === 'number' && typeof z === 'number') {
                this.x *= x;
                this.y *= y;
                this.z *= z;
            }
            else {
                this.x *= x;
                this.y *= x;
                this.z *= x;
            }
        }
        else {
            this.scl(x.x, x.y, x.z);
        }
        return this;
    }
    div(x, y, z) {
        if (typeof x === 'number') {
            if (typeof y === 'number' && typeof z === 'number') {
                this.x /= x;
                this.y /= y;
                this.z /= z;
            }
            else {
                this.x /= x;
                this.y /= x;
                this.z /= x;
            }
        }
        else {
            this.div(x.x, x.y, x.z);
        }
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
    abs() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        this.z = Math.abs(this.z);
        return this;
    }
    mul(n) {
        if (n instanceof Matrix4) {
            const mat = n.val;
            return this.set(this.x * mat[0][0] + this.y * mat[0][1] + this.z * mat[0][2] + mat[0][3], this.x * mat[1][0] + this.y * mat[1][1] + this.z * mat[1][2] + mat[1][3], this.x * mat[2][0] + this.y * mat[2][1] + this.z * mat[2][2] + mat[2][3]);
        }
        else {
            return n.x * this.x + n.y * this.y + n.z * this.z;
        }
    }
    normalize() {
        this.div(this.len());
        return this;
    }
    clone() {
        return new Vector3(this.x, this.y, this.z);
    }
    toArray() {
        return [this.x, this.y, this.z];
    }
}
Vector3.down = new Vector3(0, -1, 0);
Vector3.forward = new Vector3(0, 0, 1);
Vector3.back = new Vector3(0, 0, -1);
Vector3.left = new Vector3(-1, 0, 0);
Vector3.one = new Vector3(1, 1, 1);
Vector3.right = new Vector3(1, 0, 0);
Vector3.up = new Vector3(0, 1, 0);
Vector3.zero = new Vector3(0, 0, 0);
//# sourceMappingURL=Vector3.js.map