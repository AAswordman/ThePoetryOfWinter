export default class Matrix4 {
    
    public readonly val: number[][];
    constructor(mat?: number[][]) {
        this.val = mat ?? [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
    }
    public clone(): Matrix4 {
        return new Matrix4(this.val);
    }
    public mul(mat:Matrix4) {
        const nmat = new Matrix4();

        for(let i = 0; i < 4; i++) {
            for(let j = 0; j < 4; j++) {
                let num = 0;
                this.val[i].forEach((e,index) => num += e * mat.val[index][j]);
                nmat.val[i][j] = num;
            }
        }
        return nmat;
    }
}