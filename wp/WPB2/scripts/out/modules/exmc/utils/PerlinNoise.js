import MathUtil from "./MathUtil.js";
import Random from "./Random.js";
/**
 * Copyright 2001 Ken Perlin
 */
export default class PerlinNoise {
    constructor(seed) {
        this.P = 8;
        this.B = 1 << this.P;
        this.M = this.B - 1;
        this.NP = 8;
        this.N = 1 << this.NP;
        //private final int NM = N-1;
        this.p = new Array(this.B + this.B + 2);
        this.g2 = new Array(this.B + this.B + 2).fill(new Array(2));
        this.g1 = new Array(this.B + this.B + 2);
        //private int start = 1;
        this.points = new Array(32).fill(new Array(3));
        this.seed = seed !== null && seed !== void 0 ? seed : 100;
        this.init();
    }
    lerp(t, a, b) { return a + t * (b - a); }
    s_curve(t) { return t * t * (3 - t - t); }
    noise(x, y, z) {
        if (y !== undefined && z !== undefined) {
            let bx, by, bz, b0, b1, b00, b10, b01, b11;
            let rx0, rx1, ry0, ry1, rz, sx, sy, sz, a, b, c, d, u, v, q;
            bx = 0 | MathUtil.IEEEremainder(Math.floor(x), this.B);
            if (bx < 0) {
                bx += this.B;
            }
            rx0 = x - Math.floor(x);
            rx1 = rx0 - 1;
            by = 0 | MathUtil.IEEEremainder(Math.floor(y), this.B);
            if (by < 0) {
                by += this.B;
            }
            ry0 = y - Math.floor(y);
            ry1 = ry0 - 1;
            bz = 0 | MathUtil.IEEEremainder(Math.floor(z), this.B);
            if (bz < 0) {
                bz += this.B;
            }
            rz = z - Math.floor(z);
            if (bx < 0 || bx >= this.B + this.B + 2) {
                console.log("unknown" + bx);
            }
            b0 = this.p[bx];
            bx++;
            b1 = this.p[bx];
            b00 = this.p[b0 + by];
            b10 = this.p[b1 + by];
            by++;
            b01 = this.p[b0 + by];
            b11 = this.p[b1 + by];
            sx = this.s_curve(rx0);
            sy = this.s_curve(ry0);
            sz = this.s_curve(rz);
            q = this.G(b00 + bz);
            u = rx0 * q[0] + ry0 * q[1] + rz * q[2];
            q = this.G(b10 + bz);
            v = rx1 * q[0] + ry0 * q[1] + rz * q[2];
            a = this.lerp(sx, u, v);
            q = this.G(b01 + bz);
            u = rx0 * q[0] + ry1 * q[1] + rz * q[2];
            q = this.G(b11 + bz);
            v = rx1 * q[0] + ry1 * q[1] + rz * q[2];
            b = this.lerp(sx, u, v);
            c = this.lerp(sy, a, b);
            bz++;
            rz--;
            q = this.G(b00 + bz);
            u = rx0 * q[0] + ry0 * q[1] + rz * q[2];
            q = this.G(b10 + bz);
            v = rx1 * q[0] + ry0 * q[1] + rz * q[2];
            a = this.lerp(sx, u, v);
            q = this.G(b01 + bz);
            u = rx0 * q[0] + ry1 * q[1] + rz * q[2];
            q = this.G(b11 + bz);
            v = rx1 * q[0] + ry1 * q[1] + rz * q[2];
            b = this.lerp(sx, u, v);
            d = this.lerp(sy, a, b);
            return this.lerp(sz, c, d);
        }
        else if (y !== undefined && z === undefined) {
            let bx0, bx1, by0, by1, b00, b10, b01, b11;
            let rx0, rx1, ry0, ry1, sx, sy, a, b, t, u, v, q;
            let i, j;
            t = x + this.N;
            bx0 = (t | 0) & this.M;
            bx1 = (bx0 + 1) & this.M;
            rx0 = t - (t | 0);
            rx1 = rx0 - 1;
            t = y + this.N;
            by0 = (t | 0) & this.M;
            by1 = (by0 + 1) & this.M;
            ry0 = t - (t | 0);
            ry1 = ry0 - 1;
            i = this.p[bx0];
            j = this.p[bx1];
            b00 = this.p[i + by0];
            b10 = this.p[j + by0];
            b01 = this.p[i + by1];
            b11 = this.p[j + by1];
            sx = this.s_curve(rx0);
            sy = this.s_curve(ry0);
            q = this.g2[b00];
            u = rx0 * q[0] + ry0 * q[1];
            q = this.g2[b10];
            v = rx1 * q[0] + ry0 * q[1];
            a = this.lerp(sx, u, v);
            q = this.g2[b01];
            u = rx0 * q[0] + ry1 * q[1];
            q = this.g2[b11];
            v = rx1 * q[0] + ry1 * q[1];
            b = this.lerp(sx, u, v);
            return this.lerp(sy, a, b);
        }
        else {
            let bx0, bx1;
            let rx0, rx1, sx, t, u, v;
            t = x + this.N;
            bx0 = (t | 0) & this.M;
            bx1 = (bx0 + 1) & this.M;
            rx0 = t - (t | 0);
            rx1 = rx0 - 1;
            sx = this.s_curve(rx0);
            u = rx0 * this.g1[this.p[bx0]];
            v = rx1 * this.g1[this.p[bx1]];
            return this.lerp(sx, u, v);
        }
    }
    G(i) { return this.points[i % 32]; }
    init() {
        let i, j, k;
        let u, v, w, U, V, W, Hi, Lo;
        let r = new Random(this.seed);
        for (i = 0; i < this.B; i++) {
            this.p[i] = i;
            this.g1[i] = 2 * r.nextDouble() - 1;
            do {
                u = 2 * r.nextDouble() - 1;
                v = 2 * r.nextDouble() - 1;
            } while (u * u + v * v > 1 ||
                Math.abs(u) > 2.5 * Math.abs(v) ||
                Math.abs(v) > 2.5 * Math.abs(u) ||
                Math.abs(Math.abs(u) - Math.abs(v)) < .4);
            this.g2[i][0] = u;
            this.g2[i][1] = v;
            this.normalize2(this.g2[i]);
            do {
                u = 2 * r.nextDouble() - 1;
                v = 2 * r.nextDouble() - 1;
                w = 2 * r.nextDouble() - 1;
                U = Math.abs(u);
                V = Math.abs(v);
                W = Math.abs(w);
                Lo = Math.min(U, Math.min(V, W));
                Hi = Math.max(U, Math.max(V, W));
            } while (u * u + v * v + w * w > 1 || Hi > 4 * Lo ||
                Math.min(Math.abs(U - V), Math.min(Math.abs(U - W), Math.abs(V - W))) < .2);
        }
        while (--i > 0) {
            k = this.p[i];
            j = 0 | (r.nextLong() & this.M);
            this.p[i] = this.p[j];
            this.p[j] = k;
        }
        for (i = 0; i < this.B + 2; i++) {
            this.p[this.B + i] = this.p[i];
            this.g1[this.B + i] = this.g1[i];
            for (j = 0; j < 2; j++) {
                this.g2[this.B + i][j] = this.g2[i][j];
            }
        }
        this.points[3][0] = this.points[3][1] = this.points[3][2] = Math.sqrt(1. / 3);
        let r2 = Math.sqrt(1. / 2);
        let s = Math.sqrt(2 + r2 + r2);
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                this.points[i][j] = (i == j ? 1 + r2 + r2 : r2) / s;
            }
        }
        for (i = 0; i <= 1; i++) {
            for (j = 0; j <= 1; j++) {
                for (k = 0; k <= 1; k++) {
                    let n = i + j * 2 + k * 4;
                    if (n > 0) {
                        for (let m = 0; m < 4; m++) {
                            this.points[4 * n + m][0] = (i == 0 ? 1 : -1) * this.points[m][0];
                            this.points[4 * n + m][1] = (j == 0 ? 1 : -1) * this.points[m][1];
                            this.points[4 * n + m][2] = (k == 0 ? 1 : -1) * this.points[m][2];
                        }
                    }
                }
            }
        }
    }
    normalize2(v) {
        let s;
        s = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
        v[0] = v[0] / s;
        v[1] = v[1] / s;
    }
}
//# sourceMappingURL=PerlinNoise.js.map