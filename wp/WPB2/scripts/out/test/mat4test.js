class Matrix4 {
    constructor(mat) {
        this.val = mat !== null && mat !== void 0 ? mat : [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
    }
    clone() {
        return new Matrix4(this.val.map(v => v.map(i => i)));
    }
    mul(mat) {
        const nmat = new Matrix4();
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let num = 0;
                this.val[i].forEach((e, index) => num += e * mat.val[index][j]);
                nmat.val[i][j] = num;
            }
        }
        return nmat;
    }
    add(mat) {
        const nmat = this.clone();
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                this.val[i][j] = this.val[i][j] + mat.val[i][j];
            }
        }
        return nmat;
    }
    subtract(mat) {
        const nmat = this.clone();
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                nmat.val[i][j] = this.val[i][j] - mat.val[i][j];
            }
        }
        return nmat;
    }
    invert() {
        const a = this.val;
        const b = new Matrix4();
        const a00 = a[0][0], a01 = a[0][1], a02 = a[0][2], a03 = a[0][3];
        const a10 = a[1][0], a11 = a[1][1], a12 = a[1][2], a13 = a[1][3];
        const a20 = a[2][0], a21 = a[2][1], a22 = a[2][2], a23 = a[2][3];
        const a30 = a[3][0], a31 = a[3][1], a32 = a[3][2], a33 = a[3][3];
        const b0 = a00 * a11 - a01 * a10;
        const b1 = a00 * a12 - a02 * a10;
        const b2 = a00 * a13 - a03 * a10;
        const b3 = a01 * a12 - a02 * a11;
        const b4 = a01 * a13 - a03 * a11;
        const b5 = a02 * a13 - a03 * a12;
        const b6 = a20 * a31 - a21 * a30;
        const b7 = a20 * a32 - a22 * a30;
        const b8 = a20 * a33 - a23 * a30;
        const b9 = a21 * a32 - a22 * a31;
        const b10 = a21 * a33 - a23 * a31;
        const b11 = a22 * a33 - a23 * a32;
        console.log(b0, b1, b2, b3, b4, b5, b6, b7, b8, b9,b10,b11)
        const determinant = b0 * b11 - b1 * b10 + b2 * b9 + b3 * b8 - b4 * b7 + b5 * b6;
        if (determinant === 0) {
            console.error("Cannot invert a matrix with zero determinant");
            return this.clone();
        }
        const invDet = 1 / determinant;
        b.val[0][0] = (a11 * b11 - a12 * b10 + a13 * b9) * invDet;
        b.val[0][1] = (a02 * b10 - a01 * b11 - a03 * b9) * invDet;
        b.val[0][2] = (a31 * b5 - a32 * b4 + a33 * b3) * invDet;
        b.val[0][3] = (a22 * b4 - a21 * b5 - a23 * b3) * invDet;
        b.val[1][0] = (a12 * b8 - a10 * b11 - a13 * b7) * invDet;
        b.val[1][1] = (a00 * b11 - a02 * b8 + a03 * b7) * invDet;
        b.val[1][2] = (a32 * b2 - a30 * b5 - a33 * b1) * invDet;
        b.val[1][3] = (a20 * b5 - a22 * b2 + a23 * b1) * invDet;
        b.val[2][0] = (a10 * b10 - a11 * b8 + a13 * b6) * invDet;
        b.val[2][1] = (a01 * b8 - a00 * b10 - a03 * b6) * invDet;
        b.val[2][2] = (a30 * b4 - a31 * b2 + a33 * b0) * invDet;
        b.val[2][3] = (a21 * b2 - a20 * b4 - a23 * b0) * invDet;
        b.val[3][0] = (a11 * b7 - a10 * b9 - a12 * b6) * invDet;
        b.val[3][1] = (a00 * b9 - a01 * b7 + a02 * b6) * invDet;
        b.val[3][2] = (a31 * b1 - a30 * b3 - a32 * b0) * invDet;
        b.val[3][3] = (a20 * b3 - a21 * b1 + a22 * b0) * invDet;
        return b;
    }
    get(row, col) {
        return this.val[row][col];
    }
    set(row, col, val) {
        this.val[row][col] = val;
    }
    print() {
        console.log(this);
    }
}
//# sourceMappingURL=Matrix4.js.map
console.log(new Matrix4([[1,2133,3,4],[5,6,4,8],[9,10,11,12],[13,14,15,16]]).invert());