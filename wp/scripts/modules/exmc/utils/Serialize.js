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
        return res;
    }
    static to(data) {
        return JSON.stringify(data);
    }
}
//# sourceMappingURL=Serialize.js.map