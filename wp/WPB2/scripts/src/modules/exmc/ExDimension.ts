import { Dimension, EntityQueryOptions, Block, ItemStack, Entity } from 'mojang-minecraft';
import ExCommandRunner from './interface/ExCommandRunner.js';
import Vector3 from "./utils/Vector3.js";

export default class ExDimension implements ExCommandRunner{
	private _dimension: Dimension;
	
	constructor(dimension:Dimension){
		this._dimension = dimension;
	}

	getPlayers(entityQueryOptions:EntityQueryOptions | undefined = undefined){
		return this._dimension.getPlayers(entityQueryOptions);
	}

	getEntities(entityQueryOptions:EntityQueryOptions | undefined = undefined){
		let entities = this._dimension.getEntities(entityQueryOptions);
		let res:Entity[] = [];
		for(let entity of entities){
			if(entity.dimension === this._dimension) res.push(entity);
		}
		return res;
	}
	getBlock(vec:Vector3){
		return this._dimension.getBlock(vec.getBlockLocation());
	}
	setBlock(vec:Vector3,blockId:string){
		this.runCommand(`setBlock ${vec.x} ${vec.y} ${vec.z} ${blockId}`)
		
	}
	spawnItem(item:ItemStack,v:Vector3){
		this._dimension.spawnItem(item,v.getLocation());
	}


	runCommand(str:string){
		return this._dimension.runCommand(str);
	}
	runCommandAsync(str:string){
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