function initConsole(manager) {
    const FORMATTINGS = {
        Red: "§c",
        DarkRed: "§4",
        Yellow: "§e",
        Gold: "§6",
        Orange: "§6",
        MineCoinGold: "§g",
        Green: "§a",
        DarkGreen: "§2",
        Blue: "§9",
        DarkBlue: "§1",
        Aqua: "§b",
        DarkAqua: "§3",
        Cyan: "§3",
        LightPurple: "§d",
        Pink: "§d",
        DarkPurple: "§5",
        Purple: "§5",
        White: "§f",
        Gray: "§7",
        DarkGray: "§8",
        Grey: "§8",
        Black: "§0",
        Reset: "§r",
        Obfuscated: "§k",
        RandomText: "§k",
        Garbled: "§k",
        Bold: "§l",
        Italic: "§o",
    };
    const span = (color = FORMATTINGS.White, msg = '') => {
        if (!Array.isArray(msg))
            return color + msg + FORMATTINGS.Reset;
        msg[0] = color + msg[0];
        msg[msg.length - 1] += FORMATTINGS.Reset;
        return msg;
    };
    const sendMsg = (msg) => manager.runCommandAsync(`tellraw @a[tag=debugger] {"rawtext": [{"text": "${msg}"}]}`);
    // const sendMsg = msg => console.log(`/tellraw @a[tag=debugger] {"rawtext": [{"text": "${msg}"}]}`);
    const parseObject = (obj) => {
        let res = '{\n';
        for (const key in Object.keys(obj)) {
            const val = obj[key];
            if (val === null)
                (res += `${key}: null\n`);
            if (typeof val != 'object')
                (res += `${key}: ${typeof val === 'number' ? span(FORMATTINGS.Purple, val) : val}\n`);
            else
                (res += `${key}: {...}\n`);
        }
        return res + '}';
    };
    const printf = (() => {
        const pString = (format, arg) => format.replace('%s', arg && typeof arg === 'string' ? arg : arg.toString());
        const pInt = (format, arg) => format.replace('%d', span(FORMATTINGS.Aqua, arg && typeof arg === 'number' ? Math.floor(arg) : typeof arg === 'string' ? Math.floor(parseInt(arg)) : NaN));
        const pFloat = (format, arg) => format.replace('%f', span(FORMATTINGS.Purple, typeof arg === 'number' ? arg : typeof arg === 'string' ? Math.floor(parseFloat(arg)) : NaN));
        const pObj = (format, arg) => format.replace('%o', parseObject(arg));
        return (format, ...args) => {
            for (let i = 0; i < args.length; i++) {
                let type = /(%[s|d|f|o])/.exec(format)[1];
                if (type === '%s' && (format = pString(format, args[i])))
                    continue;
                if (type === '%d' && (format = pInt(format, args[i])))
                    continue;
                if (type === '%f' && (format = pFloat(format, args[i])))
                    continue;
                if (type === '%o' && (format = pObj(format, args[i])))
                    continue;
            }
            return sendMsg(format);
        };
    })();
    function log(...args) {
        let prefix = new Array(stack).fill('    ').join('');
        if (/%[s|d|f|o]/.test(args[0]))
            return printf(prefix + args.shift(), ...args);
        args = args.map((val) => typeof val == 'number' ? span(FORMATTINGS.Purple, val) : (typeof val === "object" ? parseObject(val) : val)).join('\n');
        return sendMsg(prefix + args);
    }
    ;
    let counter = 0, stack = 0, timers = {}, callStack = [];
    class InitConsole {
        constructor() {
            this.log = log;
            this.info = log;
        }
        countReset(label) {
        }
        debug(...data) {
        }
        dir(item, options) {
        }
        dirxml(...data) {
        }
        groupCollapsed(...data) {
        }
        table(tabularData, properties) {
        }
        timeLog(label, ...data) {
        }
        timeStamp(label) {
        }
        assert(condition, assertText) {
            return !condition && log(span(FORMATTINGS.Red, assertText));
        }
        clear() {
            log('\n\n\n\n\n\n\n\n\n\n');
        }
        error(...args) {
            callStack.length > 0 && log(span(FORMATTINGS.Red, callStack.join(' > ') + '\n'));
            console.warn(span(FORMATTINGS.Red));
            return log(...span(FORMATTINGS.Red, args));
        }
        warn(...args) {
            return log(...span(FORMATTINGS.Yellow, args));
        }
        count(identifier) {
            return log(identifier + ': ' + counter++);
        }
        group(groupName = `分组${stack}`) {
            let res = log(`▼ ${groupName}`);
            stack++;
            return res;
        }
        groupEnd() {
            stack > 0 && stack--;
        }
        time(timer = 'default') {
            timers[timer] = new Date().getTime();
        }
        timeEnd(timer = 'default') {
            if (timers[timer]) {
                let time = (new Date().getTime() - timers[timer]) / 1000;
                timers[timer] = null;
                log(`${timer}: ${time} s`);
            }
        }
        trace() {
            log(callStack.join('\n\n'));
        }
        /**
         * 使用Function.call或Function.apply调用此函数，函数名将会被加入调用栈。line参数为当前行，需要手动填入
         * @param {number} line
         *
         * @example
         * function test(){
         *    console.setTracePoint.call(test, 111);
         * }
         * test();
         * console.trace();  //  test at line: 111
         */
        setTracePoint(line) {
            let funcName = this.name || 'anonymous';
            line && (funcName += ` at line: ${line}`);
            callStack.push(funcName);
        }
    }
    return new InitConsole();
}
export default initConsole;
//# sourceMappingURL=Console.js.map