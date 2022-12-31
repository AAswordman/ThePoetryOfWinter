export default class Random {
    constructor(seed) {
        this.seed = (seed || Date.now()) % 999999999;
    }
    next() {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        let val = this.seed / 233280.0;
        return val;
    }
    nextDouble() {
        return this.next();
    }
    nextLong() {
        return Math.floor(this.nextDouble() * Random.MAX_VALUE);
    }
    nextInt(max = Random.MAX_VALUE) {
        return Math.floor(this.nextDouble() * (max));
    }
    nextBoolean() {
        return this.nextDouble() >= 0.5;
    }
    static choice(o) {
        if (o instanceof Array) {
            if (o.length === 0) {
                throw new Error("array mustnot be empty");
            }
            return o[Math.floor(Math.random() * o.length)];
        }
        else {
            let arr = [];
            for (let i in o) {
                arr.push(i);
            }
            return o[Random.choice(arr)];
        }
    }
}
Random.MAX_VALUE = 1 << 32 - 1;
//# sourceMappingURL=Random.js.map