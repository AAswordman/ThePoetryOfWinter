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
        return new Matrix4(this.val);
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
}
//# sourceMappingURL=Matrix4.js.map