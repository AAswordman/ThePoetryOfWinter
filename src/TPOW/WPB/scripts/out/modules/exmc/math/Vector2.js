class Vector2 {
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
    cpy() {
        return new Vector2(this.x, this.y);
    }
    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }
    sub(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }
    scl(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }
    sclX(scalar) {
        this.x *= scalar;
        return this;
    }
    sclY(scalar) {
        this.y *= scalar;
        return this;
    }
    len() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    len2() {
        return this.x * this.x + this.y * this.y;
    }
    normalize() {
        let len = this.len();
        if (len != 0) {
            this.x /= len;
            this.y /= len;
        }
        return this;
    }
    dot(vector) {
        return this.x * vector.x + this.y * vector.y;
    }
    dst(vector) {
        let x_d = this.x - vector.x;
        let y_d = this.y - vector.y;
        return Math.sqrt(x_d * x_d + y_d * y_d);
    }
    dst2(vector) {
        let x_d = this.x - vector.x;
        let y_d = this.y - vector.y;
        return x_d * x_d + y_d * y_d;
    }
    angle() {
        let angle = Math.atan2(this.y, this.x);
        if (angle < 0)
            angle += Math.PI * 2;
        return angle;
    }
    angleRad() {
        return Math.atan2(this.y, this.x);
    }
    angleDeg() {
        return Math.atan2(this.y, this.x) * Math.PI / 180;
    }
    rotate(angle) {
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        let newX = this.x * cos - this.y * sin;
        let newY = this.x * sin + this.y * cos;
        this.x = newX;
        this.y = newY;
        return this;
    }
    rotateRad(angle) {
        return this.rotate(angle * Math.PI / 180);
    }
    rotateDeg(angle) {
        return this.rotate(angle * 180 / Math.PI);
    }
    limit(limit) {
        if (this.len2() > limit * limit) {
            this.normalize();
            this.scl(limit);
        }
        return this;
    }
    setLength(length) {
        this.normalize();
        this.scl(length);
        return this;
    }
    lerp(target, alpha) {
        let x = this.x + (target.x - this.x) * alpha;
        let y = this.y + (target.y - this.y) * alpha;
        this.x = x;
        this.y = y;
        return this;
    }
    mul(matrix) {
        let m00 = matrix.val[0];
        let m01 = matrix.val[1];
        let m02 = matrix.val[2];
        let m10 = matrix.val[3];
        let m11 = matrix.val[4];
        let m12 = matrix.val[5];
        let x = this.x * m00 + this.y * m01 + m02;
        let y = this.x * m10 + this.y * m11 + m12;
        this.x = x;
        this.y = y;
        return this;
    }
    unrotateRad(matrix) {
        return this.mul(matrix);
    }
    unrotateDeg(matrix) {
        return this.mul(matrix);
    }
    toString() {
        return "(" + this.x + ", " + this.y + ")";
    }
}
Vector2.back = new Vector2(0, -1);
Vector2.forward = new Vector2(0, 1);
Vector2.left = new Vector2(-1, 0);
Vector2.one = new Vector2(1, 1);
Vector2.right = new Vector2(1, 0);
Vector2.zero = new Vector2(0, 0);
export default Vector2;
//# sourceMappingURL=Vector2.js.map