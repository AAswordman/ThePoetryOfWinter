import DecBossController from "./DecBossController.js";
import { DecCommonBossLastStage } from "./DecCommonBossLastStage.js";
export class DecHostOfDeepBoss1 extends DecBossController {
    constructor(e, server) {
        super(e, server);
        this.music = server.getSound("music.wb.from_the_burning_deep", "4:18");
        this.setTimeout(() => {
            this.music.loop(this.exEntity.exDimension, this.entity.location);
        }, 500);
    }
    onDestroy() {
        this.music.delayStop(800);
        super.onDestroy();
    }
    onSpawn() {
        super.onSpawn();
    }
    onKilled(e) {
        super.onKilled(e);
    }
}
export class DecHostOfDeepBoss2 extends DecBossController {
    constructor(e, server) {
        super(e, server);
        this.music = server.getSound("music.wb.from_the_burning_deep", "4:18");
        this.setTimeout(() => {
            this.music.loop(this.exEntity.exDimension, this.entity.location);
        }, 500);
    }
    onDestroy() {
        this.music.delayStop(500);
        super.onDestroy();
    }
    onSpawn() {
        super.onSpawn();
    }
    onKilled(e) {
        super.onKilled(e);
    }
}
export class DecHostOfDeepBoss3 extends DecCommonBossLastStage {
    constructor(e, server) {
        super(e, server);
        this.music = server.getSound("music.wb.from_the_burning_deep", "4:18");
        this.setTimeout(() => {
            this.music.loop(this.exEntity.exDimension, this.entity.location);
        }, 500);
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