import { world } from '@minecraft/server';
import ExErrorQueue from '../ExErrorQueue.js';
import ExGame from '../ExGame.js';
import { ExOtherEventNames } from './events.js';
//顶层事件分发
export default class ExServerEvents {
    constructor(server) {
        this.exEvents = {
            [ExOtherEventNames.tick]: {
                subscribe: (callback) => {
                    this._subscribe(ExOtherEventNames.tick, callback);
                },
                unsubscribe: (callback) => {
                    this._unsubscribe(ExOtherEventNames.tick, callback);
                },
                pattern: () => {
                    ExGame.tickMonitor.addMonitor((e) => {
                        var _a;
                        (_a = ExServerEvents.monitorMap.get(ExOtherEventNames.tick)) === null || _a === void 0 ? void 0 : _a.forEach((fun) => {
                            fun(e);
                        });
                    });
                }
            },
            [ExOtherEventNames.onLongTick]: {
                subscribe: (callback) => {
                    this._subscribe(ExOtherEventNames.onLongTick, callback);
                },
                unsubscribe: (callback) => {
                    this._unsubscribe(ExOtherEventNames.onLongTick, callback);
                },
                pattern: () => {
                    ExGame.longTickMonitor.addMonitor((e) => {
                        var _a;
                        (_a = ExServerEvents.monitorMap.get(ExOtherEventNames.onLongTick)) === null || _a === void 0 ? void 0 : _a.forEach((fun) => {
                            fun(e);
                        });
                    });
                }
            }
        };
        this._server = server;
        this.events = {};
        for (let k in world.afterEvents) {
            const v = world.afterEvents[k];
            this.events[`after${k[0].toUpperCase()}${k.slice(1)}`] = {
                subscribe: (a) => {
                    if (!ExServerEvents.interceptor.has(a)) {
                        ExServerEvents.interceptor.set(a, (e) => {
                            try {
                                a(e);
                            }
                            catch (err) {
                                ExErrorQueue.reportError(err);
                                throw err;
                            }
                        });
                    }
                    return v.subscribe(ExServerEvents.interceptor.get(a));
                },
                unsubscribe: (a) => {
                    if (!ExServerEvents.interceptor.has(a)) {
                        return;
                    }
                    const f = ExServerEvents.interceptor.get(a);
                    ExServerEvents.interceptor.delete(a);
                    return v.unsubscribe(f);
                }
            };
        }
        for (let k in world.beforeEvents) {
            const v = world.beforeEvents[k];
            this.events[`before${k[0].toUpperCase()}${k.slice(1)}`] = {
                subscribe: (a) => {
                    if (!ExServerEvents.interceptor.has(a)) {
                        ExServerEvents.interceptor.set(a, (e) => {
                            try {
                                a(e);
                            }
                            catch (err) {
                                ExErrorQueue.reportError(err);
                                throw err;
                            }
                        });
                    }
                    return v.subscribe(ExServerEvents.interceptor.get(a));
                },
                unsubscribe: (a) => {
                    if (!ExServerEvents.interceptor.has(a)) {
                        return;
                    }
                    const f = ExServerEvents.interceptor.get(a);
                    ExServerEvents.interceptor.delete(a);
                    return v.unsubscribe(f);
                }
            };
        }
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
ExServerEvents.interceptor = new Map();
//# sourceMappingURL=ExServerEvents.js.map