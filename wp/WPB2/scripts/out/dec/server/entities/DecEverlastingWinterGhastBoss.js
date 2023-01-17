import ExEntityController from "../../../modules/exmc/server/entity/ExEntityController.js";
import ExSound from "../../../modules/exmc/server/env/ExSound.js";
export class DecEverlastingWinterGhastBoss1 extends ExEntityController {
    constructor(e, server) {
        super(e, server);
        this.music = new ExSound("music.wb.ghost_tears", "2:16");
        this.setTimeout(() => {
            this.music.loop(this.getEvents(), this.exEntity.getExDimension(), this.entity.location);
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
export class DecEverlastingWinterGhastBoss2 extends ExEntityController {
    constructor(e, server) {
        super(e, server);
        this.music = new ExSound("music.wb.the_peotry_of_ghost", "3:12");
        this.setTimeout(() => {
            this.music.loop(this.getEvents(), this.exEntity.getExDimension(), this.entity.location);
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