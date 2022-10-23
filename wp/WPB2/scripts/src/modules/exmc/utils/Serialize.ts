
const cacheName = "__nameType__";

export class Serialize {
    static from<T>(from: string, def: any): T {
        let res;
        try { res = JSON.parse(from); } catch (e) { res = def }

        fromJSON(res);

        return res;
    }

    static to(data: any) {
        return JSON.stringify(data);
    }
}
async function fromJSON(res: any) {
    for(let i in res){
        
        let data = res[i+cacheName];
        if(data){
            let nv =(await import(data[0]));
            let def = eval(`(new ${data[1]}())`);
            for(let j in res[i]){
                def[j] = res[i][j];
            }
            res[i] = def;
            fromJSON(def);
        }
        if(res[i] instanceof Array){
            fromJSON(res[i]);
        }

    }
}


export interface SerializeAble {
    isSerializeAble: true;
}

export function serialize<T>(path?:string) {
    return function (obj: any, name: string) {
        let v = obj[name];
        if(v == undefined) throw new TypeError("not have a def value");
        if(v?.isSerializeAble){
            let clsName = v.name;
            obj[name + cacheName] = [path, clsName];
        }
        if(typeof v === "boolean"||typeof v === "bigint" || typeof v === "number" || typeof v === "string"){

        }
        
    }
}


