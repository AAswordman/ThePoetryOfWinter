import SetTimeOutSupport from "../interface/SetTimeOutSupport.js";
import ExErrorQueue, { to } from "../server/ExErrorQueue.js";

export default function notUtillTask(m: SetTimeOutSupport, f: (() => boolean) | (() => Promise<boolean>), run: () => void, tryDelay = 1000, maxTimes = 60) {
    let func = async () => {
        try {
            let res = f();
            if (res instanceof Promise) res = await res;
            if (res) {
                run();
            } else {
                if (maxTimes > 0) {
                    maxTimes--;
                    m.setTimeout((func), tryDelay);
                }
            }
        } catch (e) {
            ExErrorQueue.throwError(e);
        }
    };
    m.setTimeout(func, 0);
}