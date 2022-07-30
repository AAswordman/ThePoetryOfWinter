
export default interface ExLoreManager {
	getLore(): string[];
	setLore(lore: string[]): void;
	/*
	get lore(){
		return this.getLore();
	}
	set lore(lore: string[]){
		this.setLore(lore);
	}
	*/
}