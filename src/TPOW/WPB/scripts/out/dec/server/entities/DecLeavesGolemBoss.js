import { DecCommonBossLastStage } from "./DecCommonBossLastStage.js";
export class DecLeavesGolemBoss extends DecCommonBossLastStage {
    constructor(e, server) {
        super(e, server);
        this.music = server.getMusic("music.wb.wooden_heart");
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
//# sourceMappingURL=DecLeavesGolemBoss.js.map