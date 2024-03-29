import ColorRGBA from "./ColorRGBA.js";

export enum Style {
    FILL, STROKE, FILL_AND_STROKE
}
export enum Align {
    LEFT, CENTER, RIGHT
}

export default class Paint {
    color: ColorRGBA;
    strokeWidth: number;
    style: Style; 

    constructor() {
        this.color = ColorRGBA.BLACK;
        this.strokeWidth = 1;
        this.style = Style.FILL;
    }
}