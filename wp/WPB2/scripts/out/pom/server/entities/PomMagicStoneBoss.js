import PomBossController from './PomBossController.js';
export default class PomMagicStoneBoss extends PomBossController {
    constructor(e, server) {
        super(e, server);
        for (let e of this.barrier.players) {
            let c = this.server.findClientByPlayer(e[0]);
            if (c) {
                c.ruinsSystem.causeDamageShow = true;
                c.ruinsSystem.causeDamageType.add(this.entity.typeId);
            }
        }
        this.server.say({ rawtext: [{ translate: "text.wb:summon_magic_stoneman.name" }] });
    }
    onSpawn() {
        super.onSpawn();
    }
    onKilled(e) {
        //设置奖励
        for (let e of this.barrier.players) {
            let c = this.server.findClientByPlayer(e[0]);
            if (c) {
                c.progressTaskFinish(this.entity.typeId, c.ruinsSystem.causeDamage);
                c.ruinsSystem.causeDamageShow = false;
            }
        }
        this.server.say({ rawtext: [{ translate: "text.wb:defeat_magic_stoneman.name" }] });
        console.warn("onWin");
        super.stopBarrier();
        super.onKilled(e);
    }
    onFail() {
        console.warn("onFail");
        super.stopBarrier();
        super.onFail();
    }
}
PomMagicStoneBoss.typeId = "wb:magic_stoneman";
//# sourceMappingURL=PomMagicStoneBoss.js.map