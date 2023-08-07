import { Block, MinecraftBlockTypes } from '@minecraft/server';
import Vector3 from "../../math/Vector3.js";
if (Block.prototype === undefined)
    Block.prototype = {};
const compId = {};
Object.assign(Block.prototype, {
    addTag: function (tag) {
        throw new Error("cant add tag");
    },
    removeTag: function (tag) {
        throw new Error("cant remove tag");
    },
    getComponentById(key) {
        return this.getComponent(key);
    },
    get position() {
        return new Vector3(this);
    },
    transTo(blockId) {
        var _a;
        (_a = this.dimension.getBlock(this)) === null || _a === void 0 ? void 0 : _a.setType(typeof blockId === "string" ? MinecraftBlockTypes.get(blockId) : blockId);
    }
});
//# sourceMappingURL=ExBlock.js.map