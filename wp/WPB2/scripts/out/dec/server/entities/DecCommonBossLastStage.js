import DecBossController from "./DecBossController";
export class DecCommonBossLastStage extends DecBossController {
    constructor(e, server) {
        super(e, server);
    }
    onDestroy() {
        super.onDestroy();
    }
    onSpawn() {
        super.onSpawn();
    }
    onKilled(e) {
        this.onWin();
        super.onKilled(e);
    }
}
//# sourceMappingURL=DecCommonBossLastStage.js.map