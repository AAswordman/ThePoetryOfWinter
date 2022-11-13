import Vector2 from '../../../../modules/exmc/math/Vector2.js';
import Vector3 from '../../../../modules/exmc/math/Vector3.js';
import { ExBlockArea } from '../../../../modules/exmc/server/block/ExBlockArea.js';
import ExStructureJigsaw from '../../../../modules/exmc/server/block/structure/ExStructureJigsaw.js';
import Random from '../../../../modules/exmc/utils/Random.js';
export default class PomDesertBossRuin {
    constructor(seed) {
        this.structure_bossArea = "mystructure:boss_desert_1";
        this.structure_straightLine = "mystructure:boss_desert_2"; // |
        this.structure_curve = "mystructure:boss_desert_3"; // _|
        this.structure_triple = "mystructure:boss_desert_4"; //-|
        this.structure_crossing = "mystructure:boss_desert_5"; // +
        this.structure_straightLineTower = "mystructure:boss_desert_6"; //|
        this.structure_towerBlock1 = "mystructure:boss_desert_7"; // O
        this.structure_towerBlock2 = "mystructure:boss_desert_8"; // O
        this.structure_towerBlock3 = "mystructure:boss_desert_10"; // O
        this.structure_towerBlock4 = "mystructure:boss_desert_12"; // O
        this.structure_upplain = "mystructure:boss_desert_13";
        this.structure_upstairs = "mystructure:boss_desert_14";
        this.structure_towerPiece = "mystructure:boss_desert_15";
        this.structure_boss = "mystructure:boss_desert_16";
        this.structure_block1 = "mystructure:boss_desert_9"; // O
        this.structure_block2 = "mystructure:boss_desert_11"; //O
        this.completed = false;
        this.rooms = new Set();
        this._pathArea = [];
        this._airPathArea = [];
        this._monsterArea = [];
        this._airMonsterArea = [];
        this._playerArea = [];
        this._bossArea = [];
        this.seed = seed;
    }
    isCompleted() {
        return this.completed;
    }
    isInRoom(v) {
        return this.rooms.has(v);
    }
    getPathArea() {
        return this._pathArea;
    }
    getAirPathArea() {
        return this._airPathArea;
    }
    getMonsterSpawnArea() {
        return this._monsterArea;
    }
    getAirMonsterSpawnArea() {
        return this._airMonsterArea;
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
    generate() {
        this.init(this.x, this.y, this.z, this.dim);
        this.jigsaw.generate(this.x, this.y, this.z, this.dim);
        this.dispose();
    }
    init(x, y, z, dim) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.dim = dim;
        const maze = Array.from(new Array(32), () => new Array(32).fill(0));
        let block = 64;
        let seed = this.seed;
        const r = new Random(seed);
        const EMPTY = 0, BLOCK = 1, PATH = 2, UNDEF = 3, CENTER = 4, TOWER = 5;
        const getMsg = (x, y) => {
            try {
                return maze[y][x];
            }
            catch (e) {
                return UNDEF;
            }
        };
        for (let i = 14; i < 18; i++) {
            for (let j = 14; j < 18; j++) {
                maze[i][j] = CENTER;
            }
        }
        while (block > 0) {
            let a = r.nextInt(32), b = r.nextInt(32);
            if (maze[a][b] === CENTER) {
                continue;
            }
            maze[a][b] = BLOCK;
            block--;
        }
        let arrows = [[new Vector2(), Vector2.forward]];
        maze[1][0] = EMPTY;
        const tempV = new Vector2();
        while (arrows.length > 0) {
            let next = [];
            next = [];
            for (let e of arrows) {
                tempV.set(e[0]).add(e[1]);
                let n = getMsg(tempV.x, tempV.y);
                if (n === EMPTY) {
                    if (((e[1] === Vector2.right || e[1] === Vector2.left) &&
                        !(getMsg(tempV.x, tempV.y + 1) === PATH && getMsg(tempV.x - 1, tempV.y + 1) === PATH) &&
                        !(getMsg(tempV.x, tempV.y + 1) === PATH && getMsg(tempV.x + 1, tempV.y + 1) === PATH) &&
                        !(getMsg(tempV.x, tempV.y - 1) === PATH && getMsg(tempV.x - 1, tempV.y - 1) === PATH) &&
                        !(getMsg(tempV.x, tempV.y - 1) === PATH && getMsg(tempV.x + 1, tempV.y - 1) === PATH))
                        || ((e[1] === Vector2.forward || e[1] === Vector2.back) &&
                            !(getMsg(tempV.x + 1, tempV.y + 1) === PATH && getMsg(tempV.x + 1, tempV.y) === PATH) &&
                            !(getMsg(tempV.x + 1, tempV.y - 1) === PATH && getMsg(tempV.x + 1, tempV.y) === PATH) &&
                            !(getMsg(tempV.x - 1, tempV.y + 1) === PATH && getMsg(tempV.x - 1, tempV.y) === PATH) &&
                            !(getMsg(tempV.x - 1, tempV.y - 1) === PATH && getMsg(tempV.x - 1, tempV.y) === PATH))) {
                        maze[tempV.y][tempV.x] = PATH;
                        let pointNum = arrows.length < 30 ? 4 : Math.min(4, r.nextInt(6));
                        let d = [Vector2.forward, Vector2.back, Vector2.left, Vector2.right];
                        while (pointNum > 0) {
                            let i = r.nextInt(d.length);
                            next.push([tempV.clone(), d[i]]);
                            d.splice(i, 1);
                            pointNum--;
                        }
                    }
                }
            }
            arrows = next;
        }
        class Tower {
            constructor(x, y, height) {
                this.height = height;
                this.connections = [];
                this.x = x;
                this.y = y;
            }
            *[Symbol.iterator]() {
                for (let v of this.connections) {
                    yield v;
                }
            }
            connect(t) {
                this.connections.push(t);
                //console.log("Connect",this.toString(),t.toString());
            }
            [Symbol.toStringTag]() {
                return this.toString();
            }
            toString() {
                return `(${this.x},${this.y},${this.height})`;
            }
        }
        const vertex = Array.from(new Array(16), () => new Array(16).fill(EMPTY));
        const getVertex = (x, y) => {
            try {
                return vertex[y][x];
            }
            catch (e) {
                return UNDEF;
            }
        };
        for (let i = 6; i < 10; i++) {
            for (let j = 6; j < 10; j++) {
                vertex[i][j] = CENTER;
            }
        }
        const vertexs = [];
        block = 24;
        while (block > 0) {
            let y = r.nextInt(16), x = r.nextInt(16);
            const [mx, my] = [16 - vertex.length / 2 + x, 16 - vertex.length / 2 + y], m = getMsg(mx, my);
            if (getVertex(x, y) !== CENTER && m == BLOCK || m == EMPTY) {
                const t = new Tower(y, x, 3 + Math.floor(block / 4));
                vertexs.push(t);
                vertex[y][x] = t;
                maze[my][mx] = TOWER;
                block--;
            }
        }
        vertexs.forEach(t => {
            for (let i = -4; i <= 4; i++) {
                for (let j = -4; j <= 4; j++) {
                    if (!(i == 0 && j == 0)) {
                        let v = getVertex(t.x + i, t.y + j);
                        if (v instanceof Tower)
                            t.connect(v);
                    }
                }
            }
        });
        this.jigsaw = new ExStructureJigsaw(16, 32, 10);
        //this.jigsaw.fillStructure(0,0,0,"mystructure:air_clear");
        // jigsaw.setStructurePlane(15, 15, 0, 0, 0, structure_bossArea, 0);
        // jigsaw.setStructurePlane(16, 15, 0, 0, 0, structure_bossArea, 90);
        // jigsaw.setStructurePlane(16, 16, 0, 0, 0, structure_bossArea, 180);
        // jigsaw.setStructurePlane(15, 16, 0, 0, 0, structure_bossArea, 270);
        maze.forEach((v, y) => {
            v.forEach((i, x) => {
                if (i === BLOCK) {
                    this.jigsaw.setStructurePlane(x, y, 0, 0, 0, [this.structure_block1, this.structure_block2][r.nextInt(2)], r.nextInt(4) * 90);
                }
                else if (i === EMPTY) {
                    this.jigsaw.setStructurePlane(x, y, 0, 0, 0, [this.structure_towerBlock1, this.structure_towerBlock2, this.structure_towerBlock3, this.structure_towerBlock4][r.nextInt(4)], r.nextInt(4) * 90);
                }
                else if (i === TOWER) {
                    let vt = getVertex(x - 16 + vertex.length / 2, y - 16 + vertex.length / 2);
                    if (vt instanceof Tower) {
                        let h = vt.height;
                        while (h >= 0) {
                            this.jigsaw.setStructure(x, y, h, 0, 0, 0, this.structure_towerPiece, 0);
                            h--;
                        }
                    }
                }
                else if (i === PATH) {
                    let top = getMsg(x, y + 1) === PATH ? 1 : 0;
                    let bottom = getMsg(x, y - 1) === PATH ? 1 : 0;
                    let right = getMsg(x + 1, y) === PATH ? 1 : 0;
                    let left = getMsg(x - 1, y) === PATH ? 1 : 0;
                    let pathNum = top + left + right + bottom;
                    switch (pathNum) {
                        case 1:
                            if (top + bottom === 1) {
                                this.jigsaw.setStructurePlane(x, y, 0, 0, 0, this.structure_straightLine, 0);
                            }
                            else if (left + right === 1) {
                                this.jigsaw.setStructurePlane(x, y, 0, 0, 0, this.structure_straightLine, 90);
                            }
                            break;
                        case 2:
                            if (top + bottom === 2) {
                                this.jigsaw.setStructurePlane(x, y, 0, 0, 0, this.structure_straightLine, 0);
                            }
                            else if (left + right === 2) {
                                this.jigsaw.setStructurePlane(x, y, 0, 0, 0, this.structure_straightLine, 90);
                            }
                            else if (left === 1) {
                                if (top === 1) {
                                    this.jigsaw.setStructurePlane(x, y, 0, 0, 0, this.structure_curve, 90);
                                }
                                else if (bottom === 1) {
                                    this.jigsaw.setStructurePlane(x, y, 0, 0, 0, this.structure_curve, 180);
                                }
                                else {
                                    throw new Error("num error");
                                }
                            }
                            else if (right === 1) {
                                if (top === 1) {
                                    this.jigsaw.setStructurePlane(x, y, 0, 0, 0, this.structure_curve, 0);
                                }
                                else if (bottom === 1) {
                                    this.jigsaw.setStructurePlane(x, y, 0, 0, 0, this.structure_curve, 270);
                                }
                                else {
                                    throw new Error("num error");
                                }
                            }
                            break;
                        case 3:
                            if (left === 0) {
                                this.jigsaw.setStructurePlane(x, y, 0, 0, 0, this.structure_triple, 0);
                            }
                            else if (bottom === 0) {
                                this.jigsaw.setStructurePlane(x, y, 0, 0, 0, this.structure_triple, 90);
                            }
                            else if (right === 0) {
                                this.jigsaw.setStructurePlane(x, y, 0, 0, 0, this.structure_triple, 180);
                            }
                            else if (top === 0) {
                                this.jigsaw.setStructurePlane(x, y, 0, 0, 0, this.structure_triple, 270);
                            }
                            break;
                        case 4:
                            this.jigsaw.setStructurePlane(x, y, 0, 0, 0, this.structure_crossing, 0);
                            break;
                        default:
                            break;
                    }
                }
            });
        });
        const tempA = new Vector3();
        const tempC = new Vector3();
        vertexs.forEach((v) => {
            for (const next of v) {
                if (next.height > v.height) {
                    tempA.set(v.x, v.height, v.y);
                    tempC.set(next.x, v.height, next.y).sub(tempA);
                    tempC.set(tempC.x > 0 ? 1 : -1, v.height, tempC.z > 0 ? 1 : -1);
                    let tran = 16 - vertex.length / 2;
                    let path = r.nextBoolean();
                    if (path) {
                        for (; tempA.x != next.x; tempA.x += tempC.x) {
                            if (this.jigsaw.isEmpty(tempA.x + tran, tempA.z + tran, tempA.y)) {
                                this.jigsaw.setStructure(tempA.x + tran, tempA.z + tran, tempA.y, 0, 0, 0, this.structure_upplain);
                            }
                        }
                        for (; tempA.z != next.y; tempA.z += tempC.z) {
                            if (this.jigsaw.isEmpty(tempA.x + tran, tempA.z + tran, tempA.y)) {
                                this.jigsaw.setStructure(tempA.x + tran, tempA.z + tran, tempA.y, 0, 0, 0, this.structure_upplain);
                            }
                        }
                    }
                    else {
                        for (; tempA.z != next.y; tempA.z += tempC.z) {
                            if (this.jigsaw.isEmpty(tempA.x + tran, tempA.z + tran, tempA.y)) {
                                this.jigsaw.setStructure(tempA.x + tran, tempA.z + tran, tempA.y, 0, 0, 0, this.structure_upplain);
                            }
                        }
                        for (; tempA.x != next.x; tempA.x += tempC.x) {
                            if (this.jigsaw.isEmpty(tempA.x + tran, tempA.z + tran, tempA.y)) {
                                this.jigsaw.setStructure(tempA.x + tran, tempA.z + tran, tempA.y, 0, 0, 0, this.structure_upplain);
                            }
                        }
                    }
                }
            }
        });
        this.jigsaw.setStructurePlane(14, 14, 0, -1, 0, this.structure_boss, 0, false, 2, 2);
        this.jigsaw.setStructurePlane(14, 16, 0, -1, 0, this.structure_boss, 270, false, 2, 2);
        this.jigsaw.setStructurePlane(16, 14, 0, -1, 0, this.structure_boss, 90, false, 2, 2);
        this.jigsaw.setStructurePlane(16, 16, 0, -1, 0, this.structure_boss, 180, false, 2, 2);
        this._airMonsterArea = [];
        this._airPathArea = [];
        this._bossArea = [];
        this._monsterArea = [];
        this._pathArea = [];
        this._playerArea = [];
        this.rooms = new Set();
        this.jigsaw.foreach((data, ix, iz, iy) => {
            if (data.structureName === this.structure_straightLine || data.structureName === this.structure_triple
                || data.structureName === this.structure_curve || data.structureName === this.structure_crossing) {
                this._pathArea.push(new ExBlockArea(new Vector3(ix, iy, iz).scl(this.jigsaw.size).add(this.x, this.y, this.z), new Vector3(1, 1, 1).scl(this.jigsaw.size)));
                if (data.structureName === this.structure_crossing) {
                    this._playerArea.push(new ExBlockArea(new Vector3(ix, iy, iz).scl(this.jigsaw.size).add(this.x, this.y, this.z), new Vector3(1, 1, 1).scl(this.jigsaw.size)));
                }
            }
            else if (data.structureName === this.structure_towerBlock3 || data.structureName === this.structure_towerBlock4
                || data.structureName === this.structure_towerBlock2 || data.structureName === this.structure_towerBlock1) {
                this._monsterArea.push(new ExBlockArea(new Vector3(ix, iy, iz).scl(this.jigsaw.size).add(this.x, this.y, this.z), new Vector3(1, 1, 1).scl(this.jigsaw.size)));
                this.rooms.add(`${ix},${iy},${iz}`);
            }
            else if (data.structureName === this.structure_boss) {
                this._bossArea.push(new ExBlockArea(new Vector3(ix, iy, iz).scl(this.jigsaw.size).add(this.x, this.y, this.z), new Vector3(1, 1, 1).scl(this.jigsaw.size)));
            }
            else if (data.structureName === this.structure_upplain) {
                this._airPathArea.push(new ExBlockArea(new Vector3(ix, iy, iz).scl(this.jigsaw.size).add(this.x, this.y, this.z), new Vector3(1, 1, 1).scl(this.jigsaw.size)));
            }
            else if (data.structureName === this.structure_towerPiece) {
                let vec = new Vector3(ix, iy, iz).scl(this.jigsaw.size).add(this.x, this.y, this.z);
                this._airMonsterArea.push(new ExBlockArea(vec, new Vector3(1, 1, 1).scl(this.jigsaw.size)));
                this.rooms.add(`${ix},${iy},${iz}`);
            }
        });
        this.completed = true;
    }
}
//# sourceMappingURL=PomDesertBossRuin.js.map