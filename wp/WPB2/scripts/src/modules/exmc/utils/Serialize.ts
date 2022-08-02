export class Serialize {
    static fromJSON<T>(from: string, def: any): T {
        let res;
        try { res = JSON.parse(from); } catch (e) { res = def }
        for (let i in def) {
            if ((res[i])?.isSerializeAble && (def[i])?.isSerializeAble) {
                Serialize.fromJSON(res[i], def[i]);
            } else if (typeof (def[i]) === "function") {
                res[i] = def[i];
            }

        }
        return res;
    }
    static toJSON(data: any) {
        return JSON.stringify(data);
    }
}


export interface SerializeAble {
    isSerializeAble: true;
}