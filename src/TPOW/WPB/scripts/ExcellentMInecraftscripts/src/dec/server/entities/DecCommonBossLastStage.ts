import { Entity, EntityHurtAfterEvent } from "@minecraft/server";
import ExMusic from "../../../modules/exmc/server/env/ExMusic.js";
import DecServer from "../DecServer.js";
import DecBossController from "./DecBossController.js";

export class DecCommonBossLastStage extends DecBossController{
    constructor(e: Entity, server: DecServer) {
        super(e, server);
    }
    override onDestroy(): void {
        super.onDestroy();
    }
    override onSpawn(): void {
        super.onSpawn();
    }
    override onKilled(e: EntityHurtAfterEvent): void {
        this.onWin();
        super.onKilled(e);
    }
}