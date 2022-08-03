import ExGameServer from "../modules/exmc/ExGameServer.js";
import PomClient from "./PomClient.js";
export default class PomServer extends ExGameServer {
    constructor() {
        super();
    }
    newClient(id, player) {
        return new PomClient(this, id, player);
    }
}
//# sourceMappingURL=PomServer.js.map