// 转为unicode 编码
export function encodeUnicode(str: string) {
    var res = [];
    for (var i = 0; i < str.length; i++) {
        res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
    }
    return "\\u" + res.join("\\u");
}

// 解码
export function decodeUnicode(str: string) {
    return eval('{"'+str+'"}');
}