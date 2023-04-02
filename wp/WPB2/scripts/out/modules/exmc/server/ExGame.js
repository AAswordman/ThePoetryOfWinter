var _a;
import "../../reflect-metadata/Reflect.js";
import ExSystem from "../utils/ExSystem.js";
import { system } from "@minecraft/server";
import MonitorManager from "../utils/MonitorManager.js";
export default class ExGame {
    static createServer(serverCons, config) {
        let server = new serverCons(config);
        this.serverMap.set(serverCons, server);
    }
    static postMessageBetweenServer() {
    }
    static postMessageBetweenClient(client, s, exportName, args) {
        let server = this.serverMap.get(s);
        if (!server)
            return;
        let finder = server.findClientByPlayer(client.player);
        if (!finder)
            return;
        for (let k of ExSystem.keys(finder)) {
            let data = Reflect.getMetadata("exportName", finder, k);
            if (data === exportName) {
                Reflect.get(finder, k).apply(finder, args);
            }
        }
    }
    static thread() {
    }
}
_a = ExGame;
ExGame.tickMonitor = new MonitorManager();
ExGame.longTickMonitor = new MonitorManager();
(() => {
    let tickNum = 0, tickTime = 0;
    const fun = () => {
        const n = new Date().getTime();
        let event = {
            currentTick: tickNum,
            deltaTime: (n - tickTime) / 1000
        };
        tickTime = n;
        tickNum += 1;
        _a.tickMonitor.trigger(event);
    };
    system.runInterval(fun, 1);
})();
(() => {
    let tickNum = 0, tickTime = 0;
    const fun = () => {
        const n = new Date().getTime();
        let event = {
            currentTick: tickNum,
            deltaTime: (n - tickTime) / 1000
        };
        tickTime = n;
        tickNum += 1;
        _a.longTickMonitor.trigger(event);
    };
    system.runInterval(fun, 5);
})();
ExGame.serverMap = new Map;
export function receiveMessage(exportName) {
    return function (target, propertyName, descriptor) {
        Reflect.defineMetadata("exportName", exportName, target, propertyName);
    };
}
//# sourceMappingURL=ExGame.js.map