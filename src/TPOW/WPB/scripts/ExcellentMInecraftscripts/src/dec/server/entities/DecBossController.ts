import { Entity, EntityDamageCause, EntityHurtAfterEvent } from "@minecraft/server";
import DecServer from "../DecServer.js";
import ExEntityController from "../../../modules/exmc/server/entity/ExEntityController.js";
import DecClient from "../DecClient.js";
import ExGame from "../../../modules/exmc/server/ExGame.js";
import PomServer from "../../../pom/server/PomServer.js";
import DecGlobal from '../DecGlobal.js';
import { ExBlockArea } from "../../../modules/exmc/server/block/ExBlockArea.js";
import DecBossBarrier from "./DecBossBarrier.js";
import Vector3 from "../../../modules/exmc/math/Vector3.js";

export default class DecBossController extends ExEntityController {
    startPos: Vector3;
    barrier: DecBossBarrier;
    isFisrtCall = false;
    constructor(e: Entity, server: DecServer) {
        super(e, server);
        this.startPos = this.exEntity.position;
        let barrier = DecBossBarrier.find(this.startPos);

        if (!barrier) {
            this.isFisrtCall = true;
            barrier = new DecBossBarrier(server, this.exEntity.exDimension,
                new ExBlockArea(this.startPos.cpy().sub(32, 32, 32), this.startPos.cpy().add(32, 32, 32), true),
                this);
        } else {
            barrier.setBoss(this);
        }
        this.barrier = barrier;

        if (barrier.players.size === 0) {
            this.despawn();
            this.stopBarrier();
            this.destroyBossEntity();
        }else{
            this.initBossEntity();
        }
    }
    despawn() {
        this.entity.triggerEvent("minecraft:despawn");
    }
    
    override onSpawn(): void {
        super.onSpawn();
    }

    stopBarrier() {
        this.barrier.stop();
    }
    destroyBossEntity(){

    }
    initBossEntity(){
        
    }
    override onKilled(e: EntityHurtAfterEvent): void {
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
                let c = <DecClient | undefined>this.server.findClientByPlayer(p);
                if (c) {
                    ExGame.postMessageBetweenClient(c, PomServer, "progressTaskFinish", [this.entity.typeId, 1000]);
                }
            }
        }
    }
}
