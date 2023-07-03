export default class ExErrorQueue {
    static throwError(error) {
        this.reportError(error);
        this.errorStack.push(error);
    }
    static reportError(error) {
        if (error instanceof Error) {
            this.errorFlow = (this.errorFlow + "\n\n" + error.name + " : " + error.message + "\n" + error.stack);
        }
        else {
            this.errorFlow = (this.errorFlow + "\n\n" + error);
        }
        //console.warn(typeof error === "object" ? error instanceof Object ? (error as Object).constructor.name : JSON.stringify(error) : "abc: " +error);
        this.errorFlow = this.errorFlow.substring(Math.max(0, this.errorFlow.length - 3000));
    }
    static getError() {
        return this.errorFlow;
    }
    static init(server) {
        server.getEvents().exEvents.tick.subscribe(tick => {
            if (this.errorStack.length > 0) {
                throw this.errorStack.shift();
            }
        });
    }
}
ExErrorQueue.errorStack = [];
ExErrorQueue.errorFlow = "";
export function to(p) {
    return p.then(res => [res, undefined]).catch(err => { ExErrorQueue.throwError(err); return [undefined, err]; });
}
export function tofunc(p) {
    return (...args) => {
        return to(p(...args));
    };
}
export function ignorn(fun) {
    try {
        let res = fun();
        return res;
    }
    catch (err) {
        return undefined;
    }
}
//# sourceMappingURL=ExErrorQueue.js.map