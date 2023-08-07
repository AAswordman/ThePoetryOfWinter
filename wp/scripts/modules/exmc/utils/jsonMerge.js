export default function jsonMerge(a, b) {
    for (let i in b) {
        if (!(i in a)) {
            a[i] = b[i];
        }
    }
    return a;
}
//# sourceMappingURL=jsonMerge.js.map