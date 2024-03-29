import { Dimension } from "@minecraft/server";
import Vector3 from "../../../math/Vector3.js";
import ExDimension from "../../ExDimension.js";
import { ExBlockArea } from "../ExBlockArea.js";
import ExBlockStructure from "./ExBlockStructure.js";
import ExSystem from "../../../utils/ExSystem.js";
import ExGame from "../../ExGame.js";
import { MinecraftBlockTypes } from "../../../../vanilla-data/lib/index.js";

export default class ExBlockStructureNormal implements ExBlockStructure {

    public static readonly DIRECTION_SOUTH = 2 ** 0;
    public static readonly DIRECTION_NORTH = 2 ** 1;
    public static readonly DIRECTION_EAST = 2 ** 2;
    public static readonly DIRECTION_WEST = 2 ** 3;
    public static readonly DIRECTION_UP = 2 ** 4;
    public static readonly DIRECTION_BUTTOM = 2 ** 5;
    public static readonly DIRECTION_ALLOW_ROTATE = 2 ** 6;
    public static readonly DIRECTION_AROUND = ExBlockStructureNormal.DIRECTION_WEST | ExBlockStructureNormal.DIRECTION_EAST | ExBlockStructureNormal.DIRECTION_SOUTH | ExBlockStructureNormal.DIRECTION_NORTH;
    public static readonly DIRECTION_AROUND_MIRROR = ExBlockStructureNormal.DIRECTION_EAST | ExBlockStructureNormal.DIRECTION_NORTH;
    public static readonly DIRECTION_LAY = ExBlockStructureNormal.DIRECTION_UP | ExBlockStructureNormal.DIRECTION_BUTTOM;
    public static readonly DIRECTION_LAY_MIRROR = ExBlockStructureNormal.DIRECTION_UP;

    dimension?: ExDimension;
    structure?: string[][];
    analysisMap?: Map<string, string>;
    direction = ExBlockStructureNormal.DIRECTION_AROUND | ExBlockStructureNormal.DIRECTION_LAY;
    area?: ExBlockArea;

    constructor() {
    }
    clone(): ExBlockStructureNormal {
        let n = new ExBlockStructureNormal();
        n.dimension = this.dimension;
        n.structure = this.structure;
        n.analysisMap = this.analysisMap;
        n.direction = this.direction;
        n.area = this.area;

        return n;
    }
    setDimension(dim: Dimension): this {
        this.dimension = ExDimension.getInstance(dim);
        return this;
    }

    // find(): ExBlockArea | undefined {
    //     if (!this.dimension) throw new Error("dimension is undefined");
    //     if (!this.structure) throw new Error("structure is undefined");
    //     if (!this.analysisMap) throw new Error("analysisMap is undefined");
    //     if (!this.area) throw new Error("area is undefined");
    //     const childArea = new ExBlockArea(
    //         new Vector3(),
    //         new Vector3(
    //             this.structure[0][0].length,
    //             this.structure[0].length,
    //             this.structure.length
    //         )
    //     );
    //     let res: ExBlockArea | undefined;
    //     for (let i = 0; i < 6; i++) {
    //         const tmpArea = i > 0 ? childArea.clone() : childArea;
    //         for (let j = 0; j < 4; j++) {
    //             if ((this.direction & (1 << i)) && (this.direction & (1 << 6))) {
    //                 tmpArea.turnFrontClockwise();
    //             }
    //             res = this.searchOnce(tmpArea);
    //             if (res) return res;
    //         }
    //         if (i >= 4 && (this.direction & (1 << i)) && (this.direction & (1 << 6))) {
    //             const tmpArea = childArea.clone();
    //             tmpArea.turnUp();
    //             for (let j = 0; j < 4; j++) {
    //                 tmpArea.turnFrontClockwise();
    //                 res = this.searchOnce(tmpArea);
    //                 if (res) return res;
    //             }
    //         }
    //     }
    //     return undefined;
    // }


    find(): ExBlockArea | undefined {
        if (this.dimension === undefined) throw new Error("dimension is undefined");
        if (this.structure === undefined) throw new Error("structure is undefined");
        if (this.analysisMap === undefined) throw new Error("analysisMap is undefined");
        if (this.area === undefined) throw new Error("area is undefined");

        const childArea = new ExBlockArea(new Vector3(),
            new Vector3(this.structure[0][0].length, this.structure[0].length, this.structure.length));
        let tmpArea = childArea.clone();
        let res: undefined | ExBlockArea = undefined;
        if ((this.direction >> 0) & 1) {
            if ((this.direction >> 6) & 1) {
                tmpArea.turnFrontClockwise();
                if (res = this.searchOnce(tmpArea)) return res;
                tmpArea.turnFrontClockwise();
                if (res = this.searchOnce(tmpArea)) return res;
                tmpArea.turnFrontClockwise();
                if (res = this.searchOnce(tmpArea)) return res;
                tmpArea.turnFrontClockwise();
                if (res = this.searchOnce(tmpArea)) return res;
            } else {
                if (res = this.searchOnce(tmpArea)) return res;
            }
        }
        tmpArea = childArea.clone();
        tmpArea.turnRight();
        tmpArea.turnRight();
        if ((this.direction >> 1) & 1) {
            if ((this.direction >> 6) & 1) {
                tmpArea.turnFrontClockwise();
                if (res = this.searchOnce(tmpArea)) return res;
                tmpArea.turnFrontClockwise();
                if (res = this.searchOnce(tmpArea)) return res;
                tmpArea.turnFrontClockwise();
                if (res = this.searchOnce(tmpArea)) return res;
                tmpArea.turnFrontClockwise();
                if (res = this.searchOnce(tmpArea)) return res;
            } else {
                if (res = this.searchOnce(tmpArea)) return res;
            }
        }
        tmpArea = childArea.clone();
        tmpArea.turnRight();
        if ((this.direction >> 2) & 1) {
            if ((this.direction >> 6) & 1) {
                tmpArea.turnFrontClockwise();
                if (res = this.searchOnce(tmpArea)) return res;
                tmpArea.turnFrontClockwise();
                if (res = this.searchOnce(tmpArea)) return res;
                tmpArea.turnFrontClockwise();
                if (res = this.searchOnce(tmpArea)) return res;
                tmpArea.turnFrontClockwise();
                if (res = this.searchOnce(tmpArea)) return res;
            } else {
                if (res = this.searchOnce(tmpArea)) return res;
            }
        }
        tmpArea = childArea.clone();
        tmpArea.turnRight();
        tmpArea.turnRight();
        tmpArea.turnRight();
        if ((this.direction >> 3) & 1) {
            if ((this.direction >> 6) & 1) {
                tmpArea.turnFrontClockwise();
                if (res = this.searchOnce(tmpArea)) return res;
                tmpArea.turnFrontClockwise();
                if (res = this.searchOnce(tmpArea)) return res;
                tmpArea.turnFrontClockwise();
                if (res = this.searchOnce(tmpArea)) return res;
                tmpArea.turnFrontClockwise();
                if (res = this.searchOnce(tmpArea)) return res;
            } else {
                if (res = this.searchOnce(tmpArea)) return res;
            }
        }
        tmpArea = childArea.clone();
        tmpArea.turnUp();
        if ((this.direction >> 4) & 1) {
            tmpArea.turnFrontClockwise();
            if (res = this.searchOnce(tmpArea)) return res;
            tmpArea.turnFrontClockwise();
            if (res = this.searchOnce(tmpArea)) return res;
            tmpArea.turnFrontClockwise();
            if (res = this.searchOnce(tmpArea)) return res;
            tmpArea.turnFrontClockwise();
            if (res = this.searchOnce(tmpArea)) return res;
        }
        tmpArea = childArea.clone();
        tmpArea.turnUp();
        tmpArea.turnUp();
        tmpArea.turnUp();
        if ((this.direction >> 5) & 1) {
            tmpArea.turnFrontClockwise();
            if (res = this.searchOnce(tmpArea)) return res;
            tmpArea.turnFrontClockwise();
            if (res = this.searchOnce(tmpArea)) return res;
            tmpArea.turnFrontClockwise();
            if (res = this.searchOnce(tmpArea)) return res;
            tmpArea.turnFrontClockwise();
            if (res = this.searchOnce(tmpArea)) return res;
        }
        return res;
    }
    searchOnce(childArea: ExBlockArea) {
        const structure = this.structure ?? [[""]];
        const tmpV = new Vector3();
        const vec = new Vector3();
        const dimension = this.dimension;

        let flag: undefined | ExBlockArea;
        this.area?.forEachArea(childArea, (res) => {
            for (vec.z = 0; vec.z < structure.length; vec.z++) {
                for (vec.y = 0; vec.y < structure[vec.z].length; vec.y++) {
                    const str = structure[vec.z][vec.y];
                    for (vec.x = 0; vec.x < str.length; vec.x++) {
                        const c = str.charAt(vec.x);

                        if (c == ' ') continue;
                        res.calculateRelPos(vec, tmpV).add(res.start);
                        // console.warn("get block at " +tmpV+" :P "+dimension?.getBlock(tmpV)?.typeId);
                        if (dimension?.getBlock(tmpV)?.typeId !== (this.analysisMap?.get(c) ?? MinecraftBlockTypes.Air)) {
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
    setStructure(res: string[][]): this {
        this.structure = res;
        this.structure.forEach(element => {
            element.reverse();
        });
        return this;
    }
    analysis(map: object | Map<string, string>) {
        if (map instanceof Map) {
            this.analysisMap = map;
        } else {
            const nmap = new Map<string, string>();
            for (const key in map) {
                nmap.set(key, (<any>map)[key]);
            }
            this.analysisMap = nmap;
        }
        this.canPut = true;

        return this;
    }
    private canPut = false;
    putStructure(area: ExBlockArea) {
        if (this.dimension === undefined) throw new Error("dimension is undefined");
        if (this.analysisMap === undefined) throw new Error("analysisMap is undefined");
        if (this.structure === undefined) throw new Error("structure is undefined");
        const tmpV = new Vector3();
        const vec = new Vector3();
        if (this.canPut) {
            this.canPut = false;
            ExGame.run(() => {
                for (vec.z = 0; vec.z < this.structure!.length; vec.z++) {
                    for (vec.y = 0; vec.y < this.structure![vec.z].length; vec.y++) {
                        const str = this.structure![vec.z][vec.y];
                        for (vec.x = 0; vec.x < str.length; vec.x++) {
                            const c = str.charAt(vec.x);
                            if (c == ' ') continue;
                            area.calculateRelPos(vec, tmpV).add(area.start);
                            let id = this.analysisMap!.get(c);
                            this.dimension!.setBlock(tmpV, id ?? MinecraftBlockTypes.Air);
                        }
                    }
                }
            });
        } else {
            throw new Error("Please reanalyze the structure before putting");
        }
        return this;
    }
    setArea(area: ExBlockArea) {
        this.area = area;
        return this;
    }
    setDirection(dic: number) {
        this.direction = dic;
        return this;
    }
}