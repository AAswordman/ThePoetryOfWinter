import ExServerTickDelayTask from '../server/ExServerTickDelayTask.js';
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
    static keys(obj) {
        const keys = Reflect.ownKeys(obj);
        let i = obj.__proto__;
        while (i) {
            for (let key of Reflect.ownKeys(i)) {
                keys.push(key);
            }
            i = i.__proto__;
        }
        return keys;
    }
    static parseObj(obj) {
        let k = ExSystem.keys(obj);
        let res = '{\n';
        for (const key of k) {
            const val = obj[key];
            if (val === null)
                (res += `${String(key)}: null\n`);
            if (typeof val != 'object')
                (res += `${String(key)}: ${typeof val === 'number' ? val : val}\n`);
            else
                (res += `${String(key)}: {...}\n`);
        }
        return res + '}';
    }
    static isServer() {
        return true;
    }
    static tickTask(tasks) {
        if (this.isServer()) {
            return new ExServerTickDelayTask(tasks);
        }
        else {
            return new ExServerTickDelayTask(tasks);
        }
    }
}
ExSystem.idMap = new WeakMap();
ExSystem.chineseCharMatcher = /([\u4E00-\u9FA5])+/;
//# sourceMappingURL=ExSystem.js.map