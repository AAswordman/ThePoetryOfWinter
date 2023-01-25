import PomBossController from './PomBossController.js';
import ExSound from '../../../modules/exmc/server/env/ExSound.js';
export default class PomHeadlessGuardBoss extends PomBossController {
    constructor(e, server) {
        super(e, server);
        this.music = new ExSound("music.wb.unknown_world", "2:16");
        this.setTimeout(() => {
            this.music.loop(this.getEvents(), this.exEntity.getExDimension(), this.entity.location);
        }, 500);
        for (let c of this.barrier.clientsByPlayer()) {
            c.ruinsSystem.causeDamageShow = true;
            c.ruinsSystem.causeDamageType.add(this.entity.typeId);
        }
        if (this.barrier.players.size !== 0)
            this.server.say({ rawtext: [{ translate: "text.wb:summon_headless_guard.name" }] });
    }
    onSpawn() {
        super.onSpawn();
    }
    onKilled(e) {
        //设置奖励
        for (let c of this.barrier.clientsByPlayer()) {
            c.progressTaskFinish(this.entity.typeId, c.ruinsSystem.causeDamage);
            c.ruinsSystem.causeDamageShow = false;
        }
        this.server.say({ rawtext: [{ translate: "text.wb:defeat_headless_guard.name" }] });
        console.warn("onWin");
        this.stopBarrier();
        this.music.stop();
        super.onKilled(e);
    }
    onFail() {
        this.music.stop();
        super.onFail();
    }
}
PomHeadlessGuardBoss.typeId = "wb:headless_guard";
//# sourceMappingURL=PomHeadlessGuardBoss.js.map