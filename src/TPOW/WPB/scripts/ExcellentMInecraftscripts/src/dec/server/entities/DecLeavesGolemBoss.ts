import { Entity } from "@minecraft/server";
import ExMusic from "../../../modules/exmc/server/env/ExMusic.js";
import DecServer from "../DecServer.js";
import { DecCommonBossLastStage } from "./DecCommonBossLastStage.js";

export class DecLeavesGolemBoss extends DecCommonBossLastStage {
    music: ExMusic;
    constructor(e: Entity, server: DecServer) {
        super(e, server);
        this.music = server.getMusic("music.wb.wooden_heart");
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