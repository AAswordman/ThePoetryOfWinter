import { MinecraftItemTypes, MinecraftBlockTypes } from "mojang-minecraft";
import ExGameClient from "../modules/exmc/server/ExGameClient.js";
export default class CustomClient extends ExGameClient {
    constructor(server, id, player) {
        super(server, id, player);
        this.getEvents().exEvents.onceItemUseOn.subscribe(e => {
            if (e.item.id === MinecraftItemTypes.stick.id && this.getExDimension().getBlock(e.blockLocation).id === MinecraftBlockTypes.obsidian.id) {
            }
        });
    }
    onJoin() {
    }
    onLoaded() {
    }
    onLeave() {
    }
}
//# sourceMappingURL=CustomClient.js.map