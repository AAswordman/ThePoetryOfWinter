
import { Entity, EntityHurtAfterEvent, world } from '@minecraft/server';
import ExGameServer from '../../../modules/exmc/server/ExGameServer.js';
import ExEntityController from '../../../modules/exmc/server/entity/ExEntityController.js';
import ExGameConfig from '../../../modules/exmc/server/ExGameConfig.js';
import PomBossController from './PomBossController.js';
import PomServer from '../PomServer.js';
import PomClient from '../PomClient.js';
import ExMusic from '../../../modules/exmc/server/env/ExMusic.js';
import ExGame from '../../../modules/exmc/server/ExGame.js';

export default class PomHeadlessGuardBoss extends PomBossController {
    static typeId = "wb:headless_guard"
    music!: ExMusic;
    constructor(e: Entity, server: PomServer) {
        super(e, server);
        
    }
    override initBossEntity(): void {
        super.initBossEntity();
        this.music = this.server.getMusic("music.wb.unknown_world");
        this.music.trackPlayers(Array.from(this.barrier.getPlayers()));
        if(this.isFisrtCall) {
            this.server.say({ rawtext: [{ translate: "text.wb:summon_headless_guard.name" }] });
            this.music.loop();
        }
    }
    override onSpawn(): void {
        super.onSpawn();
    }
    override onKilled(e: EntityHurtAfterEvent): void {
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
    override onFail(): void {
        this.music.stop();
        super.onFail();
    }

}