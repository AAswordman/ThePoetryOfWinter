import { Block, world, BlockType, BlockTypes } from '@minecraft/server';
import ExDimension from '../ExDimension.js';
import Vector3 from "../../math/Vector3.js";
import { AlsoInstanceType } from '../../utils/tool.js';

if (Block.prototype === undefined) Block.prototype = {} as any;

const compId = {

};
type CompId = typeof compId;

declare module "@minecraft/server" {
    export interface Block {
        addTag(tag: string): string;
        removeTag(tag: string): string;
        getComponentById<T extends keyof CompId>(key: T): AlsoInstanceType<CompId[T]> | undefined;
        get position(): Vector3;
        transTo(blockId: string | BlockType): void;
    }
}
Object.assign(Block.prototype, {
    addTag: function (tag: string): string {
        throw new Error("cant add tag");
    },
    removeTag: function (tag: string): string {
        throw new Error("cant remove tag");
    },
    getComponentById<T extends keyof CompId>(key: T) {
        return (this as unknown as Block).getComponent(key);
    },
    get position() {
        return new Vector3(this);
    },
    transTo(blockId: string | BlockType) {
        (this as unknown as Block).dimension.getBlock(this as unknown as Block)
            ?.setType(typeof blockId === "string" ? <BlockType>BlockTypes.get(blockId) : blockId);
    }
});