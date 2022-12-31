import { Player } from "@minecraft/server";
import ExConfig from "../modules/exmc/ExConfig.js";
import ExGameClient from "../modules/exmc/server/ExGameClient.js";
import ExGameServer from "../modules/exmc/server/ExGameServer.js";
import CustomClient from "./CustomClient.js";

export default class CustomServer extends ExGameServer {
    constructor(config: ExConfig) {
        super(config);

        
    }

    override newClient(id: string, player: Player): ExGameClient {
        return new CustomClient(this, id, player);
    }
}