import "../../reflect-metadata/Reflect.js";
import ExSystem from "../utils/ExSystem.js";
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
}
ExGame.serverMap = new Map;
export function receiveMessage(exportName) {
    return function (target, propertyName, descriptor) {
        Reflect.defineMetadata("exportName", exportName, target, propertyName);
    };
}
//# sourceMappingURL=ExGame.js.map