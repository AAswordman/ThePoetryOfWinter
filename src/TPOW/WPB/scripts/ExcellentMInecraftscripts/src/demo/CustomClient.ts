import { Player } from "@minecraft/server";
import ExGameClient from "../modules/exmc/server/ExGameClient.js";
import ExGameServer from "../modules/exmc/server/ExGameServer.js";


export default class CustomClient extends ExGameClient {
    constructor(server: ExGameServer, id: string, player: Player) {
        super(server, id, player);
    }

    override onJoin(): void {

    }

    override onLoad(): void {

    }

    override onLeave(): void {

    }
}