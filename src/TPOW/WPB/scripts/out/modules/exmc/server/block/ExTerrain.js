import ExDimension from '../ExDimension.js';
import Vector3 from '../../math/Vector3.js';
export default class ExTerrain {
    constructor(dimension) {
        this.dimension = dimension;
        this.exDimension = ExDimension.getInstance(dimension);
    }
    getHight(x, z) {
        var _a, _b;
        // return this.getHightByRange(x, z, -64, 127);
        return (_b = (_a = this.dimension.getBlockFromRay({ x: x, z: z, y: 127 }, Vector3.down, {
            "includePassableBlocks": false
        })) === null || _a === void 0 ? void 0 : _a.block.y) !== null && _b !== void 0 ? _b : undefined;
    }
    getHightByRange(x, z, minY, maxY, searchTimes = -1) {
        if (searchTimes === 0 || minY > maxY)
            return undefined;
        let mid = Math.floor((minY + maxY) / 2);
        let midBlock = this.exDimension.getBlock({ x: x, y: mid, z: z });
        if (midBlock === undefined)
            throw new RangeError("Invalid Block Range or Block out of bounds");
        if (midBlock.isAir) {
            let res = this.getHightByRange(x, z, mid + 1, maxY, searchTimes == -1 ? 4 : searchTimes - 1);
            if (!res) {
                return this.getHightByRange(x, z, minY, mid - 1, searchTimes == -1 ? -1 : searchTimes - 1);
            }
            else {
                return this.getHightByRange(x, z, mid + 1, maxY, searchTimes == -1 ? -1 : searchTimes - 1);
            }
        }
        else {
            // console.warn(x+";"+mid+";"+z)
            let res = this.getHightByRange(x, z, mid + 1, maxY, searchTimes == -1 ? -1 : searchTimes - 1);
            return res ? Math.max(res, mid) : mid;
        }
    }
    getSurfaceBlock(x, z) {
        var _a;
        // return this.exDimension.getBlock({ x: x, z: z, y: this.getHight(x, z) ?? 0 });
        return (_a = this.dimension.getBlockFromRay({ x: x, z: z, y: 127 }, Vector3.down, {
            "includePassableBlocks": true,
            "includeLiquidBlocks": true
        })) === null || _a === void 0 ? void 0 : _a.block;
    }
}
//# sourceMappingURL=ExTerrain.js.map