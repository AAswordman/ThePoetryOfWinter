var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import 'reflect-metadata';
const cacheName = "__nameType__";
export class Serialize {
    static from(from, def) {
        let res;
        try {
            res = JSON.parse(from);
        }
        catch (e) {
            res = def;
        }
        fromJSON(res);
        return res;
    }
    static to(data) {
        return JSON.stringify(data);
    }
}
function fromJSON(res) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i in res) {
            let data = res[i + cacheName];
            if (data) {
                let nv = (yield import(data[0]));
                let def = eval(`(new ${data[1]}())`);
                for (let j in res[i]) {
                    def[j] = res[i][j];
                }
                res[i] = def;
                fromJSON(def);
            }
            if (res[i] instanceof Array) {
                fromJSON(res[i]);
            }
        }
    });
}
export function serialize(path) {
    return function (obj, name) {
        let v = obj[name];
        if (v == undefined)
            throw new TypeError("not have a def value");
        if (v === null || v === void 0 ? void 0 : v.isSerializeAble) {
            let clsName = v.name;
            obj[name + cacheName] = [path, clsName];
        }
        if (typeof v === "boolean" || typeof v === "bigint" || typeof v === "number" || typeof v === "string") {
        }
    };
}
//# sourceMappingURL=Serialize.js.map