export default class ExErrorStack {
    static throwError(error) {
        console.warn("find error", error);
        this.errorStack.push(error);
    }
    static init(server) {
        server.getEvents().events.tick.subscribe(tick => {
            if (this.errorStack.length > 0) {
                throw this.errorStack.shift();
            }
        });
    }
}
ExErrorStack.errorStack = [];
export function to(p) {
    return p.then(res => [res, undefined]).catch(err => { ExErrorStack.throwError(err); return [undefined, err]; });
}
//# sourceMappingURL=ExErrorStack.js.map