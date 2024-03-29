export default class MathUtil {
    static clamp(num: number, low: number, high: number): number {
        return Math.max(low, Math.min(high, num));
    }
    static IEEEremainder(dividend: number, divisor: number) {
        return dividend - (divisor * Math.round(dividend / divisor));
    }
    static isNumber(val: string) {
        var regPos = /^\d+(\.\d+)?$/; //非负浮点数
        var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
        return regPos.test(val) && regNeg.test(val);
    }
    static zeroIfNaN(num: number | string | undefined) {
        if (typeof num === "string") num = parseFloat(num);
        if (num === undefined) return 0;
        return isNaN(num) ? 0 : num;
    }
    static randomInteger(min: number, max: number) {
        let length = Math.floor(Math.random() * (max - min + 1));
        return min + length;
    }
    static round(x:number,n:number){
        return Math.round(x*(10**n))/(10**n);
    }
}