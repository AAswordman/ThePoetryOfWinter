"use strict";
function IEEEremainder(dividend, divisor) {
    return dividend - (divisor * Math.round(dividend / divisor));
}
console.log(IEEEremainder(-5, 2));
console.log((-5 % 2));
//# sourceMappingURL=test.js.map