import { EntityDamageCause } from "@minecraft/server";
import DecBossController from "./DecBossController.js";
import { DecCommonBossLastStage } from "./DecCommonBossLastStage.js";
export class DecHostOfDeepBoss1 extends DecBossController {
    constructor(e, server) {
        super(e, server);
        this.music = server.getMusic("music.wb.from_the_burning_deep");
        this.music.trackPlayers(Array.from(this.barrier.getPlayers()));
        this.music.loop();
    }
    onSpawn() {
        super.onSpawn();
    }
    onFail() {
        this.music.stop();
        super.onFail();
    }
    onKilled(e) {
        super.onKilled(e);
        if (e.damageSource.cause === EntityDamageCause.suicide) {
            this.music.stop();
        }
    }
}
export class DecHostOfDeepBoss2 extends DecBossController {
    constructor(e, server) {
        super(e, server);
        this.music = server.getMusic("music.wb.from_the_burning_deep");
        this.music.trackPlayers(Array.from(this.barrier.getPlayers()));
    }
    onSpawn() {
        super.onSpawn();
    }
    onFail() {
        this.music.stop();
        super.onFail();
    }
    onKilled(e) {
        super.onKilled(e);
        if (e.damageSource.cause === EntityDamageCause.suicide) {
            this.music.stop();
        }
    }
}
export class DecHostOfDeepBoss3 extends DecCommonBossLastStage {
    constructor(e, server) {
        super(e, server);
        this.music = server.getMusic("music.wb.from_the_burning_deep");
        this.music.trackPlayers(Array.from(this.barrier.getPlayers()));
    }
    onDestroy() {
        this.music.stop();
        super.onDestroy();
    }
    onSpawn() {
        super.onSpawn();
    }
}
//# sourceMappingURL=DecHostOfDeepBoss.js.map