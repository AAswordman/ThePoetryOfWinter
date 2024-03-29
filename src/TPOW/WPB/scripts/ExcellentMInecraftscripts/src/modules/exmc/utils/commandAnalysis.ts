import MathUtil from "../math/MathUtil.js";

export default function(command:string) {
    if (command.startsWith("/") || command.startsWith("$")) {
        command = command.substring(1, command.length);
    }
    let arr = command.split(" ");
    let res:string[] = [];

    for (let i of arr) {
        res.push(i);
    }
    return res;
}