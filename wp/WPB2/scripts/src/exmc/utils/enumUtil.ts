export function getEnumKeys(obj: object) {
    let arr: string[] = [];
    for (let i in obj) {
        if(isNaN(Number(i))){
            arr.push(i);
        }
    }
    return arr;
}
export function getEnumFlags(obj: object) {
    let arr: string[] = [];
    for (let i in obj) {
        if(isNaN(Number(i))){
            arr.push(i);
        }
    }
}
export function getEnumFlag(obj:object,s:string) : number {
    //if(!(s in obj)) throw new Error("name insnot in object");
    return (<any>obj)[s];
}