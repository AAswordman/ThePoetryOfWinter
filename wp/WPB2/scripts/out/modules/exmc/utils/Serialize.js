export class Serialize {
    static fromJSON(from, def) {
        var _a, _b;
        let res;
        try {
            res = JSON.parse(from);
        }
        catch (e) {
            res = def;
        }
        for (let i in def) {
            if (((_a = (res[i])) === null || _a === void 0 ? void 0 : _a.isSerializeAble) && ((_b = (def[i])) === null || _b === void 0 ? void 0 : _b.isSerializeAble)) {
                Serialize.fromJSON(res[i], def[i]);
            }
            else if (typeof (def[i]) === "function") {
                res[i] = def[i];
            }
        }
        return res;
    }
    static toJSON(data) {
        return JSON.stringify(data);
    }
}
//# sourceMappingURL=Serialize.js.map