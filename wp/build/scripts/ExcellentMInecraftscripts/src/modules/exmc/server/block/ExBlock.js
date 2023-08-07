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
        this.dimension.getBlock(this)
            ?.setType(typeof blockId === "string" ? MinecraftBlockTypes.get(blockId) : blockId);
    }
});
