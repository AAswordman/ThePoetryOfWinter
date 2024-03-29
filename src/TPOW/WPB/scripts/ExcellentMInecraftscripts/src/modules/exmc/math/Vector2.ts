import Matrix3 from "./Matrix3.js";

export default class Vector2 {

    public static readonly back = new Vector2(0, -1);
    public static readonly forward = new Vector2(0, 1);
    public static readonly left = new Vector2(-1, 0);
    public static readonly one = new Vector2(1, 1);
    public static readonly right = new Vector2(1, 0);
    public static readonly zero = new Vector2(0, 0);

    constructor()
    constructor(x: number, y: number)
    constructor(x: IVector2)
    constructor(a?: any, b?: any) {
        if (typeof a === "number" && typeof b === "number") {
            this.x = a;
            this.y = b;
        } else if (a === undefined && b === undefined) {
            this.x = 0;
            this.y = 0;
        } else {
            this.x = a.x;
            this.y = a.y;
        }
    }
    x: number;
    y: number;

    public set(x: number, y: number): Vector2;
    public set(x: IVector2): Vector2;
    public set(x: number | IVector2, y?: number) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                this.x = x;
                this.y = y;
            }
        } else {
            this.set(x.x, x.y);
        }
        return this;
    }
    public cpy(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    public add(vector: Vector2): Vector2 {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    public sub(vector: Vector2): Vector2 {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }

    public scl(scalar: number): Vector2 {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    public sclX(scalar: number): Vector2 {
        this.x *= scalar;
        return this;
    }

    public sclY(scalar: number): Vector2 {
        this.y *= scalar;
        return this;
    }

    public len(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public len2(): number {
        return this.x * this.x + this.y * this.y;
    }

    public normalize(): Vector2 {
        let len = this.len();
        if (len != 0) {
            this.x /= len;
            this.y /= len;
        }
        return this;
    }

    public dot(vector: Vector2): number {
        return this.x * vector.x + this.y * vector.y;
    }

    public dst(vector: Vector2): number {
        let x_d = this.x - vector.x;
        let y_d = this.y - vector.y;
        return Math.sqrt(x_d * x_d + y_d * y_d);
    }

    public dst2(vector: Vector2): number {
        let x_d = this.x - vector.x;
        let y_d = this.y - vector.y;
        return x_d * x_d + y_d * y_d;
    }

    public angle(): number {
        let angle = Math.atan2(this.y, this.x);
        if (angle < 0) angle += Math.PI * 2;
        return angle;
    }

    public angleRad(): number {
        return Math.atan2(this.y, this.x);
    }

    public angleDeg(): number {
        return Math.atan2(this.y, this.x) * Math.PI / 180;
    }

    public rotate(angle: number): Vector2 {
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);

        let newX = this.x * cos - this.y * sin;
        let newY = this.x * sin + this.y * cos;

        this.x = newX;
        this.y = newY;

        return this;
    }

    public rotateRad(angle: number): Vector2 {
        return this.rotate(angle * Math.PI / 180);
    }

    public rotateDeg(angle: number): Vector2 {
        return this.rotate(angle * 180 / Math.PI);
    }

    public limit(limit: number): Vector2 {
        if (this.len2() > limit * limit) {
            this.normalize();
            this.scl(limit);
        }
        return this;
    }

    public setLength(length: number): Vector2 {
        this.normalize();
        this.scl(length);
        return this;
    }

    public lerp(target: Vector2, alpha: number): Vector2 {
        let x = this.x + (target.x - this.x) * alpha;
        let y = this.y + (target.y - this.y) * alpha;
        this.x = x;
        this.y = y;
        return this;
    }

    public mul(matrix: Matrix3): Vector2 {
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

    public unrotateRad(matrix: Matrix3): Vector2 {
        return this.mul(matrix);
    }

    public unrotateDeg(matrix: Matrix3): Vector2 {
        return this.mul(matrix);
    }

    public toString(): string {
        return "(" + this.x + ", " + this.y + ")";
    }
}

export interface IVector2 {
    x: number;
    y: number;
}