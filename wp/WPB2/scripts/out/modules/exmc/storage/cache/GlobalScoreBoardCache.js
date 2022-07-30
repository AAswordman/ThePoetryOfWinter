import ExNullEntity from '../../entity/ExNullEntity.js';
export default class GlobalScoreBoardCache {
    constructor(objective) {
        this.entity = new ExNullEntity("");
        this.objective = objective;
        objective.create("cache:" + objective.name);
    }
    debug() {
        this.objective.setDisplay();
    }
    setBoolean(name, value) {
        this.setNumber(name, value ? 1 : 0);
    }
    getBoolean(name) {
        return this.getNumber(name) === 1;
    }
    setNumber(name, value) {
        this.entity.nameTag = name;
        this.entity.getScoresManager().setScore(this.objective, value);
    }
    getNumber(name) {
        this.entity.nameTag = name;
        return this.entity.getScoresManager().getScore(this.objective);
    }
    deleteNumber(name) {
        this.entity.nameTag = name;
        return this.entity.getScoresManager().deleteScore(this.objective);
    }
    getList(name) {
        if (name + "__cache" in GlobalScoreBoardCache) {
            return GlobalScoreBoardCache[name + "__cache"];
        }
        else {
            return (GlobalScoreBoardCache[name + "__cache"] = new GlobalScoreBoardCacheList(this, name));
        }
    }
    setList(name, value) {
        if (value.length > 99)
            throw new Error("Too many childs");
        this.getList(name)
            .reset(value);
    }
}
export class GlobalScoreBoardCacheList {
    constructor(cache, name) {
        this.src = [];
        this.cache = cache;
        this.name = name;
        this.src = [];
        for (let i = 0; i < this.mlength; i++) {
            this.src.push(this.cache.getNumber(this.name + "__" + i));
            this[i] = this.src[i];
        }
    }
    reset(src) {
        this.clearData();
        this.push(...src);
    }
    clearData() {
        for (let i = 0; i < this.mlength; i++) {
            this.cache.deleteNumber(this.name + "__" + i);
            delete this[i];
        }
        this.mlength = 0;
        this.src = [];
    }
    get length() {
        return this.src.length;
    }
    get mlength() {
        return this.cache.getNumber(this.name + "__len");
    }
    set mlength(len) {
        this.cache.setNumber(this.name + "__len", len);
    }
    toList() {
        return this.src;
    }
    toString() {
        return this.src.toString();
    }
    toLocaleString() {
        return this.src.toLocaleString();
    }
    pop() {
        if (this.length === 0) {
            return undefined;
        }
        this.mlength--;
        let len = this.mlength;
        this.cache.deleteNumber(this.name + "__" + len);
        delete this[len];
        return this.src.pop();
    }
    push(...items) {
        for (let i of items) {
            this.cache.setNumber(this.name + "__" + this.mlength, i);
            this[this.mlength] = i;
            this.mlength++;
        }
        this.src.push(...items);
        return this.mlength;
    }
    concat(...items) {
        throw new Error("Method not implemented.");
    }
    join(separator) {
        return this.toList().join(separator);
    }
    reverse() {
        return this.toList().reverse();
    }
    shift() {
        throw new Error("No way!!!");
    }
    slice(start, end) {
        return this.toList().slice(start, end);
    }
    sort(compareFn) {
        throw new Error("Method not implemented.");
    }
    splice(start, deleteCount, ...rest) {
        throw new Error("Method not implemented.");
    }
    unshift(...items) {
        throw new Error("Method not implemented.");
    }
    indexOf(searchElement, fromIndex) {
        return this.toList().indexOf(searchElement, fromIndex);
    }
    lastIndexOf(searchElement, fromIndex) {
        return this.toList().lastIndexOf(searchElement, fromIndex);
    }
    every(predicate, thisArg) {
        throw new Error("Method not implemented.");
    }
    some(predicate, thisArg) {
        throw new Error("Method not implemented.");
    }
    forEach(callbackfn, thisArg) {
        this.src.forEach(callbackfn, thisArg);
    }
    map(callbackfn, thisArg) {
        return this.src.map(callbackfn, thisArg);
    }
    filter(predicate, thisArg) {
        throw new Error("Method not implemented.");
    }
    reduce(callbackfn, initialValue) {
        throw new Error("Method not implemented.");
    }
    reduceRight(callbackfn, initialValue) {
        throw new Error("Method not implemented.");
    }
    find(predicate, thisArg) {
        throw new Error("Method not implemented.");
    }
    findIndex(predicate, thisArg) {
        throw new Error("Method not implemented.");
    }
    fill(value, start, end) {
        throw new Error("Method not implemented.");
    }
    copyWithin(target, start, end) {
        throw new Error("Method not implemented.");
    }
    entries() {
        return this.toList().entries();
    }
    keys() {
        return this.toList().keys();
    }
    values() {
        return this.toList().values();
    }
    *[Symbol.iterator]() {
        for (let i of this.src) {
            yield i;
        }
    }
    [Symbol.unscopables]() {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=GlobalScoreBoardCache.js.map