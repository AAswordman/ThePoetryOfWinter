import { ItemStack } from "mojang-minecraft";
import ExLoreManager from "../interface/ExLoreManager.js";

export default class ExItem implements ExLoreManager{
	static propertyNameCache = "exCache";

	private _item: ItemStack;
	constructor(item:ItemStack){
		this._item = item;
	}
	static getInstance(source: ItemStack): ExItem {
		let item = <any>source;
		if (this.propertyNameCache in item) {
			return item[this.propertyNameCache];
		}
		return (item[this.propertyNameCache] = new ExItem(item));
	}
	getLore(): string[] {
		return this._item.getLore();
	}
	setLore(lore: string[]): void {
		this._item.setLore(lore);
	}
}