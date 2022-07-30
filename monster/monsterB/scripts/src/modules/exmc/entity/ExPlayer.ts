
import { Player } from "mojang-minecraft";
import ExEntity from "./ExEntity.js";
import ExPlayerBag from "./ExPlayerBag.js";


export default class ExPlayer extends ExEntity{
	constructor(player: Player){
		super(player);
	}
	getBag(){
		return new ExPlayerBag(<Player>this.entity);
	}
}