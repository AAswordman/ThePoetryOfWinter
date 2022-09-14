import MathUtil from "./MathUtil.js";

export default function(command:string) {
    if (!(typeof command === "string")) {
        throw new Error("Command is not the expected type");
    }
    if (command.startsWith("/") || command.startsWith("$")) {
        command = command.substring(1, command.length);
    }
    let arr = command.split(" ");
    let res = [];

    for (let i in arr) {
        let s = arr[i];
        if (s != "") {
            if (MathUtil.isNumber(s)) {
                res.push(parseFloat(s));
            } else if (s == "false" || s == "true") {
                res.push(eval(s));
            } else {
                res.push(s);
            }
        }
    }
    return res;
}