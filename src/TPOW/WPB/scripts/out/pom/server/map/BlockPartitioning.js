import Vector3 from "../../../modules/exmc/math/Vector3.js";
import { ExBlockArea } from "../../../modules/exmc/server/block/ExBlockArea.js";
export default class BlockPartitioning {
    constructor(cache) {
        this.cache = cache;
        this.customChunkSize = 32;
    }
    addArea(area, mark) {
        var _a;
        const center = area.center();
        center.div(this.customChunkSize).floor();
        ((_a = this.cache[center.toString()]) !== null && _a !== void 0 ? _a : (this.cache[center.toString()] = [])).push([area.start, area.end, mark]);
    }
    removeArea(area) {
        if (area instanceof Vector3) {
            const center = area.cpy();
            center.div(this.customChunkSize).floor();
            if (!this.cache[center.toString()]) {
                return;
            }
            this.cache[center.toString()] = this.cache[center.toString()].filter(e => !new ExBlockArea(e[0], new Vector3(e[1]).sub(1), true).contains(area));
            if (this.cache[center.toString()].length === 0)
                delete this.cache[center.toString()];
        }
        else {
            this.removeArea(area.center());
        }
    }
    getAreasByPoint(inputPoint) {
        const center = inputPoint.cpy().div(this.customChunkSize).floor();
        if (!this.cache[center.toString()]) {
            return [];
        }
        return this.cache[center.toString()].map(e => [new ExBlockArea(e[0], new Vector3(e[1]).sub(1), true), e[2]]);
    }
    getAreasByNearby(center, nearby = 2) {
        const tmpV = new Vector3();
        let arr = [];
        for (let i = -nearby; i <= nearby; i++) {
            for (let j = -nearby; j <= nearby; j++) {
                for (let k = -nearby; k <= nearby; k++) {
                    arr.push(...this.getAreasByPoint(tmpV.set(center)
                        .add(i * this.customChunkSize, j * this.customChunkSize, k * this.customChunkSize)));
                }
            }
        }
        return arr;
    }
    getAreaIn(center, nearby = 2) {
        for (let area of this.getAreasByNearby(center, nearby)) {
            if (area[0].contains(center)) {
                return area;
            }
        }
    }
}
//# sourceMappingURL=BlockPartitioning.js.map