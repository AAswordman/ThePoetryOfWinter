
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

    public add(x: number, y: number): Vector2
    public add(x: IVector2): Vector2
    public add(x: IVector2 | number, y?: number) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                this.x += x;
                this.y += y;
            }
        } else {
            this.add(x.x, x.y);
        }
        return this;
    }
    public sub(x: number, y: number): Vector2
    public sub(x: IVector2): Vector2
    public sub(x: IVector2 | number, y?: number) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                this.x -= x;
                this.y -= y;
            }
        } else {
            this.sub(x.x, x.y);
        }
        return this;
    }

    public scl(x: number): Vector2;
    public scl(x: IVector2): Vector2;
    public scl(x: number, y: number, z: number): Vector2
    public scl(x: number | IVector2, y?: number, z?: number): Vector2 {
        if (typeof x === 'number') {
            if (typeof y === 'number' && typeof z === 'number') {
                this.x *= x;
                this.y *= y;
            } else if (y === undefined && z === undefined) {
                this.x *= x;
                this.y *= x;
            }
        } else {
            this.sub(x.x, x.y);
        }
        return this;
    }
    public div(n: number) {
        this.x /= n;
        this.y /= n;
        return this;
    }
    public len() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    public len2() {
        return this.x ** 2 + this.y ** 2;
    }
    public equals(other: Vector2) {
        return this.x === other.x && this.y === other.y;
    }
    public distance(vec: Vector2) {
        return this.clone().sub(vec).len();
    }
    public toString() {
        return `(${this.x}, ${this.y})`;
    }
    [Symbol.toStringTag]() {
        return this.toString();
    }
    public floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    }
    public round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }
    public ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this;
    }
    public abs() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        return this;
    }

    public mul(n: IVector2): number;
    public mul(n: IVector2) {
        return n.x * this.x + n.y * this.y;
    }

    public normalize() {
        this.div(this.len());
        return this;
    }

    public clone() {
        return new Vector2(this.x, this.y);
    }
}

export interface IVector2 {
    x: number;
    y: number;
}