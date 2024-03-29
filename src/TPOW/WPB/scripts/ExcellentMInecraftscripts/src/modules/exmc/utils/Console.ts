import {ExCommandNativeRunner} from "../interface/ExCommandRunner.js";
import GameConsole from "../interface/GameConsole.js";

function initConsole(manager:ExCommandNativeRunner) {
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

      const span = (color:any = FORMATTINGS.White, msg:any = '') => {
            if (!Array.isArray(msg)) return color + msg + FORMATTINGS.Reset;
            msg[0] = color + msg[0];
            msg[msg.length - 1] += FORMATTINGS.Reset;
            return msg;
      }

      const sendMsg = (msg:any) => manager.runCommandAsync(`tellraw @a[tag=debugger] {"rawtext": [{"text": "${msg}"}]}`);
      // const sendMsg = msg => console.log(`/tellraw @a[tag=debugger] {"rawtext": [{"text": "${msg}"}]}`);

      const parseObject = (obj:any) => {
            let res = '{\n';
            for (const key in Object.keys(obj)) {
                  const val = obj[key];
                  if (val === null) (res += `${key}: null\n`);
                  if (typeof val != 'object') (res += `${key}: ${typeof val === 'number' ? span(FORMATTINGS.Purple, val) : val}\n`);
                  else (res += `${key}: {...}\n`);
            }
            return res + '}';
      }

      const printf = (() => {

            const pString:any = (format:any, arg:any) => format.replace('%s', arg && typeof arg === 'string' ? arg : arg.toString());
            const pInt:any = (format:any, arg:any) => format.replace('%d', span(FORMATTINGS.Aqua, arg && typeof arg === 'number' ? Math.floor(arg) : typeof arg === 'string' ? Math.floor(parseInt(arg)) : NaN));
            const pFloat:any = (format:any, arg:any) => format.replace('%f', span(FORMATTINGS.Purple, typeof arg === 'number' ? arg : typeof arg === 'string' ? Math.floor(parseFloat(arg)) : NaN));
            const pObj:any = (format:any, arg:any) => format.replace('%o', parseObject(arg));

            return (format:string, ...args:any[]) => {
                  for (let i = 0; i < args.length; i++) {
                        let type:any = (<any>/(%[s|d|f|o])/).exec(format)[1];
                        if (type === '%s' && (format = pString(format, args[i]))) continue;
                        if (type === '%d' && (format = pInt(format, args[i]))) continue;
                        if (type === '%f' && (format = pFloat(format, args[i]))) continue;
                        if (type === '%o' && (format = pObj(format, args[i]))) continue;
                  }
                  return sendMsg(format);
            }
      })();

      function log(...args:any) {
            let prefix = new Array(stack).fill('    ').join('');
            if (/%[s|d|f|o]/.test(args[0])) return printf(prefix + args.shift(), ...args);
            args = args.map((val: any) => typeof val == 'number' ? span(FORMATTINGS.Purple, val) : (typeof val === "object" ? parseObject(val):val)).join('\n');
            return sendMsg(prefix + args);
      };

      let counter:any = 0,
            stack:any = 0,
            timers:any = {},
            callStack:any = [];

      class InitConsole implements GameConsole{
            countReset(label?: string | undefined): void {
                  
            }
            debug(...data: any[]): void {
                  
            }
            dir(item?: any, options?: any): void {
                  
            }
            dirxml(...data: any[]): void {
                  
            }
            groupCollapsed(...data: any[]): void {
                  
            }
            table(tabularData?: any, properties?: string[] | undefined): void {
                  
            }
            timeLog(label?: string | undefined, ...data: any[]): void {
                  
            }
            timeStamp(label?: string | undefined): void {
                  
            }
            log=log;
            info=log;
            assert(condition:any, assertText:any) {
                  return !condition && log(span(FORMATTINGS.Red, assertText));
            }
            clear() {
                  log('\n\n\n\n\n\n\n\n\n\n');
            }
            error(...args:any) {
                  callStack.length > 0 && log(span(FORMATTINGS.Red, callStack.join(' > ') + '\n'));
                  console.warn(span(FORMATTINGS.Red));
                  return log(...span(FORMATTINGS.Red, args));
            }
            warn(...args:any) {
                  return log(...span(FORMATTINGS.Yellow, args));
            }
            count(identifier:any) {
                  return log(identifier + ': ' + counter++);
            }
            group(groupName:any = `分组${stack}`) {
                  let res = log(`▼ ${groupName}`);
                  stack++;
                  return res;
            }
            groupEnd() {
                  stack > 0 && stack--;
            }
            time(timer:any = 'default') {
                  timers[timer] = new Date().getTime();
            }
            timeEnd(timer:any = 'default') {
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
            setTracePoint(line:any) {
                  let funcName = (<any>this).name || 'anonymous';
                  line && (funcName += ` at line: ${line}`);
                  callStack.push(funcName);
            }
      }
      
      return new InitConsole();

}

export default initConsole;