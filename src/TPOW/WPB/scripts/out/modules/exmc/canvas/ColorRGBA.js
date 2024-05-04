import ColorHSV from "./ColorHSV.js";
class ColorRGBA {
    constructor(r, g, b, a) {
        if (typeof r === "string") {
            if (r.startsWith("#"))
                r = r.substring(1);
            if (r.length !== 6 && r.length !== 8) {
                throw new SyntaxError("Fail to parse the color string:" + r);
            }
            this._r = eval("0x" + (r.substring(0, 2)));
            this._g = eval("0x" + (r.substring(2, 4)));
            this._b = eval("0x" + (r.substring(4, 6)));
            this._a = r.length == 8 ? eval("0x" + (r.substring(6, 8))) : 255;
        }
        else {
            this._r = r;
            this._g = g;
            this._b = b;
            this._a = a ? a : 255;
        }
    }
    get r() {
        return this._r;
    }
    get g() {
        return this._g;
    }
    get b() {
        return this._b;
    }
    get a() {
        return this._a;
    }
    toRgbaString() {
        return `rgba(${this._r}, ${this._g}, ${this._b}, ${this._a})`;
    }
    toHSV() {
        const r = this._r / 255;
        const g = this._g / 255;
        const b = this._b / 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const delta = max - min;
        let h, s, v;
        if (delta === 0) {
            h = 0;
        }
        else if (max === r) {
            h = 60 * (((g - b) / delta) % 6);
        }
        else if (max === g) {
            h = 60 * ((b - r) / delta + 2);
        }
        else {
            h = 60 * ((r - g) / delta + 4);
        }
        if (max === 0) {
            s = 0;
        }
        else {
            s = delta / max;
        }
        v = max;
        const hue = Math.round(h);
        const saturation = Math.round(s * 100);
        const value = Math.round(v * 100);
        return new ColorHSV(hue, saturation, value);
    }
}
ColorRGBA.ALICEBLUE = new ColorRGBA('#F0F8FF');
ColorRGBA.ANTIQUEWHITE = new ColorRGBA('#FAEBD7');
ColorRGBA.AQUA = new ColorRGBA('#00FFFF');
ColorRGBA.AQUAMARINE = new ColorRGBA('#7FFFD4');
ColorRGBA.AZURE = new ColorRGBA('#F0FFFF');
ColorRGBA.BEIGE = new ColorRGBA('#F5F5DC');
ColorRGBA.BISQUE = new ColorRGBA('#FFE4C4');
ColorRGBA.BLACK = new ColorRGBA('#000000');
ColorRGBA.BLANCHEDALMOND = new ColorRGBA('#FFEBCD');
ColorRGBA.BLUE = new ColorRGBA('#0000FF');
ColorRGBA.BLUEVIOLET = new ColorRGBA('#8A2BE2');
ColorRGBA.BROWN = new ColorRGBA('#A52A2A');
ColorRGBA.BURLYWOOD = new ColorRGBA('#DEB887');
ColorRGBA.CADETBLUE = new ColorRGBA('#5F9EA0');
ColorRGBA.CHARTREUSE = new ColorRGBA('#7FFF00');
ColorRGBA.CHOCOLATE = new ColorRGBA('#D2691E');
ColorRGBA.CORAL = new ColorRGBA('#FF7F50');
ColorRGBA.CORNFLOWERBLUE = new ColorRGBA('#6495ED');
ColorRGBA.CORNSILK = new ColorRGBA('#FFF8DC');
ColorRGBA.CRIMSON = new ColorRGBA('#DC143C');
ColorRGBA.CYAN = new ColorRGBA('#00FFFF');
ColorRGBA.DARKBLUE = new ColorRGBA('#00008B');
ColorRGBA.DARKCYAN = new ColorRGBA('#008B8B');
ColorRGBA.DARKGOLDENROD = new ColorRGBA('#B8860B');
ColorRGBA.DARKGRAY = new ColorRGBA('#A9A9A9');
ColorRGBA.DARKGREEN = new ColorRGBA('#006400');
ColorRGBA.DARKGREY = new ColorRGBA('#A9A9A9');
ColorRGBA.DARKKHAKI = new ColorRGBA('#BDB76B');
ColorRGBA.DARKMAGENTA = new ColorRGBA('#8B008B');
ColorRGBA.DARKOLIVEGREEN = new ColorRGBA('#556B2F');
ColorRGBA.DARKORANGE = new ColorRGBA('#FF8C00');
ColorRGBA.DARKORCHID = new ColorRGBA('#9932CC');
ColorRGBA.DARKRED = new ColorRGBA('#8B0000');
ColorRGBA.DARKSALMON = new ColorRGBA('#E9967A');
ColorRGBA.DARKSEAGREEN = new ColorRGBA('#8FBC8F');
ColorRGBA.DARKSLATEBLUE = new ColorRGBA('#483D8B');
ColorRGBA.DARKSLATEGRAY = new ColorRGBA('#2F4F4F');
ColorRGBA.DARKSLATEGREY = new ColorRGBA('#2F4F4F');
ColorRGBA.DARKTURQUOISE = new ColorRGBA('#00CED1');
ColorRGBA.DARKVIOLET = new ColorRGBA('#9400D3');
ColorRGBA.DEEPPINK = new ColorRGBA('#FF1493');
ColorRGBA.DEEPSKYBLUE = new ColorRGBA('#00BFFF');
ColorRGBA.DIMGRAY = new ColorRGBA('#696969');
ColorRGBA.DIMGREY = new ColorRGBA('#696969');
ColorRGBA.DODGERBLUE = new ColorRGBA('#1E90FF');
ColorRGBA.FIREBRICK = new ColorRGBA('#B22222');
ColorRGBA.FLORALWHITE = new ColorRGBA('#FFFAF0');
ColorRGBA.FORESTGREEN = new ColorRGBA('#228B22');
ColorRGBA.FUCHSIA = new ColorRGBA('#FF00FF');
ColorRGBA.GAINSBORO = new ColorRGBA('#DCDCDC');
ColorRGBA.GHOSTWHITE = new ColorRGBA('#F8F8FF');
ColorRGBA.GOLD = new ColorRGBA('#FFD700');
ColorRGBA.GOLDENROD = new ColorRGBA('#DAA520');
ColorRGBA.GRAY = new ColorRGBA('#808080');
ColorRGBA.GREEN = new ColorRGBA('#008000');
ColorRGBA.GREENYELLOW = new ColorRGBA('#ADFF2F');
ColorRGBA.GREY = new ColorRGBA('#808080');
ColorRGBA.HONEYDEW = new ColorRGBA('#F0FFF0');
ColorRGBA.HOTPINK = new ColorRGBA('#FF69B4');
ColorRGBA.INDIANRED = new ColorRGBA('#CD5C5C');
ColorRGBA.INDIGO = new ColorRGBA('#4B0082');
ColorRGBA.IVORY = new ColorRGBA('#FFFFF0');
ColorRGBA.KHAKI = new ColorRGBA('#F0E68C');
ColorRGBA.LAVENDER = new ColorRGBA('#E6E6FA');
ColorRGBA.LAVENDERBLUSH = new ColorRGBA('#FFF0F5');
ColorRGBA.LAWNGREEN = new ColorRGBA('#7CFC00');
ColorRGBA.LEMONCHIFFON = new ColorRGBA('#FFFACD');
ColorRGBA.LIGHTBLUE = new ColorRGBA('#ADD8E6');
ColorRGBA.LIGHTCORAL = new ColorRGBA('#F08080');
ColorRGBA.LIGHTCYAN = new ColorRGBA('#E0FFFF');
ColorRGBA.LIGHTGOLDENRODYELLOW = new ColorRGBA('#FAFAD2');
ColorRGBA.LIGHTGRAY = new ColorRGBA('#D3D3D3');
ColorRGBA.LIGHTGREEN = new ColorRGBA('#90EE90');
ColorRGBA.LIGHTGREY = new ColorRGBA('#D3D3D3');
ColorRGBA.LIGHTPINK = new ColorRGBA('#FFB6C1');
ColorRGBA.LIGHTSALMON = new ColorRGBA('#FFA07A');
ColorRGBA.LIGHTSEAGREEN = new ColorRGBA('#20B2AA');
ColorRGBA.LIGHTSKYBLUE = new ColorRGBA('#87CEFA');
ColorRGBA.LIGHTSLATEGRAY = new ColorRGBA('#778899');
ColorRGBA.LIGHTSLATEGREY = new ColorRGBA('#778899');
ColorRGBA.LIGHTSTEELBLUE = new ColorRGBA('#B0C4DE');
ColorRGBA.LIGHTYELLOW = new ColorRGBA('#FFFFE0');
ColorRGBA.LIME = new ColorRGBA('#00FF00');
ColorRGBA.LIMEGREEN = new ColorRGBA('#32CD32');
ColorRGBA.LINEN = new ColorRGBA('#FAF0E6');
ColorRGBA.MAGENTA = new ColorRGBA('#FF00FF');
ColorRGBA.MAROON = new ColorRGBA('#800000');
ColorRGBA.MEDIUMAQUAMARINE = new ColorRGBA('#66CDAA');
ColorRGBA.MEDIUMBLUE = new ColorRGBA('#0000CD');
ColorRGBA.MEDIUMORCHID = new ColorRGBA('#BA55D3');
ColorRGBA.MEDIUMPURPLE = new ColorRGBA('#9370DB');
ColorRGBA.MEDIUMSEAGREEN = new ColorRGBA('#3CB371');
ColorRGBA.MEDIUMSLATEBLUE = new ColorRGBA('#7B68EE');
ColorRGBA.MEDIUMSPRINGGREEN = new ColorRGBA('#00FA9A');
ColorRGBA.MEDIUMTURQUOISE = new ColorRGBA('#48D1CC');
ColorRGBA.MEDIUMVIOLETRED = new ColorRGBA('#C71585');
ColorRGBA.MIDNIGHTBLUE = new ColorRGBA('#191970');
ColorRGBA.MINTCREAM = new ColorRGBA('#F5FFFA');
ColorRGBA.MISTYROSE = new ColorRGBA('#FFE4E1');
ColorRGBA.MOCCASIN = new ColorRGBA('#FFE4B5');
ColorRGBA.NAVY = new ColorRGBA('#000080');
ColorRGBA.OLDLACE = new ColorRGBA('#FDF5E6');
ColorRGBA.OLIVE = new ColorRGBA('#808000');
ColorRGBA.OLIVEDRAB = new ColorRGBA('#6B8E23');
ColorRGBA.ORANGE = new ColorRGBA('#FFA500');
ColorRGBA.ORANGERED = new ColorRGBA('#FF4500');
ColorRGBA.ORCHID = new ColorRGBA('#DA70D6');
ColorRGBA.PALEGOLDENROD = new ColorRGBA('#EEE8AA');
ColorRGBA.PALEGREEN = new ColorRGBA('#98FB98');
ColorRGBA.PALETURQUOISE = new ColorRGBA('#AFEEEE');
ColorRGBA.PALEVIOLETRED = new ColorRGBA('#DB7093');
ColorRGBA.PAPAYAWHIP = new ColorRGBA('#FFEFD5');
ColorRGBA.PEACHPUFF = new ColorRGBA('#FFDAB9');
ColorRGBA.PERU = new ColorRGBA('#CD853F');
ColorRGBA.PINK = new ColorRGBA('#FFC0CB');
ColorRGBA.PLUM = new ColorRGBA('#DDA0DD');
ColorRGBA.POWDERBLUE = new ColorRGBA('#B0E0E6');
ColorRGBA.PURPLE = new ColorRGBA('#800080');
ColorRGBA.REBECCAPURPLE = new ColorRGBA('#663399');
ColorRGBA.RED = new ColorRGBA('#FF0000');
ColorRGBA.ROSYBROWN = new ColorRGBA('#BC8F8F');
ColorRGBA.ROYALBLUE = new ColorRGBA('#4169E1');
ColorRGBA.SADDLEBROWN = new ColorRGBA('#8B4513');
ColorRGBA.SALMON = new ColorRGBA('#FA8072');
ColorRGBA.SANDYBROWN = new ColorRGBA('#F4A460');
ColorRGBA.SEAGREEN = new ColorRGBA('#2E8B57');
ColorRGBA.SEASHELL = new ColorRGBA('#FFF5EE');
ColorRGBA.SIENNA = new ColorRGBA('#A0522D');
ColorRGBA.SILVER = new ColorRGBA('#C0C0C0');
ColorRGBA.SKYBLUE = new ColorRGBA('#87CEEB');
ColorRGBA.SLATEBLUE = new ColorRGBA('#6A5ACD');
ColorRGBA.SLATEGRAY = new ColorRGBA('#708090');
ColorRGBA.SLATEGREY = new ColorRGBA('#708090');
ColorRGBA.SNOW = new ColorRGBA('#FFFAFA');
ColorRGBA.SPRINGGREEN = new ColorRGBA('#00FF7F');
ColorRGBA.STEELBLUE = new ColorRGBA('#4682B4');
ColorRGBA.TAN = new ColorRGBA('#D2B48C');
ColorRGBA.TEAL = new ColorRGBA('#008080');
ColorRGBA.THISTLE = new ColorRGBA('#D8BFD8');
ColorRGBA.TOMATO = new ColorRGBA('#FF6347');
ColorRGBA.TURQUOISE = new ColorRGBA('#40E0D0');
ColorRGBA.VIOLET = new ColorRGBA('#EE82EE');
ColorRGBA.WHEAT = new ColorRGBA('#F5DEB3');
ColorRGBA.WHITE = new ColorRGBA('#FFFFFF');
ColorRGBA.WHITESMOKE = new ColorRGBA('#F5F5F5');
ColorRGBA.YELLOW = new ColorRGBA('#FFFF00');
ColorRGBA.YELLOWGREEN = new ColorRGBA('#9ACD32');
export default ColorRGBA;
//# sourceMappingURL=ColorRGBA.js.map