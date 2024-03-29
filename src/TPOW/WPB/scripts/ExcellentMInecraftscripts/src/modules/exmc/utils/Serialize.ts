
const cacheName = "__nameType__";
export class Serialize {
    static from<T>(from: string, def?: any): T {
        let res;
        try { res = JSON.parse(from); } catch (e) { res = def }
        return res;
    }

    static to(data: any) {
        return JSON.stringify(data);
    }
}