import LoreUtil from "./ExLoreUtil.js";
export default class ExColorLoreUtil {
    constructor(item) {
        this.lore = new LoreUtil(item);
    }
    setTag(key) {
        this.lore.setTag("§r§n§6" + key);
    }
    hasTag(key) {
        let res = this.lore.hasTag(key.startsWith("§") ? key : "§r§n§6" + key);
        return res;
    }
    getValueUseMap(key, use) {
        let res = this.lore.getValueUseMap("§r§l§f" + key, "§r§o§b" + use);
        return (res === null || res === void 0 ? void 0 : res.startsWith("§")) ? res.substring(6) : res;
    }
    setValueUseMap(key, use, value) {
        this.lore.setValueUseMap("§r§l§f" + key, "§r§o§b" + use, "§r§o§e" + value);
    }
    setValueUseDefault(key, value) {
        this.lore.setValueUseDefault("§r§l§f" + key, "§r§o§e" + value);
    }
    getValueUseDefault(key) {
        return this.lore.getValueUseDefault("§r§l§f" + key);
    }
    *entries(key) {
        for (let i of this.lore.entries(key)) {
            yield [this.lore.removeColorCode(i[0]), this.lore.removeColorCode(i[1])];
        }
    }
    sort() {
        this.lore.sort();
    }
    setLore(l) {
        this.lore.setLore(l);
    }
    delete(name) {
        this.lore.delete("§r§l§f" + name);
        this.lore.delete("§r§n§6" + name);
    }
    search(name) {
        return this.lore.search("§r§l§f" + name) || this.lore.search("§r§n§6" + name);
    }
}
//# sourceMappingURL=ExColorLoreUtil.js.map