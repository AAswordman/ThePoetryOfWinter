export default class ExClientEvents {
    constructor(client) {
        this._registerToServerByEntity = (server, k) => {
            server.getEvents().register(k, (e) => {
                let player = e[this.exEvents[k].filter.name];
                let fArr = ExClientEvents.monitorMap[k].get(player);
                if (fArr != null) {
                    fArr.forEach((f) => {
                        f(e);
                    });
                }
            });
        };
        this._registerToServerByServerEvent = (server, k) => {
            server.getEvents().register(k, (e) => {
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
            }
        };
        this._client = client;
        if (!ExClientEvents.init) {
            ExClientEvents.init = true;
            for (let k in this.exEvents) {
                ExClientEvents.monitorMap[k] = new Map();
            }
            this._client.runOnServer((server) => {
                for (let k in ExClientEvents.monitorMap) {
                    this.exEvents[k].pattern(server, k);
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
        arr.splice(arr.findIndex(callback), 1);
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