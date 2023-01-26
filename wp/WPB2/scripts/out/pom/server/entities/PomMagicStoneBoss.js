import PomBossController from './PomBossController.js';
export default class PomMagicStoneBoss extends PomBossController {
    constructor(e, server) {
        super(e, server);
    }
    initBossEntity() {
        for (let c of this.barrier.clientsByPlayer()) {
            c.ruinsSystem.causeDamageShow = true;
            c.ruinsSystem.causeDamageType.add(this.entity.typeId);
        }
        if (this.isFisrtCall)
            this.server.say({ rawtext: [{ translate: "text.wb:summon_magic_stoneman.name" }] });
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
        this.server.say({ rawtext: [{ translate: "text.wb:defeat_magic_stoneman.name" }] });
        console.warn("onWin");
        this.stopBarrier();
        super.onKilled(e);
    }
}
PomMagicStoneBoss.typeId = "wb:magic_stoneman";
//# sourceMappingURL=PomMagicStoneBoss.js.map