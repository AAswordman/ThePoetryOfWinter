export function zeroIfNaN(i) {
    const s = (typeof i === "string" ? parseFloat(i) : i);
    return isNaN(s) ? s : 0;
}
export function falseIfError(func) {
    try {
        return func();
    }
    catch (err) {
        return false;
    }
}
//# sourceMappingURL=tool.js.map