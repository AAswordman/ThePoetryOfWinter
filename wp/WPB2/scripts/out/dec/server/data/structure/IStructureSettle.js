var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Vector3 from "../../../../modules/exmc/math/Vector3.js";
import { MinecraftBlockTypes } from '@minecraft/server';
import ExTaskRunner from "../../../../modules/exmc/server/ExTaskRunner.js";
import Random from "../../../../modules/exmc/utils/Random.js";
export default class IStructureSettle {
    constructor() {
        this.cmds = [];
        this.block = new Map();
        this.blockloads = new Map();
    }
    dispose() {
        this.cmds = [];
        this.block.clear();
        this.blockloads.clear();
    }
    get length() {
        return this.cmds.length;
    }
    fill(s, e, blockName) {
        var _a;
        if (!this.blockloads.has(blockName)) {
            let id = Math.floor(Math.random() * Random.MAX_VALUE);
            this.block.set(id, blockName);
            this.blockloads.set(blockName, id);
        }
        this.cmds.push({
            "start": s,
            "end": e,
            "blockId": (_a = this.blockloads.get(blockName)) !== null && _a !== void 0 ? _a : 0
        });
    }
    set(s, blockName) {
        var _a;
        if (!this.blockloads.has(blockName)) {
            let id = Math.floor(Math.random() * Random.MAX_VALUE);
            this.block.set(id, blockName);
            this.blockloads.set(blockName, id);
        }
        this.cmds.push({
            "start": s,
            "blockId": (_a = this.blockloads.get(blockName)) !== null && _a !== void 0 ? _a : 0
        });
    }
    run(dim, pos) {
        return __awaiter(this, void 0, void 0, function* () {
            const s = new Vector3(), e = new Vector3();
            let runner = new ExTaskRunner();
            const t = this;
            const tmpV = new Vector3();
            const tmpP = new Vector3();
            runner.run((function* () {
                var _a;
                for (let c of t.cmds) {
                    s.set(...c.start);
                    e.set(...(c.end ? c.end : c.start));
                    if (c.end)
                        e.sub(1);
                    dim.fillBlocks(tmpV.set(pos).add(s), tmpP.set(pos).add(e), (_a = t.block.get(c.blockId)) !== null && _a !== void 0 ? _a : MinecraftBlockTypes.air);
                    yield true;
                }
                return false;
            }));
            yield runner.start(1, 5);
            return true;
        });
    }
    merge(m) {
        this.cmds = this.cmds.concat(m.cmds);
        m.blockloads.forEach((v, k) => this.blockloads.set(k, v));
        m.block.forEach((v, k) => this.block.set(k, v));
    }
    toData() {
        let s = {
            cmds: this.cmds,
            idToBlock: (() => {
                let m = {};
                this.block.forEach((v, k) => m[k] = v);
                return m;
            })(),
            blockToId: (() => {
                let m = {};
                this.blockloads.forEach((v, k) => m[k] = v);
                return m;
            })()
        };
        return s;
    }
    load(json) {
        for (let k in json.blockToId) {
            this.blockloads.set(k, json.blockToId[k]);
        }
        for (let k in json.idToBlock) {
            this.block.set(parseInt(k), json.idToBlock[k]);
        }
        this.cmds = json.cmds;
    }
}
//# sourceMappingURL=IStructureSettle.js.map