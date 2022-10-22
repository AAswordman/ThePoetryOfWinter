import { BlockLocation } from "mojang-minecraft";
import ExBlockStructureNormal from "../../../modules/exmc/server/block/structure/ExBlockStructureNormal.js";
import GameController from "./GameController.js";

export default class PomDimRuinsSystem extends GameController {
    portalMatching = new ExBlockStructureNormal().setStructure([["XXX"]]);
    onJoin(): void {
        const loc = new BlockLocation(0, 0, 0);
        this.getEvents().exEvents.onLongTick.subscribe(event => {
            loc.x = this.player.location.x;
            loc.y = this.player.location.y - 1;
            loc.z = this.player.location.z;
            let block = this.getDimension().getBlock(loc);
            if(block?.id === "wb:portal_desertboss"){
                //TODO: tp to end
                
            }
        });
    }

    onLoaded(): void {

    }

    onLeave(): void {

    }

}