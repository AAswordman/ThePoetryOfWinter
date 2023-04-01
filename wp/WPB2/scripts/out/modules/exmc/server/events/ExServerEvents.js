import { world, system } from '@minecraft/server';
export default class ExServerEvents {
    constructor(server) {
        this.exEvents = {
            "tick": {
                subscribe: (callback) => {
                    this._subscribe("tick", callback);
                },
                unsubscribe: (callback) => {
                    this._unsubscribe("tick", callback);
                },
                pattern: () => {
                    let tickNum = 0, tickTime = 0;
                    const fun = () => {
                        var _a;
                        const n = new Date().getTime();
                        let event = {
                            currentTick: tickNum,
                            deltaTime: (n - tickTime) / 1000
                        };
                        tickTime = n;
                        tickNum += 1;
                        // console.warn("tick time: " + tickTime+"tick num: " + tickNum)
                        (_a = ExServerEvents.monitorMap.get("tick")) === null || _a === void 0 ? void 0 : _a.forEach((fun) => {
                            fun(event);
                        });
                        // system.runInterval(fun, 1);
                    };
                    system.runInterval(fun, 1);
                }
            },
            "onLongTick": {
                subscribe: (callback) => {
                    this._subscribe("onLongTick", callback);
                },
                unsubscribe: (callback) => {
                    this._unsubscribe("onLongTick", callback);
                },
                pattern: () => {
                    let tickNum = 0, tickTime = 0;
                    const fun = () => {
                        var _a;
                        const n = new Date().getTime();
                        let event = {
                            currentTick: tickNum,
                            deltaTime: (n - tickTime) / 1000
                        };
                        tickTime = n;
                        tickNum += 1;
                        (_a = ExServerEvents.monitorMap.get("onLongTick")) === null || _a === void 0 ? void 0 : _a.forEach((fun) => {
                            fun(event);
                        });
                        // system.runInterval(fun, 5);
                    };
                    system.runInterval(fun, 5);
                }
            }
        };
        this.init = false;
        this._server = server;
        this.events = world.events;
        if (!this.init) {
            this.init = true;
            for (let i in this.exEvents) {
                this.exEvents[i].pattern();
            }
        }
    }
    _subscribe(name, callback) {
        let e = ExServerEvents.monitorMap.get(name);
        if (e === undefined) {
            e = [];
            ExServerEvents.monitorMap.set(name, e);
        }
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
    cancelAll() {
        throw new Error('Method not implemented.');
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