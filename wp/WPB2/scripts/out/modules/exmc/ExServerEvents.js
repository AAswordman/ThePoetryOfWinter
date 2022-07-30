import { world } from "mojang-minecraft";
export default class ExServerEvents {
    constructor(server) {
        this.exEvents = {};
        this._server = server;
        this.events = world.events;
    }
    register(name, fun) {
        let func = fun;
        if (name in this.events) {
            return this.events[name].subscribe(func);
        }
        else if (name in this.exEvents) {
            return this.exEvents[name].subscribe(func);
        }
        console.warn("No event registered for name " + name);
    }
    cancel(name, fun) {
        if (name in this.events) {
            return this.events[name].unsubscribe(fun);
        }
        else if (name in this.exEvents) {
            return this.exEvents[name].unsubscribe(fun);
        }
    }
}
//# sourceMappingURL=ExServerEvents.js.map