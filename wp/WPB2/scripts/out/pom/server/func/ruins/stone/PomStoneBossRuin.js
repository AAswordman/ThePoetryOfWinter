import { ExBlockArea } from "../../../../../modules/exmc/server/block/ExBlockArea.js";
import ExStructureJigsaw from "../../../../../modules/exmc/server/block/structure/ExStructureJigsaw.js";
import Vector3 from "../../../../../modules/exmc/math/Vector3.js";
export default class PomStoneBossRuin {
    constructor(seed) {
        this.structure_area1 = "mystructure:boss_stone_area_b1";
        this.structure_area2 = "mystructure:boss_stone_area_b2";
        this.structure_area3 = "mystructure:boss_stone_area_b3";
        this.structure_area4 = "mystructure:boss_stone_area_b4";
        this._pathArea = [];
        this._monsterArea = [];
        this._playerArea = [];
        this.seed = seed;
    }
    init(x, y, z, dim) {
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
        this._playerArea.push(new ExBlockArea(new Vector3(6, 5, 6).add(x, y, z), new Vector3(10, 6, 10)), new ExBlockArea(new Vector3(128 - 6 - 10, 5, 6).add(x, y, z), new Vector3(10, 6, 10)), new ExBlockArea(new Vector3(6, 5, 128 - 6 - 10).add(x, y, z), new Vector3(10, 6, 10)), new ExBlockArea(new Vector3(128 - 6 - 10, 5, 128 - 6 - 10).add(x, y, z), new Vector3(10, 6, 10)));
    }
    generate() {
        this.init(this.x, this.y, this.z, this.dim);
        this.jigsaw.generate(this.x, this.y, this.z, this.dim);
        this.dispose();
    }
    getPathArea() {
        return this._pathArea;
    }
    getMonsterSpawnArea() {
        return this._monsterArea;
    }
    getPlayerSpawnArea() {
        return this._playerArea;
    }
    getBossSpawnArea() {
        return this._bossArea;
    }
    dispose() {
        this.jigsaw = new ExStructureJigsaw(1, 1, 1);
    }
}
//# sourceMappingURL=PomStoneBossRuin.js.map