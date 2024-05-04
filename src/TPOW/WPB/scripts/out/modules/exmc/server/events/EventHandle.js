import MonitorManager from '../../utils/MonitorManager.js';
import { falseIfError } from '../../utils/tool.js';
export default class EventHandle {
    constructor() {
        this.monitorMap = {};
        this.registerToServerByEntity = (registerName, k) => {
            this.server.getEvents().register(registerName, (e) => {
                var _a;
                const name = (_a = this.listeners[k].filter) === null || _a === void 0 ? void 0 : _a.name;
                if (name) {
                    let player;
                    for (let k of name.split(".")) {
                        player = player ? player[k] : e[k];
                    }
                    let fArr = this.monitorMap[k].get(player);
                    if (fArr) {
                        fArr.trigger(e);
                    }
                }
            });
        };
        this.registerToServerByServerEvent = (registerName, k) => {
            this.server.getEvents().register(registerName, (e) => {
                for (let [key, value] of this.monitorMap[k]) {
                    if (falseIfError(() => key.isValid())) {
                        value.trigger(e);
                    }
                }
            });
        };
    }
    setEventLiseners(e) {
        this.listeners = e;
    }
    init(s) {
        this.server = s;
        for (let k in this.listeners) {
            this.monitorMap[k] = new Map();
        }
        for (let k in this.monitorMap) {
            let p = this.listeners[k];
            let registerName = k;
            if (p.name) {
                registerName = p.name;
            }
            p.pattern(registerName, k);
        }
    }
    subscribe(entity, name, callback) {
        var _a;
        let e = this.monitorMap[name];
        if (!e.has(entity)) {
            e.set(entity, new MonitorManager());
        }
        (_a = e.get(entity)) === null || _a === void 0 ? void 0 : _a.addMonitor(callback);
    }
    unsubscribe(entity, name, callback) {
        let e = this.monitorMap[name];
        let arr = e.get(entity);
        arr === null || arr === void 0 ? void 0 : arr.removeMonitor(callback);
    }
    unsubscribeAll(e) {
        for (let m in this.monitorMap) {
            this.monitorMap[m].delete(e);
        }
    }
}
export function eventGetter(lis, filter) {
    return new Promise((resolve, reject) => {
        const f = (e) => {
            if (filter(e)) {
                lis.unsubscribe(f);
                resolve(e);
            }
        };
        lis.subscribe(f);
    });
}
//# sourceMappingURL=EventHandle.js.map