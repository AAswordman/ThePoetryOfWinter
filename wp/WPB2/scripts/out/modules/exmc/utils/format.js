import ExGameConfig from "../ExGameConfig.js";
export default function format(str, ...msg) {
    var formatted = str;
    for (let arg in msg) {
        ExGameConfig.console.log("{" + arg + "}", msg[arg]);
        formatted = formatted.replace("{" + arg + "}", msg[arg] + "");
    }
    return formatted;
}
//# sourceMappingURL=format.js.map