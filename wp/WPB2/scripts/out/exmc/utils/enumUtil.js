export function getEnumKeys(obj) {
    let arr = [];
    for (let i in obj) {
        if (isNaN(Number(i))) {
            arr.push(i);
        }
    }
    return arr;
}
export function getEnumFlags(obj) {
    let arr = [];
    for (let i in obj) {
        if (isNaN(Number(i))) {
            arr.push(i);
        }
    }
}
export function getEnumFlag(obj, s) {
    //if(!(s in obj)) throw new Error("name insnot in object");
    return obj[s];
}
//# sourceMappingURL=enumUtil.js.map