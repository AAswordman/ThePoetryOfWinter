export default function format(str, ...msg) {
    var formatted = str;
    for (let arg in msg) {
        formatted = formatted.replace("{" + arg + "}", msg[arg] + "");
    }
    return formatted;
}
//# sourceMappingURL=format.js.map