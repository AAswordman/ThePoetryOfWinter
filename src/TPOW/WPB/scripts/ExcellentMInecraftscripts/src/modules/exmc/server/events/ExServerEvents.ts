import { world, system, WorldAfterEvents, WorldBeforeEvents } from '@minecraft/server';
import ExEventManager from "../../interface/ExEventManager.js";
import ExGameServer from "../ExGameServer.js";
import ExGameConfig from '../ExGameConfig.js';
import ExErrorQueue from '../ExErrorQueue.js';
import ExGame from '../ExGame.js';
import { ExOtherEventNames, Merge, TickEvent } from './events.js';
import MonitorManager from '../../utils/MonitorManager.js';

//顶层事件分发
export default class ExServerEvents implements ExEventManager {

    public events: Merge<{ [K in keyof WorldAfterEvents as `after${Capitalize<K>}`]: WorldAfterEvents[K] },
        { [K in keyof WorldBeforeEvents as `before${Capitalize<K>}`]: WorldBeforeEvents[K] }>;
    private _server: ExGameServer;
    public exEvents = {
        [ExOtherEventNames.tick]: {
            subscribe: (callback: (arg: TickEvent) => void) => {
                this._subscribe(ExOtherEventNames.tick, callback);
            },
            unsubscribe: (callback: (arg: TickEvent) => void) => {
                this._unsubscribe(ExOtherEventNames.tick, callback)
            },
            pattern: () => {
                ExGame.tickMonitor.addMonitor((e) => {
                    ExServerEvents.monitorMap.get(ExOtherEventNames.tick)?.trigger(e);
                });
            }
        },
        [ExOtherEventNames.beforeTick]: {
            subscribe: (callback: (arg: TickEvent) => void) => {
                this._subscribe(ExOtherEventNames.beforeTick, callback);
            },
            unsubscribe: (callback: (arg: TickEvent) => void) => {
                this._unsubscribe(ExOtherEventNames.beforeTick, callback)
            },
            pattern: () => {
                ExGame.beforeTickMonitor.addMonitor((e) => {
                    ExServerEvents.monitorMap.get(ExOtherEventNames.beforeTick)?.trigger(e);
                });
            }
        },
        [ExOtherEventNames.onLongTick]: {
            subscribe: (callback: (arg: TickEvent) => void) => {
                this._subscribe(ExOtherEventNames.onLongTick, callback);
            },
            unsubscribe: (callback: (arg: TickEvent) => void) => {
                this._unsubscribe(ExOtherEventNames.onLongTick, callback)
            },
            pattern: () => {
                ExGame.longTickMonitor.addMonitor((e) => {
                    ExServerEvents.monitorMap.get(ExOtherEventNames.onLongTick)?.trigger(e);
                });
            }
        }

    };
    static monitorMap = new Map<string, MonitorManager<unknown[]>>();

    static init: boolean = false;
    _subscribe(name: string, callback: (arg: any) => void) {
        let e = ExServerEvents.monitorMap.get(name);
        if (e === undefined) {
            e = new MonitorManager();
            ExServerEvents.monitorMap.set(name, e);
        }
        e.addMonitor(callback);

    }

    _unsubscribe(name: string, callback: (arg: any) => void) {
        let arr = ExServerEvents.monitorMap.get(name);
        if (arr) arr.removeMonitor(callback);
    }

    static interceptor = new Map<any, any>();

    constructor(server: ExGameServer) {
        this._server = server;

        this.events = {} as any;
        for (let k in world.afterEvents) {
            const v = world.afterEvents[k as keyof WorldAfterEvents];
            (this.events as any)[`after${k[0].toUpperCase()}${k.slice(1)}`] = {
                subscribe: (a: (arg: any) => void) => {
                    if (!ExServerEvents.interceptor.has(a)) {
                        ExServerEvents.interceptor.set(a, (e: any) => {
                            try {
                                a(e);
                            } catch (err) {
                                ExErrorQueue.reportError(err);
                                throw err;
                            }
                        });
                    }
                    return v.subscribe(ExServerEvents.interceptor.get(a));
                },
                unsubscribe: (a: (arg: any) => void) => {
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
            const v = world.beforeEvents[k as keyof WorldBeforeEvents];
            (this.events as any)[`before${k[0].toUpperCase()}${k.slice(1)}`] = {
                subscribe: (a: (arg: any) => void) => {
                    if (!ExServerEvents.interceptor.has(a)) {
                        ExServerEvents.interceptor.set(a, (e: any) => {
                            try {
                                a(e);
                            } catch (err) {
                                ExErrorQueue.reportError(err);
                                throw err;
                            }
                        });
                    }
                    return v.subscribe(ExServerEvents.interceptor.get(a));
                },
                unsubscribe: (a: (arg: any) => void) => {
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
                (<any>this.exEvents)[i].pattern();
            }
        }

    }
    cancelAll(): void {
        throw new Error('Method not implemented.');
    }

    register(name: string, fun: (arg: any) => void) {
        let func: (arg: any) => void = fun;
        if (name in this.events) {
            return (<any>this.events)[name].subscribe(func);
        } else if (name in this.exEvents) {
            return (<any>this.exEvents)[name].subscribe(func);
        }

        console.warn("No event registered for name " + name);
    }


    cancel(name: string, fun: (arg: any) => void) {
        if (name in this.events) {
            return (<any>this.events)[name].unsubscribe(fun);
        } else if (name in this.exEvents) {
            return (<any>this.exEvents)[name].unsubscribe(fun);
        }
    }
}