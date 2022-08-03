
import ExGameConfig from "../ExGameConfig.js";
import ExGameClient from '../ExGameClient.js';
import ExLoreManager from '../interface/ExLoreManager.js';

export default class LoreUtil implements ExLoreManager {
	static LoreFlag = {
		DEFAULT: 0,
		TAG: 1,
		REPEAT: 2,
		MAP: 3
	};


	item: ExLoreManager;
	defFlag: number;

	append(str: string) {
		let l = this.getLore();
		l.push(str);
		this.setLore(l);
	}

	insert(index: number, str: string) {
		let l = this.getLore();
		l.splice(index, 0, str);
		this.setLore(l);
	}

	getLore() {
		return this.item.getLore() ?? [];
	}

	setLore(lore: string[]) {
		this.item.setLore(lore);
	}

	constructor(item: ExLoreManager) {
		this.item = item;
		this.defFlag = LoreUtil.LoreFlag.DEFAULT;
	}

	setFlag(flag: number) {
		this.defFlag = flag;
	}

	search(lore: string[], key: string) {
		for (let i = 0; i < lore.length; i++) {
			if (lore[i].startsWith(key + " : ")) {
				return new Piece(this.item, this.getLore(), i);
			}
		}
		return null;
	}

	get(flag: number, key: string): string;
	get(key: string): string;
	get(flag: number, key: string, subkey: string): string;
	get(key: string, subkey: string): string;
	get(flag: number, key: string): string;
	get(key: string): string;
	get(flag: number, tag: string): boolean;
	get(tag: string): boolean;
	get() {
		let index = 0;
		if (arguments.length < 1) {
			throw new Error("Illegal parameter");
		}

		let flag = arguments[index];
		if (typeof (flag) !== "number") {
			flag = this.defFlag;
		} else {
			index++;
		}
		if (flag == LoreUtil.LoreFlag.DEFAULT) {
			if (arguments.length > index + 1) ExGameConfig.console.warn("Exceeded parameter length. Maybe you didn't mean that?");
			return this.getValueUseDefault(arguments[index]);
		} else if (flag == LoreUtil.LoreFlag.TAG) {
			if (arguments.length > index + 1) ExGameConfig.console.warn("Exceeded parameter length. Maybe you didn't mean that?");
			return this.hasTag(arguments[index]);
		} else if (flag == LoreUtil.LoreFlag.REPEAT) {
			if (arguments.length > index + 1) ExGameConfig.console.warn("Exceeded parameter length. Maybe you didn't mean that?");
			return this.getValueUseRepeat(arguments[index]);
		} else if (flag == LoreUtil.LoreFlag.MAP) {
			if (arguments.length > index + 2) ExGameConfig.console.warn("Exceeded parameter length. Maybe you didn't mean that?");
			return this.getValueUseMap(arguments[index], arguments[index + 1]);
		}
	}

	getValueUseDefault(key: string) {
		let piece = this.search(this.getLore(), key);
		if (piece == null) return null;
		// key : value
		return piece.get().substring(key.length + 3);
	}


	hasTag(key: string) {
		if (key == null) throw new Error("Key cannot be empty");
		let lore = this.getLore();
		for (let i in lore) {
			if (lore[i] == key) return true;
		}
		return false;
	}

	getValueUseRepeat(key: string) {
		let value = this.getValueUseDefault(key);
		if (value == null) return 0;
		return value.length;
	}

	getValueUseMap(key: string, use: string) {
		let tab = "  ";
		let piece = this.search(this.getLore(), key);
		if (piece == null) return null;
		while (piece.hasNext()) {
			piece.next();
			if (piece.get().startsWith(tab)) {
				if (piece.get().startsWith(tab + use + " : ")) {
					return piece.get().substring(tab.length + 3 + use.length);
				}
			} else {
				break;
			}
		}
		return null;
	}

	set(flag: number, key: string, value: string): void;
	set(key: string, value: string): void;
	set(flag: number, key: string, value: string, subvalue: string): void;
	set(key: string, value: string, subvalue: string): void;
	set(flag: number, key: string, value: string, repeat: number): void;
	set(key: string, value: string, repeat: number): void;
	set(flag: number, tag: string): void;
	set(tag: string): void;
	set() {
		let index = 0;
		if (arguments.length < 1) {
			throw new Error("Illegal parameter");
		}

		let flag = arguments[index];
		if (typeof (flag) !== "number") {
			flag = this.defFlag;
		} else {
			index++;
		}
		if (flag == LoreUtil.LoreFlag.DEFAULT) {
			if (arguments.length > index + 2) ExGameConfig.console.warn("Exceeded parameter length. Maybe you didn't mean that?");
			return this.setValueUseDefault(arguments[index], arguments[index + 1]);
		} else if (flag == LoreUtil.LoreFlag.TAG) {
			if (arguments.length > index + 1) ExGameConfig.console.warn("Exceeded parameter length. Maybe you didn't mean that?");
			return this.setTag(arguments[index]);
		} else if (flag == LoreUtil.LoreFlag.REPEAT) {
			if (arguments.length > index + 3) ExGameConfig.console.warn("Exceeded parameter length. Maybe you didn't mean that?");
			return this.setValueUseRepeat(arguments[index], arguments[index + 1], arguments[index + 2]);
		} else if (flag == LoreUtil.LoreFlag.MAP) {
			if (arguments.length > index + 3) ExGameConfig.console.warn("Exceeded parameter length. Maybe you didn't mean that?");
			return this.setValueUseMap(arguments[index], arguments[index + 1], arguments[index + 2]);
		}
	}
	setValueUseDefault(key: string, value: string) {
		let piece = this.search(this.getLore(), key);

		if (piece == null) {
			this.append(key + " : " + value);
			return;
		}
		// key : value
		piece.revise(key + " : " + value).set();
	}

	setTag(key: string) {
		if (key == null) throw new Error("Key cannot be empty");
		if (this.hasTag(key)) return;
		this.append(key);
	}

	setValueUseRepeat(key: string, value: string, num: number) {
		if (value == null || num == null) throw new Error("Empty parameter");
		this.setValueUseDefault(key, new Array(num).fill(value).join(""));
	}

	setValueUseMap(key: string, use: string, value: string) {
		let tab = "  ";
		let piece = this.search(this.getLore(), key);
		if (piece == null) {
			this.append(key + " : ");
			this.append(tab + use + " : " + value);
			return;
		}
		while (piece.hasNext()) {
			piece.next();
			if (piece.get().startsWith(tab)) {
				if (piece.get().startsWith(tab + use + " : ")) {
					piece.revise(tab + use + " : " + value).set();
					return;
				}
			} else {
				break;
			}
		}
		piece = this.search(this.getLore(), key);
		if (piece == null) {
			ExGameConfig.console.error("Could not find " + key + " : " + value + " in lore");
			return;
		}
		this.insert(piece.index + 1, tab + use + " : " + value);
	}
	

}


class Piece {
	item: ExLoreManager;
	lore: string[];
	index: number;
	constructor(item: ExLoreManager, lore: string[], index: number) {
		this.item = item;
		this.lore = lore;
		this.index = index;
	}
	set() {
		this.item.setLore(this.lore);
	}
	revise(str: string) {
		this.lore[this.index] = str;
		return this;
	}
	get() {
		return this.lore[this.index];
	}
	hasNext() {
		return this.index + 1 < this.lore.length;
	}
	next() {
		this.index++;
	}
}