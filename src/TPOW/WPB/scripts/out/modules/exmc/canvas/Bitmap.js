import ColorRGBA from './ColorRGBA.js';
export default class Bitmap {
    constructor(width, height) {
        this._width = width;
        this._height = height;
        this._data = new Uint8ClampedArray(width * height * 4);
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    get data() {
        return this._data;
    }
    setPixel(x, y, color) {
        const index = (y * this._width + x) * 4;
        this._data[index] = color.r;
        this._data[index + 1] = color.g;
        this._data[index + 2] = color.b;
        this._data[index + 3] = color.a;
    }
    getPixel(x, y) {
        const index = (y * this._width + x) * 4;
        return new ColorRGBA(this._data[index], this._data[index + 1], this._data[index + 2], this._data[index + 3]);
    }
    clear() {
        this._data.fill(0);
    }
    drawRectangle(x, y, width, height, color) {
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                this.setPixel(x + i, y + j, color);
            }
        }
    }
    drawCircle(x, y, radius, color) {
        for (let i = -radius; i <= radius; i++) {
            for (let j = -radius; j <= radius; j++) {
                if (i * i + j * j <= radius * radius) {
                    this.setPixel(x + i, y + j, color);
                }
            }
        }
    }
}
//# sourceMappingURL=Bitmap.js.map