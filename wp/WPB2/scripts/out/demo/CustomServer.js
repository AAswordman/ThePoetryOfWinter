import ExGameServer from "../modules/exmc/ExGameServer.js";
import CustomClient from "./CustomClient.js";
export default class CustomServer extends ExGameServer {
    constructor() {
        super();
    }
    newClient(id, player) {
        return new CustomClient(this, id, player);
    }
}
//# sourceMappingURL=CustomServer.js.map