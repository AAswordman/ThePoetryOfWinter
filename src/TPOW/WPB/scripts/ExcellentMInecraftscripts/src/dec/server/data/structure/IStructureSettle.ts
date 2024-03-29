import Vector3 from "../../../../modules/exmc/math/Vector3.js";
import { Dimension, Block } from '@minecraft/server';
import ExDimension from "../../../../modules/exmc/server/ExDimension.js";
import ExTaskRunner from "../../../../modules/exmc/server/ExTaskRunner.js";
import Random from "../../../../modules/exmc/utils/Random.js";
import DisposeAble from "../../../../modules/exmc/interface/DisposeAble.js";
import { MinecraftBlockTypes } from "../../../../modules/vanilla-data/lib/index.js";

export default class IStructureSettle implements DisposeAble{
    dispose(): void {
        this.cmds = [];
        this.block.clear();
        this.blockloads.clear();
    }
    cmds: IStructureCommmand[] = [];
    block: Map<number, string> = new Map<number, string>();
    blockloads = new Map<string, number>();
    get length() {
        return this.cmds.length;
    }
    fill(s: [number, number, number], e: [number, number, number], blockName: string) {
        if (!this.blockloads.has(blockName)) {
            let id = Math.floor(Math.random()*Random.MAX_VALUE);
            this.block.set(id, blockName);
            this.blockloads.set(blockName, id);
        }
        this.cmds.push({
            "start": s,
            "end": e,
            "blockId": this.blockloads.get(blockName) ?? 0
        });
    }
    set(s: [number, number, number], blockName: string) {
        if (!this.blockloads.has(blockName)) {
            let id = Math.floor(Math.random()*Random.MAX_VALUE);
            this.block.set(id, blockName);
            this.blockloads.set(blockName, id);
        }
        this.cmds.push({
            "start": s,
            "blockId": this.blockloads.get(blockName) ?? 0
        })
    }
    async run(dim: ExDimension, pos: Vector3) {
        const s = new Vector3(), e = new Vector3();
        let runner = new ExTaskRunner();
        const t = this;
        const tmpV = new Vector3();
        const tmpP = new Vector3();
        runner.setTasks((function* () {
            for (let c of t.cmds) {
                s.set(...c.start);
                e.set(...(c.end ? c.end : c.start))
                if (c.end) e.sub(1);
                dim.fillBlocks(tmpV.set(pos).add(s), tmpP.set(pos).add(e), t.block.get(c.blockId) ?? MinecraftBlockTypes.Air)
                yield true;
            }
            return false;
        }));

        await runner.start(1, 30);
        return true;
    }
    merge(m:IStructureSettle){
        this.cmds=this.cmds.concat(m.cmds);
        m.blockloads.forEach((v,k) => this.blockloads.set(k,v));
        m.block.forEach((v,k) => this.block.set(k,v));
    }

    toData(){
        let s:IStructureData = {
            cmds:this.cmds,
            idToBlock:(()=>{
                let m:{[x:number]:string} = {}
                this.block.forEach((v,k) => m[k] = v);
                return m;
            })(),
            blockToId:(()=>{
                let m:{[x:string]:number} = {}
                this.blockloads.forEach((v,k) => m[k] = v);
                return m;
            })()
        };
        return s;
    }
    load(json:IStructureData){
        for(let k in json.blockToId){
            this.blockloads.set(k,json.blockToId[k]);
        }
        for(let k in json.idToBlock){
            this.block.set(parseInt(k),json.idToBlock[k]);
        }
        this.cmds = json.cmds;
    }
}
interface IStructureData{
    cmds:IStructureCommmand[];
    idToBlock:{[x:number]:string};
    blockToId:{[x:string]:number};
}

interface IStructureCommmand {
    start: [number, number, number];
    end?: [number, number, number];
    blockId: number;
}