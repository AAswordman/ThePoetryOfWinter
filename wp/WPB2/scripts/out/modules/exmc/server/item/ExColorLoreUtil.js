import LoreUtil, { Piece } from "./ExLoreUtil.js";
export default class ExColorLoreUtil extends LoreUtil {
    setTag(key) {
        super.setTag("§r§n§6" + key);
    }
    hasTag(key) {
        let res = super.hasTag("§r§n§6" + key);
        return res;
    }
    getValueUseMap(key, use) {
        let res = super.getValueUseMap("§r§l§f" + key, "§r§o§b" + use);
        return (res === null || res === void 0 ? void 0 : res.startsWith("§")) ? res.substring(6) : res;
    }
    setValueUseMap(key, use, value) {
        super.setValueUseMap("§r§l§f" + key, "§r§o§b" + use, "§r§o§e" + value);
    }
    *entries(key) {
        for (let i of super.entries(key)) {
            yield [i[0].startsWith("§") ? i[0].substring(6) : i[0], i[1].startsWith("§") ? i[1].substring(6) : i[1]];
        }
    }
    search(key) {
        let lore = this.getLore();
        key = (key.startsWith("§") ? key.substring(6) : key);
        for (let i = 0; i < lore.length; i++) {
            if ((lore[i].startsWith("§") ? lore[i].substring(6) : lore[i]).startsWith(key + " : ")) {
                return new Piece(this.item, i);
            }
        }
        return null;
    }
}
//# sourceMappingURL=ExColorLoreUtil.js.map