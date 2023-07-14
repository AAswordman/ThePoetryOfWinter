var _a;
import ExPlayer from '../entity/ExPlayer.js';
import { ExEventNames, ExOtherEventNames, ItemOnHandChangeEvent } from "./events.js";
import EventHandle from './EventHandle.js';
export default class ExClientEvents {
    constructor(client) {
        this.exEvents = {
            [ExEventNames.beforeItemUse]: new Listener(this, ExEventNames.beforeItemUse),
            [ExEventNames.afterItemUse]: new Listener(this, ExEventNames.beforeItemUse),
            [ExEventNames.afterChatSend]: new Listener(this, ExEventNames.afterChatSend),
            [ExEventNames.beforeChatSend]: new Listener(this, ExEventNames.beforeChatSend),
            [ExOtherEventNames.tick]: new Listener(this, ExOtherEventNames.tick),
            [ExOtherEventNames.onLongTick]: new Listener(this, ExOtherEventNames.onLongTick),
            [ExEventNames.afterItemUseOn]: new Listener(this, ExEventNames.afterItemUseOn),
            [ExEventNames.beforeItemUseOn]: new Listener(this, ExEventNames.beforeItemUseOn),
            [ExOtherEventNames.afterPlayerHitBlock]: new Listener(this, ExOtherEventNames.afterPlayerHitBlock),
            [ExOtherEventNames.afterPlayerHitEntity]: new Listener(this, ExOtherEventNames.afterPlayerHitEntity),
            [ExOtherEventNames.afterPlayerHurt]: new Listener(this, ExOtherEventNames.afterPlayerHurt),
            [ExOtherEventNames.afterItemOnHandChange]: new Listener(this, ExOtherEventNames.afterItemOnHandChange),
            [ExEventNames.afterBlockBreak]: new Listener(this, ExEventNames.afterBlockBreak)
        };
        this._client = client;
    }
    _subscribe(arg0, callback) {
        ExClientEvents.eventHandlers.subscribe(this._client.player, arg0, callback);
    }
    _unsubscribe(arg0, callback) {
        ExClientEvents.eventHandlers.unsubscribe(this._client.player, arg0, callback);
    }
    cancelAll() {
        ExClientEvents.eventHandlers.unsubscribeAll(this._client.player);
    }
    static init(s) {
        this.eventHandlers.setEventLiseners(this.exEventSetting);
        this.eventHandlers.init(s);
    }
    register(name, fun) {
        let func = fun;
        if (name in this.exEvents) {
            return this.exEvents[name].subscribe(func);
        }
        console.warn("No event registered for name " + name);
    }
    cancel(name, fun) {
        if (name in this.exEvents) {
            return this.exEvents[name].unsubscribe(fun);
        }
    }
}
_a = ExClientEvents;
ExClientEvents.eventHandlers = new EventHandle();
ExClientEvents.exEventSetting = {
    [ExEventNames.beforeItemUse]: {
        pattern: ExClientEvents.eventHandlers.registerToServerByEntity,
        filter: {
            "name": "source"
        }
    },
    [ExEventNames.afterChatSend]: {
        pattern: ExClientEvents.eventHandlers.registerToServerByEntity,
        filter: {
            "name": "sender"
        }
    },
    [ExEventNames.afterChatSend]: {
        pattern: ExClientEvents.eventHandlers.registerToServerByEntity,
        filter: {
            "name": "sender"
        }
    },
    [ExEventNames.beforeChatSend]: {
        pattern: ExClientEvents.eventHandlers.registerToServerByEntity,
        filter: {
            "name": "sender"
        }
    },
    [ExOtherEventNames.tick]: {
        pattern: ExClientEvents.eventHandlers.registerToServerByServerEvent
    },
    [ExOtherEventNames.onLongTick]: {
        pattern: ExClientEvents.eventHandlers.registerToServerByServerEvent
    },
    [ExEventNames.afterItemUseOn]: {
        pattern: ExClientEvents.eventHandlers.registerToServerByEntity,
        filter: {
            "name": "source"
        }
    },
    [ExEventNames.beforeItemUseOn]: {
        pattern: ExClientEvents.eventHandlers.registerToServerByEntity,
        filter: {
            "name": "source"
        }
    },
    // onceItemUseOn: {
    //     pattern: (registerName: string, k: string) => {
    //         this.onceItemUseOnMap = new Map<Entity, [TickDelayTask, boolean]>();
    //         ExClientEvents.eventHandlers.server.getEvents().register(registerName, (e: ItemUseOnEvent) => {
    //             if (!(e.source instanceof Player)) return;
    //             let part = (<Map<Player, ((i: ItemUseOnEvent) => void)[]>>ExClientEvents.eventHandlers.monitorMap[k]);
    //             if (!this.onceItemUseOnMap.has(e.source)) {
    //                 const player = e.source;
    //                 this.onceItemUseOnMap.set(e.source, [ExSystem.tickTask(() => {
    //                     let res = this.onceItemUseOnMap.get(player);
    //                     if (res === undefined) return;
    //                     res[1] = true;
    //                 }).delay(3), true]);
    //             }
    //             let res = this.onceItemUseOnMap.get(e.source);
    //             if (res === undefined) return;
    //             if (res[1]) {
    //                 res[1] = false;
    //                 part.get(e.source)?.forEach((v) => v(e));
    //             }
    //             res[0].stop();
    //             res[0].startOnce();
    //         });
    //     },
    //     filter: {
    //         "name": "source"
    //     },
    //     name: "itemUseOn"
    // },
    [ExOtherEventNames.afterPlayerHitBlock]: {
        pattern: ExClientEvents.eventHandlers.registerToServerByEntity,
        filter: {
            "name": "damagingEntity"
        }
    },
    [ExOtherEventNames.afterPlayerHitEntity]: {
        pattern: ExClientEvents.eventHandlers.registerToServerByEntity,
        filter: {
            "name": "damageSource.damagingEntity"
        },
        name: ExEventNames.afterEntityHurt
    },
    [ExOtherEventNames.afterPlayerHurt]: {
        pattern: ExClientEvents.eventHandlers.registerToServerByEntity,
        filter: {
            "name": "hurtEntity"
        },
        name: ExEventNames.afterEntityHurt
    },
    [ExOtherEventNames.afterItemOnHandChange]: {
        pattern: (registerName, k) => {
            _a.onHandItemMap = new Map();
            ExClientEvents.eventHandlers.server.getEvents().register(registerName, (e) => {
                for (let i of ExClientEvents.eventHandlers.monitorMap[k]) {
                    let lastItemCache = _a.onHandItemMap.get(i[0]);
                    let lastItem = lastItemCache === null || lastItemCache === void 0 ? void 0 : lastItemCache[0];
                    let nowItem = ExPlayer.getInstance(i[0]).getBag().itemOnMainHand;
                    if ((lastItem === null || lastItem === void 0 ? void 0 : lastItem.typeId) !== (nowItem === null || nowItem === void 0 ? void 0 : nowItem.typeId) || i[0].selectedSlot !== (lastItemCache === null || lastItemCache === void 0 ? void 0 : lastItemCache[1])) {
                        i[1].forEach((f) => {
                            f(new ItemOnHandChangeEvent(lastItem, ExPlayer.getInstance(i[0]).getBag().itemOnMainHand, i[0]));
                        });
                        _a.onHandItemMap.set(i[0], [nowItem, i[0].selectedSlot]);
                    }
                }
            });
        },
        name: ExOtherEventNames.onLongTick
    },
    [ExEventNames.afterBlockBreak]: {
        pattern: ExClientEvents.eventHandlers.registerToServerByEntity,
        filter: {
            "name": "player"
        }
    }
};
ExClientEvents.onHandItemMap = new Map();
ExClientEvents.onceItemUseOnMap = new Map();
class Listener {
    constructor(e, name) {
        this.subscribe = (callback) => {
            e._subscribe(name, callback);
        };
        this.unsubscribe = (callback) => {
            e._unsubscribe(name, callback);
        };
    }
}
//# sourceMappingURL=ExClientEvents.js.map