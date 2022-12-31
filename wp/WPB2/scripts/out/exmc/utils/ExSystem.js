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
    static hasChineseCharacter(str) {
        return this.chineseCharMatcher.test(str);
    }
}
ExSystem.idMap = new Map();
ExSystem.chineseCharMatcher = /^([\u4E00-\u9FA5])*$/;
//# sourceMappingURL=ExSystem.js.map