import Vector3 from "../../../../modules/exmc/math/Vector3.js";
import IStructureSettle from "./IStructureSettle.js";
import ExDimension from '../../../../modules/exmc/server/ExDimension.js';
import { MinecraftBlockTypes } from "../../../../modules/vanilla-data/lib/index.js";

export default class IStructureDriver {
    *save(dim: ExDimension, start: Vector3, end: Vector3) {
        if (start.x > end.x) [start.x, end.x] = [end.x, start.x];
        if (start.y > end.y) [start.y, end.y] = [end.y, start.y];
        if (start.z > end.z) [start.z, end.z] = [end.z, start.z];
        //measure

        let box = end.cpy().sub(start);

        const tmpV = new Vector3();
        this.save(dim, start.cpy(),
            start.cpy().add(Math.floor(box.x / 2), Math.floor(box.y / 2), Math.floor(box.z / 2)));
        let size = 32;
        for (let x = 0; x < box.x; x += size) {
            for (let y = 0; y < box.y; y += size) {
                for (let z = 0; z < box.z; z += size) {
                    yield this._save(dim, start.cpy().add(x, y, z), start.cpy().add(x, y, z).add(size).min(box.cpy().sub(1)), new Vector3(x, y, z));
                }
            }
        }
    }
    _save(dim: ExDimension, start: Vector3, end: Vector3, offset: Vector3) {
        if (start.x > end.x) [start.x, end.x] = [end.x, start.x];
        if (start.y > end.y) [start.y, end.y] = [end.y, start.y];
        if (start.z > end.z) [start.z, end.z] = [end.z, start.z];
        //measure
        let a1 = new IStructureSettle();

        let box = end.cpy().sub(start);

        const tmpV = new Vector3();

        for (let x = 0; x < box.x; x++) {
            for (let y = 0; y < box.y; y++) {
                let last = "";
                let zlast = 0;
                let id;
                for (let z = 0; z < box.z; z++) {
                    tmpV.set(start).add(x, y, z);
                    id = dim.getBlock(tmpV)!.type.id;
                    if (id !== last) {
                        if (last !== "") {
                            if (last !== MinecraftBlockTypes.Air) a1.fill([x + offset.x, y + offset.y, zlast + offset.z], [x + 1 + offset.x, y + 1 + offset.y, z + offset.z], last);
                        }
                        last = id;
                        zlast = z;
                    }
                }
                if (id !== MinecraftBlockTypes.Air) a1.fill([x + offset.x, y + offset.y, zlast + offset.z], [x + 1 + offset.x, y + 1 + offset.y, box.z + offset.z], last);
            }
        }

        return a1;
    }
}