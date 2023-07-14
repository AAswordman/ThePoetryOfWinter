var _a;
import "../../reflect-metadata/Reflect.js";
import ExSystem from "../utils/ExSystem.js";
import { system } from "@minecraft/server";
import MonitorManager from "../utils/MonitorManager.js";
import ExErrorQueue from "./ExErrorQueue.js";
export default class ExGame {
    static createServer(serverCons, config) {
        let server = new serverCons(config);
        this.serverMap.set(serverCons, server);
    }
    static postMessageBetweenServer() {
    }
    static postMessageBetweenClient(client, s, exportName, args) {
        ExGame.run(() => {
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
        });
    }
    static thread() {
    }
    static clearRun(runId) {
        system.clearRun(runId);
    }
    static run(callback) {
        return system.run(() => {
            try {
                callback();
            }
            catch (err) {
                ExErrorQueue.reportError(err);
                throw err;
            }
        });
    }
    static runInterval(callback, tickInterval) {
        return system.runInterval(() => {
            try {
                callback();
            }
            catch (err) {
                ExErrorQueue.reportError(err);
                throw err;
            }
        }, tickInterval);
    }
    static runTimeout(callback, tickDelay) {
        return system.runTimeout(() => {
            try {
                callback();
            }
            catch (err) {
                ExErrorQueue.reportError(err);
                throw err;
            }
        }, tickDelay);
    }
}
_a = ExGame;
ExGame.tickMonitor = new MonitorManager();
ExGame.longTickMonitor = new MonitorManager();
(() => {
    let tickNum = 0, tickTime = 0;
    const fun = () => {
        const n = Date.now();
        let event = {
            currentTick: tickNum,
            deltaTime: (n - tickTime) / 1000
        };
        tickTime = n;
        tickNum = (tickNum + 1) % 72000;
        _a.tickMonitor.trigger(event);
    };
    ExGame.runInterval(fun, 1);
})();
(() => {
    let tickNum = 0, tickTime = 0;
    const fun = () => {
        const n = Date.now();
        let event = {
            currentTick: tickNum,
            deltaTime: (n - tickTime) / 1000
        };
        tickTime = n;
        tickNum = (tickNum + 1) % 72000;
        _a.longTickMonitor.trigger(event);
    };
    ExGame.runInterval(fun, 5);
})();
ExGame.serverMap = new Map;
export function receiveMessage(exportName) {
    return function (target, propertyName, descriptor) {
        Reflect.defineMetadata("exportName", exportName, target, propertyName);
    };
}
//# sourceMappingURL=ExGame.js.map