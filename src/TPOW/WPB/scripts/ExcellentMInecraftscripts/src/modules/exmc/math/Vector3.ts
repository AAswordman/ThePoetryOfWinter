
import Matrix4 from './Matrix4.js';


/**
 * Represents a three-dimensional vector.
 */
export default class Vector3 {
    /**
     * The down vector, pointing straight down.
     */
    public static readonly down = new Vector3(0, -1, 0);
    /**
     * The forward vector, pointing straight ahead.
     */
    public static readonly forward = new Vector3(0, 0, 1);
    /**
     * The back vector, pointing straight back.
     */
    public static readonly back = new Vector3(0, 0, -1);
    /**
     * The left vector, pointing straight left.
     */
    public static readonly left = new Vector3(-1, 0, 0);
    /**
     * The one vector, with all components set to 1.
     */
    public static readonly one = new Vector3(1, 1, 1);
    /**
     * The right vector, pointing straight right.
     */
    public static readonly right = new Vector3(1, 0, 0);
    /**
     * The up vector, pointing straight up.
     */
    public static readonly up = new Vector3(0, 1, 0);
    /**
     * The zero vector, with all components set to 0.
     */
    public static readonly zero = new Vector3(0, 0, 0);

    /**
     * Creates a new Vector3 instance.
     * @param {number|IVector3} [x] - The x coordinate of the vector.
     * @param {number} [y] - The y coordinate of the vector.
     * @param {number} [z] - The z coordinate of the vector.
     */
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

    /**
    * Sets the components of the vector.
    * @param {number|IVector3} x - The x coordinate of the vector, or an IVector3 object.
    * @param {number} [y] - The y coordinate of the vector.
    * @param {number} [z] - The z coordinate of the vector.
    * @returns {Vector3} This vector, after the components have been set.
    */
    public set(x: number | IVector3, y?: number, z?: number): Vector3 {
        if (typeof x === 'number') {
            if (typeof y === 'number' && typeof z === 'number') {
                this.x = x;
                this.y = y;
                this.z = z;
            } else {
                this.x = x;
                this.y = x;
                this.z = x;
            }
        } else {
            this.set(x.x, x.y, x.z);
        }
        return this;
    }

    /**
    * Sets the components of the vector to the minimum of the current components and the given values.
    * @param {IVector3|number} x - The x coordinate of the vector, or a number to compare to the current x component.
    * @param {number} [y] - The y coordinate of the vector, or a number to compare to the current y component.
    * @param {number} [z] - The z coordinate of the vector, or a number to compare to the current z component.
    * @returns {Vector3} This vector, after the components have been set.
    */
    public min(x: IVector3 | number, y?: number, z?: number): Vector3 {
        if (typeof x === 'number') {
            if (typeof y === 'number' && typeof z === 'number') {
                this.x = Math.min(this.x, x);
                this.y = Math.min(this.y, y);
                this.z = Math.min(this.z, z);
            } else {
                this.x = Math.min(this.x, x);
                this.y = Math.min(this.y, x);
                this.z = Math.min(this.z, x);
            }
        } else {
            this.min(x.x, x.y, x.z);
        }
        return this;
    }
    /**
     * Adds the given values to the components of the vector.
     * @param {IVector3|number} x - The x coordinate of the vector, or a number to add to the current x component.
     * @param {number} [y] - The y coordinate of the vector, or a number to add to the current y component.
     * @param {number} [z] - The z coordinate of the vector, or a number to add to the current z component.
     * @returns {Vector3} This vector, after the values have been added.
     */
    public add(x: IVector3 | number, y?: number, z?: number): Vector3 {
        if (typeof x === 'number') {
            if (typeof y === 'number' && typeof z === 'number') {
                this.x += x;
                this.y += y;
                this.z += z;
            } else {
                this.x += x;
                this.y += x;
                this.z += x;
            }
        } else {
            this.add(x.x, x.y, x.z);
        }
        return this;
    }
    /**
     * Subtracts the given values from the components of the vector.
     * @param {IVector3|number} x - The x coordinate of the vector, or a number to subtract from the current x component.
     * @param {number} [y] - The y coordinate of the vector, or a number to subtract from the current y component.
     * @param {number} [z] - The z coordinate of the vector, or a number to subtract from the current z component.
     * @returns {Vector3} This vector, after the values have been subtracted.
     */
    public sub(x: IVector3 | number, y?: number, z?: number): Vector3 {
        if (typeof x === 'number') {
            if (typeof y === 'number' && typeof z === 'number') {
                this.x -= x;
                this.y -= y;
                this.z -= z;
            } else {
                this.y -= x;
                this.z -= x;
                this.x -= x;
            }
        } else {
            this.sub(x.x, x.y, x.z);
        }
        return this;
    }
    /**
     * Multiplies the components of the vector by the given values.
     * @param {number|IVector3} x - The x coordinate of the vector, or a number to multiply the current x component by.
     * @param {number} [y] - The y coordinate of the vector, or a number to multiply the current y component by.
     * @param {number} [z] - The z coordinate of the vector, or a number to multiply the current z component by.
     * @returns {Vector3} This vector, after the components have been multiplied.
     */
    public scl(x: number | IVector3, y?: number, z?: number): Vector3 {
        if (typeof x === 'number') {
            if (typeof y === 'number' && typeof z === 'number') {
                this.x *= x;
                this.y *= y;
                this.z *= z;
            } else {
                this.x *= x;
                this.y *= x;
                this.z *= x;
            }
        } else {
            this.scl(x.x, x.y, x.z);
        }
        return this;
    }
    /**
     * Divides the components of the vector by the given values.
     * @param {number|IVector3} x - The x coordinate of the vector, or a number to divide the current x component by.
     * @param {number} [y] - The y coordinate of the vector, or a number to divide the current y component by.
     * @param {number} [z] - The z coordinate of the vector, or a number to divide the current z component by.
     * @returns {Vector3} This vector, after the components have been divided.
     */
    public div(x: number | IVector3, y?: number, z?: number): Vector3 {
        if (typeof x === 'number') {
            if (typeof y === 'number' && typeof z === 'number') {
                this.x /= x;
                this.y /= y;
                this.z /= z;
            } else {
                this.x /= x;
                this.y /= x;
                this.z /= x;
            }
        } else {
            this.div(x.x, x.y, x.z);
        }
        return this;
    }


    /**
     * Calculates the length of the vector.
     * @returns {number} The length of the vector.
     */
    public len(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    }

    /**
     * Calculates the squared length of the vector.
     * @returns {number} The squared length of the vector.
     */
    public len2(): number {
        return this.x ** 2 + this.y ** 2 + this.z ** 2;
    }

    /**
     * Checks if this vector is equal to another vector.
     * @param {Vector3} other - The other vector to compare to.
     * @returns {boolean} Whether the two vectors are equal.
     */
    public equals(other: Vector3): boolean {
        return this.x.toFixed(2) === other.x.toFixed(2) &&
            this.y.toFixed(2) === other.y.toFixed(2) &&
            this.z.toFixed(2) === other.z.toFixed(2);
    }

    /**
     * Calculates the distance between this vector and another vector.
     * @param {Vector3} vec - The other vector to calculate the distance to.
     * @returns {number} The distance between the two vectors.
     */
    public distance(vec: Vector3): number {
        return this.cpy().sub(vec).len();
    }

    /**
     * Converts the vector to a string.
     * @returns {string} The string representation of the vector.
     */
    public toString(): string {
        return `(${this.x}, ${this.y}, ${this.z})`;
    }

    /**
     * Returns the string tag of the vector, which is its string representation.
     * @returns {string} The string representation of the vector.
     */
    [Symbol.toStringTag]() {
        return this.toString();
    }

    /**
     * Floors the components of the vector.
     * @returns {Vector3} This vector, after the components have been floored.
     */
    public floor(): Vector3 {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);
        return this;
    }

    /**
     * Rounds the components of the vector.
     * @returns {Vector3} This vector, after the components have been rounded.
     */
    public round(): Vector3 {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);
        return this;
    }
    /**
     * Ceils the components of the vector.
     * @returns {Vector3} This vector, after the components have been ceiled.
     */
    public ceil(): Vector3 {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.z = Math.ceil(this.z);
        return this;
    }

    /**
     * Takes the absolute value of the components of the vector.
     * @returns {Vector3} This vector, after the components have been taken absolute.
     */
    public abs(): Vector3 {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        this.z = Math.abs(this.z);
        return this;
    }


    /**
     * Multiplies the vector by a scalar or a matrix.
     * @param {IVector3|Matrix4} n - The scalar or matrix to multiply the vector by.
     * @returns {number|Vector3} The result of the multiplication.
     */
    public mul(n: IVector3): number;
    public mul(n: Matrix4): Vector3;
    public mul(n: IVector3 | Matrix4) {
        if (n instanceof Matrix4) {
            return n.rmulVector(this);
        } else {
            return n.x * this.x + n.y * this.y + n.z * this.z;
        }
    }

    /**
     * Normalizes the vector.
     * @returns {Vector3} This vector, after it has been normalized.
     */
    public normalize(): Vector3 {
        this.div(this.len());
        return this;
    }
    /**
     * Clones the vector.
     * @returns {Vector3} A new vector with the same components as this vector.
     */
    public cpy(): Vector3 {
        return new Vector3(this.x, this.y, this.z);
    }

    /**
     * Returns the components of the vector as an array.
     * @returns {number[]} An array containing the x, y, and z components of the vector.
     */
    public toArray(): number[] {
        return [this.x, this.y, this.z];
    }

    /**
     * Calculates the vertical rotation angle of the vector relative to the x-z plane.
     * The angle ranges from -90 to 90 degrees, with the y-axis pointing vertically upwards, in the left-hand coordinate system.
     * @returns {number} The vertical rotation angle of the vector.
     */
    public rotateAngleY(): number {
        let [x, y, z] = [this.x, this.y, this.z];
        let angle = Math.atan2(y, Math.sqrt(x * x + z * z));
        return angle * 180 / Math.PI;
    }
    /**
    * Calculates the horizontal rotation angle of the vector relative to the x-y vertical plane.
    * The angle ranges from 0 to 360 degrees, with the y-axis pointing vertically upwards, in the left-hand coordinate system.
    * @returns {number} The horizontal rotation angle of the vector.
    */
    public rotateAngleX(): number {
        let [x, y, z] = [this.x, this.y, this.z];
        let angle = Math.atan2(x, z);
        if (angle < 0) {
            angle += 2 * Math.PI;
        }
        return angle * 180 / Math.PI;
    }

}

export interface IVector3 {
    x: number;
    y: number;
    z: number;
}

