export default class ExErrorQueue {
    static throwError(error) {
        this.errorStack.push(error);
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
export function to(p) {
    return p.then(res => [res, undefined]).catch(err => { ExErrorQueue.throwError(err); return [undefined, err]; });
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