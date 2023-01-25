import PomBossController from './PomBossController.js';
export class PomIntentionsBoss1 extends PomBossController {
    constructor(e, server) {
        super(e, server);
        for (let c of this.barrier.clientsByPlayer()) {
            c.ruinsSystem.causeDamageShow = true;
            c.ruinsSystem.causeDamageType.add(this.entity.typeId);
        }
        if (this.barrier.players.size !== 0)
            this.server.say({ rawtext: [{ translate: "text.wb:summon_intentions.name" }] });
    }
    onSpawn() {
        super.onSpawn();
    }
    onKilled(e) {
        super.onKilled(e);
    }
    onFail() {
        super.onFail();
    }
}
PomIntentionsBoss1.typeId = "wb:intentions_first";
export class PomIntentionsBoss2 extends PomBossController {
    constructor(e, server) {
        super(e, server);
        for (let c of this.barrier.clientsByPlayer()) {
            c.ruinsSystem.causeDamageShow = true;
            c.ruinsSystem.causeDamageType.add(this.entity.typeId);
        }
    }
    onSpawn() {
        super.onSpawn();
    }
    onKilled(e) {
        super.onKilled(e);
    }
    onFail() {
        super.onFail();
    }
}
PomIntentionsBoss2.typeId = "wb:intentions_second";
export class PomIntentionsBoss3 extends PomBossController {
    constructor(e, server) {
        super(e, server);
        for (let c of this.barrier.clientsByPlayer()) {
            c.ruinsSystem.causeDamageShow = true;
            c.ruinsSystem.causeDamageType.add(this.entity.typeId);
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
        this.server.say({ rawtext: [{ translate: "text.wb:defeat_intentions.name" }] });
        console.warn("onWin");
        this.stopBarrier();
        super.onKilled(e);
    }
    onFail() {
        super.onFail();
    }
}
PomIntentionsBoss3.typeId = "wb:intentions_third";
//# sourceMappingURL=PomIntentionsBoss.js.map