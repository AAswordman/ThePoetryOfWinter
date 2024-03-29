export default class Matrix3 {


    val: Float32Array = new Float32Array(9);

    constructor(copy: Matrix3 | Float32Array)
    constructor(m00: number, m01: number, m02: number,
        m10: number, m11: number, m12: number,
        m20: number, m21: number, m22: number)
    constructor(m00?: number | Matrix3 | Float32Array, m01?: number, m02?: number,
        m10?: number, m11?: number, m12?: number,
        m20?: number, m21?: number, m22?: number) {
        if (!m00) {
            this.idt();
        } else {
            this.set(m00 as any, m01!, m02!, m10!, m11!, m12!, m20!, m21!, m22!);
        }
    }

    public set(copy: Matrix3 | Float32Array): this;
    public set(m00: number, m01: number, m02: number,
        m10: number, m11: number, m12: number,
        m20: number, m21: number, m22: number): this;
    public set(m00?: number | Matrix3 | Float32Array, m01?: number, m02?: number,
        m10?: number, m11?: number, m12?: number,
        m20?: number, m21?: number, m22?: number): Matrix3 {
        if (typeof m00 === 'number') {
            this.val[0] = m00;
            this.val[1] = m01!;
            this.val[2] = m02!;
            this.val[3] = m10!;
            this.val[4] = m11!;
            this.val[5] = m12!;
            this.val[6] = m20!;
            this.val[7] = m21!;
            this.val[8] = m22!;
        } else if (m00 instanceof Matrix3) {
            for (let i = 0; i < 9; i++) {
                this.val[i] = m00.val[i];
            }
        } else if (m00 instanceof Float32Array) {
            for (let i = 0; i < 9; i++) {
                this.val[i] = m00[i];
            }

        }

        return this;
    }

    public idt(): Matrix3 {
        this.val[0] = 1;
        this.val[1] = 0;
        this.val[2] = 0;
        this.val[3] = 0;
        this.val[4] = 1;
        this.val[5] = 0;
        this.val[6] = 0;
        this.val[7] = 0;
        this.val[8] = 1;
        return this;
    }

    public lmul(matrix: Matrix3): Matrix3 {
        // 计算 matrix 与 this 相乘的结果并赋值给 this
        let v00 = matrix.val[0] * this.val[0] + matrix.val[1] * this.val[3] + matrix.val[2] * this.val[6];
        let v01 = matrix.val[0] * this.val[1] + matrix.val[1] * this.val[4] + matrix.val[2] * this.val[7];
        let v02 = matrix.val[0] * this.val[2] + matrix.val[1] * this.val[5] + matrix.val[2] * this.val[8];

        let v10 = matrix.val[3] * this.val[0] + matrix.val[4] * this.val[3] + matrix.val[5] * this.val[6];
        let v11 = matrix.val[3] * this.val[1] + matrix.val[4] * this.val[4] + matrix.val[5] * this.val[7];
        let v12 = matrix.val[3] * this.val[2] + matrix.val[4] * this.val[5] + matrix.val[5] * this.val[8];

        let v20 = matrix.val[6] * this.val[0] + matrix.val[7] * this.val[3] + matrix.val[8] * this.val[6];
        let v21 = matrix.val[6] * this.val[1] + matrix.val[7] * this.val[4] + matrix.val[8] * this.val[7];
        let v22 = matrix.val[6] * this.val[2] + matrix.val[7] * this.val[5] + matrix.val[8] * this.val[8];

        // 将计算得到的新矩阵元素赋值给当前矩阵
        this.val[0] = v00;
        this.val[1] = v01;
        this.val[2] = v02;
        this.val[3] = v10;
        this.val[4] = v11;
        this.val[5] = v12;
        this.val[6] = v20;
        this.val[7] = v21;
        this.val[8] = v22;

        return this;
    }

    public inv(): Matrix3 {
        let det = this.det();
        if (det == 0) throw new Error("Can't invert a singular matrix");

        let invDet = 1 / det;

        let v00 = this.val[4] * this.val[8] - this.val[5] * this.val[7];
        let v01 = -(this.val[3] * this.val[8] - this.val[5] * this.val[6]);
        let v02 = this.val[3] * this.val[7] - this.val[4] * this.val[6];

        let v10 = -(this.val[1] * this.val[8] - this.val[2] * this.val[7]);
        let v11 = this.val[0] * this.val[8] - this.val[2] * this.val[6];
        let v12 = -(this.val[0] * this.val[7] - this.val[1] * this.val[6]);

        let v20 = this.val[1] * this.val[5] - this.val[2] * this.val[4];
        let v21 = -(this.val[0] * this.val[5] - this.val[2] * this.val[3]);
        let v22 = this.val[0] * this.val[4] - this.val[1] * this.val[3];

        this.val[0] = v00 * invDet;
        this.val[1] = v01 * invDet;
        this.val[2] = v02 * invDet;
        this.val[3] = v10 * invDet;
        this.val[4] = v11 * invDet;
        this.val[5] = v12 * invDet;
        this.val[6] = v20 * invDet;
        this.val[7] = v21 * invDet;
        this.val[8] = v22 * invDet;
        return this;
    }

    public det(): number {
        return this.val[0] * (this.val[4] * this.val[8] - this.val[5] * this.val[7]) -
            this.val[1] * (this.val[3] * this.val[8] - this.val[5] * this.val[6]) +
            this.val[2] * (this.val[3] * this.val[7] - this.val[4] * this.val[6]);
    }

    public scl(scalar: number): Matrix3 {
        this.val[0] *= scalar;
        this.val[1] *= scalar;
        this.val[2] *= scalar;
        this.val[3] *= scalar;
        this.val[4] *= scalar;
        this.val[5] *= scalar;
        this.val[6] *= scalar;
        this.val[7] *= scalar;
        this.val[8] *= scalar;
        return this;
    }

    public sclX(scalar: number): Matrix3 {
        this.val[0] *= scalar;
        this.val[3] *= scalar;
        this.val[6] *= scalar;
        return this;
    }

    public sclY(scalar: number): Matrix3 {
        this.val[1] *= scalar;
        this.val[4] *= scalar;
        this.val[7] *= scalar;
        return this;
    }

    public sclZ(scalar: number): Matrix3 {
        this.val[2] *= scalar;
        this.val[5] *= scalar;
        this.val[8] *= scalar;
        return this;
    }

    public add(matrix: Matrix3): Matrix3 {
        this.val[0] += matrix.val[0];
        this.val[1] += matrix.val[1];
        this.val[2] += matrix.val[2];
        this.val[3] += matrix.val[3];
        this.val[4] += matrix.val[4];
        this.val[5] += matrix.val[5];
        this.val[6] += matrix.val[6];
        this.val[7] += matrix.val[7];
        this.val[8] += matrix.val[8];
        return this;
    }

    public sub(matrix: Matrix3): Matrix3 {
        this.val[0] -= matrix.val[0];
        this.val[1] -= matrix.val[1];
        this.val[2] -= matrix.val[2];
        this.val[3] -= matrix.val[3];
        this.val[4] -= matrix.val[4];
        this.val[5] -= matrix.val[5];
        this.val[6] -= matrix.val[6];
        this.val[7] -= matrix.val[7];
        this.val[8] -= matrix.val[8];
        return this;
    }

    public tra(): Matrix3 {
        let v01 = this.val[1];
        let v02 = this.val[2];
        let v12 = this.val[5];

        this.val[1] = this.val[3];
        this.val[2] = this.val[6];
        this.val[3] = v01;
        this.val[5] = this.val[7];
        this.val[6] = v02;
        this.val[7] = v12;
        return this;
    }

    public toFloat32Array(): Float32Array {
        return new Float32Array(this.val);
    }
    public cpy() {
        return new Matrix3(this);
    }

    public toString(): string {
        return "[" + this.val[0] + ", " + this.val[1] + ", " + this.val[2] + "]\n" +
            "[" + this.val[3] + ", " + this.val[4] + ", " + this.val[5] + "]\n" +
            "[" + this.val[6] + ", " + this.val[7] + ", " + this.val[8] + "]";
    }
}