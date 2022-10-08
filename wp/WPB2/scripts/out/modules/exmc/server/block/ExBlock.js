import ExDimension from '../ExDimension.js';
import Vector3 from "../../math/Vector3.js";
export default class ExBlock {
    constructor(block) {
        this._block = block;
    }
    static getInstance(source) {
        let block = source;
        if (this.propertyNameCache in block) {
            return block[this.propertyNameCache];
        }
        return (block[this.propertyNameCache] = new ExBlock(block));
    }
    getPosition() {
        return new Vector3(this._block);
    }
    transTo(blockId) {
        ExDimension.getInstance(this._block.dimension).setBlock(this.getPosition(), blockId);
    }
}
ExBlock.propertyNameCache = "exCache";
//# sourceMappingURL=ExBlock.js.map