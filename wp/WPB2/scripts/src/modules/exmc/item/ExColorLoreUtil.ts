import LoreUtil from "./ExLoreUtil.js";

export default class ExColorLoreUtil extends LoreUtil{
    override getValueUseMap(key: string, use: string): string | null {
        let res = super.getValueUseMap("§r§l§f" + key,"§r§o§b" + use);
        return res?.startsWith("§") ? res.substring(6) :res;
    }
    override setValueUseMap(key: string, use: string, value: string): void {
        super.setValueUseMap("§r§l§f" + key,"§r§o§b" + use,"§r§o§e" + value);
    }
}