import { Dimension } from 'mojang-minecraft';
import ExStructure from './ExStructure';
import Vector3 from '../../utils/Vector3';
export default class ExStructureJigsaw {
    width: number;
    height: number;
    jigsawData: (number | ExStructureData | undefined)[][][];
    size: number;
    private static readonly ContinueStructure = 1;

    constructor(girdSize: number, gridWidthNum: number, gridHeightNum: number = 1) {
        this.width = gridWidthNum;
        this.height = gridHeightNum;
        this.size = girdSize;

        this.jigsawData = Array.from(new Array(this.height), () => Array.from(new Array(this.width), () => new Array<number | undefined | ExStructureData>(this.width)));
    }

    isEmpty(x: number, z: number): boolean;
    isEmpty(x: number, z: number, y: number): boolean;
    isEmpty(a: number, b: number, c: number = 0): boolean {
        return this.jigsawData[c][b][a] === undefined;
    }

    setStructurePlane(x: number, z: number, offsetX: number, offsetY: number, offsetZ: number, structureName: string, structureRot = 0, mirrow = false
        , coverGridLength = 1, coverGridWidth = 1) {
        this.setStructure(x, z, 0, offsetX, offsetY, offsetZ, structureName,
            structureRot, mirrow, coverGridLength, coverGridWidth, 1);
    }
    setStructure(x: number, z: number, y: number, offsetX: number, offsetY: number, offsetZ: number, structureName: string, structureRot = 0, mirrow = false,
        coverGridLength = 1, coverGridWidth = 1, coverGridHeight = 1) {
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
            mirrow, coverGridLength, coverGridWidth, coverGridHeight];

    }

    clearStructure(x: number, z: number): void;
    clearStructure(x: number, z: number, y: number): void;
    clearStructure(a: number, b: number, c: number = 0) {
        const pos = this.findBaseStructure(a, b, c);
        if (pos !== undefined) {
            const [x, z, y] = pos;
            const stc = this.jigsawData[y][z][x];
            if (stc !== undefined) {
                if (typeof (stc) === "number") {
                    throw new Error("Error clearing");
                } else {
                    for (let ix = 0; ix < stc[6]; ix++) {
                        for (let iz = 0; iz < stc[7]; iz++) {
                            for (let iy = 0; iy < stc[8]; iy++) {
                                this.jigsawData[iy + c][iz + b][ix + a] = undefined;
                            }
                        }
                    }
                }
            }
        }
    }

    findBaseStructure(x: number, z: number): [number, number, number] | undefined;
    findBaseStructure(x: number, z: number, y: number): [number, number, number] | undefined;
    findBaseStructure(a: number, b: number, c: number = 0) {
        let point = this.jigsawData[c][b][a];
        if (point !== undefined) {
            if (point === ExStructureJigsaw.ContinueStructure) {
                while (point === ExStructureJigsaw.ContinueStructure && c > 0) {
                    point = this.jigsawData[c--][b][a]
                }
                while (point === ExStructureJigsaw.ContinueStructure && b > 0) {
                    point = this.jigsawData[c][b--][a]
                }
                while (point === ExStructureJigsaw.ContinueStructure && a > 0) {
                    point = this.jigsawData[c][b][a--]
                }
                return [a, b, c];

            } else {
                return [a, b, c];
            }
        } else {
            return undefined;
        }
    }

    getWidth() {
        return this.size * this.width;
    }
    getHeight() {
        return this.size * this.height;
    }

    generate(wordlX: number, wordlY: number, wordlZ: number, dim: Dimension) {
        let structure = new ExStructure("", new Vector3(), 0);
        this.jigsawData.forEach((arr0, y) => {
            arr0.forEach((arr1, z) => {
                arr1.forEach((v, x) => {
                    if (typeof v !== "number" && v !== undefined) {
                        structure.position.set(wordlX + x * this.width, wordlY + y * this.height, wordlZ + z * this.width);
                        structure.structureId = v[3];
                    }
                });
            });
        })
    }
}

/**
 * offsetX, offsetY, offsetZ,  structureName, structureRot,mirrow,coverGridLength, coverGridWidth, coverGridHeight
 */
export type ExStructureData = [number, number, number, string, number, boolean, number, number, number];