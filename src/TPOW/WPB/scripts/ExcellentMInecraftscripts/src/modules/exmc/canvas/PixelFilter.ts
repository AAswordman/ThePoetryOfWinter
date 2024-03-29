import Matrix3 from "../math/Matrix3.js";
import Vector2 from "../math/Vector2.js";

export default class PixelFilter {
    private pixels = new Map<string, [Pixel, Pixel]>();
    mat: Matrix3;
    constructor(mat: Matrix3 = new Matrix3(1, 0, 0, 0, 1, 0, 0, 0, 1)) {
        this.mat = mat;
    }
    filter(func: (pixels: Pixel) => boolean) {
        let deleteMap: string[] = []
        for (let [k, [p1, p2]] of this.pixels) {
            if (!func(p1)) {
                deleteMap.push(k);
            }
        }
        for (let i of deleteMap) {
            this.pixels.delete(i);
        }
        return this;
    }

    tmpV = new Vector2();
    operatePoint(x: number, y: number) {
        this.tmpV.set(x, y);
        this.tmpV.mul(this.mat);
        return [this.tmpV.x, this.tmpV.y];
    }
    operateIntPoint(x: number, y: number) {
        this.operatePoint(x, y);
        return [Math.floor(this.tmpV.x), Math.floor(this.tmpV.y)];
    }
    isPointInsidePolygon(x: number, y: number, points: Pixel[]): boolean {
        let inside = false;
        for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
            const xi = points[i].x;
            const yi = points[i].y;
            const xj = points[j].x;
            const yj = points[j].y;

            const intersect = ((yi > y) !== (yj > y)) && (x < ((xj - xi) * (y - yi)) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    }
    range(x1: number, y1: number, x2: number, y2: number,
        x3: number, y3: number, x4: number, y4: number) {
        const points: Pixel[] = [new Pixel(x1, y1), new Pixel(x2, y2), new Pixel(x3, y3), new Pixel(x4, y4)];

        let inv = this.mat.cpy().inv();

        let minX = Math.min(x1, x2, x3, x4);
        let minY = Math.min(y1, y2, y3, y4);
        let maxX = Math.max(x1, x2, x3, x4);
        let maxY = Math.max(y1, y2, y3, y4);

        for (let x = minX; x <= maxX; x++) {
            for (let y = minY; y <= maxY; y++) {
                if (this.isPointInsidePolygon(x, y, points)) {
                    this.tmpV.set(x, y);
                    this.tmpV.mul(inv);
                    this.pixels.set(x+"|"+y,[new Pixel(this.tmpV.x, this.tmpV.y),new Pixel(x,y)]);
                }
            }
        }

        return this;
    }
    rangeBox(x1: number, y1: number, x2: number, y2: number) {
        if (x2 < x1) [x1, x2] = [x2, x1];
        if (y2 < y1) [y1, y2] = [y2, y1];

        const [nx1, ny1] = this.operateIntPoint(x1, y1),
            [nx2, ny2] = this.operateIntPoint(x2, y1),
            [nx3, ny3] = this.operateIntPoint(x2, y2),
            [nx4, ny4] = this.operateIntPoint(x1, y2);

        return this.range(nx1, ny1, nx2, ny2, nx3, ny3, nx4, ny4);
    }
    generate(){
        const p:Pixel[] = []
        this.pixels.forEach(([p1,p2],_) => p.push(p2));
        return p;
    }
    generatePixels(){
        const p:[Pixel,Pixel][] = []
        this.pixels.forEach(([p1,p2],_) => p.push([p1,p2]));
        return p;
    }

    merge(filter: PixelFilter) {
        for(let [k,v] of filter.pixels){
            this.pixels.set(k, v);
        }
        return this;
    }

    difference(filter: PixelFilter) {
        for(let [k,v] of filter.pixels){
            this.pixels.delete(k);
        }
        return this;
    }

    setMatrix(mat: Matrix3) {
        this.mat = mat;
    }

    betweenDistance(minDis: number, maxDis: number, targetX: number, targetY: number) {
        return this.filter(p => {
            const dis = p.getDistance(targetX, targetY);
            return dis >= minDis && dis <= maxDis;
        });
    }

    maxDistance(maxDis: number, targetX: number, targetY: number) {
        return this.betweenDistance(0, maxDis, targetX, targetY);
    }
    minDistance(minDis: number, targetX: number, targetY: number) {
        return this.betweenDistance(minDis, 0, targetX, targetY);
    }

    lineCutRight(x1: number, y1: number, x2: number, y2: number) {
        return this.filter(p => (x2 - x1) * (p.y - y1) - (y2 - y1) * (p.x - x1) <= 0)
    }
    lineCutLeft(x1: number, y1: number, x2: number, y2: number) {
        return this.filter(p => (x2 - x1) * (p.y - y1) - (y2 - y1) * (p.x - x1) >= 0)
    }

    inEllipse(x1: number, y1: number, x2: number, y2: number, longAxis: number) {
        return this.filter(p => {
            let judge = p.getDistance(x1, y1) + p.getDistance(x2, y2);
            return judge <= longAxis;
        });
    }
    outEllipse(x1: number, y1: number, x2: number, y2: number, longAxis: number) {
        return this.filter(p => {
            let judge = p.getDistance(x1, y1) + p.getDistance(x2, y2);
            return judge >= longAxis;
        });
    }
}
export class Pixel {
    x!: number;
    y!: number;
    public static tmpV = new Pixel();
    constructor(x = 0, y = 0) {
        this.setPos(x, y);
    }
    setPos(x: [number, number]): this
    setPos(x: Pixel): this
    setPos(x: number, y: number): this
    setPos(x: number | [number, number] | Pixel, y?: number) {
        if (typeof x === 'number') {
            this.x = x;
            this.y = y!;
        } else if (x instanceof Array) {
            this.setPos(x[0], x[1]);
        } else {
            this.setPos(x.x, x.y);
        }
        return this;
    }
    getDistance(x: number, y: number) {
        return Math.sqrt((this.x - x) ** 2 + (this.y - y) ** 2);
    }
}