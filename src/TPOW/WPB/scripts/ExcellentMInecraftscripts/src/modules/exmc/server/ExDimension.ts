import { Dimension, EntityQueryOptions, Block, ItemStack, Entity, BlockType, ExplosionOptions, MolangVariableMap, BlockTypes, BlockFillOptions } from '@minecraft/server';
import { ExCommandNativeRunner } from '../interface/ExCommandRunner.js';
import Vector3, { IVector3 } from "../math/Vector3.js";
import ExGameConfig from './ExGameConfig.js';
import ExCommand from './env/ExCommand.js';
import { ignorn } from './ExErrorQueue.js';

export default class ExDimension implements ExCommandNativeRunner {
    public command = new ExCommand(this);

    spawnParticle(p: string, v: IVector3, varMap = new MolangVariableMap()) {
        try {
            this._dimension.spawnParticle(p, v, varMap);
            return true;
        } catch (e) {
            return false;
        }
    }
    createExplosion(location: IVector3, radius: number, explosionOptions?: ExplosionOptions): void {
        //console.warn(location, radius, explosionOptions);
        this._dimension.createExplosion(location, radius, explosionOptions);
    }

    private _dimension: Dimension;

    get dimension() {
        return this._dimension;
    }

    constructor(dimension: Dimension) {
        this._dimension = dimension;
    }

    getPlayers(entityQueryOptions?: EntityQueryOptions) {
        return this._dimension.getPlayers(entityQueryOptions);
    }

    getEntities(entityQueryOptions?: EntityQueryOptions) {
        let entities = this._dimension.getEntities(entityQueryOptions);
        let res: Entity[] = [];
        for (let entity of entities) {
            if (entity && entity.dimension == this._dimension) res.push(entity);
        }
        return res;
    }
    getBlock(vec: IVector3) {
        return ignorn(() => this._dimension.getBlock(vec));
    }
    fillBlocks(start: IVector3, end: IVector3, blockId: string | BlockType, option?: BlockFillOptions) {
        // console.warn("fillBlocks", start, end, blockId);
        if (typeof blockId === "string") blockId = <BlockType>BlockTypes.get(blockId);
        this.dimension.fillBlocks(start, end, blockId, option);
        //b?.permutation;

    }
    setBlock(vec: IVector3, blockId: string | BlockType) {
        if (typeof blockId === "string") blockId = <BlockType>BlockTypes.get(blockId);
        let b = this.getBlock(vec);
        b?.setType(blockId);
        //b?.permutation;

    }
    setBlockAsync(vec: IVector3, blockId: string) {
        this.runCommandAsync(`setBlock ${vec.x} ${vec.y} ${vec.z} ${blockId}`);

    }
    digBlock(vec: IVector3) {
        try {
            this.command.run(`setBlock ${vec.x} ${vec.y} ${vec.z} air [] destroy`);
            return true;
        } catch (e) {
            return false;
        }
    }
    spawnItem(item: ItemStack, v: IVector3) {
        try {
            return this._dimension.spawnItem(item, v)
        } catch (error) {
            ExGameConfig.console.warn(error);
            return undefined;
        };
    }

    spawnEntity(id: string, v: IVector3) {
        try {
            return this._dimension.spawnEntity(id, v);
        } catch (error) {
            ExGameConfig.console.warn(error);
            return undefined;
        }
    }

    runCommandAsync(str: string) {
        return this._dimension.runCommandAsync(str);
    }
    static propertyNameCache = "exCache";
    static getInstance(source: Dimension): ExDimension {
        let dimension = <any>source;
        if (this.propertyNameCache in dimension) {
            return dimension[this.propertyNameCache];
        }
        return (dimension[this.propertyNameCache] = new ExDimension(dimension));
    }

}