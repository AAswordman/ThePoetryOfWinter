import ExStructure from './ExStructure';
import Vector3 from '../../utils/Vector3';
export default class ExStructureJigsaw {
    constructor(girdSize, gridWidthNum, gridHeightNum = 1) {
        this.width = gridWidthNum;
        this.height = gridHeightNum;
        this.size = girdSize;
        this.jigsawData = Array.from(new Array(this.height), () => Array.from(new Array(this.width), () => new Array(this.width)));
    }
    isEmpty(a, b, c = 0) {
        return this.jigsawData[c][b][a] === undefined;
    }
    setStructurePlane(x, z, offsetX, offsetY, offsetZ, structureName, structureLength, structureWidth, structureHeight, structureRot = 0, coverGridLength = 1, coverGridWidth = 1) {
        this.setStructure(x, z, 0, offsetX, offsetY, offsetZ, structureName, structureLength, structureWidth, structureHeight, structureRot, coverGridLength, coverGridWidth, 1);
    }
    setStructure(x, z, y, offsetX, offsetY, offsetZ, structureName, structureLength, structureWidth, structureHeight, structureRot = 0, coverGridLength = 1, coverGridWidth = 1, coverGridHeight = 1) {
        this.clearStructure(x, z, 0);
        for (let ix = x; ix < coverGridLength + x; ix++) {
            for (let iz = z; iz < coverGridWidth + z; iz++) {
                for (let iy = y; iy < coverGridHeight + y; iy++) {
                    if (!this.isEmpty(ix, iz, iy)) {
                        throw new Error("Structure already contains " + ix + " , " + iy + " , " + iz);
                    }
                }
            }
        }
        for (let ix = x; ix < coverGridLength + x; ix++) {
            for (let iz = z; iz < coverGridWidth + z; iz++) {
                for (let iy = y; iy < coverGridHeight + y; iy++) {
                    this.jigsawData[iy][iz][ix] = ExStructureJigsaw.ContinueStructure;
                }
            }
        }
        this.jigsawData[y][z][x] = [offsetX, offsetY, offsetZ, structureName, structureRot,
            structureLength, structureWidth, structureHeight,
            coverGridLength, coverGridWidth, coverGridHeight];
    }
    clearStructure(a, b, c = 0) {
        const pos = this.findBaseStructure(a, b, c);
        if (pos !== undefined) {
            const [x, z, y] = pos;
            const stc = this.jigsawData[y][z][x];
            if (stc !== undefined) {
                if (typeof (stc) === "number") {
                    throw new Error("Error clearing");
                }
                else {
                    for (let ix = 0; ix < stc[8]; ix++) {
                        for (let iz = 0; iz < stc[9]; iz++) {
                            for (let iy = 0; iy < stc[10]; iy++) {
                                this.jigsawData[iy + c][iz + b][ix + a] = undefined;
                            }
                        }
                    }
                }
            }
        }
    }
    findBaseStructure(a, b, c = 0) {
        let point = this.jigsawData[c][b][a];
        if (point !== undefined) {
            if (point === ExStructureJigsaw.ContinueStructure) {
                while (point === ExStructureJigsaw.ContinueStructure && c > 0) {
                    point = this.jigsawData[c--][b][a];
                }
                while (point === ExStructureJigsaw.ContinueStructure && b > 0) {
                    point = this.jigsawData[c][b--][a];
                }
                while (point === ExStructureJigsaw.ContinueStructure && a > 0) {
                    point = this.jigsawData[c][b][a--];
                }
                return [a, b, c];
            }
            else {
                return [a, b, c];
            }
        }
        else {
            return undefined;
        }
    }
    getWidth() {
        return this.size * this.width;
    }
    getHeight() {
        return this.size * this.height;
    }
    generate(x, y, z, dim) {
        let structure = new ExStructure("", new Vector3(), 0);
        this.jigsawData.forEach((arr0, y) => {
            arr0.forEach((arr1, z) => {
                arr1.forEach((arr2, x) => {
                });
            });
        });
    }
}
ExStructureJigsaw.ContinueStructure = 1;
//# sourceMappingURL=ExStructureJigsaw.js.map