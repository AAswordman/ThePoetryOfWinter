var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ExErrorQueue from "../server/ExErrorQueue.js";
export default function notUtillTask(m, f, run, tryTime = 1000, maxTimes = 60) {
    let func = () => __awaiter(this, void 0, void 0, function* () {
        try {
            let res = f();
            if (res instanceof Promise)
                res = yield res;
            if (res) {
                run();
            }
            else {
                if (maxTimes > 0) {
                    maxTimes--;
                    m.setTimeout((func), tryTime);
                }
            }
        }
        catch (e) {
            ExErrorQueue.throwError(e);
        }
    });
    m.setTimeout(func, 100);
}
//# sourceMappingURL=notUtillTask.js.map