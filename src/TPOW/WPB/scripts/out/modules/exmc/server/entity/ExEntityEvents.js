import EventHandle from "../events/EventHandle.js";
import { ExEventNames, ExOtherEventNames } from "../events/events.js";
class ExEntityEvents {
    _subscribe(arg0, callback) {
        ExEntityEvents.eventHandlers.subscribe(this._ctrl.entity, arg0, callback);
    }
    _unsubscribe(arg0, callback) {
        ExEntityEvents.eventHandlers.unsubscribe(this._ctrl.entity, arg0, callback);
    }
    cancelAll() {
        ExEntityEvents.eventHandlers.unsubscribeAll(this._ctrl.entity);
    }
    static init(s) {
        this.eventHandlers.setEventLiseners(this.exEventSetting);
        this.eventHandlers.init(s);
    }
    constructor(ctrl) {
        this.exEvents = {
            [ExEventNames.beforeItemUse]: new Listener(this, ExEventNames.beforeItemUse),
            [ExEventNames.afterItemUse]: new Listener(this, ExEventNames.afterItemUse),
            [ExOtherEventNames.tick]: new Listener(this, ExOtherEventNames.tick),
            [ExEventNames.afterEntityHitBlock]: new Listener(this, ExEventNames.afterEntityHitBlock),
            [ExEventNames.afterEntityHitEntity]: new Listener(this, ExEventNames.afterEntityHitEntity),
            [ExOtherEventNames.afterOnHurt]: new Listener(this, ExOtherEventNames.afterOnHurt),
            [ExOtherEventNames.onLongTick]: new Listener(this, ExOtherEventNames.onLongTick),
            [ExOtherEventNames.beforeTick]: new Listener(this, ExOtherEventNames.beforeTick),
            [ExEventNames.afterPlayerBreakBlock]: new Listener(this, ExEventNames.afterPlayerBreakBlock),
            [ExEventNames.afterEntityRemove]: new Listener(this, ExEventNames.afterEntityRemove)
        };
        this._ctrl = ctrl;
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
ExEntityEvents.eventHandlers = new EventHandle();
ExEntityEvents.exEventSetting = {
    [ExEventNames.beforeItemUse]: {
        pattern: ExEntityEvents.eventHandlers.registerToServerByEntity,
        filter: {
            "name": "source"
        }
    },
    [ExEventNames.afterItemUse]: {
        pattern: ExEntityEvents.eventHandlers.registerToServerByEntity,
        filter: {
            "name": "source"
        }
    },
    [ExOtherEventNames.tick]: {
        pattern: ExEntityEvents.eventHandlers.registerToServerByServerEvent
    },
    [ExOtherEventNames.beforeTick]: {
        pattern: ExEntityEvents.eventHandlers.registerToServerByServerEvent
    },
    [ExEventNames.afterEntityHitBlock]: {
        pattern: ExEntityEvents.eventHandlers.registerToServerByEntity,
        filter: {
            "name": "entity"
        }
    },
    [ExEventNames.afterEntityHitEntity]: {
        pattern: ExEntityEvents.eventHandlers.registerToServerByEntity,
        filter: {
            "name": "damageSource.damagingEntity"
        },
        name: ExEventNames.afterEntityHurt
    },
    [ExOtherEventNames.afterOnHurt]: {
        pattern: ExEntityEvents.eventHandlers.registerToServerByEntity,
        filter: {
            "name": "hurtEntity"
        },
        name: ExEventNames.afterEntityHurt
    },
    [ExOtherEventNames.onLongTick]: {
        pattern: ExEntityEvents.eventHandlers.registerToServerByServerEvent
    },
    [ExEventNames.afterPlayerBreakBlock]: {
        pattern: ExEntityEvents.eventHandlers.registerToServerByEntity,
        filter: {
            "name": "player"
        }
    },
    [ExEventNames.afterEntityRemove]: {
        pattern: ExEntityEvents.eventHandlers.registerToServerByServerEvent
    }
};
ExEntityEvents.onHandItemMap = new Map();
ExEntityEvents.onceItemUseOnMap = new Map();
export default ExEntityEvents;
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
class CallBackListener {
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