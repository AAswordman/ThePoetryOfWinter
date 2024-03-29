import Matrix3 from "../math/Matrix3.js";
import Bitmap from "./Bitmap.js";
import Paint, { Style } from "./Paint.js";
import PixelFilter from "./PixelFilter.js";

export default class Canvas {
    private _context: Bitmap;
    private mat = new Matrix3(
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
    );
    getMatrix() {
        return this.mat;
    }
    translate(x: number, y: number) {
        this.getMatrix().lmul(new Matrix3(
            1, 0, x,
            0, 1, y,
            0, 0, 1
        ));
    }
    scale(x: number, y: number) {
        this.getMatrix().lmul(new Matrix3(
            x, 0, 0,
            0, y, 0,
            0, 0, 1
        ));
    }
    scaleX(x: number) {
        this.scale(x, 1);
    }
    scaleY(y: number) {
        this.scale(1, y);
    }

    rotate(r: number, x: number, y: number) {
        this.translate(-x, -y);
        this.getMatrix().lmul(new Matrix3(
            Math.cos(r), -Math.sin(r), 0,
            Math.sin(r), Math.cos(r), 0,
            0, 0, 1
        ));
        this.translate(x, y);
    }
    rotateRad(r: number, x: number, y: number) {
        this.rotate(r * Math.PI / 180, x, y);
    }

    constructor(bitmap: Bitmap) {
        this._context = bitmap;
    }
    getBitmap() {
        return this._context;
    }
    getPixel(x: number, y: number){
        return this._context.getPixel(x,y);
    }
    getWidth() {
        return this._context.width;
    }
    getHeight() {
        return this._context.height;
    }

    clear(): void {
        this._context.clear();
    }
    drawPixelFilter(filter: PixelFilter, paint: Paint) {
        for (let p of filter.generate()) {
            this.drawPoint(p.x, p.y, paint);
        }
    }

    drawCircle(x: number, y: number, r: number, paint: Paint) {
        switch (paint.style) {
            case Style.STROKE:
                this.drawPixelFilter(new PixelFilter(this.mat).rangeBox(x - r, y - r, x + r, y + r)
                    .betweenDistance(r - paint.strokeWidth / 2, r + paint.strokeWidth / 2, x, y), paint);
                break;
            case Style.FILL:
                this.drawPixelFilter(new PixelFilter(this.mat).rangeBox(x - r, y - r, x + r, y + r)
                    .maxDistance(r, x, y), paint);
                break;
            case Style.FILL_AND_STROKE:
                this.drawPixelFilter(new PixelFilter(this.mat).rangeBox(x - r, y - r, x + r, y + r)
                    .maxDistance(r + paint.strokeWidth / 2, x, y), paint);
                break;
        }
    }
    drawPoint(x: number, y: number, paint: Paint) {
        if (x >= 0 && x < this._context.width && y >= 0 && y < this._context.height) {
            this._context.setPixel(x, y, paint.color);
        }
    }
    drawLine() {

    }

    getRoundedRectFilter(rectX: number, rectY: number, width: number, height: number, a: number, b: number,) {
        const isPointInsideEllipse = (x: number, y: number, centerX: number, centerY: number, radiusX: number, radiusY: number): boolean => {
            const normalizedX = x - centerX;
            const normalizedY = y - centerY;
            return (normalizedX * normalizedX) / (radiusX * radiusX) + (normalizedY * normalizedY) / (radiusY * radiusY) <= 1;
        }
        return new PixelFilter(this.mat).rangeBox(rectX, rectY, width, height)
            .filter(p => {
                const x = p.x, y = p.y;
                if (x >= rectX && x <= rectX + width && y >= rectY && y <= rectY + height) {
                    return true; // 点在矩形内部，直接返回true
                }

                // 检查四个角
                if (isPointInsideEllipse(x, y, rectX, rectY, a, b) ||
                    isPointInsideEllipse(x, y, rectX + width - a, rectY, a, b) ||
                    isPointInsideEllipse(x, y, rectX, rectY + height - b, a, b) ||
                    isPointInsideEllipse(x, y, rectX + width - a, rectY + height - b, a, b)) {
                    return true;
                }

                // 检查四条直线
                if ((x >= rectX + a && x <= rectX + width - a && y >= rectY && y <= rectY + b) ||
                    (x >= rectX && x <= rectX + width && y >= rectY + b && y <= rectY + height - b)) {
                    return true;
                }

                return false; // 如果以上条件都不满足，则返回false
            });
    }

    drawRect(x: number, y: number, width: number, height: number, paint: Paint) {
        switch (paint.style) {
            case Style.STROKE:
                this.drawPixelFilter(new PixelFilter(this.mat).rangeBox(x - paint.strokeWidth / 2, y - paint.strokeWidth / 2,
                    x + width + paint.strokeWidth / 2, y + height + paint.strokeWidth / 2)
                    .difference(new PixelFilter(this.mat).rangeBox(x + paint.strokeWidth / 2, y + paint.strokeWidth / 2,
                        x + width - paint.strokeWidth / 2, y + height - paint.strokeWidth / 2)), paint);
                break;
            case Style.FILL:
                this.drawPixelFilter(new PixelFilter(this.mat).rangeBox(x, y, x + width, y + height), paint);
                break;
            case Style.FILL_AND_STROKE:
                this.drawPixelFilter(new PixelFilter(this.mat).rangeBox(x - paint.strokeWidth / 2, y - paint.strokeWidth / 2,
                    x + width + paint.strokeWidth / 2, y + height + paint.strokeWidth / 2), paint);
                break;
        }
    }
    drawRoundedRect(rectX: number, rectY: number, rectWidth: number, rectHeight: number, radiusX: number, radiusY: number, paint: Paint) {
        switch (paint.style) {
            case Style.STROKE:
                this.drawPixelFilter(this.getRoundedRectFilter(rectX - paint.strokeWidth / 2, rectY - paint.strokeWidth / 2, rectWidth + paint.strokeWidth, rectHeight + paint.strokeWidth, radiusX, radiusY)
                    .difference(this.getRoundedRectFilter(rectX, rectY, rectWidth, rectHeight, radiusX, radiusY)), paint);
                break;
            case Style.FILL:
                this.drawPixelFilter(this.getRoundedRectFilter(rectX, rectY, rectWidth, rectHeight, radiusX, radiusY), paint);
                break;
            case Style.FILL_AND_STROKE:
                this.drawPixelFilter(this.getRoundedRectFilter(rectX - paint.strokeWidth / 2, rectY - paint.strokeWidth / 2, rectWidth + paint.strokeWidth, rectHeight + paint.strokeWidth, radiusX, radiusY), paint);
                break;
        }
    }
    drawOval() {

    }
    drawArc() {

    }
    drawText() {

    }
    drawTextOnPath() {

    }
    drawBitmap(bitmap: Bitmap, x: number, y: number, matrix: Matrix3, paint: Paint) {
        let paintX = new Paint();
        for (let [p1, p2] of new PixelFilter(matrix).rangeBox(0, 0, bitmap.width, bitmap.height).generatePixels()) {
            paintX.color = bitmap.getPixel(Math.floor(p1.x), Math.floor(p2.y));
            this.drawPoint(x + p2.x, y + p2.y, paintX);
        }
    }
    drawBitmapWithTarget(bitmap: Bitmap, srcX1: number, srcY1: number, srcX2: number, srcY2: number,
        dstX1: number, dstY1: number, dstX2: number, dstY2: number, paint: Paint) {
        //paint未实现
        if (srcX2 < srcX1) [srcX1, srcX2] = [srcX2, srcX1];
        if (srcY2 < srcY1) [srcY1, srcY2] = [srcY2, srcY1];
        if (dstX2 < dstX1) [dstX1, dstX2] = [dstX2, dstX1];
        if (dstY2 < dstY1) [dstY1, dstY2] = [dstY2, dstY1];

        const dis1 = srcX2 - srcX1, dis2 = srcY2 - srcY1;
        const dis3 = dstX1 - dstX1, dis4 = dstY2 - dstY1;

        let paintX = new Paint();
        for (let i = dstX1; i < dstX2; i++) {
            for (let j = dstY1; j < dstY2; j++) {
                paintX.color = bitmap.getPixel(
                    Math.floor(srcX1 + dis1 * ((i - dstX1) / dis3)),
                    Math.floor(srcY1 + dis2 * ((j - dstY1) / dis4))
                );
                this.drawPoint(i, j, paintX)
            }
        }
    }
    private static _dataColor = ``;
    private static _dataColor2 = ``;
    private static _saturation = ``;
    private static _grayscale = ``;
    private static _saturation2 = ``;
    private static _grayscale2 = ``;
    private static _canvasStart = ""

    draw() {
        let layer1: string[] = [], layer2: string[] = [],
            layer3: string[] = [], layer4: string[] = [],
            layer5: string[] = [], layer6: string[] = [];
        for (let j = 0; j < this._context.height; j++) {
            layer1.push(Canvas._canvasStart[0]);
            layer3.push(Canvas._canvasStart[0]);
            layer5.push(Canvas._canvasStart[0]);
            layer2.push(Canvas._canvasStart[1]);
            layer4.push(Canvas._canvasStart[1]);
            layer6.push(Canvas._canvasStart[1]);
            for (let i = 0; i < this._context.width; i++) {
                const color = this._context.getPixel(i, j).toHSV();
                const h = Math.floor(color.h / 360 * Canvas._dataColor.length) % Canvas._dataColor.length;
                const s = Math.min(Math.round((100 - color.s) / 100 * Canvas._saturation.length), Canvas._saturation.length - 1);
                const v = Math.min(Math.round((100 - color.v) / 100 * Canvas._grayscale.length), Canvas._grayscale.length - 1);

                layer1.push(Canvas._dataColor[h]);
                layer2.push(Canvas._dataColor2[h]);
                layer3.push(Canvas._saturation[s]);
                layer4.push(Canvas._saturation2[s]);
                layer5.push(Canvas._grayscale[v]);
                layer6.push(Canvas._grayscale2[v]);
            }
            layer1.push("\n");
            layer2.push("\n");
            layer3.push("\n");
            layer4.push("\n");
            layer5.push("\n");
            layer6.push("\n");
        }
        return {
            layer1: (layer1.join('')),
            layer2: (layer2.join('')),
            layer3: (layer3.join('')),
            layer4: (layer4.join('')),
            layer5: (layer5.join('')),
            layer6: (layer6.join(''))
        }
    }
}
