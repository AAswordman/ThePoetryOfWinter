import DecBossController from "./DecBossController.js";
import { DecCommonBossLastStage } from "./DecCommonBossLastStage.js";
export class DecEverlastingWinterGhastBoss1 extends DecBossController {
    constructor(e, server) {
        super(e, server);
        this.music = server.getSound("music.wb.ghost_tears", "2:16");
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
export class DecEverlastingWinterGhastBoss2 extends DecCommonBossLastStage {
    constructor(e, server) {
        super(e, server);
        this.music = server.getSound("music.wb.the_peotry_of_ghost", "3:12");
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
//# sourceMappingURL=DecEverlastingWinterGhastBoss.js.map