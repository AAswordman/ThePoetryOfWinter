export default class EventHandle {
    constructor() {
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
    }
    init() {
    }
}
EventHandle.monitorMap = {};
//# sourceMappingURL=EventHandle.js.map