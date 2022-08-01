import { world } from 'mojang-minecraft';
export default class ExServerEvents {
    constructor(server) {
        this.exEvents = {
            "onLongTick": {
                subscribe: (callback) => {
                    this._subscribe("onLongTick", callback);
                },
                unsubscribe: (callback) => {
                    this._unsubscribe("onLongTick", callback);
                },
                pattern: () => {
                    this.events.tick.subscribe((e) => {
                        var _a;
                        this.tickTime += e.deltaTime;
                        if (e.currentTick % 5 === 0) {
                            this.tickNum++;
                            let event = {
                                currentTick: this.tickNum,
                                deltaTime: this.tickTime
                            };
                            (_a = ExServerEvents.monitorMap.get("onLongTick")) === null || _a === void 0 ? void 0 : _a.forEach((fun) => {
                                fun(event);
                            });
                            this.tickTime = 0;
                        }
                    });
                }
            }
        };
        this.tickNum = 0;
        this.tickTime = 0;
        this._server = server;
        this.events = world.events;
    }
    _subscribe(name, callback) {
        var _a;
        let e = (_a = ExServerEvents.monitorMap.get(name)) !== null && _a !== void 0 ? _a : [];
        e.push(callback);
    }
    _unsubscribe(name, callback) {
        var _a;
        let arr = (_a = ExServerEvents.monitorMap.get(name)) !== null && _a !== void 0 ? _a : [];
        arr.splice(arr.findIndex((v, i) => {
            if (v === callback)
                return true;
        }), 1);
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
ExServerEvents.monitorMap = new Map;
//# sourceMappingURL=ExServerEvents.js.map