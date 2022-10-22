import { Player, MinecraftItemTypes, MinecraftBlockTypes } from "mojang-minecraft";
import Vector2 from "../modules/exmc/math/Vector2.js";
import Vector3 from "../modules/exmc/math/Vector3.js";
import ExStructureJigsaw from "../modules/exmc/server/block/structure/ExStructureJigsaw.js";
import ExGameClient from "../modules/exmc/server/ExGameClient.js";
import ExGameServer from "../modules/exmc/server/ExGameServer.js";
import Random from "../modules/exmc/utils/Random.js";


export default class CustomClient extends ExGameClient {
    constructor(server: ExGameServer, id: string, player: Player) {
        super(server, id, player);

        this.getEvents().exEvents.onceItemUseOn.subscribe(e => {
            if (e.item.id === MinecraftItemTypes.stick.id && this.getExDimension().getBlock(e.blockLocation).id === MinecraftBlockTypes.obsidian.id) {


                
            }

        });
    }

    override onJoin(): void {

    }

    override onLoaded(): void {

    }

    override onLeave(): void {

    }
}