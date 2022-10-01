import Random from "../modules/exmc/utils/Random.js";
import Vector2 from "../modules/exmc/utils/Vector2.js";

const maze = Array.from(new Array<number>(32), () => new Array<number>(32).fill(0));

let block = 64;
let seed = 1346;
let r = new Random(seed);
const EMPTY = 0, BLOCK = 1, PATH = 2, UNDEF = 3, CENTER = 4;
let getMsg = (x: number, y: number) => {
    try {
         return maze[y][x] 
    } catch (e) { return UNDEF; }
}
maze[15][15] = CENTER;
maze[15][16] = CENTER;
maze[16][15] = CENTER;
maze[16][16] = CENTER;
while (block > 0) {
    maze[r.nextInt(32)][r.nextInt(32)] = BLOCK;
    block--;
}

let arrows: [Vector2, Vector2][] = [[new Vector2(), Vector2.forward]];
maze[1][0] = EMPTY;
let tempV = new Vector2();

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
                let pointNum = arrows.length < 30 ? 4 : Math.min(4,r.nextInt(6));
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

for (let e of maze) {
    console.log(JSON.stringify(e));
}