import { MinecraftItemTypes, MinecraftBlockTypes } from "mojang-minecraft";
import Vector2 from "../modules/exmc/math/Vector2.js";
import ExStructureJigsaw from "../modules/exmc/server/block/structure/ExStructureJigsaw.js";
import ExGameClient from "../modules/exmc/server/ExGameClient.js";
import Random from "../modules/exmc/utils/Random.js";
export default class CustomClient extends ExGameClient {
    constructor(server, id, player) {
        super(server, id, player);
        this.getEvents().exEvents.onceItemUseOn.subscribe(e => {
            if (e.item.id === MinecraftItemTypes.stick.id && this.getExDimension().getBlock(e.blockLocation).id === MinecraftBlockTypes.obsidian.id) {
                const maze = Array.from(new Array(32), () => new Array(32).fill(0));
                let block = 64;
                let seed = 1346;
                let r = new Random(seed);
                const EMPTY = 0, BLOCK = 1, PATH = 2, UNDEF = 3, CENTER = 4;
                let getMsg = (x, y) => {
                    try {
                        return maze[y][x];
                    }
                    catch (e) {
                        return UNDEF;
                    }
                };
                maze[15][15] = CENTER;
                maze[15][16] = CENTER;
                maze[16][15] = CENTER;
                maze[16][16] = CENTER;
                while (block > 0) {
                    maze[r.nextInt(32)][r.nextInt(32)] = BLOCK;
                    block--;
                }
                let arrows = [[new Vector2(), Vector2.forward]];
                maze[1][0] = EMPTY;
                let tempV = new Vector2();
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
                let jigsaw = new ExStructureJigsaw(16, 32);
                const structure_bossArea = "mystructure:boss_desert_1", structure_straightLine = "mystructure:boss_desert_2", // |
                structure_curve = "mystructure:boss_desert_3", // _|
                structure_triple = "mystructure:boss_desert_4", //-|
                structure_crossing = "mystructure:boss_desert_5", // +
                structure_straightLineTower = "mystructure:boss_desert_6", //|
                structure_towerBlock = "mystructure:boss_desert_7", // O
                structure_towerBlock2 = "mystructure:boss_desert_8", // O
                structure_block = "mystructure:boss_desert_1"; //O
                // jigsaw.setStructurePlane(15, 15, 0, 0, 0, structure_bossArea, 0);
                // jigsaw.setStructurePlane(16, 15, 0, 0, 0, structure_bossArea, 90);
                // jigsaw.setStructurePlane(16, 16, 0, 0, 0, structure_bossArea, 180);
                // jigsaw.setStructurePlane(15, 16, 0, 0, 0, structure_bossArea, 270);
                maze.forEach((v, y) => {
                    v.forEach((i, x) => {
                        if (i === BLOCK) {
                            jigsaw.setStructurePlane(x, y, 0, 0, 0, structure_block, r.nextInt(4) * 90);
                        }
                        else if (i === EMPTY) {
                            jigsaw.setStructurePlane(x, y, 0, 0, 0, [structure_towerBlock, structure_towerBlock2][r.nextInt(2)], r.nextInt(4) * 90);
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
                                        jigsaw.setStructurePlane(x, y, 0, 0, 0, structure_straightLine, 0);
                                    }
                                    else if (left + right === 1) {
                                        jigsaw.setStructurePlane(x, y, 0, 0, 0, structure_straightLine, 90);
                                    }
                                    break;
                                case 2:
                                    if (top + bottom === 2) {
                                        jigsaw.setStructurePlane(x, y, 0, 0, 0, structure_straightLine, 0);
                                    }
                                    else if (left + right === 2) {
                                        jigsaw.setStructurePlane(x, y, 0, 0, 0, structure_straightLine, 90);
                                    }
                                    else if (left === 1) {
                                        if (top === 1) {
                                            jigsaw.setStructurePlane(x, y, 0, 0, 0, structure_curve, 90);
                                        }
                                        else if (bottom === 1) {
                                            jigsaw.setStructurePlane(x, y, 0, 0, 0, structure_curve, 180);
                                        }
                                        else {
                                            throw new Error("num error");
                                        }
                                    }
                                    else if (right === 1) {
                                        if (top === 1) {
                                            jigsaw.setStructurePlane(x, y, 0, 0, 0, structure_curve, 0);
                                        }
                                        else if (bottom === 1) {
                                            jigsaw.setStructurePlane(x, y, 0, 0, 0, structure_curve, 270);
                                        }
                                        else {
                                            throw new Error("num error");
                                        }
                                    }
                                    break;
                                case 3:
                                    if (left === 0) {
                                        jigsaw.setStructurePlane(x, y, 0, 0, 0, structure_triple, 0);
                                    }
                                    else if (bottom === 0) {
                                        jigsaw.setStructurePlane(x, y, 0, 0, 0, structure_triple, 90);
                                    }
                                    else if (right === 0) {
                                        jigsaw.setStructurePlane(x, y, 0, 0, 0, structure_triple, 180);
                                    }
                                    else if (top === 0) {
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
                jigsaw.generate(e.blockLocation.x, e.blockLocation.y, e.blockLocation.z, this.getDimension());
            }
        });
    }
    onJoin() {
    }
    onLoaded() {
    }
    onLeave() {
    }
}
//# sourceMappingURL=CustomClient.js.map