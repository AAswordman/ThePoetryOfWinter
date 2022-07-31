import ExGameConfig from "../modules/exmc/ExGameConfig.js";
import ExGameServer from "../modules/exmc/ExGameServer.js";
import PomClient from "./PomClient.js";
export default class PomServer extends ExGameServer {
    constructor() {
        super();
        this.damageListener = (e) => {
            ExGameConfig.console.log(`${e.damagingEntity == null ? e.cause : e.damagingEntity.id} 对 ${e.hurtEntity.id} 造成 ${e.damage} 点伤害`);
        };
        this.getEvents().events.entityHurt.subscribe(this.damageListener);
    }
    newClient(id, player) {
        return new PomClient(this, id, player);
    }
}
//# sourceMappingURL=PomServer.js.map