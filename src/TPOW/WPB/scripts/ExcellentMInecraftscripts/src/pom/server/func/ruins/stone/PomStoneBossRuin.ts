import { Dimension } from "@minecraft/server";
import { ExBlockArea } from "../../../../../modules/exmc/server/block/ExBlockArea.js";
import PomRuinCommon from "../PomRuinCommon.js";
import ExStructureJigsaw from "../../../../../modules/exmc/server/block/structure/ExStructureJigsaw.js";
import Vector3 from "../../../../../modules/exmc/math/Vector3.js";

export default class PomStoneBossRuin implements PomRuinCommon {
    seed: number;
    private readonly structure_area1 = "mystructure:boss_stone_area_b1";
    private readonly structure_area2 = "mystructure:boss_stone_area_b2";
    private readonly structure_area3 = "mystructure:boss_stone_area_b3";
    private readonly structure_area4 = "mystructure:boss_stone_area_b4";

    private _pathArea: ExBlockArea[] = [];
    private _monsterArea: ExBlockArea[] = [];
    private _playerArea: ExBlockArea[] = [];
    private _bossArea!: ExBlockArea;
    jigsaw!: ExStructureJigsaw;
    x!: number;
    y!: number;
    z!: number;
    dim!: Dimension;
    constructor(seed: number) {
        this.seed = seed;
    }
    init(x: number, y: number, z: number, dim: Dimension): void {
        this._monsterArea = [];
        this._pathArea = [];
        this._playerArea = [];
        this.x = x;
        this.y = y;
        this.z = z;
        this.dim = dim;
        this.jigsaw = new ExStructureJigsaw(32, 4);

        this.jigsaw.setStructurePlane(0, 0, 0, 0, 0, this.structure_area1, 0);
        this.jigsaw.setStructurePlane(1, 0, 0, 0, 0, this.structure_area2, 0);
        this.jigsaw.setStructurePlane(0, 1, 0, 0, 0, this.structure_area3, 0);
        this.jigsaw.setStructurePlane(1, 1, 0, 0, 0, this.structure_area4, 0);

        this.jigsaw.setStructurePlane(3, 0, 0, 0, 0, this.structure_area1, 90);
        this.jigsaw.setStructurePlane(3, 1, 0, 0, 0, this.structure_area2, 90);
        this.jigsaw.setStructurePlane(2, 0, 0, 0, 0, this.structure_area3, 90);
        this.jigsaw.setStructurePlane(2, 1, 0, 0, 0, this.structure_area4, 90);

        this.jigsaw.setStructurePlane(0, 3, 0, 0, 0, this.structure_area1, 270);
        this.jigsaw.setStructurePlane(0, 2, 0, 0, 0, this.structure_area2, 270);
        this.jigsaw.setStructurePlane(1, 3, 0, 0, 0, this.structure_area3, 270);
        this.jigsaw.setStructurePlane(1, 2, 0, 0, 0, this.structure_area4, 270);

        this.jigsaw.setStructurePlane(3, 3, 0, 0, 0, this.structure_area1, 180);
        this.jigsaw.setStructurePlane(2, 3, 0, 0, 0, this.structure_area2, 180);
        this.jigsaw.setStructurePlane(3, 2, 0, 0, 0, this.structure_area3, 180);
        this.jigsaw.setStructurePlane(2, 2, 0, 0, 0, this.structure_area4, 180);
        this._bossArea = (new ExBlockArea(new Vector3(62, 2, 62).add(x, y, z), new Vector3(4, 6, 4)));
        this._playerArea.push(
            new ExBlockArea(new Vector3(6, 5, 6).add(x, y, z), new Vector3(2, 4, 2)),
            new ExBlockArea(new Vector3(128 - 6 - 2, 5, 6).add(x, y, z), new Vector3(2, 4, 2)),
            new ExBlockArea(new Vector3(6, 5, 128 - 6 - 2).add(x, y, z), new Vector3(2, 4, 2)),
            new ExBlockArea(new Vector3(128 - 6 - 2, 5, 128 - 6 - 2).add(x, y, z), new Vector3(2, 4, 2))
        );
    }
    generate(): void {
        this.init(this.x, this.y, this.z, this.dim);
        this.jigsaw.generate(this.x, this.y, this.z, this.dim);
        this.dispose();
    }
    getPathArea(): ExBlockArea[] {
        return this._pathArea;
    }
    getMonsterSpawnArea(): ExBlockArea[] {
        return this._monsterArea;
    }
    getPlayerSpawnArea(): ExBlockArea[] {
        return this._playerArea;
    }
    getBossSpawnArea(): ExBlockArea | undefined {
        return this._bossArea;
    }
    dispose(): void {
        this.jigsaw = new ExStructureJigsaw(1, 1, 1);
    }

}