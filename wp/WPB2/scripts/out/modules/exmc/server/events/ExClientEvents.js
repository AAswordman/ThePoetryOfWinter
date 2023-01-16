var _a;
import { Player } from '@minecraft/server';
import ExPlayer from '../entity/ExPlayer.js';
import { ItemOnHandChangeEvent } from "./events.js";
import TickDelayTask from "../../utils/TickDelayTask.js";
import EventHandle from './EventHandle.js';
export default class ExClientEvents {
    constructor(client) {
        this.exEvents = {
            itemUse: new Listener(this, "itemUse"),
            chat: new Listener(this, "chat"),
            beforeChat: new Listener(this, "beforeChat"),
            tick: new Listener(this, "tick"),
            entityHit: new Listener(this, "entityHit"),
            itemUseOn: new Listener(this, "itemUseOn"),
            beforeItemUseOn: new Listener(this, "beforeItemUseOn"),
            onceItemUseOn: new Listener(this, "onceItemUseOn"),
            playerHitEntity: new Listener(this, "playerHitEntity"),
            playerHurt: new Listener(this, "playerHurt"),
            itemOnHandChange: new Listener(this, "itemOnHandChange"),
            onLongTick: new Listener(this, "onLongTick"),
            blockBreak: new Listener(this, "blockBreak")
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
    itemUse: {
        pattern: ExClientEvents.eventHandlers.registerToServerByEntity,
        filter: {
            "name": "source"
        }
    },
    chat: {
        pattern: ExClientEvents.eventHandlers.registerToServerByEntity,
        filter: {
            "name": "sender"
        }
    },
    beforeChat: {
        pattern: ExClientEvents.eventHandlers.registerToServerByEntity,
        filter: {
            "name": "sender"
        }
    },
    tick: {
        pattern: ExClientEvents.eventHandlers.registerToServerByServerEvent
    },
    entityHit: {
        pattern: ExClientEvents.eventHandlers.registerToServerByEntity,
        filter: {
            "name": "entity"
        }
    },
    itemUseOn: {
        pattern: ExClientEvents.eventHandlers.registerToServerByEntity,
        filter: {
            "name": "source"
        }
    },
    beforeItemUseOn: {
        pattern: ExClientEvents.eventHandlers.registerToServerByEntity,
        filter: {
            "name": "source"
        }
    },
    onceItemUseOn: {
        pattern: (registerName, k) => {
            _a.onceItemUseOnMap = new Map();
            ExClientEvents.eventHandlers.server.getEvents().register(registerName, (e) => {
                var _b;
                if (!(e.source instanceof Player))
                    return;
                let part = ExClientEvents.eventHandlers.monitorMap[k];
                if (!_a.onceItemUseOnMap.has(e.source)) {
                    const player = e.source;
                    _a.onceItemUseOnMap.set(e.source, [new TickDelayTask(ExClientEvents.eventHandlers.server.getEvents(), () => {
                            let res = _a.onceItemUseOnMap.get(player);
                            if (res === undefined)
                                return;
                            res[1] = true;
                        }).delay(3), true]);
                }
                let res = _a.onceItemUseOnMap.get(e.source);
                if (res === undefined)
                    return;
                if (res[1]) {
                    res[1] = false;
                    (_b = part.get(e.source)) === null || _b === void 0 ? void 0 : _b.forEach((v) => v(e));
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
        pattern: ExClientEvents.eventHandlers.registerToServerByEntity,
        filter: {
            "name": "damagingEntity"
        },
        name: "entityHurt"
    },
    playerHurt: {
        pattern: ExClientEvents.eventHandlers.registerToServerByEntity,
        filter: {
            "name": "hurtEntity"
        },
        name: "entityHurt"
    },
    itemOnHandChange: {
        pattern: (registerName, k) => {
            _a.onHandItemMap = new Map();
            ExClientEvents.eventHandlers.server.getEvents().register(registerName, (e) => {
                for (let i of ExClientEvents.eventHandlers.monitorMap[k]) {
                    let lastItemCache = _a.onHandItemMap.get(i[0]);
                    let lastItem = lastItemCache === null || lastItemCache === void 0 ? void 0 : lastItemCache[0];
                    let nowItem = ExPlayer.getInstance(i[0]).getBag().getItemOnHand();
                    if ((lastItem === null || lastItem === void 0 ? void 0 : lastItem.typeId) !== (nowItem === null || nowItem === void 0 ? void 0 : nowItem.typeId) || i[0].selectedSlot !== (lastItemCache === null || lastItemCache === void 0 ? void 0 : lastItemCache[1])) {
                        i[1].forEach((f) => {
                            f(new ItemOnHandChangeEvent(lastItem, ExPlayer.getInstance(i[0]).getBag().getItemOnHand(), i[0]));
                        });
                        _a.onHandItemMap.set(i[0], [nowItem, i[0].selectedSlot]);
                    }
                }
            });
        },
        name: "onLongTick"
    },
    onLongTick: {
        pattern: ExClientEvents.eventHandlers.registerToServerByServerEvent
    },
    blockBreak: {
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