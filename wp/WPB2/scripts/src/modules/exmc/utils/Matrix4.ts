export default class Matrix4 {
    public val: number[][];
    constructor(mat?: number[][]) {
        this.val = mat ?? [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
    }
}