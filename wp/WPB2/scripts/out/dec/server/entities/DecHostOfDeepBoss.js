import DecBossController from "./DecBossController.js";
import { DecCommonBossLastStage } from "./DecCommonBossLastStage.js";
export class DecHostOfDeepBoss1 extends DecBossController {
    constructor(e, server) {
        super(e, server);
        this.isKilled = false;
        this.music = server.getSound("music.wb.from_the_burning_deep", "4:18");
        this.setTimeout(() => {
            this.music.loop(this.exEntity.getExDimension(), this.entity.location);
        }, 500);
    }
    onDestroy() {
        if (!this.isKilled)
            this.music.stop();
        super.onDestroy();
    }
    onSpawn() {
        super.onSpawn();
    }
    onKilled(e) {
        this.isKilled = true;
        super.onKilled(e);
    }
}
export class DecHostOfDeepBoss2 extends DecBossController {
    constructor(e, server) {
        super(e, server);
        this.isKilled = false;
        this.music = server.getSound("music.wb.from_the_burning_deep", "4:18");
        this.setTimeout(() => {
            this.music.loop(this.exEntity.getExDimension(), this.entity.location);
        }, 500);
    }
    onDestroy() {
        if (!this.isKilled)
            this.music.stop();
        super.onDestroy();
    }
    onSpawn() {
        super.onSpawn();
    }
    onKilled(e) {
        this.isKilled = true;
        super.onKilled(e);
    }
}
export class DecHostOfDeepBoss3 extends DecCommonBossLastStage {
    constructor(e, server) {
        super(e, server);
        this.music = server.getSound("music.wb.from_the_burning_deep", "4:18");
        this.setTimeout(() => {
            this.music.loop(this.exEntity.getExDimension(), this.entity.location);
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