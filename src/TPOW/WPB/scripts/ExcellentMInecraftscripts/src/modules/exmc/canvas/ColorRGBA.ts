import ColorHSV from "./ColorHSV.js";

export default class ColorRGBA {


    private _r: number;
    private _g: number;
    private _b: number;
    private _a: number;

    constructor(r: number, g: number, b: number, a: number)
    constructor(r: number, g: number, b: number, a?: number)
    constructor(str: string)
    constructor(r: number | string, g?: number, b?: number, a?: number) {
        if (typeof r === "string") {
            if (r.startsWith("#")) r = r.substring(1);
            if (r.length !== 6 && r.length !== 8) {
                throw new SyntaxError("Fail to parse the color string:" + r);
            }
            this._r = eval("0x" + (r.substring(0, 2)));
            this._g = eval("0x" + (r.substring(2, 4)));
            this._b = eval("0x" + (r.substring(4, 6)));
            this._a = r.length == 8 ? eval("0x" + (r.substring(6, 8))) : 255;
        } else {
            this._r = r!;
            this._g = g!;
            this._b = b!;
            this._a = a ? a : 255;
        }
    }

    get r(): number {
        return this._r;
    }

    get g(): number {
        return this._g;
    }

    get b(): number {
        return this._b;
    }

    get a(): number {
        return this._a;
    }

    toRgbaString(): string {
        return `rgba(${this._r}, ${this._g}, ${this._b}, ${this._a})`;
    }
    toHSV(): ColorHSV {
        const r = this._r / 255;
        const g = this._g / 255;
        const b = this._b / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const delta = max - min;

        let h, s, v;

        if (delta === 0) {
            h = 0;
        } else if (max === r) {
            h = 60 * (((g - b) / delta) % 6);
        } else if (max === g) {
            h = 60 * ((b - r) / delta + 2);
        } else {
            h = 60 * ((r - g) / delta + 4);
        }

        if (max === 0) {
            s = 0;
        } else {
            s = delta / max;
        }

        v = max;

        const hue = Math.round(h);
        const saturation = Math.round(s * 100);
        const value = Math.round(v * 100);

        return new ColorHSV(hue, saturation, value);
    }

    public static readonly ALICEBLUE = new ColorRGBA('#F0F8FF');
    public static readonly ANTIQUEWHITE = new ColorRGBA('#FAEBD7');
    public static readonly AQUA = new ColorRGBA('#00FFFF');
    public static readonly AQUAMARINE = new ColorRGBA('#7FFFD4');
    public static readonly AZURE = new ColorRGBA('#F0FFFF');
    public static readonly BEIGE = new ColorRGBA('#F5F5DC');
    public static readonly BISQUE = new ColorRGBA('#FFE4C4');
    public static readonly BLACK = new ColorRGBA('#000000');
    public static readonly BLANCHEDALMOND = new ColorRGBA('#FFEBCD');
    public static readonly BLUE = new ColorRGBA('#0000FF');
    public static readonly BLUEVIOLET = new ColorRGBA('#8A2BE2');
    public static readonly BROWN = new ColorRGBA('#A52A2A');
    public static readonly BURLYWOOD = new ColorRGBA('#DEB887');
    public static readonly CADETBLUE = new ColorRGBA('#5F9EA0');
    public static readonly CHARTREUSE = new ColorRGBA('#7FFF00');
    public static readonly CHOCOLATE = new ColorRGBA('#D2691E');
    public static readonly CORAL = new ColorRGBA('#FF7F50');
    public static readonly CORNFLOWERBLUE = new ColorRGBA('#6495ED');
    public static readonly CORNSILK = new ColorRGBA('#FFF8DC');
    public static readonly CRIMSON = new ColorRGBA('#DC143C');
    public static readonly CYAN = new ColorRGBA('#00FFFF');
    public static readonly DARKBLUE = new ColorRGBA('#00008B');
    public static readonly DARKCYAN = new ColorRGBA('#008B8B');
    public static readonly DARKGOLDENROD = new ColorRGBA('#B8860B');
    public static readonly DARKGRAY = new ColorRGBA('#A9A9A9');
    public static readonly DARKGREEN = new ColorRGBA('#006400');
    public static readonly DARKGREY = new ColorRGBA('#A9A9A9');
    public static readonly DARKKHAKI = new ColorRGBA('#BDB76B');
    public static readonly DARKMAGENTA = new ColorRGBA('#8B008B');
    public static readonly DARKOLIVEGREEN = new ColorRGBA('#556B2F');
    public static readonly DARKORANGE = new ColorRGBA('#FF8C00');
    public static readonly DARKORCHID = new ColorRGBA('#9932CC');
    public static readonly DARKRED = new ColorRGBA('#8B0000');
    public static readonly DARKSALMON = new ColorRGBA('#E9967A');
    public static readonly DARKSEAGREEN = new ColorRGBA('#8FBC8F');
    public static readonly DARKSLATEBLUE = new ColorRGBA('#483D8B');
    public static readonly DARKSLATEGRAY = new ColorRGBA('#2F4F4F');
    public static readonly DARKSLATEGREY = new ColorRGBA('#2F4F4F');
    public static readonly DARKTURQUOISE = new ColorRGBA('#00CED1');
    public static readonly DARKVIOLET = new ColorRGBA('#9400D3');
    public static readonly DEEPPINK = new ColorRGBA('#FF1493');
    public static readonly DEEPSKYBLUE = new ColorRGBA('#00BFFF');
    public static readonly DIMGRAY = new ColorRGBA('#696969');
    public static readonly DIMGREY = new ColorRGBA('#696969');
    public static readonly DODGERBLUE = new ColorRGBA('#1E90FF');
    public static readonly FIREBRICK = new ColorRGBA('#B22222');
    public static readonly FLORALWHITE = new ColorRGBA('#FFFAF0');
    public static readonly FORESTGREEN = new ColorRGBA('#228B22');
    public static readonly FUCHSIA = new ColorRGBA('#FF00FF');
    public static readonly GAINSBORO = new ColorRGBA('#DCDCDC');
    public static readonly GHOSTWHITE = new ColorRGBA('#F8F8FF');
    public static readonly GOLD = new ColorRGBA('#FFD700');
    public static readonly GOLDENROD = new ColorRGBA('#DAA520');
    public static readonly GRAY = new ColorRGBA('#808080');
    public static readonly GREEN = new ColorRGBA('#008000');
    public static readonly GREENYELLOW = new ColorRGBA('#ADFF2F');
    public static readonly GREY = new ColorRGBA('#808080');
    public static readonly HONEYDEW = new ColorRGBA('#F0FFF0');
    public static readonly HOTPINK = new ColorRGBA('#FF69B4');
    public static readonly INDIANRED = new ColorRGBA('#CD5C5C');
    public static readonly INDIGO = new ColorRGBA('#4B0082');
    public static readonly IVORY = new ColorRGBA('#FFFFF0');
    public static readonly KHAKI = new ColorRGBA('#F0E68C');
    public static readonly LAVENDER = new ColorRGBA('#E6E6FA');
    public static readonly LAVENDERBLUSH = new ColorRGBA('#FFF0F5');
    public static readonly LAWNGREEN = new ColorRGBA('#7CFC00');
    public static readonly LEMONCHIFFON = new ColorRGBA('#FFFACD');
    public static readonly LIGHTBLUE = new ColorRGBA('#ADD8E6');
    public static readonly LIGHTCORAL = new ColorRGBA('#F08080');
    public static readonly LIGHTCYAN = new ColorRGBA('#E0FFFF');
    public static readonly LIGHTGOLDENRODYELLOW = new ColorRGBA('#FAFAD2');
    public static readonly LIGHTGRAY = new ColorRGBA('#D3D3D3');
    public static readonly LIGHTGREEN = new ColorRGBA('#90EE90');
    public static readonly LIGHTGREY = new ColorRGBA('#D3D3D3');
    public static readonly LIGHTPINK = new ColorRGBA('#FFB6C1');
    public static readonly LIGHTSALMON = new ColorRGBA('#FFA07A');
    public static readonly LIGHTSEAGREEN = new ColorRGBA('#20B2AA');
    public static readonly LIGHTSKYBLUE = new ColorRGBA('#87CEFA');
    public static readonly LIGHTSLATEGRAY = new ColorRGBA('#778899');
    public static readonly LIGHTSLATEGREY = new ColorRGBA('#778899');
    public static readonly LIGHTSTEELBLUE = new ColorRGBA('#B0C4DE');
    public static readonly LIGHTYELLOW = new ColorRGBA('#FFFFE0');
    public static readonly LIME = new ColorRGBA('#00FF00');
    public static readonly LIMEGREEN = new ColorRGBA('#32CD32');
    public static readonly LINEN = new ColorRGBA('#FAF0E6');
    public static readonly MAGENTA = new ColorRGBA('#FF00FF');
    public static readonly MAROON = new ColorRGBA('#800000');
    public static readonly MEDIUMAQUAMARINE = new ColorRGBA('#66CDAA');
    public static readonly MEDIUMBLUE = new ColorRGBA('#0000CD');
    public static readonly MEDIUMORCHID = new ColorRGBA('#BA55D3');
    public static readonly MEDIUMPURPLE = new ColorRGBA('#9370DB');
    public static readonly MEDIUMSEAGREEN = new ColorRGBA('#3CB371');
    public static readonly MEDIUMSLATEBLUE = new ColorRGBA('#7B68EE');
    public static readonly MEDIUMSPRINGGREEN = new ColorRGBA('#00FA9A');
    public static readonly MEDIUMTURQUOISE = new ColorRGBA('#48D1CC');
    public static readonly MEDIUMVIOLETRED = new ColorRGBA('#C71585');
    public static readonly MIDNIGHTBLUE = new ColorRGBA('#191970');
    public static readonly MINTCREAM = new ColorRGBA('#F5FFFA');
    public static readonly MISTYROSE = new ColorRGBA('#FFE4E1');
    public static readonly MOCCASIN = new ColorRGBA('#FFE4B5');
    public static readonly NAVY = new ColorRGBA('#000080');
    public static readonly OLDLACE = new ColorRGBA('#FDF5E6');
    public static readonly OLIVE = new ColorRGBA('#808000');
    public static readonly OLIVEDRAB = new ColorRGBA('#6B8E23');
    public static readonly ORANGE = new ColorRGBA('#FFA500');
    public static readonly ORANGERED = new ColorRGBA('#FF4500');
    public static readonly ORCHID = new ColorRGBA('#DA70D6');
    public static readonly PALEGOLDENROD = new ColorRGBA('#EEE8AA');
    public static readonly PALEGREEN = new ColorRGBA('#98FB98');
    public static readonly PALETURQUOISE = new ColorRGBA('#AFEEEE');
    public static readonly PALEVIOLETRED = new ColorRGBA('#DB7093');
    public static readonly PAPAYAWHIP = new ColorRGBA('#FFEFD5');
    public static readonly PEACHPUFF = new ColorRGBA('#FFDAB9');
    public static readonly PERU = new ColorRGBA('#CD853F');
    public static readonly PINK = new ColorRGBA('#FFC0CB');
    public static readonly PLUM = new ColorRGBA('#DDA0DD');
    public static readonly POWDERBLUE = new ColorRGBA('#B0E0E6');
    public static readonly PURPLE = new ColorRGBA('#800080');
    public static readonly REBECCAPURPLE = new ColorRGBA('#663399');
    public static readonly RED = new ColorRGBA('#FF0000');
    public static readonly ROSYBROWN = new ColorRGBA('#BC8F8F');
    public static readonly ROYALBLUE = new ColorRGBA('#4169E1');
    public static readonly SADDLEBROWN = new ColorRGBA('#8B4513');
    public static readonly SALMON = new ColorRGBA('#FA8072');
    public static readonly SANDYBROWN = new ColorRGBA('#F4A460');
    public static readonly SEAGREEN = new ColorRGBA('#2E8B57');
    public static readonly SEASHELL = new ColorRGBA('#FFF5EE');
    public static readonly SIENNA = new ColorRGBA('#A0522D');
    public static readonly SILVER = new ColorRGBA('#C0C0C0');
    public static readonly SKYBLUE = new ColorRGBA('#87CEEB');
    public static readonly SLATEBLUE = new ColorRGBA('#6A5ACD');
    public static readonly SLATEGRAY = new ColorRGBA('#708090');
    public static readonly SLATEGREY = new ColorRGBA('#708090');
    public static readonly SNOW = new ColorRGBA('#FFFAFA');
    public static readonly SPRINGGREEN = new ColorRGBA('#00FF7F');
    public static readonly STEELBLUE = new ColorRGBA('#4682B4');
    public static readonly TAN = new ColorRGBA('#D2B48C');
    public static readonly TEAL = new ColorRGBA('#008080');
    public static readonly THISTLE = new ColorRGBA('#D8BFD8');
    public static readonly TOMATO = new ColorRGBA('#FF6347');
    public static readonly TURQUOISE = new ColorRGBA('#40E0D0');
    public static readonly VIOLET = new ColorRGBA('#EE82EE');
    public static readonly WHEAT = new ColorRGBA('#F5DEB3');
    public static readonly WHITE = new ColorRGBA('#FFFFFF');
    public static readonly WHITESMOKE = new ColorRGBA('#F5F5F5');
    public static readonly YELLOW = new ColorRGBA('#FFFF00');
    public static readonly YELLOWGREEN = new ColorRGBA('#9ACD32');
}