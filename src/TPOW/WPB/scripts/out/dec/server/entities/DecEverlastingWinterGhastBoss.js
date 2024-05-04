import { EntityDamageCause } from "@minecraft/server";
import DecBossController from "./DecBossController.js";
import { DecCommonBossLastStage } from "./DecCommonBossLastStage.js";
export class DecEverlastingWinterGhastBoss1 extends DecBossController {
    constructor(e, server) {
        super(e, server);
        this.music = server.getMusic("music.wb.ghost_tears");
        this.music.trackPlayers(Array.from(this.barrier.getPlayers()));
        this.music.loop();
    }
    onKilled(e) {
        super.onKilled(e);
        if (e.damageSource.cause === EntityDamageCause.suicide) {
            this.music.stop();
        }
    }
    onFail() {
        this.music.stop();
        super.onFail();
    }
    onSpawn() {
        super.onSpawn();
    }
}
export class DecEverlastingWinterGhastBoss2 extends DecCommonBossLastStage {
    constructor(e, server) {
        super(e, server);
        this.music = server.getMusic("music.wb.the_peotry_of_ghost");
        this.music.trackPlayers(Array.from(this.barrier.getPlayers()));
        this.music.loop();
    }
    onDestroy() {
        this.music.stop();
        super.onDestroy();
    }
    onSpawn() {
        super.onSpawn();
    }
}
//# sourceMappingURL=DecEverlastingWinterGhastBoss.js.map