class t {
    constructor(t) {
        this.seed = (t || Date.now()) % 999999999
    }
    next() {
        return this.seed = (9301 * this.seed + 49297) % 233280, this.seed / 233280
    }
    nextDouble() {
        return this.next()
    }
    nextLong() {
        return Math.floor(this.nextDouble() * t.MAX_VALUE)
    }
    nextInt(e = t.MAX_VALUE) {
        return Math.floor(this.nextDouble() * e)
    }
}
t.MAX_VALUE = Math.pow(2, 32) - 1;
class e {
    constructor(t, e) {
        "number" == typeof t && "number" == typeof e ? (this.x = t, this.y = e) : void 0 === t && void 0 === e ? (this.x = 0, this.y = 0) : (this.x = t.x, this.y = t.y)
    }
    set(t, e) {
        return "number" == typeof t ? "number" == typeof e && (this.x = t, this.y = e) : this.set(t.x, t.y), this
    }
    add(t, e) {
        return "number" == typeof t ? "number" == typeof e && (this.x += t, this.y += e) : this.add(t.x, t.y), this
    }
    sub(t, e) {
        return "number" == typeof t ? "number" == typeof e && (this.x -= t, this.y -= e) : this.sub(t.x, t.y), this
    }
    scl(t, e, r) {
        return "number" == typeof t ? "number" == typeof e && "number" == typeof r ? (this.x *= t, this.y *= e) : void 0 === e && void 0 === r && (this.x *= t, this.y *= t) : this.sub(t.x, t.y), this
    }
    div(t) {
        return this.x /= t, this.y /= t, this
    }
    len() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
    }
    len2() {
        return Math.pow(this.x, 2) + Math.pow(this.y, 2)
    }
    equals(t) {
        return this.x === t.x && this.y === t.y
    }
    distance(t) {
        return this.clone().sub(t).len()
    }
    toString() {
        return `(${this.x}, ${this.y})`
    } [Symbol.toStringTag]() {
        return this.toString()
    }
    floor() {
        return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
    }
    round() {
        return this.x = Math.round(this.x), this.y = Math.round(this.y), this
    }
    ceil() {
        return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this
    }
    abs() {
        return this.x = Math.abs(this.x), this.y = Math.abs(this.y), this
    }
    mul(t) {
        return t.x * this.x + t.y * this.y
    }
    clone() {
        return new e(this.x, this.y)
    }
}
e.back = new e(0, -1), e.forward = new e(0, 1), e.left = new e(-1, 0), e.one = new e(1, 1), e.right = new e(1, 0), e.zero = new e(0, 0);
const r = Array.from(new Array(32), (() => new Array(32).fill(0)));
let s = 64,
    h = new t(623546),
    i = (t, e) => {
        try {
            return r[e][t]
        } catch (t) {
            return 3
        }
    };
for (r[15][15] = 4, r[15][16] = 4, r[16][15] = 4, r[16][16] = 4; s > 0;) r[h.nextInt(32)][h.nextInt(32)] = 1, s--;
let n = [
    [new e, e.forward]
];
r[1][0] = 0;
let o = new e;
for (; n.length > 0;) {
    let t = [];
    t = [];
    for (let s of n)
        if (o.set(s[0]).add(s[1]), !(0 !== i(o.x, o.y) || (s[1] !== e.right && s[1] !== e.left || 2 === i(o.x, o.y + 1) && 2 === i(o.x - 1, o.y + 1) || 2 === i(o.x, o.y + 1) && 2 === i(o.x + 1, o.y + 1) || 2 === i(o.x, o.y - 1) && 2 === i(o.x - 1, o.y - 1) || 2 === i(o.x, o.y - 1) && 2 === i(o.x + 1, o.y - 1)) && (s[1] !== e.forward && s[1] !== e.back || 2 === i(o.x + 1, o.y + 1) && 2 === i(o.x + 1, o.y) || 2 === i(o.x + 1, o.y - 1) && 2 === i(o.x + 1, o.y) || 2 === i(o.x - 1, o.y + 1) && 2 === i(o.x - 1, o.y) || 2 === i(o.x - 1, o.y - 1) && 2 === i(o.x - 1, o.y)))) {
            r[o.y][o.x] = 2;
            let s = n.length < 30 ? 4 : Math.min(4, h.nextInt(6)),
                i = [e.forward, e.back, e.left, e.right];
            for (; s > 0;) {
                let e = h.nextInt(i.length);
                t.push([o.clone(), i[e]]), i.splice(e, 1), s--
            }
        } n = t
}
for (let t of r) console.log(JSON.stringify(t));