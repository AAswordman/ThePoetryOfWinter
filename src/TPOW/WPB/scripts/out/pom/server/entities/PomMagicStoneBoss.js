import PomBossController from './PomBossController.js';
class PomMagicStoneBoss extends PomBossController {
    constructor(e, server) {
        super(e, server);
    }
    initBossEntity() {
        super.initBossEntity();
        if (this.isFisrtCall)
            this.server.say({ rawtext: [{ translate: "text.wb:summon_magic_stoneman.name" }] });
    }
    onSpawn() {
        super.onSpawn();
    }
    onKilled(e) {
        //清理周围
        for (let e of this.exEntity.dimension.getEntities({
            "location": this.barrier.center,
            "maxDistance": 128,
            "families": ["magic_stone_summoner"]
        })) {
            e.kill();
        }
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
export default PomMagicStoneBoss;
//# sourceMappingURL=PomMagicStoneBoss.js.map