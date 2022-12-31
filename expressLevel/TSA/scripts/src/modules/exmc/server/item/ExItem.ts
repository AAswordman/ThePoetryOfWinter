import { ItemEnchantsComponent, ItemStack } from "@minecraft/server";
import ExLoreManager from "../../interface/ExLoreManager.js";

export default class ExItem implements ExLoreManager{
	getItem(): ItemStack {
		return this._item;
	}
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
		return this._item.getLore()??[];
	}
	setLore(lore: string[]) {
		if(lore.indexOf(" ")!==-1) lore.splice(lore.indexOf(" "),1);
		this._item.setLore(lore.length == 0 ? [Math.random() > 0.9 ? "mojang nmsl" : " "] : lore);
	}
	getComponent(str: string) {
		return this._item.getComponent(str);
	}
	hasComponent(str: string) {
		return this._item.hasComponent(str);
	}
	getEnchantsComponent():ItemEnchantsComponent{
		return <ItemEnchantsComponent>this.getComponent("minecraft:enchantments");
	}
	hasEnchantsComponent() {
		return this.hasComponent("minecraft:enchantments");
	}
}