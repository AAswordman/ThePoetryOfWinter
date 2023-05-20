export default class Matrix4 {
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
        const nmat = this.clone();
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                nmat.val[i][j] = 1.0 / (this.val[i][j] * this.val[i][j]);
            }
        }
        return nmat;
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