"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const fileOper_js_1 = require("./fileOper.js");
class SingleFileDataSet {
    constructor(pathDir) {
        this.pathDir = pathDir;
        this.cacheMode = false;
        this.cache = new Map();
    }
    async setCacheMode(arg0) {
        this.cacheMode = arg0;
        if (!arg0) {
            await this.saveOri();
            for (let i = 0; i < SingleFileDataSet.PIECE_NUM; i++) {
                await (0, fileOper_js_1.writeFile)(this.pathDir + "/db" + i + ".ts", "export default " + JSON.stringify(this.cache.get(i)));
            }
            this.cache.clear();
        }
        else {
            for (let i = 0; i < SingleFileDataSet.PIECE_NUM; i++) {
                this.cache.set(i, JSON.parse((await (0, fileOper_js_1.readFile)(this.pathDir + "/db" + i + ".ts"))
                    .substring("export default ".length)));
            }
        }
    }
    async init() {
        this.oriPathFile = this.pathDir + "/keys.ts";
        this.indexPathFile = this.pathDir + "/index.ts";
        if (!fs.existsSync(this.oriPathFile)) {
            await (0, fileOper_js_1.writeFile)(this.oriPathFile, this.getTemps("keys.ts"));
            await (0, fileOper_js_1.writeFile)(this.indexPathFile, this.getTemps("index.ts"));
            for (let i = 0; i < SingleFileDataSet.PIECE_NUM; i++) {
                await (0, fileOper_js_1.writeFile)(this.pathDir + "/db" + i + ".ts", this.getTemps("db.ts"));
            }
        }
        this.oriPath = JSON.parse((await (0, fileOper_js_1.readFile)(this.oriPathFile))
            .substring("export default ".length));
        return this;
    }
    async operate(path, oper) {
        let bef;
        let savePath = this.pathDir + "/db" + (path.hashCode() % SingleFileDataSet.PIECE_NUM) + ".ts";
        if (this.cacheMode) {
            bef = this.cache.get(path.hashCode() % SingleFileDataSet.PIECE_NUM);
        }
        else {
            bef = JSON.parse((await (0, fileOper_js_1.readFile)(savePath))
                .substring("export default ".length));
        }
        oper(bef);
        if (!this.cacheMode)
            await (0, fileOper_js_1.writeFile)(savePath, "export default " + JSON.stringify(bef));
    }
    async write(path, n) {
        await this.operate(path, (msg) => {
            msg[path] = n;
        });
        let str = path.split('/');
        let res = this.ensureOriDir(str.splice(0, str.length - 1).join("/"));
        res[str.at(-1)] = '_';
        if (!this.cacheMode)
            await this.saveOri();
    }
    async remove(path) {
        await this.operate(path, (msg) => {
            delete msg[path];
        });
        let str = path.split('/');
        let dirPath = str.slice(0, str.length - 1).join('/');
        let dir = this.getOriDir(dirPath);
        if (dir) {
            delete dir[str[str.length - 1]];
            while (dir && Object.keys(dir).length == 0) {
                str = dirPath.split('/');
                delete dir[str[str.length - 1]];
                dirPath = str.slice(0, str.length - 1).join('/');
                if (str.length === 1) {
                    break;
                }
                dir = this.getOriDir(dirPath);
            }
        }
        if (!this.cacheMode)
            await this.saveOri();
    }
    async saveOri() {
        await (0, fileOper_js_1.writeFile)(this.oriPathFile, "export default " + JSON.stringify(this.oriPath));
    }
    ensureOriDir(path) {
        let dir = this.oriPath;
        for (const name of path.split('/')) {
            if (!(name in dir)) {
                dir[name] = {};
            }
            let d = dir[name];
            if (typeof d === "string") {
                throw new Error("Not a directory");
            }
            dir = d;
        }
        return dir;
    }
    getOriDir(path) {
        let dir = this.oriPath;
        for (const name of path.split('/')) {
            if (!(name in dir)) {
                return undefined;
            }
            let d = dir[name];
            if (typeof d === "string") {
                throw new Error("Not a directory");
            }
            dir = d;
        }
        return dir;
    }
    getTemps(path) {
        return temps[path];
    }
}
exports.default = SingleFileDataSet;
SingleFileDataSet.PIECE_NUM = 64;
String.prototype.hashCode = function () {
    let hash = 0;
    for (let i = 0; i < this.length; i++) {
        const char = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
    }
    return hash & 2147483647;
};
const temps = {
    "keys.ts": `export default {}`,
    "db.ts": `export default {}`,
    "index.ts": ""
};
let tmpAppender = `import * as _keys from "./keys.js";
type PathDir = { [key: string]: string | PathDir }
const keys:PathDir = _keys as any;
declare global {
    interface String {
        hashCode(): number;
    }
}

export type JSONValue = string | boolean | number | JSONObject | JSONArray;
export interface JSONObject {
    [key: string]: JSONValue
}
export interface JSONArray extends Array<JSONValue> {
}

String.prototype.hashCode = function () {
    let hash = 0;
    for (let i = 0; i < this.length; i++) {
        const char = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
    }
    return hash & 2147483647;
};
`;
for (let i = 0; i < SingleFileDataSet.PIECE_NUM; i++) {
    tmpAppender += `
import * as db${i} from "./db${i}.js";`;
}
tmpAppender += `
const dbMap = new Map<number, any>();`;
for (let i = 0; i < SingleFileDataSet.PIECE_NUM; i++) {
    tmpAppender += `
dbMap.set(${i}, db${i});`;
}
tmpAppender += `
class ExFileProvider{
    constructor(){
        
    }
    get(path:string): unknown{
        return (dbMap.get(path.hashCode() % ${SingleFileDataSet.PIECE_NUM}) as any)[path];
    }
    list(path:string){
        let dir = keys;
        for(const name of path.split('/')){
            if(!(name in dir)){
                throw new Error("File not found");
            }
            let d = dir[name];
            if(typeof d === "string"){
                throw new Error("Not a directory");
            }
            dir = d;
        }
        return Object.keys(dir);
    }
}
export const fileProvider = new ExFileProvider()
`;
temps["index.ts"] = tmpAppender;
//# sourceMappingURL=SingleFileDataSet.js.map