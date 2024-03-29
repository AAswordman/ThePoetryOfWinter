function IEEEremainder(dividend: number, divisor: number) {
    return dividend - (divisor * Math.round(dividend / divisor));
}
console.log(IEEEremainder(-5,2));
console.log((-5%2));