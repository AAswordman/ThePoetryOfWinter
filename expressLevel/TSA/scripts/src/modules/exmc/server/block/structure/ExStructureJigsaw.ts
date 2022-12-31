import Vector3 from '../../../math/Vector3.js';
import { Dimension } from '@minecraft/server';
import ExStructure from './ExStructure.js';
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

    setStructurePlane(x: number, z: number, offsetX: number, offsetY: number, offsetZ: number, structureName: string, structureRot = 0, mirror = false
        , coverGridLength = 1, coverGridWidth = 1) {
        this.setStructure(x, z, 0, offsetX, offsetY, offsetZ, structureName,
            structureRot, mirror, coverGridLength, coverGridWidth, 1);
    }
    setStructure(x: number, z: number, y: number, offsetX: number, offsetY: number, offsetZ: number, structureName: string, structureRot = 0, mirror = false,
        coverGridLength = 1, coverGridWidth = 1, coverGridHeight = 1) {
        this.clearStructure(x, z, y);
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
            mirror, coverGridLength, coverGridWidth, coverGridHeight];

    }
    fillStructure(offsetX: number, offsetY: number, offsetZ: number, structureName: string, structureRot = 0, mirror = false,
        coverGridLength = 1, coverGridWidth = 1, coverGridHeight = 1) {
        const i: ExStructureData = [offsetX, offsetY, offsetZ, structureName, structureRot,
            mirror, coverGridLength, coverGridWidth, coverGridHeight];
        for (let ix = 0; ix < this.width; ix++) {
            for (let iz = 0; iz < this.width; iz++) {
                for (let iy = 0; iy < this.height; iy++) {
                    this.jigsawData[iy][iz][ix] = i;
                }
            }
        }

    }
    getStructure(x: number, z: number, y: number) {
        const base = this.findBaseStructure(x, z, y);
        if (base === undefined) {
            return undefined;
        }
        const s = this.jigsawData[base[0]][base[1]][base[2]];
        if (s instanceof Array) {
            return new ExStructureExportData(...s);
        } else {
            return undefined;
        }
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
        // let structure = {
        //     rotation: 0,
        //     structureId: '',
        //     mirror: false,
        //     position: new Vector3(),
        //     generate: function (): void {
        //         console.log("pos %s generate %s",this.position.toString(),this.structureId);
        //     }
        // };
        this.jigsawData.forEach((arr0, y) => {
            arr0.forEach((arr1, z) => {
                arr1.forEach((v, x) => {
                    if (typeof v !== "number" && v !== undefined) {
                        structure.position.set(wordlX + x * this.size + v[0], wordlY + y * this.size + v[1], wordlZ + z * this.size + v[2]);
                        structure.structureId = v[3];
                        structure.rotation = v[4];
                        structure.mirror = v[5];
                        structure.generate(dim);
                    }
                });
            });
        });
    }

    [Symbol.toStringTag]() {
        return "symbol";
    }
    foreach(fun: (data: ExStructureExportData, x: number, z: number, y: number) => void) {
        const data = new ExStructureExportData(0, 0, 0, "", 0, false, 1, 1, 1);
        for (let y = 0; y < this.height; y++) {
            for (let z = 0; z < this.width; z++) {
                for (let x = 0; x < this.width; x++) {
                    let d = this.jigsawData[y][z][x];
                    if (d instanceof Array) {
                        data.set(...d);
                        fun(data, x, z, y);
                    }
                }
            }
        }
    }
}

/**
 * offsetX, offsetY, offsetZ,  structureName, structureRot,mirror,coverGridLength, coverGridWidth, coverGridHeight
 */
export type ExStructureData = [number, number, number, string, number, boolean, number, number, number];
/**
 * offsetX, offsetY, offsetZ,  structureName, structureRot,mirror,coverGridLength, coverGridWidth, coverGridHeight
 */
export class ExStructureExportData {
    offsetX!: number;
    offsetY!: number;
    offsetZ!: number;
    structureName!: string;
    structureRot!: number;
    mirror!: boolean;
    coverGridLength!: number;
    coverGridWidth!: number;
    coverGridHeight!: number;
    constructor(offsetX: number, offsetY: number, offsetZ: number, structureName: string, structureRot: number, mirror: boolean, coverGridLength: number, coverGridWidth: number, coverGridHeight: number) {
        this.set(offsetX, offsetY, offsetZ, structureName, structureRot, mirror, coverGridHeight, coverGridWidth, coverGridLength);
    }

    set(offsetX: number, offsetY: number, offsetZ: number, structureName: string, structureRot: number, mirror: boolean, coverGridHeight: number, coverGridWidth: number, coverGridLength: number) {
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.offsetZ = offsetZ;
        this.structureName = structureName;
        this.structureRot = structureRot;
        this.mirror = mirror;
        this.coverGridHeight = coverGridHeight;
        this.coverGridWidth = coverGridWidth;
        this.coverGridLength = coverGridLength;
    }
}