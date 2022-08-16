// 转为unicode 编码
export function encodeUnicode(str) {
    var res = [];
    for (var i = 0; i < str.length; i++) {
        res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
    }
    return "\\u" + res.join("\\u");
}
// 解码
export function decodeUnicode(str) {
    return eval('{"' + str + '"}');
}
//# sourceMappingURL=Unicode.js.map