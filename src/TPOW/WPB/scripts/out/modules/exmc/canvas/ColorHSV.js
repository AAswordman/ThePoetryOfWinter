import ColorRGBA from "./ColorRGBA.js";
export default class ColorHSV {
    constructor(hue, saturation, value) {
        this.hue = hue;
        this.saturation = saturation;
        this.value = value;
    }
    get h() {
        return this.hue;
    }
    get s() {
        return this.saturation;
    }
    get v() {
        return this.value;
    }
    toRGB() {
        let r, g, b;
        const h = this.hue / 60;
        const s = this.saturation / 100;
        const v = this.value / 100;
        const c = v * s;
        const x = c * (1 - Math.abs((h % 2) - 1));
        const m = v - c;
        if (h >= 0 && h < 1) {
            [r, g, b] = [c, x, 0];
        }
        else if (h >= 1 && h < 2) {
            [r, g, b] = [x, c, 0];
        }
        else if (h >= 2 && h < 3) {
            [r, g, b] = [0, c, x];
        }
        else if (h >= 3 && h < 4) {
            [r, g, b] = [0, x, c];
        }
        else if (h >= 4 && h < 5) {
            [r, g, b] = [x, 0, c];
        }
        else {
            [r, g, b] = [c, 0, x];
        }
        const red = Math.round((r + m) * 255);
        const green = Math.round((g + m) * 255);
        const blue = Math.round((b + m) * 255);
        return new ColorRGBA(red, green, blue, 255);
    }
}
//# sourceMappingURL=ColorHSV.js.map