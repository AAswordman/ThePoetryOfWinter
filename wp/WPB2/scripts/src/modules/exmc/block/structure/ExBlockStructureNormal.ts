import { Dimension, MinecraftBlockTypes } from "mojang-minecraft";
import ExDimension from "../../ExDimension.js";
import ExGameConfig from "../../ExGameConfig.js";
import Vector3 from "../../utils/Vector3.js";
import { ExBlockArea } from "../ExBlockArea.js";
import ExBlockStructure from "./ExBlockStructure.js";

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
    setDimension(dim: Dimension): ExBlockStructureNormal {
        this.dimension = ExDimension.getInstance(dim);
        return this;
    }

    find(): ExBlockArea | undefined {
        if (this.dimension === undefined) throw new Error("dimension is undefined");
        if (this.structure === undefined) throw new Error("structure is undefined");
        if (this.analysisMap === undefined) throw new Error("analysisMap is undefined");
        if (this.area === undefined) throw new Error("area is undefined");

        const childArea = new ExBlockArea(new Vector3(),
            new Vector3(this.structure.length, this.structure[0].length, this.structure[0][0].length));
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

                        if (dimension?.getBlock(tmpV)?.id !== (this.analysisMap?.get(c) ?? MinecraftBlockTypes.air.id)) {
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
    setStructure(res: string[][]): ExBlockStructureNormal {
        this.structure = res;
        return this;
    }
    analysis(map: object | Map<string, string>): ExBlockStructureNormal {
        if (map instanceof Map<string, string>) {
            this.analysisMap = map;
        } else {
            const nmap = new Map<string, string>();
            for (const key in map) {
                nmap.set(key, (<any>map)[key]);
            }
            this.analysisMap = nmap;
        }

        return this;
    }
    putStructure(area: ExBlockArea): ExBlockStructureNormal {
        if (this.dimension === undefined) throw new Error("dimension is undefined");
        if (this.analysisMap === undefined) throw new Error("analysisMap is undefined");
        if (this.structure === undefined) throw new Error("structure is undefined");
        const tmpV = new Vector3();
        const vec = new Vector3();
        for (vec.z = 0; vec.z < this.structure.length; vec.z++) {
            for (vec.y = 0; vec.y < this.structure[vec.z].length; vec.y++) {
                const str = this.structure[vec.z][vec.y];
                for (vec.x = 0; vec.x < str.length; vec.x++) {
                    const c = str.charAt(vec.x);
                    if (c == ' ') continue;
                    area.calculateRelPos(vec, tmpV).add(area.start);
                    this.dimension.setBlock(tmpV, this.analysisMap.get(c) ?? MinecraftBlockTypes.air.id);
                }
            }
        }
        return this;
    }
    setArea(area: ExBlockArea): ExBlockStructureNormal {
        this.area = area;
        return this;
    }
    setDirection(dic: number): ExBlockStructureNormal {
        this.direction = dic;
        return this;
    }
}