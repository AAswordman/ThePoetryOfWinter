import { EntityDamageCause } from "@minecraft/server";
import ExEntityController from "../../../modules/exmc/server/entity/ExEntityController.js";
import ExGame from "../../../modules/exmc/server/ExGame.js";
import PomServer from "../../../pom/server/PomServer.js";
import DecGlobal from '../DecGlobal.js';
import { ExBlockArea } from "../../../modules/exmc/server/block/ExBlockArea.js";
import DecBossBarrier from "./DecBossBarrier.js";
export default class DecBossController extends ExEntityController {
    constructor(e, server) {
        super(e, server);
        this.isFisrtCall = false;
        this.startPos = this.exEntity.position;
        let barrier = DecBossBarrier.find(this.startPos);
        if (!barrier) {
            this.isFisrtCall = true;
            barrier = new DecBossBarrier(server, this.exEntity.exDimension, new ExBlockArea(this.startPos.cpy().sub(32, 32, 32), this.startPos.cpy().add(32, 32, 32), true), this);
        }
        else {
            barrier.setBoss(this);
        }
        this.barrier = barrier;
        if (barrier.players.size === 0) {
            this.despawn();
            this.stopBarrier();
            this.destroyBossEntity();
        }
        else {
            this.initBossEntity();
        }
    }
    despawn() {
        this.entity.triggerEvent("minecraft:despawn");
    }
    onSpawn() {
        super.onSpawn();
    }
    stopBarrier() {
        this.barrier.stop();
    }
    destroyBossEntity() {
    }
    initBossEntity() {
    }
    onKilled(e) {
        this.destroyBossEntity();
        if (e.damageSource.cause === EntityDamageCause.suicide) {
            this.stopBarrier();
        }
        super.onKilled(e);
    }
    onFail() {
        this.stopBarrier();
        this.destroyBossEntity();
        this.server.say({ rawtext: [{ translate: "text.dec:killed_by_boss.name" }] });
        this.despawn();
    }
    //发信息给pom，判断完成任务
    onWin() {
        this.stopBarrier();
        if (!DecGlobal.isDec()) {
            for (let p of this.entity.dimension.getPlayers({
                location: this.entity.location,
                maxDistance: 32
            })) {
                let c = this.server.findClientByPlayer(p);
                if (c) {
                    ExGame.postMessageBetweenClient(c, PomServer, "progressTaskFinish", [this.entity.typeId, 1000]);
                }
            }
        }
    }
}
//# sourceMappingURL=DecBossController.js.map