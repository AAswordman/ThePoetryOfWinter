import { MinecraftItemTypes, MinecraftBlockTypes } from "@minecraft/server";
import ExGameClient from "../modules/exmc/server/ExGameClient.js";
export default class CustomClient extends ExGameClient {
    constructor(server, id, player) {
        super(server, id, player);
        this.getEvents().exEvents.onceItemUseOn.subscribe(e => {
            if (e.item.typeId === MinecraftItemTypes.stick.id && this.getExDimension().getBlock(e.blockLocation).typeId === MinecraftBlockTypes.obsidian.id) {
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
//# sourceMappingURL=CustomClient%20copy.js.map