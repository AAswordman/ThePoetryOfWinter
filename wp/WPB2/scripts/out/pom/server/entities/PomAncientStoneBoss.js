import PomBossController from './PomBossController.js';
import ExSound from '../../../modules/exmc/server/env/ExSound.js';
export default class PomAncientStoneBoss extends PomBossController {
    constructor(e, server) {
        super(e, server);
        this.music = new ExSound("music.wb.anger_of_ancient", "2:24");
        this.setTimeout(() => {
            this.music.loop(this.getEvents(), this.exEntity.getExDimension(), this.entity.location);
        }, 500);
        for (let c of this.barrier.clientsByPlayer()) {
            c.ruinsSystem.causeDamageShow = true;
            c.ruinsSystem.causeDamageType.add(this.entity.typeId);
        }
        if (this.barrier.players.size !== 0 && !this.exEntity.hasIsBabyComponent())
            this.server.say({ rawtext: [{ translate: "text.wb:summon_ancient_stone.name" }] });
    }
    onSpawn() {
        super.onSpawn();
    }
    onKilled(e) {
        //设置奖励
        if (this.exEntity.hasIsBabyComponent()) {
            for (let c of this.barrier.clientsByPlayer()) {
                c.progressTaskFinish(this.entity.typeId, c.ruinsSystem.causeDamage);
                c.ruinsSystem.causeDamageShow = false;
            }
            this.server.say({ rawtext: [{ translate: "text.wb:defeat_ancient_stone.name" }] });
            console.warn("onWin");
            this.stopBarrier();
        }
        this.music.stop();
        super.onKilled(e);
    }
    onFail() {
        this.music.stop();
        super.onFail();
    }
}
PomAncientStoneBoss.typeId = "wb:ancient_stone";
//# sourceMappingURL=PomAncientStoneBoss.js.map