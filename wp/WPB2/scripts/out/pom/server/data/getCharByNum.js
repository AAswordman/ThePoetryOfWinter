import MathUtil from "../../../modules/exmc/math/MathUtil.js";
export default function getgetCharByNum(num, long, useChr) {
    num = MathUtil.clamp(num, 0, 1);
    num = Math.floor(num * 4 * long);
    let a = Math.floor(num / 4);
    let b = num % 4;
    let c = long - a - 1;
    let s = "";
    while (a > 0) {
        s += useChr[0];
        a--;
    }
    if (s.length < long)
        s += useChr[4 - b];
    while (c > 0) {
        s += useChr[4];
        c--;
    }
    return s;
}
export let PROGRESS_CHAR = "";
export let TALENT_CHAR = "";
//# sourceMappingURL=getCharByNum.js.map