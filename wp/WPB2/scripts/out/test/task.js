function taskTranToNum(t) {
    let task_arr = ["Ao", "Jf", "Sk", "Ch", "Om", "Bs", "Hd", "Oa", "Gx", "Xe"];
    let n = "";
    while (t.length >= 2) {
        let msg = t.slice(0, 2);
        n = n + (task_arr.findIndex(e => e === msg));
        t = t.slice(3);
    }
    return n;
}
console.log(taskTranToNum("Jf Ao"));
console.log([1].toString());
//# sourceMappingURL=task.js.map