import { world } from "mojang-minecraft";
export default class ExServerEvents {
    constructor(server) {
        this.exEvents = {};
        this._server = server;
        this.events = world.events;
    }
    register(name, fun) {
        if (name in this.events) {
            return this.events[name].subscribe(fun);
        }
        else if (name in this.exEvents) {
            return this.exEvents[name].subscribe(fun);
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