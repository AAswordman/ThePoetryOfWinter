import Vector3 from "../../../../modules/exmc/math/Vector3.js";
import IStructureSettle from "./IStructureSettle.js";
import { MinecraftBlockTypes } from "@minecraft/server";
export default class IStructureDriver {
    save(dim, start, end, settle) {
        if (start.x > end.x)
            [start.x, end.x] = [end.x, start.x];
        if (start.y > end.y)
            [start.y, end.y] = [end.y, start.y];
        if (start.z > end.z)
            [start.z, end.z] = [end.z, start.z];
        //measure
        let a1 = new IStructureSettle();
        let a2 = new IStructureSettle();
        let box = end.clone().sub(start);
        const tmpV = new Vector3();
        for (let x = 0; x < box.x; x++) {
            for (let y = 0; y < box.y; y++) {
                let last = "";
                let zlast = 0;
                let id;
                for (let z = 0; z < box.z; z++) {
                    tmpV.set(start).add(x, y, z);
                    id = dim.getBlock(tmpV).type.id;
                    if (id !== last) {
                        if (last !== "") {
                            if (last !== MinecraftBlockTypes.air.id)
                                a1.fill([x, y, zlast], [x + 1, y + 1, z], last);
                        }
                        last = id;
                        zlast = z;
                    }
                }
                if (id !== MinecraftBlockTypes.air.id)
                    a1.fill([x, y, zlast], [x + 1, y + 1, box.z], last);
            }
        }
        let flag = box.x < 2 || box.y < 2 || box.z < 2;
        if (!flag) {
            this.save(dim, start.clone(), start.clone().add(Math.floor(box.x / 2), Math.floor(box.y / 2), Math.floor(box.z / 2)), a2);
            this.save(dim, start.clone().add(Math.floor(box.x / 2), 0, 0), start.clone().add(box.x, Math.floor(box.y / 2), Math.floor(box.z / 2)), a2);
            this.save(dim, start.clone().add(0, 0, Math.floor(box.z / 2)), start.clone().add(Math.floor(box.x / 2), Math.floor(box.y / 2), box.z), a2);
            this.save(dim, start.clone().add(Math.floor(box.x / 2), 0, Math.floor(box.z / 2)), start.clone().add(box.x, Math.floor(box.y / 2), box.z), a2);
            this.save(dim, start.clone().add(0, Math.floor(box.y / 2), 0), start.clone().add(Math.floor(box.x / 2), box.y, Math.floor(box.z / 2)), a2);
            this.save(dim, start.clone().add(Math.floor(box.x / 2), Math.floor(box.y / 2), 0), start.clone().add(box.x, box.y, Math.floor(box.z / 2)), a2);
            this.save(dim, start.clone().add(0, Math.floor(box.y / 2), Math.floor(box.z / 2)), start.clone().add(Math.floor(box.x / 2), box.y, box.z), a2);
            this.save(dim, start.clone().add(Math.floor(box.x / 2), Math.floor(box.y / 2), Math.floor(box.z / 2)), start.clone().add(box.x, box.y, box.z), a2);
        }
        if (a2.length > a1.length || flag) {
            settle === null || settle === void 0 ? void 0 : settle.merge(a1);
        }
        else {
            settle === null || settle === void 0 ? void 0 : settle.merge(a2);
        }
    }
}
//# sourceMappingURL=IStructureDiver.js.map