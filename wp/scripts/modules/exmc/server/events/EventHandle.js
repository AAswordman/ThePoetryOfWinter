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
                        fArr.forEach((f) => {
                            f(e);
                        });
                    }
                }
            });
        };
        this.registerToServerByServerEvent = (registerName, k) => {
            this.server.getEvents().register(registerName, (e) => {
                for (let [key, value] of this.monitorMap[k]) {
                    value.forEach((f) => {
                        f(e);
                    });
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
            e.set(entity, []);
        }
        (_a = e.get(entity)) === null || _a === void 0 ? void 0 : _a.push(callback);
    }
    unsubscribe(entity, name, callback) {
        let e = this.monitorMap[name];
        let arr = e.get(entity);
        if (arr) {
            let index = arr.indexOf(callback);
            if (index !== -1)
                arr.splice(index, 1);
        }
    }
    unsubscribeAll(e) {
        for (let m in this.monitorMap) {
            this.monitorMap[m].delete(e);
        }
    }
}
//# sourceMappingURL=EventHandle.js.map