import { Entity, EntityHurtAfterEvent, world } from '@minecraft/server';
import ExGameServer from '../../../modules/exmc/server/ExGameServer.js';
import ExEntityController from '../../../modules/exmc/server/entity/ExEntityController.js';
import ExGameConfig from '../../../modules/exmc/server/ExGameConfig.js';
import PomBossController from './PomBossController.js';
import PomServer from '../PomServer.js';
import PomClient from '../PomClient.js';

export default class PomMagicStoneBoss extends PomBossController {
    static typeId = "wb:magic_stoneman";
    constructor(e: Entity, server: PomServer) {
        super(e, server);
    }
    override initBossEntity(): void {
        super.initBossEntity();
        if (this.isFisrtCall) this.server.say({ rawtext: [{ translate: "text.wb:summon_magic_stoneman.name" }] });
    }
    override onSpawn(): void {
        super.onSpawn();
    }
    override onKilled(e: EntityHurtAfterEvent): void {
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