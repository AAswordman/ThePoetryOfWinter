import ExEntityController from '../../../modules/exmc/server/entity/ExEntityController.js';
import ExGameConfig from '../../../modules/exmc/server/ExGameConfig.js';
export default class PomMagicStoneBoss extends ExEntityController {
    constructor(e, server) {
        super(e, server);
    }
    onSpawn() {
        ExGameConfig.console.log("boss : 爷出来啦");
        console.warn("boss : 爷出来啦");
    }
}
//# sourceMappingURL=PomMagicStoneBoss.js.map