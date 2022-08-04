import { Block, world } from 'mojang-minecraft';
import ExDimension from '../ExDimension.js';
import Vector3 from "../utils/Vector3.js";


export default class ExBlock{
	private _block: Block;
	constructor(block: Block) {
		this._block = block;
	}

	static propertyNameCache = "exCache";
	static getInstance(source: Block): ExBlock {
		let block = <any>source;
		if (this.propertyNameCache in block) {
			return block[this.propertyNameCache];
		}
		return (block[this.propertyNameCache] = new ExBlock(block));
	}

	getPosition(){
		return new Vector3(this._block);
	}
	transTo(blockId:string){
		ExDimension.getInstance(this._block.dimension).setBlock(this.getPosition(),blockId);
	}
}