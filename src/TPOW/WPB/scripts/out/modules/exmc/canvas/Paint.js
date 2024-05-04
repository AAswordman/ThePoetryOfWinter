import ColorRGBA from "./ColorRGBA.js";
export var Style;
(function (Style) {
    Style[Style["FILL"] = 0] = "FILL";
    Style[Style["STROKE"] = 1] = "STROKE";
    Style[Style["FILL_AND_STROKE"] = 2] = "FILL_AND_STROKE";
})(Style || (Style = {}));
export var Align;
(function (Align) {
    Align[Align["LEFT"] = 0] = "LEFT";
    Align[Align["CENTER"] = 1] = "CENTER";
    Align[Align["RIGHT"] = 2] = "RIGHT";
})(Align || (Align = {}));
export default class Paint {
    constructor() {
        this.color = ColorRGBA.BLACK;
        this.strokeWidth = 1;
        this.style = Style.FILL;
    }
}
//# sourceMappingURL=Paint.js.map