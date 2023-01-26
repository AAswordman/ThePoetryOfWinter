var _a;
import ExPlayer from '../entity/ExPlayer.js';
import EventHandle from "../events/EventHandle.js";
import { ItemOnHandChangeEvent } from "../events/events.js";
export default class ExEntityEvents {
    constructor(ctrl) {
        this.exEvents = {
            itemUse: new Listener(this, "itemUse"),
            tick: new Listener(this, "tick"),
            entityHit: new Listener(this, "entityHit"),
            onHitEntity: new Listener(this, "onHitEntity"),
            onHurt: new Listener(this, "onHurt"),
            itemOnHandChange: new Listener(this, "itemOnHandChange"),
            onLongTick: new Listener(this, "onLongTick"),
            blockBreak: new Listener(this, "blockBreak")
        };
        this._ctrl = ctrl;
        console.warn("regist events");
    }
    _subscribe(arg0, callback) {
        ExEntityEvents.eventHandlers.subscribe(this._ctrl.entity, arg0, callback);
    }
    _unsubscribe(arg0, callback) {
        ExEntityEvents.eventHandlers.unsubscribe(this._ctrl.entity, arg0, callback);
    }
    cancelAll() {
        console.warn("destroy all events");
        ExEntityEvents.eventHandlers.unsubscribeAll(this._ctrl.entity);
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
_a = ExEntityEvents;
ExEntityEvents.eventHandlers = new EventHandle();
ExEntityEvents.exEventSetting = {
    itemUse: {
        pattern: ExEntityEvents.eventHandlers.registerToServerByEntity,
        filter: {
            "name": "source"
        }
    },
    tick: {
        pattern: ExEntityEvents.eventHandlers.registerToServerByServerEvent
    },
    entityHit: {
        pattern: ExEntityEvents.eventHandlers.registerToServerByEntity,
        filter: {
            "name": "entity"
        }
    },
    onHitEntity: {
        pattern: ExEntityEvents.eventHandlers.registerToServerByEntity,
        filter: {
            "name": "damagingEntity"
        },
        name: "entityHurt"
    },
    onHurt: {
        pattern: ExEntityEvents.eventHandlers.registerToServerByEntity,
        filter: {
            "name": "hurtEntity"
        },
        name: "entityHurt"
    },
    itemOnHandChange: {
        pattern: (registerName, k) => {
            _a.onHandItemMap = new Map();
            ExEntityEvents.eventHandlers.server.getEvents().register(registerName, (e) => {
                for (let i of ExEntityEvents.eventHandlers.monitorMap[k]) {
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
        pattern: ExEntityEvents.eventHandlers.registerToServerByServerEvent
    },
    blockBreak: {
        pattern: ExEntityEvents.eventHandlers.registerToServerByEntity,
        filter: {
            "name": "player"
        }
    }
};
ExEntityEvents.onHandItemMap = new Map();
ExEntityEvents.onceItemUseOnMap = new Map();
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
//# sourceMappingURL=ExEntityEvents.js.map