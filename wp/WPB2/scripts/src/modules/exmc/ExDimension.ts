import { Dimension, EntityQueryOptions } from "mojang-minecraft";
import ExCommandRunner from './interface/ExCommandRunner.js';

export default class ExDimension implements ExCommandRunner{
	private _dimension: Dimension;
	
	constructor(dimension:Dimension){
		this._dimension = dimension;
		
	}

	getPlayers(entityQueryOptions:EntityQueryOptions | undefined = undefined){
		return this._dimension.getPlayers(entityQueryOptions);
	}

	getEntities(entityQueryOptions:EntityQueryOptions | undefined = undefined){
			return this._dimension.getEntities(entityQueryOptions);
	}
	
	runCommand(str:string){
		return this._dimension.runCommand(str);
	}

	
}