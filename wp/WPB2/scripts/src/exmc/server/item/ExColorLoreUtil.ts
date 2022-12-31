import LoreUtil,{Piece} from "./ExLoreUtil.js";

export default class ExColorLoreUtil extends LoreUtil {

    override getValueUseMap(key: string, use: string): string | null {
        let res = super.getValueUseMap("§r§l§f" + key, "§r§o§b" + use);
        return res?.startsWith("§") ? res.substring(6) : res;
    }
    override setValueUseMap(key: string, use: string, value: string): void {
        super.setValueUseMap("§r§l§f" + key, "§r§o§b" + use, "§r§o§e" + value);
    }
    override *entries(key?: string) {
        for (let i of super.entries(key)) {
            yield [i[0].startsWith("§") ? i[0].substring(6) : i[0], i[1].startsWith("§") ? i[1].substring(6) : i[1]];
        }
    }
    override search(key: string): Piece | null {
        let lore= this.getLore();
        key = (key.startsWith("§") ? key.substring(6) : key)
        for (let i = 0; i < lore.length; i++) {
            
            if ((lore[i].startsWith("§") ? lore[i].substring(6) : lore[i]).startsWith(key + " : ")) {
                return new Piece(this.item,i);
            }
        }
        return null;

    }
}