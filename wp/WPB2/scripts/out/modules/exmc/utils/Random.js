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
}
Random.MAX_VALUE = Math.pow(2, 32) - 1;
//# sourceMappingURL=Random.js.map