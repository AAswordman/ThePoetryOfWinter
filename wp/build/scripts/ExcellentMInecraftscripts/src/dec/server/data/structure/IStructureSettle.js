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
        if (!this.blockloads.has(blockName)) {
            let id = Math.floor(Math.random() * Random.MAX_VALUE);
            this.block.set(id, blockName);
            this.blockloads.set(blockName, id);
        }
        this.cmds.push({
            "start": s,
            "end": e,
            "blockId": this.blockloads.get(blockName) ?? 0
        });
    }
    set(s, blockName) {
        if (!this.blockloads.has(blockName)) {
            let id = Math.floor(Math.random() * Random.MAX_VALUE);
            this.block.set(id, blockName);
            this.blockloads.set(blockName, id);
        }
        this.cmds.push({
            "start": s,
            "blockId": this.blockloads.get(blockName) ?? 0
        });
    }
    async run(dim, pos) {
        const s = new Vector3(), e = new Vector3();
        let runner = new ExTaskRunner();
        const t = this;
        const tmpV = new Vector3();
        const tmpP = new Vector3();
        runner.run((function* () {
            for (let c of t.cmds) {
                s.set(...c.start);
                e.set(...(c.end ? c.end : c.start));
                if (c.end)
                    e.sub(1);
                dim.fillBlocks(tmpV.set(pos).add(s), tmpP.set(pos).add(e), t.block.get(c.blockId) ?? MinecraftBlockTypes.air);
                yield true;
            }
            return false;
        }));
        await runner.start(1, 30);
        return true;
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
