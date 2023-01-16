import ExPlayerController from '../../../modules/exmc/server/entity/ExPlayerController.js';
export default class PomFakePlayer extends ExPlayerController {
    constructor(p, server) {
        super(p, server);
    }
    onSpawn() {
        super.onSpawn();
    }
    get entity() {
        return super.entity;
    }
    set entity(p) {
        super.entity = p;
    }
}
//# sourceMappingURL=PomFakePlayer.js.map