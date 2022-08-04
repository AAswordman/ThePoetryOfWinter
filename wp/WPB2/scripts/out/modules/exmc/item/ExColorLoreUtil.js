import LoreUtil from "./ExLoreUtil.js";
export default class ExColorLoreUtil extends LoreUtil {
    getValueUseMap(key, use) {
        let res = super.getValueUseMap("§r§l§f" + key, "§r§o§b" + use);
        return (res === null || res === void 0 ? void 0 : res.startsWith("§")) ? res.substring(6) : res;
    }
    setValueUseMap(key, use, value) {
        super.setValueUseMap("§r§l§f" + key, "§r§o§b" + use, "§r§o§e" + value);
    }
    *entrys(key) {
        for (let i of super.entrys(key)) {
            yield [i[0].startsWith("§") ? i[0].substring(6) : i[0], i[1].startsWith("§") ? i[1].substring(6) : i[1]];
        }
    }
}
//# sourceMappingURL=ExColorLoreUtil.js.map