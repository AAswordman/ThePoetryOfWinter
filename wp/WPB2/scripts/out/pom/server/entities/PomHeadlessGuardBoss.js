import PomBossController from './PomBossController.js';
export default class PomHeadlessGuardBoss extends PomBossController {
    constructor(e, server) {
        super(e, server);
        for (let c of this.barrier.clientsByPlayer()) {
            c.ruinsSystem.causeDamageShow = true;
            c.ruinsSystem.causeDamageType.add(this.entity.typeId);
        }
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
        super.onKilled(e);
    }
}
PomHeadlessGuardBoss.typeId = "wb:headless_guard";
//# sourceMappingURL=PomHeadlessGuardBoss.js.map