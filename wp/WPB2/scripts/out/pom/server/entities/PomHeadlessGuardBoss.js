import PomBossController from './PomBossController.js';
export default class PomHeadlessGuardBoss extends PomBossController {
    constructor(e, server) {
        super(e, server);
        this.music = server.getSound("music.wb.unknown_world", "2:16");
    }
    initBossEntity() {
        for (let c of this.barrier.clientsByPlayer()) {
            c.ruinsSystem.causeDamageShow = true;
            c.ruinsSystem.causeDamageType.add(this.entity.typeId);
        }
        if (this.isFisrtCall) {
            this.server.say({ rawtext: [{ translate: "text.wb:summon_headless_guard.name" }] });
            this.setTimeout(() => {
                this.music.loop(this.exEntity.exDimension, this.entity.location);
            }, 500);
        }
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