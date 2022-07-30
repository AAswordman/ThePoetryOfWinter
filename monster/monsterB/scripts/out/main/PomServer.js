import ExEntity from "../modules/exmc/entity/ExEntity.js";
import ExGameConfig from "../modules/exmc/ExGameConfig.js";
import ExGameServer from "../modules/exmc/ExGameServer.js";
import PomClient from "./PomClient.js";
import { MinecraftDimensionTypes } from 'mojang-minecraft';
export default class PomServer extends ExGameServer {
    constructor() {
        super();
        this.damageListener = (e) => {
            ExGameConfig.console.log(`${e.damagingEntity == null ? e.cause : e.damagingEntity.id} 对 ${e.hurtEntity.id} 造成 ${e.damage} 点伤害`);
        };
        this.getEvents().events.tick.subscribe((e) => {
            for (let i of this.getDimension(MinecraftDimensionTypes.overworld).getEntities()) {
                let entity = ExEntity.getInstance(i);
                if (entity.hasHealth()) {
                    i.nameTag = entity.getHealth() + " / " + entity.getMaxHealth();
                }
            }
        });
    }
    newClient(id, player) {
        return new PomClient(this, id, player);
    }
    setDamageListenerOn() {
        this.getEvents().events.entityHurt.subscribe(this.damageListener);
        ExGameConfig.console.info("setDamageListenerOn");
    }
    setDamageListenerOff() {
        this.getEvents().events.entityHurt.unsubscribe(this.damageListener);
        ExGameConfig.console.info("setDamageListenerOff");
    }
    receiveMessage(msg) {
        if (msg.message == "setDamageListenerOn") {
            this.setDamageListenerOn();
        }
        else if (msg.message == "setDamageListenerOff") {
            this.setDamageListenerOff();
        }
    }
}
//# sourceMappingURL=PomServer.js.map