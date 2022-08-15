import { Player } from "mojang-minecraft";
import ExGameClient from "../modules/exmc/ExGameClient.js";
import ExGameServer from "../modules/exmc/ExGameServer.js";

export default class CustomClient extends ExGameClient{
    constructor(server: ExGameServer, id: string, player: Player) {
		super(server, id, player);
    }
    
    override onJoin(): void {
        
    }

    override onLoaded(): void {
        
    }
    
    override onLeave(): void {
        
    }
}