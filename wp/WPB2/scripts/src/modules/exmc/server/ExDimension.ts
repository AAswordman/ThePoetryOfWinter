import { Dimension, EntityQueryOptions, Block, ItemStack, Entity, BlockType, BlockLocation, ExplosionOptions, MolangVariableMap } from '@minecraft/server';
import ExCommandRunner from '../interface/ExCommandRunner.js';
import Vector3 from "../math/Vector3.js";
import ExGameConfig from './ExGameConfig.js';
import ExGameVector3 from './math/ExGameVector3.js';

export default class ExDimension implements ExCommandRunner {
    spawnParticle(p: string, v: Vector3) {
        this._dimension.spawnParticle(p,ExGameVector3.getLocation(v),new MolangVariableMap())
    }
    createExplosion(location: Vector3, radius: number, explosionOptions?: ExplosionOptions): void {
        //console.warn(location, radius, explosionOptions);
        this._dimension.createExplosion(ExGameVector3.getLocation(location), radius, explosionOptions);
    }

    private _dimension: Dimension;

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
            if (entity.dimension === this._dimension) res.push(entity);
        }
        return res;
    }
    getBlock(vec: Vector3 | BlockLocation) {
        return this._dimension.getBlock(vec instanceof Vector3 ? ExGameVector3.getBlockLocation(vec) : vec);
    }
    setBlock(vec: Vector3 | BlockLocation, blockId: string | BlockType, data?: number) {
        if (typeof blockId === "string") this.runCommandAsync(`setBlock ${vec.x} ${vec.y} ${vec.z} ${blockId} ${data}`);
        else {
            let b = this.getBlock(vec);
            b?.setType(blockId);
            //b?.permutation;
        };
    }
    setBlockAsync(vec: Vector3, blockId: string) {
        this.runCommandAsync(`setBlock ${vec.x} ${vec.y} ${vec.z} ${blockId}`);

    }
    digBlock(vec: Vector3) {
        try {
            this.runCommand(`setBlock ${vec.x} ${vec.y} ${vec.z} air 0 destroy`);
            return true;
        } catch (e) {
            return false;
        }
    }
    spawnItem(item: ItemStack, v: Vector3) {
        try {
            return this._dimension.spawnItem(item, ExGameVector3.getBlockLocation(v))
        } catch (error) {
            ExGameConfig.console.warn(error);
            return undefined;
        };
    }

    spawnEntity(id: string, v: Vector3) {
        try {
            return this._dimension.spawnEntity(id, ExGameVector3.getBlockLocation(v));
        } catch (error) {
            ExGameConfig.console.warn(error);
            return undefined;
        }
    }


    runCommand(str: string) {
        try {
            return this._dimension.runCommand(str);
        } catch (error) {
            return undefined;
        }

    }
    runCommandAsync(str: string) {
        return this._dimension.runCommandAsync(str).then((e) => { });
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