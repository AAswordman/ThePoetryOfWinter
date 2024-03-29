import ExLoreManager from "../../interface/ExLoreManager.js";
import LoreUtil, { Piece } from "./ExLoreUtil.js";

export default class ExColorLoreUtil{
    lore:LoreUtil;
    constructor(item: ExLoreManager) {
        this.lore = new LoreUtil(item);
    }
    getValueUseMap(key: string, use: string): string | undefined {
        let res = this.lore.getValueUseMap("§r§l" + key, "§r§o§b" + use);
        return res?.startsWith("§") ? res.substring(6) : res;
    }
    setValueUseMap(key: string, use: string, value: string): void {
        this.lore.setValueUseMap("§r§l" + key, "§r§o§b" + use, "§r§o§e" + value);
    }
    setValueUseDefault(key:string, value: string|number): void {
        this.lore.setValueUseDefault("§r§b" + key,(typeof value === "number" ? "§r§e":"§r§a") + value);
    }
    getValueUseDefault(key:string) {
        return this.lore.getValueUseDefault("§r§l" + key);
    }
    *entries(key?: string) {
        for (let i of this.lore.entries("§r§l"+key)) {
            yield [this.lore.removeColorCode(i[0]), this.lore.removeColorCode(i[1])];
        }
    }
    sort(){
        this.lore.sort();
    }
    setLore(l: string[]): void {
        this.lore.setLore(l);
    }
    delete(name:string){
        this.lore.delete("§r§l" + name);
        this.lore.delete("§r§b" + name);
    }
    search(name:string){
        return this.lore.search("§r§l" + name) || this.lore.search("§r§b" + name);
    }
    setTags(str:string[]){
        this.lore.setTags(str);
    }
    getTags(){
        return this.lore.getTags();
    }
}