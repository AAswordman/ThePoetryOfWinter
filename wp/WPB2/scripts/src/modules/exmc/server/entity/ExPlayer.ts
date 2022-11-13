import { Player, Entity } from '@minecraft/server';
import ExCommandSelector from '../env/ExCommandSelector.js';
import { to } from "../ExErrorQueue.js";
import ExEntity from "./ExEntity.js";
import { ExPlayerBag } from "./ExEntityBag.js";


export default class ExPlayer extends ExEntity{
    

    public title(title: string,subtitle?: string) {
        this.runCommandAsync(`titleraw @s title {"rawtext":[{"text":"${title}"}]}`);
        if(subtitle)this.runCommandAsync(`titleraw @s subtitle {"rawtext":[{"text":"${subtitle}"}]}`);
    }
    public titleActionBar(str:string){
        this.runCommandAsync(`titleraw @s actionbar {"rawtext":[{"text":"${str}"}]}`);
    }
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