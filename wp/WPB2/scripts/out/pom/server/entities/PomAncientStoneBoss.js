import PomBossController from './PomBossController.js';
import ExSound from '../../../modules/exmc/server/env/ExSound.js';
export default class PomAncientStoneBoss extends PomBossController {
    constructor(e, server) {
        super(e, server);
        this.music = new ExSound("music.wb.anger_of_ancient", "2:24");
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
//# sourceMappingURL=PomAncientStoneBoss.js.map