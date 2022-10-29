import { BlockLocation, MinecraftBlockTypes, MinecraftDimensionTypes } from '@minecraft/server';
import ExBlockStructureNormal from "../../../modules/exmc/server/block/structure/ExBlockStructureNormal.js";
import GameController from "./GameController.js";
import RuinsLoaction from "./ruins/RuinsLoaction.js";
import { ExBlockArea } from '../../../modules/exmc/server/block/ExBlockArea.js';
import Vector3 from '../../../modules/exmc/math/Vector3.js';
export default class PomDimRuinsSystem extends GameController {
    constructor() {
        super(...arguments);
        this.portalMatching = new ExBlockStructureNormal().setStructure([["XXX"]]);
    }
    onJoin() {
        const loc = new BlockLocation(0, 0, 0);
        this.getEvents().exEvents.onLongTick.subscribe(event => {
            loc.x = Math.floor(this.player.location.x);
            loc.y = Math.floor(this.player.location.y) - 1;
            loc.z = Math.floor(this.player.location.z);
            let block;
            try {
                block = this.getDimension().getBlock(loc);
            }
            catch (e) { }
            if ((block === null || block === void 0 ? void 0 : block.typeId) === "wb:portal_desertboss") {
                //TODO: tp to end
                this.exPlayer.setPosition(ExBlockArea.randomPoint(this.client.getServer().ruin_desertBoss.getPlayerSpawnArea(), 4), this.getDimension(MinecraftDimensionTypes.theEnd));
                if (((this.globalSettings.ruinsExsitsData >> RuinsLoaction.DESERT_RUIN_NUM) & 1) == 0) {
                    //generate
                    this.client.getServer().ruin_desertBoss.generate();
                    this.globalSettings.ruinsExsitsData = this.globalSettings.ruinsExsitsData | (1 << (RuinsLoaction.DESERT_RUIN_NUM));
                }
            }
        });
        this.getEvents().exEvents.onceItemUseOn.subscribe(e => {
            let block;
            try {
                block = this.getDimension().getBlock(e.blockLocation);
            }
            catch (e) { }
            if (e.item.typeId === "wb:mineral_magic_equipment") {
                const p = this.client.getServer().portal_desertBoss;
                if ((block === null || block === void 0 ? void 0 : block.typeId) === "wb:block_magic_equipment") {
                    const v2 = new Vector3(e.blockLocation).add(2, 0, 2);
                    const v1 = new Vector3(e.blockLocation).sub(2, 0, 2);
                    let m = p.setArea(new ExBlockArea(v1, v2, true))
                        .setDimension(this.getDimension())
                        .find();
                    if (m) {
                        p.analysis({
                            X: MinecraftBlockTypes.sandstone.id,
                            Y: "wb:portal_desertboss",
                            Z: "wb:portal_desertboss"
                        })
                            .putStructure(m);
                    }
                }
            }
        });
    }
    onLoaded() {
    }
    onLeave() {
    }
}
//# sourceMappingURL=PomDimRuinsSystem.js.map