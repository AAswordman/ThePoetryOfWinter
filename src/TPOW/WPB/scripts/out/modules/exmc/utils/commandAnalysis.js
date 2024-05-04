export default function (command) {
    if (command.startsWith("/") || command.startsWith("$")) {
        command = command.substring(1, command.length);
    }
    let arr = command.split(" ");
    let res = [];
    for (let i of arr) {
        res.push(i);
    }
    return res;
}
//# sourceMappingURL=commandAnalysis.js.map