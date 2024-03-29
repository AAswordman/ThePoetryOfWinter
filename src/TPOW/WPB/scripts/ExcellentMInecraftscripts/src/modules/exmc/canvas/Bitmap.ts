import ColorRGBA from './ColorRGBA.js';

export default class Bitmap {
    private _width: number;
    private _height: number;
    private _data: Uint8ClampedArray;
    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;
        this._data = new Uint8ClampedArray(width * height * 4);
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    get data(): Uint8ClampedArray {
        return this._data;
    }

    setPixel(x: number, y: number, color: ColorRGBA): void {
        const index = (y * this._width + x) * 4;
        this._data[index] = color.r;
        this._data[index + 1] = color.g;
        this._data[index + 2] = color.b;
        this._data[index + 3] = color.a;
    }

    getPixel(x: number, y: number): ColorRGBA {
        const index = (y * this._width + x) * 4;
        return new ColorRGBA(this._data[index], this._data[index + 1], this._data[index + 2], this._data[index + 3]);
    }

    clear(): void {
        this._data.fill(0);
    }

    drawRectangle(x: number, y: number, width: number, height: number, color: ColorRGBA): void {
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                this.setPixel(x + i, y + j, color);
            }
        }
    }

    drawCircle(x: number, y: number, radius: number, color: ColorRGBA): void {
        for (let i = -radius; i <= radius; i++) {
            for (let j = -radius; j <= radius; j++) {
                if (i * i + j * j <= radius * radius) {
                    this.setPixel(x + i, y + j, color);
                }
            }
        }
    }
}