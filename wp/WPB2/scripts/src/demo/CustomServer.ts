import { Player } from "mojang-minecraft";
import ExGameClient from "../modules/exmc/ExGameClient.js";
import ExGameServer from "../modules/exmc/ExGameServer.js";
import CustomClient from "./CustomClient.js";

export default class CustomServer extends ExGameServer{
    constructor(){
        super();
    }

    override newClient(id: string, player: Player): ExGameClient {
        return new CustomClient(this,id,player);
    }
}