import { Dimension } from '@minecraft/server';
import ExDimension from '../ExDimension.js';
import Vector3 from '../../math/Vector3.js';
export default class ExTerrain {
    exDimension: ExDimension;
    constructor(public dimension: Dimension) {
        this.exDimension = ExDimension.getInstance(dimension);
    }
    getHight(x: number, z: number) {
        // return this.getHightByRange(x, z, -64, 127);
        return this.dimension.getBlockFromRay({ x: x, z: z, y: 127 }, Vector3.down, {
            "includePassableBlocks": false
        })?.block.y ?? undefined;
    }
    getHightByRange(x: number, z: number, minY: number, maxY: number, searchTimes = -1): undefined | number {
        if (searchTimes === 0 || minY > maxY) return undefined;
        let mid = Math.floor((minY + maxY) / 2);
        let midBlock = this.exDimension.getBlock({ x: x, y: mid, z: z });
        if (midBlock === undefined) throw new RangeError("Invalid Block Range or Block out of bounds");
        if (midBlock.isAir) {
            let res = this.getHightByRange(x, z, mid + 1, maxY, searchTimes == -1 ? 4 : searchTimes - 1);
            if (!res) {
                return this.getHightByRange(x, z, minY, mid - 1, searchTimes == -1 ? -1 : searchTimes - 1);
            } else {
                return this.getHightByRange(x, z, mid + 1, maxY, searchTimes == -1 ? -1 : searchTimes - 1);
            }
        } else {
            // console.warn(x+";"+mid+";"+z)
            let res = this.getHightByRange(x, z, mid + 1, maxY, searchTimes == -1 ? -1 : searchTimes - 1);
            return res ? Math.max(res, mid) : mid;
        }
    }
    getSurfaceBlock(x: number, z: number) {
        // return this.exDimension.getBlock({ x: x, z: z, y: this.getHight(x, z) ?? 0 });
        return this.dimension.getBlockFromRay({ x: x, z: z, y: 127 }, Vector3.down, {
            "includePassableBlocks": true,
            "includeLiquidBlocks": true
        })?.block;
    }
}