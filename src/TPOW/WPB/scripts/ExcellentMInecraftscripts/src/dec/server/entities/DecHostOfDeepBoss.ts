import { Entity, EntityDamageCause, EntityHurtAfterEvent } from "@minecraft/server";
import ExGameServer from "../../../modules/exmc/server/ExGameServer.js";
import ExEntityController from "../../../modules/exmc/server/entity/ExEntityController.js";
import ExMusic from "../../../modules/exmc/server/env/ExMusic.js";
import SetTimeOutSupport from "../../../modules/exmc/interface/SetTimeOutSupport.js";
import DecBossController from "./DecBossController.js";
import DecServer from '../DecServer.js';
import { DecCommonBossLastStage } from "./DecCommonBossLastStage.js";
import { registerEvent } from "../../../modules/exmc/server/events/eventDecoratorFactory.js";

export class DecHostOfDeepBoss1 extends DecBossController {
    music: ExMusic;
    constructor(e: Entity, server: DecServer) {
        super(e, server);
        this.music = server.getMusic("music.wb.from_the_burning_deep");
        this.music.trackPlayers(Array.from(this.barrier.getPlayers()));
        this.music.loop();
    }
    override onSpawn(): void {
        super.onSpawn();
    }
    override onFail(): void {
        this.music.stop();
        super.onFail();
    }
    override onKilled(e: EntityHurtAfterEvent): void {
        super.onKilled(e);
        if (e.damageSource.cause === EntityDamageCause.suicide) {
            this.music.stop();
        }
    }
}
export class DecHostOfDeepBoss2 extends DecBossController {
    music: ExMusic;
    constructor(e: Entity, server: DecServer) {
        super(e, server);
        this.music = server.getMusic("music.wb.from_the_burning_deep");
        this.music.trackPlayers(Array.from(this.barrier.getPlayers()));

    }
    override onSpawn(): void {
        super.onSpawn();
    }
    override onFail(): void {
        this.music.stop();
        super.onFail();
    }
    override onKilled(e: EntityHurtAfterEvent): void {
        super.onKilled(e);
        if (e.damageSource.cause === EntityDamageCause.suicide) {
            this.music.stop();
        }
    }
}
export class DecHostOfDeepBoss3 extends DecCommonBossLastStage {
    music: ExMusic;
    constructor(e: Entity, server: DecServer) {
        super(e, server);
        this.music = server.getMusic("music.wb.from_the_burning_deep");
        this.music.trackPlayers(Array.from(this.barrier.getPlayers()));

    }
    override onDestroy(): void {
        this.music.stop();
        super.onDestroy();
    }
    override onSpawn(): void {
        super.onSpawn();
    }
}