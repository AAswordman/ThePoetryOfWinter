import { Entity, EntityDamageCause, EntityHurtAfterEvent } from "@minecraft/server";
import ExGameServer from "../../../modules/exmc/server/ExGameServer.js";
import ExEntityController from "../../../modules/exmc/server/entity/ExEntityController.js";
import ExMusic from "../../../modules/exmc/server/env/ExMusic.js";
import SetTimeOutSupport from "../../../modules/exmc/interface/SetTimeOutSupport.js";
import DecBossController from "./DecBossController.js";
import DecServer from '../DecServer.js';
import { DecCommonBossLastStage } from "./DecCommonBossLastStage.js";

export class DecEverlastingWinterGhastBoss1 extends DecBossController {
    music: ExMusic;
    constructor(e: Entity, server: DecServer) {
        super(e, server);
        this.music = server.getMusic("music.wb.ghost_tears");
        this.music.trackPlayers(Array.from(this.barrier.getPlayers()));
        this.music.loop();
    }
    override onKilled(e: EntityHurtAfterEvent): void {
        super.onKilled(e);
        if (e.damageSource.cause === EntityDamageCause.suicide) {
            this.music.stop();
        }
    }
    override onFail(): void {
        this.music.stop();
        super.onFail();
    }
    override onSpawn(): void {
        super.onSpawn();
    }
}
export class DecEverlastingWinterGhastBoss2 extends DecCommonBossLastStage {
    music: ExMusic;
    constructor(e: Entity, server: DecServer) {
        super(e, server);
        this.music = server.getMusic("music.wb.the_peotry_of_ghost");
        this.music.trackPlayers(Array.from(this.barrier.getPlayers()));
        this.music.loop();
    }
    override onDestroy(): void {
        this.music.stop();
        super.onDestroy();
    }
    override onSpawn(): void {
        super.onSpawn();
    }
}