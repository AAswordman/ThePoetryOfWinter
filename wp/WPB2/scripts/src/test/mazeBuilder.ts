import Random from "../modules/exmc/utils/Random.js";
import Vector2 from "../modules/exmc/math/Vector2.js";
import ExStructureJigsaw from "../modules/exmc/server/block/structure/ExStructureJigsaw.js";
import Vector3 from "../modules/exmc/math/Vector3.js";
const maze = Array.from(new Array<number>(32), () => new Array<number>(32).fill(0));

let block = 64;
let seed = 1346;
const r = new Random(seed);
const EMPTY = 0, BLOCK = 1, PATH = 2, UNDEF = 3, CENTER = 4, TOWER = 5;
const getMsg = (x: number, y: number) => {
    try {
        return maze[y][x]
    } catch (e) { return UNDEF; }
}
for (let i = 14; i < 18; i++) {
    for (let j = 14; j < 18; j++) {
        maze[i][j] = CENTER;
        
    }
}
while (block > 0) {
    maze[r.nextInt(32)][r.nextInt(32)] = BLOCK;
    block--;
}

let arrows: [Vector2, Vector2][] = [[new Vector2(), Vector2.forward]];
maze[1][0] = EMPTY;
const tempV = new Vector2();

while (arrows.length > 0) {
    let next: [Vector2, Vector2][] = [];
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
                    !(getMsg(tempV.x - 1, tempV.y - 1) === PATH && getMsg(tempV.x - 1, tempV.y) === PATH))
            ) {
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
    height: number;
    connections: Tower[];
    x: number;
    y: number;
    constructor(x: number, y: number, height: number) {
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
    connect(t: Tower) {
        this.connections.push(t);
        //console.log("Connect",this.toString(),t.toString());
    }
    [Symbol.toStringTag](): string {
        return this.toString();
    }
    toString() {
        return `(${this.x},${this.y},${this.height})`;
    }
}

const vertex = Array.from(new Array(16), () => new Array<Tower | number>(16).fill(EMPTY));

const getVertex = (x: number, y: number) => {
    try {
        return vertex[y][x];
    } catch (e) { return UNDEF; }
}

for (let i = 6; i < 10; i++) {
    for (let j = 6; j < 10; j++) {
        vertex[i][j] = CENTER;
    }
}

const vertexs: Tower[] = [];
block = 24;
while (block > 0) {
    let y = r.nextInt(16), x = r.nextInt(16);
    const [mx, my] = [16 - vertex.length / 2 + x, 16 - vertex.length / 2 + y],
        m = getMsg(mx, my);
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
                if (v instanceof Tower) t.connect(v);
            }
        }
    }
});



let jigsaw = new ExStructureJigsaw(16, 32, 10);
const structure_bossArea = "mystructure:boss_desert_1",
    structure_straightLine = "mystructure:boss_desert_2",// |
    structure_curve = "mystructure:boss_desert_3",// _|
    structure_triple = "mystructure:boss_desert_4",//-|
    structure_crossing = "mystructure:boss_desert_5",// +
    structure_straightLineTower = "mystructure:boss_desert_6",//|
    structure_towerBlock1 = "mystructure:boss_desert_7",// O
    structure_towerBlock2 = "mystructure:boss_desert_8",// O
    structure_towerBlock3 = "mystructure:boss_desert_10",// O
    structure_towerBlock4 = "mystructure:boss_desert_12",// O
    structure_upplain = "mystructure:boss_desert_13",
    structure_upstairs = "mystructure:boss_desert_14",
    structure_towerPiece = "mystructure:boss_desert_15",
    structure_boss = "mystructure:boss_desert_16",
    structure_block1 = "mystructure:boss_desert_9",// O
    structure_block2 = "mystructure:boss_desert_11"; //O

// jigsaw.setStructurePlane(15, 15, 0, 0, 0, structure_bossArea, 0);
// jigsaw.setStructurePlane(16, 15, 0, 0, 0, structure_bossArea, 90);
// jigsaw.setStructurePlane(16, 16, 0, 0, 0, structure_bossArea, 180);
// jigsaw.setStructurePlane(15, 16, 0, 0, 0, structure_bossArea, 270);

maze.forEach((v, y) => {
    v.forEach((i, x) => {
        if (i === BLOCK) {
            jigsaw.setStructurePlane(x, y, 0, 0, 0, [structure_block1, structure_block2][r.nextInt(2)], r.nextInt(4) * 90);
        } else if (i === EMPTY) {
            jigsaw.setStructurePlane(x, y, 0, 0, 0, [structure_towerBlock1, structure_towerBlock2, structure_towerBlock3, structure_towerBlock4][r.nextInt(4)], r.nextInt(4) * 90);
        } else if (i === TOWER) {
            let vt = getVertex(x - 16 + vertex.length / 2, y - 16 + vertex.length / 2);
            if (vt instanceof Tower) {
                let h = vt.height;
                while (h >= 0) {
                    jigsaw.setStructure(x, y, h, 0, 0, 0, structure_towerPiece, 0);
                    h--;
                }

            }

        } else if (i === PATH) {
            let top = getMsg(x, y + 1) === PATH ? 1 : 0;
            let bottom = getMsg(x, y - 1) === PATH ? 1 : 0;
            let right = getMsg(x + 1, y) === PATH ? 1 : 0;
            let left = getMsg(x - 1, y) === PATH ? 1 : 0;

            let pathNum = top + left + right + bottom;
            switch (pathNum) {
                case 1:
                    if (top + bottom === 1) {
                        jigsaw.setStructurePlane(x, y, 0, 0, 0, structure_straightLine, 0);
                    } else if (left + right === 1) {
                        jigsaw.setStructurePlane(x, y, 0, 0, 0, structure_straightLine, 90);
                    }
                    break;
                case 2:
                    if (top + bottom === 2) {
                        jigsaw.setStructurePlane(x, y, 0, 0, 0, structure_straightLine, 0);
                    } else if (left + right === 2) {
                        jigsaw.setStructurePlane(x, y, 0, 0, 0, structure_straightLine, 90);
                    } else if (left === 1) {
                        if (top === 1) {
                            jigsaw.setStructurePlane(x, y, 0, 0, 0, structure_curve, 90);
                        } else if (bottom === 1) {
                            jigsaw.setStructurePlane(x, y, 0, 0, 0, structure_curve, 180);
                        } else {
                            throw new Error("num error");
                        }
                    } else if (right === 1) {
                        if (top === 1) {
                            jigsaw.setStructurePlane(x, y, 0, 0, 0, structure_curve, 0);
                        } else if (bottom === 1) {
                            jigsaw.setStructurePlane(x, y, 0, 0, 0, structure_curve, 270);
                        } else {
                            throw new Error("num error");
                        }
                    }
                    break;
                case 3:
                    if (left === 0) {
                        jigsaw.setStructurePlane(x, y, 0, 0, 0, structure_triple, 0);
                    } else if (bottom === 0) {
                        jigsaw.setStructurePlane(x, y, 0, 0, 0, structure_triple, 90);
                    } else if (right === 0) {
                        jigsaw.setStructurePlane(x, y, 0, 0, 0, structure_triple, 180);
                    } else if (top === 0) {
                        jigsaw.setStructurePlane(x, y, 0, 0, 0, structure_triple, 270);
                    }
                    break;
                case 4:
                    jigsaw.setStructurePlane(x, y, 0, 0, 0, structure_crossing, 0);
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
            tempC.set(tempC.x > 0 ? 1 : -1, v.height, tempC.z > 0 ? 1 : -1)
            let tran = 16 - vertex.length / 2;
            let path = r.nextBoolean();
            if (path) {
                for (; tempA.x != next.x; tempA.x += tempC.x) {
                    if (jigsaw.isEmpty(tempA.x + tran, tempA.z + tran, tempA.y)) {
                        jigsaw.setStructure(tempA.x + tran, tempA.z + tran, tempA.y, 0, 1, 0, structure_upplain);
                    }
                }
                for (; tempA.z != next.y; tempA.z += tempC.z) {
                    if (jigsaw.isEmpty(tempA.x + tran, tempA.z + tran, tempA.y)) {
                        jigsaw.setStructure(tempA.x + tran, tempA.z + tran, tempA.y, 0, 1, 0, structure_upplain);
                    }
                }
            } else {
                for (; tempA.z != next.y; tempA.z += tempC.z) {
                    if (jigsaw.isEmpty(tempA.x + tran, tempA.z + tran, tempA.y)) {
                        jigsaw.setStructure(tempA.x + tran, tempA.z + tran, tempA.y, 0, 1, 0, structure_upplain);
                    }
                }
                for (; tempA.x != next.x; tempA.x += tempC.x) {
                    if (jigsaw.isEmpty(tempA.x + tran, tempA.z + tran, tempA.y)) {
                        jigsaw.setStructure(tempA.x + tran, tempA.z + tran, tempA.y, 0, 1, 0, structure_upplain);
                    }
                }

            }

        }
    }
});

jigsaw.setStructurePlane(14,14,0,0,0,structure_boss);
jigsaw.setStructurePlane(14,16,0,0,0,structure_boss,270);
jigsaw.setStructurePlane(16,14,0,0,0,structure_boss,90);
jigsaw.setStructurePlane(16,16,0,0,0,structure_boss,180);
jigsaw.jigsawData.forEach((v) => {
    v.forEach((v2 => {
        console.log(JSON.stringify(v2.map(v => v == undefined ? 0 : 1)));
    }));

})