export default class Vector2 {
    constructor(a, b) {
        if (typeof a === "number" && typeof b === "number") {
            this.x = a;
            this.y = b;
        }
        else if (a === undefined && b === undefined) {
            this.x = 0;
            this.y = 0;
        }
        else {
            this.x = a.x;
            this.y = a.y;
        }
    }
    set(x, y) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                this.x = x;
                this.y = y;
            }
        }
        else {
            this.set(x.x, x.y);
        }
        return this;
    }
    add(x, y) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                this.x += x;
                this.y += y;
            }
        }
        else {
            this.add(x.x, x.y);
        }
        return this;
    }
    sub(x, y) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                this.x -= x;
                this.y -= y;
            }
        }
        else {
            this.sub(x.x, x.y);
        }
        return this;
    }
    scl(x, y, z) {
        if (typeof x === 'number') {
            if (typeof y === 'number' && typeof z === 'number') {
                this.x *= x;
                this.y *= y;
            }
            else if (y === undefined && z === undefined) {
                this.x *= x;
                this.y *= x;
            }
        }
        else {
            this.sub(x.x, x.y);
        }
        return this;
    }
    div(n) {
        this.x /= n;
        this.y /= n;
        return this;
    }
    len() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
    len2() {
        return Math.pow(this.x, 2) + Math.pow(this.y, 2);
    }
    equals(other) {
        return this.x === other.x && this.y === other.y;
    }
    distance(vec) {
        return this.clone().sub(vec).len();
    }
    toString() {
        return `(${this.x}, ${this.y})`;
    }
    [Symbol.toStringTag]() {
        return this.toString();
    }
    floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    }
    round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }
    ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this;
    }
    abs() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        return this;
    }
    mul(n) {
        return n.x * this.x + n.y * this.y;
    }
    normalize() {
        this.div(this.len());
        return this;
    }
    clone() {
        return new Vector2(this.x, this.y);
    }
}
Vector2.back = new Vector2(0, -1);
Vector2.forward = new Vector2(0, 1);
Vector2.left = new Vector2(-1, 0);
Vector2.one = new Vector2(1, 1);
Vector2.right = new Vector2(1, 0);
Vector2.zero = new Vector2(0, 0);
//# sourceMappingURL=Vector2.js.map