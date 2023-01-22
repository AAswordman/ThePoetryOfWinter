import ExEntityController from '../../../modules/exmc/server/entity/ExEntityController.js';
import PomBossBarrier from '../func/barrier/PomBossBarrier.js';
import { ExBlockArea } from '../../../modules/exmc/server/block/ExBlockArea.js';
export default class PomBossController extends ExEntityController {
    constructor(e, server) {
        super(e, server);
        this.startPos = this.exEntity.getPosition();
        let barrier = PomBossBarrier.find(this.startPos);
        if (!barrier) {
            barrier = new PomBossBarrier(server, this.exEntity.getExDimension(), new ExBlockArea(this.startPos.clone().sub(32, 32, 32), this.startPos.clone().add(32, 32, 32), true));
        }
        this.barrier = barrier;
        if (barrier.players.size === 0) {
            this.despawn();
            this.barrier.stop();
        }
    }
    despawn() {
        this.entity.triggerEvent("minecraft:despawn");
    }
    onSpawn() {
        super.onSpawn();
    }
    isDefeated() {
        this.barrier.stop();
    }
}
//# sourceMappingURL=PomBossController.js.map