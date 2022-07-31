import { Player } from "mojang-minecraft";
import ExEntity from "./ExEntity.js";
import { ExPlayerBag } from "./ExEntityBag.js";


export default class ExPlayer extends ExEntity{
	public get selectedSlot() {
		return (<Player>this.entity).selectedSlot;
	}
	public set selectedSlot(value: number) {
		(<Player>this.entity).selectedSlot = value;
	}

	constructor(player: Player){
		super(player);
	}

	public override getBag() {
		return new ExPlayerBag(this);
	}

	static override getInstance(source: Player): ExPlayer {
		let entity = <any>source;
		if (this.propertyNameCache in entity) {
			return entity[this.propertyNameCache];
		}
		return (entity[this.propertyNameCache] = new ExPlayer(entity));
	}
}