import Random from './Random.js';
export default class ExSystem {
    static getId(x) {
        if (this.idMap.has(x)) {
            return this.idMap.get(x);
        }
        else {
            this.idMap.set(x, Math.floor(Math.random() * Random.MAX_VALUE));
            return this.idMap.get(x);
        }
    }
}
ExSystem.idMap = new Map();
//# sourceMappingURL=ExSystem.js.map