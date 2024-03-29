import Vector3 from "./Vector3.js";
/**
 * Represents a 4x4 matrix.
 */
export default class Matrix4 {
    val!: Float32Array;

    /**
       * Creates a new Matrix4 instance.
       * @param {Float32Array|Matrix4|number} val - The initial value of the matrix. If not provided, an identity matrix will be created.
       * @param {number} m00 - The value at row 0, column 0.
       * @param {number} m01 - The value at row 0, column 1.
       * @param {number} m02 - The value at row 0, column 2.
       * @param {number} m03 - The value at row 0, column 3.
       * @param {number} m10 - The value at row 1, column 0.
       * @param {number} m11 - The value at row 1, column 1.
       * @param {number} m12 - The value at row 1, column 2.
       * @param {number} m13 - The value at row 1, column 3.
       * @param {number} m20 - The value at row 2, column 0.
       * @param {number} m21 - The value at row 2, column 1.
       * @param {number} m22 - The value at row 2, column 2.
       * @param {number} m23 - The value at row 2, column 3.
       * @param {number} m30 - The value at row 3, column 0.
       * @param {number} m31 - The value at row 3, column 1.
       * @param {number} m32 - The value at row 3, column 2.
       * @param {number} m33 - The value at row 3, column 3.
       */
    constructor(val?: Float32Array | Matrix4)
    constructor(m00: number, m01: number, m02: number, m03: number,
        m10: number, m11: number, m12: number, m13: number,
        m20: number, m21: number, m22: number, m23: number,
        m30: number, m31: number, m32: number, m33: number)
    constructor(val?: Float32Array | Matrix4 | number, m01?: number, m02?: number, m03?: number,
        m10?: number, m11?: number, m12?: number, m13?: number,
        m20?: number, m21?: number, m22?: number, m23?: number,
        m30?: number, m31?: number, m32?: number, m33?: number) {
        this.set(...arguments);

    }
    /**
       * Sets the value of the matrix.
       * @returns {Matrix4} The modified matrix.
       */
    set(val?: Float32Array | Matrix4): this;
    set(m00: number, m01: number, m02: number, m03: number,
        m10: number, m11: number, m12: number, m13: number,
        m20: number, m21: number, m22: number, m23: number,
        m30: number, m31: number, m32: number, m33: number): this;
    set(val?: Float32Array | Matrix4 | number, m01?: number, m02?: number, m03?: number,
        m10?: number, m11?: number, m12?: number, m13?: number,
        m20?: number, m21?: number, m22?: number, m23?: number,
        m30?: number, m31?: number, m32?: number, m33?: number) {
        if (val instanceof Matrix4) {
            this.val = new Float32Array(val.val);
        } else if (val instanceof Float32Array) {
            this.val = new Float32Array(val);
        } else if (!val) {
            this.val = new Float32Array(16);
            this.idt();
        } else {
            this.val = new Float32Array(16);
            this.val[0] = val;
            this.val[1] = m01!;
            this.val[2] = m02!;
            this.val[3] = m03!;
            this.val[4] = m10!;
            this.val[5] = m11!;
            this.val[6] = m12!;
            this.val[7] = m13!;
            this.val[8] = m20!;
            this.val[9] = m21!;
            this.val[10] = m22!;
            this.val[11] = m23!;
            this.val[12] = m30!;
            this.val[13] = m31!;
            this.val[14] = m32!;
            this.val[15] = m33!;
        }
        return this;
    }
    /**
       * Sets the matrix to the identity matrix.
       * @returns {Matrix4} The modified matrix.
       */
    public idt(): Matrix4 {
        this.val.set([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
        return this;
    }
    /**
       * Sets the translation component of the matrix.
       * @param {number} x - The translation along the x-axis.
       * @param {number} y - The translation along the y-axis.
       * @param {number} z - The translation along the z-axis.
       * @returns {Matrix4} The modified matrix.
       */
    public setTranslation(x: number, y: number, z: number): Matrix4 {
        this.idt();
        this.val[12] = x;
        this.val[13] = y;
        this.val[14] = z;
        return this;
    }
    /**
       * Sets the rotation around the x-axis.
       * @param {number} angle - The rotation angle in radians.
       * @returns {Matrix4} The modified matrix.
       */
    public setRotationX(angle: number): Matrix4 {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        this.idt();
        this.val[5] = c;
        this.val[6] = -s;
        this.val[9] = s;
        this.val[10] = c;
        return this;
    }
    /**
       * Sets the rotation around the y-axis.
       * @param {number} angle - The rotation angle in radians.
       * @returns {Matrix4} The modified matrix.
       */
    public setRotationY(angle: number): Matrix4 {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        this.idt();
        this.val[0] = c;
        this.val[2] = s;
        this.val[8] = -s;
        this.val[10] = c;
        return this;
    }
    /**
       * Sets the rotation around the z-axis.
       * @param {number} angle - The rotation angle in radians.
       * @returns {Matrix4} The modified matrix.
       */
    public setRotationZ(angle: number): Matrix4 {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        this.idt();
        this.val[0] = c;
        this.val[1] = -s;
        this.val[4] = s;
        this.val[5] = c;
        return this;
    }
    /**
       * Sets the scale component of the matrix.
       * @param {number} x - The scale along the x-axis.
       * @param {number} y - The scale along the y-axis.
       * @param {number} z - The scale along the z-axis.
       * @returns {Matrix4} The modified matrix.
       */
    public setScale(x: number, y: number, z: number): Matrix4 {
        this.idt();
        this.val[0] = x;
        this.val[5] = y;
        this.val[10] = z;
        return this;
    }
    /**
       * Translates the matrix.
       * @param {number} x - The translation along the x-axis.
       * @param {number} y - The translation along the y-axis.
       * @param {number} z - The translation along the z-axis.
       * @returns {Matrix4} The modified matrix.
       */
    public translate(x: number, y: number, z: number): Matrix4 {
        const translationMatrix = new Matrix4().setTranslation(x, y, z);
        return this.lmul(translationMatrix);
    }
    /**
      * Rotates the matrix around the x-axis.
      * @param {number} angle - The rotation angle in radians.
      * @returns {Matrix4} The modified matrix.
      */
    public rotateX(angle: number): Matrix4 {
        const rotationMatrix = new Matrix4().setRotationX(angle);
        return this.lmul(rotationMatrix);
    }
    /**
       * Rotates the matrix around the y-axis.
       * @param {number} angle - The rotation angle in radians.
       * @returns {Matrix4} The modified matrix.
       */
    public rotateY(angle: number): Matrix4 {
        const rotationMatrix = new Matrix4().setRotationY(angle);
        return this.lmul(rotationMatrix);
    }

    /**
       * Rotates the matrix around the z-axis.
       * @param {number} angle - The rotation angle in radians.
       * @returns {Matrix4} The modified matrix.
       */
    public rotateZ(angle: number): Matrix4 {
        const rotationMatrix = new Matrix4().setRotationZ(angle);
        return this.lmul(rotationMatrix);
    }

    /**
       * Scales the matrix.
       * @param {number} x - The scale along the x-axis.
       * @param {number} y - The scale along the y-axis.
       * @param {number} z - The scale along the z-axis.
       * @returns {Matrix4} The modified matrix.
       */
    public scl(x: number, y: number, z: number): Matrix4 {
        const scaleMatrix = new Matrix4().setScale(x, y, z);
        return this.lmul(scaleMatrix);
    }
    /**
       * Multiplies this matrix with another matrix.(this * right)
       * @param {Matrix4} matrix - The matrix to multiply with.
       * @returns {Matrix4} The modified matrix.
       */
    public rmul(matrix: Matrix4): Matrix4 {
        const result = new Matrix4();
        const a = this.val;
        const b = matrix.val;
        const out = result.val;

        const a11 = a[0], a12 = a[1], a13 = a[2], a14 = a[3];
        const a21 = a[4], a22 = a[5], a23 = a[6], a24 = a[7];
        const a31 = a[8], a32 = a[9], a33 = a[10], a34 = a[11];
        const a41 = a[12], a42 = a[13], a43 = a[14], a44 = a[15];

        const b11 = b[0], b12 = b[1], b13 = b[2], b14 = b[3];
        const b21 = b[4], b22 = b[5], b23 = b[6], b24 = b[7];
        const b31 = b[8], b32 = b[9], b33 = b[10], b34 = b[11];
        const b41 = b[12], b42 = b[13], b43 = b[14], b44 = b[15];

        out[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
        out[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
        out[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
        out[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

        out[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
        out[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
        out[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
        out[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

        out[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
        out[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
        out[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
        out[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

        out[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
        out[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
        out[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
        out[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

        this.val = out;
        return this;
    }
    /**
       * Multiplies this matrix with another matrix.(left * this)
       * @param {Matrix4} matrix - The matrix to multiply with.
       * @returns {Matrix4} The modified matrix.
       */
    public lmul(matrix: Matrix4): Matrix4 {
        const result = new Matrix4();
        const a = this.val;
        const b = matrix.val;
        const out = result.val;

        const a11 = a[0], a12 = a[1], a13 = a[2], a14 = a[3];
        const a21 = a[4], a22 = a[5], a23 = a[6], a24 = a[7];
        const a31 = a[8], a32 = a[9], a33 = a[10], a34 = a[11];
        const a41 = a[12], a42 = a[13], a43 = a[14], a44 = a[15];

        const b11 = b[0], b12 = b[1], b13 = b[2], b14 = b[3];
        const b21 = b[4], b22 = b[5], b23 = b[6], b24 = b[7];
        const b31 = b[8], b32 = b[9], b33 = b[10], b34 = b[11];
        const b41 = b[12], b42 = b[13], b43 = b[14], b44 = b[15];

        out[0] = b11 * a11 + b21 * a12 + b31 * a13 + b41 * a14;
        out[4] = b11 * a21 + b21 * a22 + b31 * a23 + b41 * a24;
        out[8] = b11 * a31 + b21 * a32 + b31 * a33 + b41 * a34;
        out[12] = b11 * a41 + b21 * a42 + b31 * a43 + b41 * a44;

        out[1] = b12 * a11 + b22 * a12 + b32 * a13 + b42 * a14;
        out[5] = b12 * a21 + b22 * a22 + b32 * a23 + b42 * a24;
        out[9] = b12 * a31 + b22 * a32 + b32 * a33 + b42 * a34;
        out[13] = b12 * a41 + b22 * a42 + b32 * a43 + b42 * a44;

        out[2] = b13 * a11 + b23 * a12 + b33 * a13 + b43 * a14;
        out[6] = b13 * a21 + b23 * a22 + b33 * a23 + b43 * a24;
        out[10] = b13 * a31 + b23 * a32 + b33 * a33 + b43 * a34;
        out[14] = b13 * a41 + b23 * a42 + b33 * a43 + b43 * a44;

        out[3] = b14 * a11 + b24 * a12 + b34 * a13 + b44 * a14;
        out[7] = b14 * a21 + b24 * a22 + b34 * a23 + b44 * a24;
        out[11] = b14 * a31 + b24 * a32 + b34 * a33 + b44 * a34;
        out[15] = b14 * a41 + b24 * a42 + b34 * a43 + b44 * a44;

        this.val = out;
        return this;
    }
    /**
      * Transforms a vector by this matrix.
      * @param {Vector3} vector - The vector to transform.
      * @returns {Vector3} The transformed vector.
      */
    public rmulVector(vector: Vector3): Vector3 {
        const x = vector.x;
        const y = vector.y;
        const z = vector.z;

        const m = this.val;

        const newX = m[0] * x + m[1] * y + m[2] * z + m[3];
        const newY = m[4] * x + m[5] * y + m[6] * z + m[7];
        const newZ = m[8] * x + m[9] * y + m[10] * z + m[11];

        return vector.set(newX, newY, newZ);
    }
    /**
       * Calculates the determinant of the matrix.
       * @returns {number} The determinant.
       */
    public determinant(): number {
        const a = this.val;

        const a11 = a[0], a12 = a[4], a13 = a[8], a14 = a[12];
        const a21 = a[1], a22 = a[5], a23 = a[9], a24 = a[13];
        const a31 = a[2], a32 = a[6], a33 = a[10], a34 = a[14];
        const a41 = a[3], a42 = a[7], a43 = a[11], a44 = a[15];

        const detA =
            a11 * a22 * a33 * a44 - a11 * a22 * a34 * a43 +
            a11 * a23 * a34 * a42 - a11 * a23 * a32 * a44 +
            a11 * a24 * a32 * a43 - a11 * a24 * a33 * a42 -
            a12 * a23 * a34 * a41 + a12 * a23 * a31 * a44 -
            a12 * a24 * a31 * a43 + a12 * a24 * a33 * a41 -
            a12 * a21 * a33 * a44 + a12 * a21 * a34 * a43 +
            a13 * a24 * a31 * a42 - a13 * a24 * a32 * a41 +
            a13 * a21 * a32 * a44 - a13 * a21 * a34 * a42 +
            a13 * a22 * a34 * a41 - a13 * a22 * a31 * a44 -
            a14 * a21 * a32 * a43 + a14 * a21 * a33 * a42 -
            a14 * a22 * a33 * a41 + a14 * a22 * a31 * a43 -
            a14 * a23 * a31 * a42 + a14 * a23 * a32 * a41;

        return detA;
    }
    /**
       * Diagonalizes the matrix.
       * @returns {Object} An object containing the eigenvalues and eigenvectors.
       */
    public diagonalize(): { eigenvalues: Vector3, eigenvectors: Matrix4 } {
        const a = this.val;

        const a11 = a[0], a12 = a[4], a13 = a[8], a14 = a[12];
        const a21 = a[1], a22 = a[5], a23 = a[9], a24 = a[13];
        const a31 = a[2], a32 = a[6], a33 = a[10], a34 = a[14];
        const a41 = a[3], a42 = a[7], a43 = a[11], a44 = a[15];

        const eigenvalues = new Vector3();
        const eigenvectors = new Matrix4();

        // 计算特征值
        const detA = this.determinant();

        const traceA = a11 + a22 + a33;
        const p1 = Math.pow(a11, 2) + Math.pow(a12, 2) + Math.pow(a13, 2) + Math.pow(a14, 2);
        const p2 = Math.pow(a21, 2) + Math.pow(a22, 2) + Math.pow(a23, 2) + Math.pow(a24, 2);
        const p3 = Math.pow(a31, 2) + Math.pow(a32, 2) + Math.pow(a33, 2) + Math.pow(a34, 2);
        const p4 = Math.pow(a41, 2) + Math.pow(a42, 2) + Math.pow(a43, 2) + Math.pow(a44, 2);

        const q = (p1 + p2 + p3 - Math.pow(traceA, 2)) / 6;
        const r = (traceA * (p1 * p2 + p1 * p3 + p2 * p3 - Math.pow(traceA, 2) - p4)) / 6 + (detA / 2);
        const s = detA / 2;

        const phi = Math.acos(r / Math.sqrt(Math.pow(q, 3)));

        const eigenvalue1 = 2 * Math.sqrt(q) * Math.cos(phi / 3) - traceA / 3;
        const eigenvalue2 = 2 * Math.sqrt(q) * Math.cos((phi + (2 * Math.PI)) / 3) - traceA / 3;
        const eigenvalue3 = 2 * Math.sqrt(q) * Math.cos((phi + (4 * Math.PI)) / 3) - traceA / 3;

        eigenvalues.x = eigenvalue1;
        eigenvalues.y = eigenvalue2;
        eigenvalues.z = eigenvalue3;

        // 计算特征向量
        const eps = 1e-6; // 迭代停止的阈值
        const maxIterations = 100; // 最大迭代次数

        const v1 = new Vector3(1, 0, 0);
        const v2 = new Vector3(0, 1, 0);
        const v3 = new Vector3(0, 0, 1);

        const subtractVectors = (v1: Vector3, v2: Vector3) => {
            return new Vector3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
        };

        const normalizeVector = (v: Vector3) => {
            const length = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
            v.x /= length;
            v.y /= length;
            v.z /= length;
        };

        const eigenVectorIterations = (v: Vector3, eigenvalue: number) => {
            let iteration = 0;
            let prevV = new Vector3();

            while (iteration < maxIterations) {
                prevV.x = v.x;
                prevV.y = v.y;
                prevV.z = v.z;

                v.x = a11 * prevV.x + a12 * prevV.y + a13 * prevV.z;
                v.y = a21 * prevV.x + a22 * prevV.y + a23 * prevV.z;
                v.z = a31 * prevV.x + a32 * prevV.y + a33 * prevV.z;

                normalizeVector(v);

                const diff = subtractVectors(v, prevV);
                const diffLength = Math.sqrt(diff.x * diff.x + diff.y * diff.y + diff.z * diff.z);

                if (diffLength < eps) {
                    break;
                }

                iteration++;
            }

            return v;
        };

        const eigenvector1 = eigenVectorIterations(v1, eigenvalue1);
        const eigenvector2 = eigenVectorIterations(v2, eigenvalue2);
        const eigenvector3 = eigenVectorIterations(v3, eigenvalue3);

        eigenvectors.val.set([
            eigenvector1.x, eigenvector2.x, eigenvector3.x, 0,
            eigenvector1.y, eigenvector2.y, eigenvector3.y, 0,
            eigenvector1.z, eigenvector2.z, eigenvector3.z, 0,
            0, 0, 0, 1,
        ]);

        return { eigenvalues, eigenvectors };
    }

    /**
       * Inverts the matrix.
       * @returns {Matrix4} The inverted matrix.
       * @throws {Error} If the matrix is not invertible.
       */
    public invert(): Matrix4 {
        const a = this.val;
        const out = new Matrix4();
        const inv = out.val;

        const a11 = a[0], a12 = a[4], a13 = a[8], a14 = a[12];
        const a21 = a[1], a22 = a[5], a23 = a[9], a24 = a[13];
        const a31 = a[2], a32 = a[6], a33 = a[10], a34 = a[14];
        const a41 = a[3], a42 = a[7], a43 = a[11], a44 = a[15];

        const det =
            a11 * a22 * a33 * a44 - a11 * a22 * a34 * a43 +
            a11 * a23 * a34 * a42 - a11 * a23 * a32 * a44 +
            a11 * a24 * a32 * a43 - a11 * a24 * a33 * a42 -
            a12 * a23 * a34 * a41 + a12 * a23 * a31 * a44 -
            a12 * a24 * a31 * a43 + a12 * a24 * a33 * a41 -
            a12 * a21 * a33 * a44 + a12 * a21 * a34 * a43 +
            a13 * a24 * a31 * a42 - a13 * a24 * a32 * a41 +
            a13 * a21 * a32 * a44 - a13 * a21 * a34 * a42 +
            a13 * a22 * a34 * a41 - a13 * a22 * a31 * a44 -
            a14 * a21 * a32 * a43 + a14 * a21 * a33 * a42 -
            a14 * a22 * a33 * a41 + a14 * a22 * a31 * a43 -
            a14 * a23 * a31 * a42 + a14 * a23 * a32 * a41;

        if (det === 0) {
            throw new Error('Matrix is not invertible.');
        }

        const invDet = 1 / det;

        inv[0] = (a22 * a33 * a44 - a22 * a34 * a43 - a23 * a32 * a44 + a23 * a34 * a42 + a24 * a32 * a43 - a24 * a33 * a42) * invDet;
        inv[1] = (-a12 * a33 * a44 + a12 * a34 * a43 + a13 * a32 * a44 - a13 * a34 * a42 - a14 * a32 * a43 + a14 * a33 * a42) * invDet;
        inv[2] = (a12 * a23 * a44 - a12 * a24 * a43 - a13 * a22 * a44 + a13 * a24 * a42 + a14 * a22 * a43 - a14 * a23 * a42) * invDet;
        inv[3] = (-a12 * a23 * a34 + a12 * a24 * a33 + a13 * a22 * a34 - a13 * a24 * a32 - a14 * a22 * a33 + a14 * a23 * a32) * invDet;
        inv[4] = (-a21 * a33 * a44 + a21 * a34 * a43 + a23 * a31 * a44 - a23 * a34 * a41 - a24 * a31 * a43 + a24 * a33 * a41) * invDet;
        inv[5] = (a11 * a33 * a44 - a11 * a34 * a43 - a13 * a31 * a44 + a13 * a34 * a41 + a14 * a31 * a43 - a14 * a33 * a41) * invDet;
        inv[6] = (-a11 * a23 * a44 + a11 * a24 * a43 + a13 * a21 * a44 - a13 * a24 * a41 - a14 * a21 * a43 + a14 * a23 * a41) * invDet;
        inv[7] = (a11 * a23 * a34 - a11 * a24 * a33 - a13 * a21 * a34 + a13 * a24 * a31 + a14 * a21 * a33 - a14 * a23 * a31) * invDet;
        inv[8] = (a21 * a32 * a44 - a21 * a34 * a42 - a22 * a31 * a44 + a22 * a34 * a41 + a24 * a31 * a42 - a24 * a32 * a41) * invDet;
        inv[9] = (-a11 * a32 * a44 + a11 * a34 * a42 + a12 * a31 * a44 - a12 * a34 * a41 - a14 * a31 * a42 + a14 * a32 * a41) * invDet;
        inv[10] = (a11 * a22 * a44 - a11 * a24 * a42 - a12 * a21 * a44 + a12 * a24 * a41 + a14 * a21 * a42 - a14 * a22 * a41) * invDet;
        inv[11] = (-a11 * a22 * a34 + a11 * a24 * a32 + a12 * a21 * a34 - a12 * a24 * a31 - a14 * a21 * a32 + a14 * a22 * a31) * invDet;
        inv[12] = (-a21 * a32 * a43 + a21 * a33 * a42 + a22 * a31 * a43 - a22 * a33 * a41 - a23 * a31 * a42 + a23 * a32 * a41) * invDet;
        inv[13] = (a11 * a32 * a43 - a11 * a33 * a42 - a12 * a31 * a43 + a12 * a33 * a41 + a13 * a31 * a42 - a13 * a32 * a41) * invDet;
        inv[14] = (-a11 * a22 * a43 + a11 * a23 * a42 + a12 * a21 * a43 - a12 * a23 * a41 - a13 * a21 * a42 + a13 * a22 * a41) * invDet;
        inv[15] = (a11 * a22 * a33 - a11 * a23 * a32 - a12 * a21 * a33 + a12 * a23 * a31 + a13 * a21 * a32 - a13 * a22 * a31) * invDet;

        this.val = inv;
        return this;
    }
    /**
       * Creates a copy of this matrix.
       * @returns {Matrix4} The copied matrix.
       */
    public cpy(): Matrix4 {
        return new Matrix4(this);
    }

    /**
       * Returns the value of the matrix.
       * @returns {Float32Array} The value of the matrix.
       */
    public getValue(): Float32Array {
        return this.val;
    }
}