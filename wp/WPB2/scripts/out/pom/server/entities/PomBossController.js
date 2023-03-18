import { EntityDamageCause } from '@minecraft/server';
import ExEntityController from '../../../modules/exmc/server/entity/ExEntityController.js';
import PomBossBarrier from '../func/barrier/PomBossBarrier.js';
import { ExBlockArea } from '../../../modules/exmc/server/block/ExBlockArea.js';
export default class PomBossController extends ExEntityController {
    constructor(e, server) {
        super(e, server);
        this.isFisrtCall = false;
        this.startPos = this.exEntity.getPosition();
        let barrier = PomBossBarrier.find(this.startPos);
        if (!barrier) {
            this.isFisrtCall = true;
            barrier = new PomBossBarrier(server, this.exEntity.getExDimension(), new ExBlockArea(this.startPos.clone().sub(32, 32, 32), this.startPos.clone().add(32, 32, 32), true), this);
        }
        else {
            barrier.setBoss(this);
        }
        this.barrier = barrier;
        if (barrier.players.size === 0) {
            this.despawn();
            this.stopBarrier();
            this.destroyBossEntity();
        }
        else {
            this.initBossEntity();
        }
    }
    despawn() {
        this.entity.triggerEvent("minecraft:despawn");
    }
    onFail() {
        console.warn("onFail");
        for (let c of this.barrier.clientsByPlayer()) {
            c.ruinsSystem.causeDamageShow = false;
        }
        this.stopBarrier();
        this.destroyBossEntity();
        this.server.say({ rawtext: [{ translate: "text.dec:killed_by_boss.name" }] });
        this.despawn();
    }
    onKilled(e) {
        this.destroyBossEntity();
        if (e.damageSource.cause === EntityDamageCause.suicide) {
            this.stopBarrier();
        }
        super.onKilled(e);
    }
    onSpawn() {
        super.onSpawn();
    }
    stopBarrier() {
        this.barrier.stop();
    }
    destroyBossEntity() {
    }
    initBossEntity() {
    }
}
//# sourceMappingURL=PomBossController.js.map