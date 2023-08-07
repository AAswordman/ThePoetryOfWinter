export default class BidirectionalMap extends Map {
    has(key) {
        return this.has(key);
    }
    get(key) {
        return this.get(key);
    }
    set(key, value) {
        super.set(key, value);
        super.set(value, key);
        return this;
    }
    delete(key) {
        return super.delete(key) && super.delete(this.get(key));
    }
}
//# sourceMappingURL=BidirectionalMap.js.map