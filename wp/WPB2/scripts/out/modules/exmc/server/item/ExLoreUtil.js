import ExGameConfig from "../ExGameConfig.js";
export default class LoreUtil {
    constructor(item) {
        this.item = item;
    }
    append(str) {
        let i = this.getLore();
        i.push(str);
        this.setLore(i);
    }
    insert(index, str) {
        let i = this.getLore();
        i.splice(index, 0, str);
        this.setLore(i);
    }
    getLore() {
        return this.item.getLore();
    }
    setLore(lore) {
        this.item.setLore(lore);
    }
    search(key) {
        let lore = this.getLore();
        for (let i = 0; i < lore.length; i++) {
            if (lore[i].startsWith(key + " : ")) {
                return new Piece(this.item, i);
            }
        }
        return undefined;
    }
    getValueUseDefault(key) {
        let piece = this.search(key);
        if (!piece)
            return undefined;
        // key : value
        return piece.get().substring(key.length + 3);
    }
    hasTag(key) {
        let lore = this.getLore();
        for (let i of lore) {
            if (i.startsWith(key))
                return true;
        }
        return false;
    }
    getValueUseRepeat(key) {
        let value = this.getValueUseDefault(key);
        if (!value)
            return 0;
        return value.length;
    }
    getValueUseMap(key, use) {
        let tab = "  ";
        let piece = this.search(key);
        if (!piece)
            return undefined;
        while (piece.hasNext()) {
            piece.next();
            if (piece.get().startsWith(tab)) {
                if (piece.get().startsWith(tab + use + " : ")) {
                    return piece.get().substring(tab.length + 3 + use.length);
                }
            }
            else {
                break;
            }
        }
        return undefined;
    }
    setValueUseDefault(key, value) {
        let piece = this.search(key);
        if (!piece) {
            this.append(key + " : " + value);
            return;
        }
        // key : value
        piece.revise(key + " : " + value).set();
    }
    setTag(key) {
        if (this.hasTag(key))
            return;
        this.append(key);
    }
    setValueUseRepeat(key, value, num) {
        this.setValueUseDefault(key, new Array(num).fill(value).join(""));
    }
    *entries(key) {
        if (key) {
            let tab = "  ";
            let piece = this.search(key);
            if (!piece) {
                return;
            }
            while (piece.hasNext()) {
                piece.next();
                if (piece.get().startsWith(tab)) {
                    yield [...piece.get().trim().split(" : ")];
                }
                else {
                    break;
                }
            }
            return;
        }
        else {
            for (let i of this.getLore()) {
                yield [...i.trim().split(" : ")];
            }
            return;
        }
    }
    setValueUseMap(key, use, value) {
        let tab = "  ";
        let piece = this.search(key);
        if (!piece) {
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
            }
            else {
                break;
            }
        }
        piece = this.search(key);
        if (!piece) {
            ExGameConfig.console.error("Could not find " + key + " : " + value + " in lore");
            return;
        }
        this.insert(piece.index + 1, tab + use + " : " + value);
    }
    delete(key) {
        let tab = "  ";
        let piece = this.search(key);
        if (!piece) {
            return;
        }
        let l = 1;
        let i = piece.index;
        while (piece.hasNext()) {
            piece.next();
            if (piece.get().startsWith(tab)) {
                l++;
            }
            else {
                break;
            }
        }
        let res = this.getLore();
        res.splice(i, l);
        this.setLore(res);
    }
    sort() {
        var _a;
        const sortFunc = (a, b) => this.removeColorCode(a) > this.removeColorCode(b) ? 1 : -1;
        let res = [];
        let keylist = [];
        let keyMap = new Map();
        let tab = "  ";
        let key = "";
        let piece = new Piece(this, -1);
        while (piece.hasNext()) {
            piece.next();
            if (!piece.get().startsWith(tab)) {
                if (piece.hasNext()) {
                    if (piece.next().get().startsWith(tab)) {
                        const k = piece.pre().get().split(" : ");
                        key = k[0];
                        keylist.push(key);
                        keyMap.set(key, []);
                        continue;
                    }
                    piece.pre();
                }
                res.push(piece.get());
            }
            else {
                (_a = keyMap.get(key)) === null || _a === void 0 ? void 0 : _a.push(piece.get().trim());
            }
        }
        res = res.sort(sortFunc);
        keylist = keylist.sort(sortFunc);
        for (let k of keylist) {
            let arr = Array.from(keyMap.get(k).sort(sortFunc));
            res.push(k + " : ");
            res = res.concat(arr.map((e) => tab + e));
        }
        this.setLore(res);
    }
    removeColorCode(s) {
        while (s.startsWith("§"))
            s = s.substring(2);
        return s;
    }
}
export class Piece {
    constructor(item, index) {
        this.item = item;
        this.lore = item.getLore();
        this.index = index;
    }
    set() {
        this.item.setLore(this.lore);
    }
    revise(str) {
        this.lore[this.index] = str;
        return this;
    }
    pre() {
        this.index--;
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
        return this;
    }
}
//# sourceMappingURL=ExLoreUtil.js.map