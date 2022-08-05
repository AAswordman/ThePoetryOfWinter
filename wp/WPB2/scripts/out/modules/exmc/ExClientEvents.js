import { Player } from 'mojang-minecraft';
import ExPlayer from './entity/ExPlayer';
import { ItemOnHandChangeEvent } from "./events.js";
import ExGameConfig from "./ExGameConfig.js";
import TickDelayTask from "./utils/TickDelayTask.js";
export default class ExClientEvents {
    constructor(client) {
        this._registerToServerByEntity = (server, registerName, k) => {
            server.getEvents().register(registerName, (e) => {
                let player = e[this.exEvents[k].filter.name];
                let fArr = ExClientEvents.monitorMap[k].get(player);
                if (fArr != null) {
                    fArr.forEach((f) => {
                        f(e);
                    });
                }
            });
        };
        this._registerToServerByServerEvent = (server, registerName, k) => {
            server.getEvents().register(registerName, (e) => {
                for (let i of ExClientEvents.monitorMap[k]) {
                    i[1].forEach((f) => {
                        f(e);
                    });
                }
            });
        };
        this.exEvents = {
            itemUse: {
                subscribe: (callback) => {
                    this._subscribe("itemUse", callback);
                },
                unsubscribe: (callback) => {
                    this._unsubscribe("itemUse", callback);
                },
                pattern: this._registerToServerByEntity,
                filter: {
                    "name": "source"
                }
            },
            chat: {
                subscribe: (callback) => {
                    this._subscribe("chat", callback);
                },
                unsubscribe: (callback) => {
                    this._unsubscribe("chat", callback);
                },
                pattern: this._registerToServerByEntity,
                filter: {
                    "name": "sender"
                }
            },
            tick: {
                subscribe: (callback) => {
                    this._subscribe("tick", callback);
                },
                unsubscribe: (callback) => {
                    this._unsubscribe("tick", callback);
                },
                pattern: this._registerToServerByServerEvent
            },
            entityHit: {
                subscribe: (callback) => {
                    this._subscribe("entityHit", callback);
                },
                unsubscribe: (callback) => {
                    this._unsubscribe("entityHit", callback);
                },
                pattern: this._registerToServerByEntity,
                filter: {
                    "name": "entity"
                }
            },
            itemUseOn: {
                subscribe: (callback) => {
                    this._subscribe("itemUseOn", callback);
                },
                unsubscribe: (callback) => {
                    this._unsubscribe("itemUseOn", callback);
                },
                pattern: this._registerToServerByEntity,
                filter: {
                    "name": "source"
                }
            },
            beforeItemUseOn: {
                subscribe: (callback) => {
                    this._subscribe("beforeItemUseOn", callback);
                },
                unsubscribe: (callback) => {
                    this._unsubscribe("beforeItemUseOn", callback);
                },
                pattern: this._registerToServerByEntity,
                filter: {
                    "name": "source"
                }
            },
            onceItemUseOn: {
                subscribe: (callback) => {
                    this._subscribe("onceItemUseOn", callback);
                },
                unsubscribe: (callback) => {
                    this._unsubscribe("onceItemUseOn", callback);
                },
                pattern: (server, registerName, k) => {
                    this.onceItemUseOnMap = new Map();
                    server.getEvents().register(registerName, (e) => {
                        var _a;
                        if (!(e.source instanceof Player))
                            return;
                        let part = ExClientEvents.monitorMap[k];
                        if (!this.onceItemUseOnMap.has(e.source)) {
                            const player = e.source;
                            this.onceItemUseOnMap.set(e.source, [new TickDelayTask(server.getEvents(), () => {
                                    let res = this.onceItemUseOnMap.get(player);
                                    if (res === undefined)
                                        return;
                                    res[1] = true;
                                }).delay(3), true]);
                        }
                        let res = this.onceItemUseOnMap.get(e.source);
                        if (res === undefined)
                            return;
                        if (res[1]) {
                            res[1] = false;
                            (_a = part.get(e.source)) === null || _a === void 0 ? void 0 : _a.forEach((v) => v(e));
                        }
                        res[0].stop();
                        res[0].startOnce();
                    });
                },
                filter: {
                    "name": "source"
                },
                name: "beforeItemUseOn"
            },
            playerHitEntity: {
                subscribe: (callback) => {
                    this._subscribe("playerHitEntity", callback);
                },
                unsubscribe: (callback) => {
                    this._unsubscribe("playerHitEntity", callback);
                },
                pattern: this._registerToServerByEntity,
                filter: {
                    "name": "damagingEntity"
                },
                name: "entityHurt"
            },
            playerHurt: {
                subscribe: (callback) => {
                    this._subscribe("playerHurt", callback);
                },
                unsubscribe: (callback) => {
                    this._unsubscribe("playerHurt", callback);
                },
                pattern: this._registerToServerByEntity,
                filter: {
                    "name": "hurtEntity"
                },
                name: "entityHurt"
            },
            itemOnHandChange: {
                subscribe: (callback) => {
                    this._subscribe("itemOnHandChange", callback);
                },
                unsubscribe: (callback) => {
                    this._unsubscribe("itemOnHandChange", callback);
                },
                pattern: (server, registerName, k) => {
                    this.onHandItemMap = new Map();
                    server.getEvents().register(registerName, (e) => {
                        for (let i of ExClientEvents.monitorMap[k]) {
                            let lastItemCache = this.onHandItemMap.get(i[0]);
                            let lastItem = lastItemCache === null || lastItemCache === void 0 ? void 0 : lastItemCache[0];
                            let nowItem = ExPlayer.getInstance(i[0]).getBag().getItemOnHand();
                            if ((lastItem === null || lastItem === void 0 ? void 0 : lastItem.id) !== (nowItem === null || nowItem === void 0 ? void 0 : nowItem.id) || i[0].selectedSlot !== (lastItemCache === null || lastItemCache === void 0 ? void 0 : lastItemCache[1])) {
                                i[1].forEach((f) => {
                                    f(new ItemOnHandChangeEvent(lastItem, nowItem, i[0]));
                                });
                                this.onHandItemMap.set(i[0], [nowItem, i[0].selectedSlot]);
                            }
                        }
                    });
                },
                name: "onLongTick"
            },
            onLongTick: {
                subscribe: (callback) => {
                    this._subscribe("onLongTick", callback);
                },
                unsubscribe: (callback) => {
                    this._unsubscribe("onLongTick", callback);
                },
                pattern: this._registerToServerByServerEvent
            },
        };
        this._client = client;
        if (!ExClientEvents.init) {
            ExClientEvents.init = true;
            for (let k in this.exEvents) {
                ExClientEvents.monitorMap[k] = new Map();
            }
            this._client.runOnServer((server) => {
                for (let k in ExClientEvents.monitorMap) {
                    let p = this.exEvents[k];
                    let registerName = k;
                    if ("name" in p) {
                        registerName = p.name;
                    }
                    p.pattern(server, registerName, k);
                }
            });
        }
    }
    _subscribe(name, callback) {
        let e = ExClientEvents.monitorMap[name];
        if (!e.has(this._client.player)) {
            e.set(this._client.player, []);
        }
        e.get(this._client.player).push(callback);
    }
    _unsubscribe(name, callback) {
        let e = ExClientEvents.monitorMap[name];
        let arr = e.get(this._client.player);
        arr.splice(arr.findIndex((v, i) => {
            if (v === callback)
                return true;
        }), 1);
    }
    register(name, fun) {
        if (this.exEvents != null) {
            return this.exEvents.subscribe(fun);
        }
    }
    cancel(name, fun) {
        if (this.exEvents[name] != null) {
            return this.exEvents[name].unsubscribe(fun);
        }
    }
    unsubscribeAll() {
        for (let m in ExClientEvents.monitorMap) {
            ExClientEvents.monitorMap[m].delete(this._client.player);
        }
        ExGameConfig.console.info("Unsubscribed to ExClientEvents");
    }
}
/*
 {
    "event" : (Map){
        Player : [ callback ]
    }
 }
 */
ExClientEvents.monitorMap = {};
ExClientEvents.init = false;
//# sourceMappingURL=ExClientEvents.js.map