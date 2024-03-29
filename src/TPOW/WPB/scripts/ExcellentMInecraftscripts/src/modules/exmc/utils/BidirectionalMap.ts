export default class BidirectionalMap<K, V> extends Map<K | V, V | K>{
    override has<T extends (K | V)>(key: T): boolean {
        return this.has(key);
    }
    override get<T extends (K | V)>(key: T): T extends K ? V : K {
        return this.get(key);
    }
    override set(key: K | V, value: K | V): this {
        super.set(key, value);
        super.set(value, key);
        return this;
    }
    override delete(key: K | V): boolean {
        return super.delete(key) && super.delete(this.get(key));
    }
}