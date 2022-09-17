import { MinecraftBlockTypes } from "mojang-minecraft";
import ExDimension from "../../ExDimension.js";
import Vector3 from "../../utils/Vector3.js";
import { ExBlockArea } from "../ExBlockArea.js";
export default class ExBlockStructureNormal {
    constructor() {
        this.direction = ExBlockStructureNormal.DIRECTION_AROUND | ExBlockStructureNormal.DIRECTION_LAY;
    }
    setDimension(dim) {
        this.dimension = ExDimension.getInstance(dim);
        return this;
    }
    find() {
        if (this.dimension === undefined)
            throw new Error("dimension is undefined");
        if (this.structure === undefined)
            throw new Error("structure is undefined");
        if (this.analysisMap === undefined)
            throw new Error("analysisMap is undefined");
        if (this.area === undefined)
            throw new Error("area is undefined");
        const childArea = new ExBlockArea(new Vector3(), new Vector3(this.structure[0][0].length, this.structure[0].length, this.structure.length));
        let tmpArea = childArea.clone();
        let res = undefined;
        if ((this.direction >> 0) & 1) {
            if ((this.direction >> 6) & 1) {
                tmpArea.turnFrontClockwise();
                if (res = this.searchOnce(tmpArea))
                    return res;
                tmpArea.turnFrontClockwise();
                if (res = this.searchOnce(tmpArea))
                    return res;
                tmpArea.turnFrontClockwise();
                if (res = this.searchOnce(tmpArea))
                    return res;
                tmpArea.turnFrontClockwise();
                if (res = this.searchOnce(tmpArea))
                    return res;
            }
            else {
                if (res = this.searchOnce(tmpArea))
                    return res;
            }
        }
        tmpArea = childArea.clone();
        tmpArea.turnRight();
        tmpArea.turnRight();
        if ((this.direction >> 1) & 1) {
            if ((this.direction >> 6) & 1) {
                tmpArea.turnFrontClockwise();
                if (res = this.searchOnce(tmpArea))
                    return res;
                tmpArea.turnFrontClockwise();
                if (res = this.searchOnce(tmpArea))
                    return res;
                tmpArea.turnFrontClockwise();
                if (res = this.searchOnce(tmpArea))
                    return res;
                tmpArea.turnFrontClockwise();
                if (res = this.searchOnce(tmpArea))
                    return res;
            }
            else {
                if (res = this.searchOnce(tmpArea))
                    return res;
            }
        }
        tmpArea = childArea.clone();
        tmpArea.turnRight();
        if ((this.direction >> 2) & 1) {
            if ((this.direction >> 6) & 1) {
                tmpArea.turnFrontClockwise();
                if (res = this.searchOnce(tmpArea))
                    return res;
                tmpArea.turnFrontClockwise();
                if (res = this.searchOnce(tmpArea))
                    return res;
                tmpArea.turnFrontClockwise();
                if (res = this.searchOnce(tmpArea))
                    return res;
                tmpArea.turnFrontClockwise();
                if (res = this.searchOnce(tmpArea))
                    return res;
            }
            else {
                if (res = this.searchOnce(tmpArea))
                    return res;
            }
        }
        tmpArea = childArea.clone();
        tmpArea.turnRight();
        tmpArea.turnRight();
        tmpArea.turnRight();
        if ((this.direction >> 3) & 1) {
            if ((this.direction >> 6) & 1) {
                tmpArea.turnFrontClockwise();
                if (res = this.searchOnce(tmpArea))
                    return res;
                tmpArea.turnFrontClockwise();
                if (res = this.searchOnce(tmpArea))
                    return res;
                tmpArea.turnFrontClockwise();
                if (res = this.searchOnce(tmpArea))
                    return res;
                tmpArea.turnFrontClockwise();
                if (res = this.searchOnce(tmpArea))
                    return res;
            }
            else {
                if (res = this.searchOnce(tmpArea))
                    return res;
            }
        }
        tmpArea = childArea.clone();
        tmpArea.turnUp();
        if ((this.direction >> 4) & 1) {
            tmpArea.turnFrontClockwise();
            if (res = this.searchOnce(tmpArea))
                return res;
            tmpArea.turnFrontClockwise();
            if (res = this.searchOnce(tmpArea))
                return res;
            tmpArea.turnFrontClockwise();
            if (res = this.searchOnce(tmpArea))
                return res;
            tmpArea.turnFrontClockwise();
            if (res = this.searchOnce(tmpArea))
                return res;
        }
        tmpArea = childArea.clone();
        tmpArea.turnUp();
        tmpArea.turnUp();
        tmpArea.turnUp();
        if ((this.direction >> 5) & 1) {
            tmpArea.turnFrontClockwise();
            if (res = this.searchOnce(tmpArea))
                return res;
            tmpArea.turnFrontClockwise();
            if (res = this.searchOnce(tmpArea))
                return res;
            tmpArea.turnFrontClockwise();
            if (res = this.searchOnce(tmpArea))
                return res;
            tmpArea.turnFrontClockwise();
            if (res = this.searchOnce(tmpArea))
                return res;
        }
        return res;
    }
    searchOnce(childArea) {
        var _a, _b;
        const structure = (_a = this.structure) !== null && _a !== void 0 ? _a : [[""]];
        const tmpV = new Vector3();
        const vec = new Vector3();
        const dimension = this.dimension;
        let flag;
        (_b = this.area) === null || _b === void 0 ? void 0 : _b.forEachArea(childArea, (res) => {
            var _a, _b, _c;
            for (vec.z = 0; vec.z < structure.length; vec.z++) {
                for (vec.y = 0; vec.y < structure[vec.z].length; vec.y++) {
                    const str = structure[vec.z][vec.y];
                    for (vec.x = 0; vec.x < str.length; vec.x++) {
                        const c = str.charAt(vec.x);
                        if (c == ' ')
                            continue;
                        res.calculateRelPos(vec, tmpV).add(res.start);
                        if (((_a = dimension === null || dimension === void 0 ? void 0 : dimension.getBlock(tmpV)) === null || _a === void 0 ? void 0 : _a.id) !== ((_c = (_b = this.analysisMap) === null || _b === void 0 ? void 0 : _b.get(c)) !== null && _c !== void 0 ? _c : MinecraftBlockTypes.air.id)) {
                            return;
                        }
                    }
                }
            }
            flag = res.clone();
            return;
        });
        return flag;
    }
    setStructure(res) {
        this.structure = res;
        return this;
    }
    analysis(map) {
        if (map instanceof (Map)) {
            this.analysisMap = map;
        }
        else {
            const nmap = new Map();
            for (const key in map) {
                nmap.set(key, map[key]);
            }
            this.analysisMap = nmap;
        }
        return this;
    }
    putStructure(area) {
        var _a;
        if (this.dimension === undefined)
            throw new Error("dimension is undefined");
        if (this.analysisMap === undefined)
            throw new Error("analysisMap is undefined");
        if (this.structure === undefined)
            throw new Error("structure is undefined");
        const tmpV = new Vector3();
        const vec = new Vector3();
        for (vec.z = 0; vec.z < this.structure.length; vec.z++) {
            for (vec.y = 0; vec.y < this.structure[vec.z].length; vec.y++) {
                const str = this.structure[vec.z][vec.y];
                for (vec.x = 0; vec.x < str.length; vec.x++) {
                    const c = str.charAt(vec.x);
                    if (c == ' ')
                        continue;
                    area.calculateRelPos(vec, tmpV).add(area.start);
                    this.dimension.setBlock(tmpV, (_a = this.analysisMap.get(c)) !== null && _a !== void 0 ? _a : MinecraftBlockTypes.air.id);
                }
            }
        }
        return this;
    }
    setArea(area) {
        this.area = area;
        return this;
    }
    setDirection(dic) {
        this.direction = dic;
        return this;
    }
}
ExBlockStructureNormal.DIRECTION_SOUTH = Math.pow(2, 0);
ExBlockStructureNormal.DIRECTION_NORTH = Math.pow(2, 1);
ExBlockStructureNormal.DIRECTION_EAST = Math.pow(2, 2);
ExBlockStructureNormal.DIRECTION_WEST = Math.pow(2, 3);
ExBlockStructureNormal.DIRECTION_UP = Math.pow(2, 4);
ExBlockStructureNormal.DIRECTION_BUTTOM = Math.pow(2, 5);
ExBlockStructureNormal.DIRECTION_ALLOW_ROTATE = Math.pow(2, 6);
ExBlockStructureNormal.DIRECTION_AROUND = ExBlockStructureNormal.DIRECTION_WEST | ExBlockStructureNormal.DIRECTION_EAST | ExBlockStructureNormal.DIRECTION_SOUTH | ExBlockStructureNormal.DIRECTION_NORTH;
ExBlockStructureNormal.DIRECTION_AROUND_MIRROR = ExBlockStructureNormal.DIRECTION_EAST | ExBlockStructureNormal.DIRECTION_NORTH;
ExBlockStructureNormal.DIRECTION_LAY = ExBlockStructureNormal.DIRECTION_UP | ExBlockStructureNormal.DIRECTION_BUTTOM;
ExBlockStructureNormal.DIRECTION_LAY_MIRROR = ExBlockStructureNormal.DIRECTION_UP;
//# sourceMappingURL=ExBlockStructureNormal.js.map