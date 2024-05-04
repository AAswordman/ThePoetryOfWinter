import LoreUtil from "./ExLoreUtil.js";
export default class ExColorLoreUtil {
    constructor(item) {
        this.lore = new LoreUtil(item);
    }
    getValueUseMap(key, use) {
        let res = this.lore.getValueUseMap("§r§l" + key, "§r§o§b" + use);
        return (res === null || res === void 0 ? void 0 : res.startsWith("§")) ? res.substring(6) : res;
    }
    setValueUseMap(key, use, value) {
        this.lore.setValueUseMap("§r§l" + key, "§r§o§b" + use, "§r§o§e" + value);
    }
    setValueUseDefault(key, value) {
        this.lore.setValueUseDefault("§r§b" + key, (typeof value === "number" ? "§r§e" : "§r§a") + value);
    }
    getValueUseDefault(key) {
        return this.lore.getValueUseDefault("§r§l" + key);
    }
    *entries(key) {
        for (let i of this.lore.entries("§r§l" + key)) {
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
        this.lore.delete("§r§l" + name);
        this.lore.delete("§r§b" + name);
    }
    search(name) {
        return this.lore.search("§r§l" + name) || this.lore.search("§r§b" + name);
    }
    setTags(str) {
        this.lore.setTags(str);
    }
    getTags() {
        return this.lore.getTags();
    }
}
//# sourceMappingURL=ExColorLoreUtil.js.map