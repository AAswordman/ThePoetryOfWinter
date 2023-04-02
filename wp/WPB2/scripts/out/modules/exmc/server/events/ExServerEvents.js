import { world } from '@minecraft/server';
import ExGame from '../ExGame.js';
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
                    ExGame.tickMonitor.addMonitor((e) => {
                        var _a;
                        (_a = ExServerEvents.monitorMap.get("tick")) === null || _a === void 0 ? void 0 : _a.forEach((fun) => {
                            fun(e);
                        });
                    });
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
                    ExGame.longTickMonitor.addMonitor((e) => {
                        var _a;
                        (_a = ExServerEvents.monitorMap.get("longTickMonitor")) === null || _a === void 0 ? void 0 : _a.forEach((fun) => {
                            fun(e);
                        });
                    });
                }
            }
        };
        this._server = server;
        this.events = world.events;
        if (!ExServerEvents.init) {
            ExServerEvents.init = true;
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
ExServerEvents.init = false;
//# sourceMappingURL=ExServerEvents.js.map