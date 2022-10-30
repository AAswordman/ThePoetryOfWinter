import { MinecraftBlockTypes, MinecraftDimensionTypes } from '@minecraft/server';
import ExBlockStructureNormal from "../../../modules/exmc/server/block/structure/ExBlockStructureNormal.js";
import GameController from "./GameController.js";
import RuinsLoaction from "./ruins/RuinsLoaction.js";
import { ExBlockArea } from '../../../modules/exmc/server/block/ExBlockArea.js';
import Vector3 from '../../../modules/exmc/math/Vector3.js';
import ExGameVector3 from '../../../modules/exmc/server/math/ExGameVector3.js';
import VarOnChangeListener from '../../../modules/exmc/utils/VarOnChangeListener.js';
import ExMessageAlert from '../../../modules/exmc/server/ui/ExMessageAlert.js';
export default class PomDimRuinsSystem extends GameController {
    constructor() {
        super(...arguments);
        this.portalMatching = new ExBlockStructureNormal().setStructure([["XXX"]]);
    }
    onJoin() {
        const tmpV = new Vector3();
        const tmpA = new Vector3();
        const tmpB = new Vector3();
        const desertRuinBackJudge = new VarOnChangeListener((v) => {
            if (v) {
                new ExMessageAlert().title("返回").body("是否返回主世界?")
                    .button1("否", () => {
                })
                    .button2("是", () => {
                    let v = this.data.dimBackPoint;
                    if (!v) {
                        v = new Vector3(0, 255, 0);
                    }
                    this.exPlayer.setPosition(v, this.getDimension(MinecraftDimensionTypes.overworld));
                })
                    .show(this.player);
            }
        }, false);
        this.getEvents().exEvents.onLongTick.subscribe(event => {
            if (event.currentTick % 4 !== 0)
                return;
            //1s 1 tick
            tmpV.set(this.player.location);
            let loc = ExGameVector3.getBlockLocation(tmpV);
            loc.y -= 1;
            let block;
            try {
                block = this.getDimension().getBlock(loc);
            }
            catch (e) { }
            if ((block === null || block === void 0 ? void 0 : block.typeId) === "wb:portal_desertboss") {
                //TODO: tp to end
                this.data.dimBackPoint = new Vector3(this.player.location).add(3, 2, 3);
                this.client.cache.save();
                this.exPlayer.setPosition(ExBlockArea.randomPoint(this.client.getServer().ruin_desertBoss.getPlayerSpawnArea(), 4), this.getDimension(MinecraftDimensionTypes.theEnd));
                if (((this.globalSettings.ruinsExsitsData >> RuinsLoaction.DESERT_RUIN_NUM) & 1) == 0) {
                    //generate
                    this.client.getServer().ruin_desertBoss.generate();
                    this.globalSettings.ruinsExsitsData = this.globalSettings.ruinsExsitsData | (1 << (RuinsLoaction.DESERT_RUIN_NUM));
                }
            }
            tmpA.set(RuinsLoaction.DESERT_RUIN_LOCATION_CENTER).sub(32, 4, 32);
            tmpB.set(RuinsLoaction.DESERT_RUIN_LOCATION_CENTER).add(32, 32, 32);
            desertRuinBackJudge.upDate(tmpA.x <= tmpV.x && tmpA.z <= tmpV.z &&
                tmpV.x <= tmpB.x && tmpV.z <= tmpB.z &&
                tmpA.y <= tmpV.y && tmpV.y <= tmpB.y
                && this.player.dimension.id === MinecraftDimensionTypes.theEnd);
            if (tmpV.x >= RuinsLoaction.DESERT_RUIN_LOCATION_START.x && tmpV.x <= RuinsLoaction.DESERT_RUIN_LOCATION_END.x
                && tmpV.z >= RuinsLoaction.DESERT_RUIN_LOCATION_START.z && tmpV.z <= RuinsLoaction.DESERT_RUIN_LOCATION_END.z) {
                if (tmpV.y < RuinsLoaction.DESERT_RUIN_LOCATION_START.y - 2) {
                    tmpV.y = RuinsLoaction.DESERT_RUIN_LOCATION_START.y + 4;
                    this.exPlayer.setPosition(tmpV);
                }
            }
        });
        // this.getEvents().exEvents.itemOnHandChange.subscribe((e) => {
        //     this.sayTo(e.afterItem?.typeId + "");
        // });
        this.getEvents().exEvents.onceItemUseOn.subscribe(e => {
            let block;
            try {
                block = this.getDimension().getBlock(e.blockLocation);
            }
            catch (e) { }
            if (e.item.typeId === "wb:mineral_magic_equipment") {
                const p = this.client.getServer().portal_desertBoss;
                if ((block === null || block === void 0 ? void 0 : block.typeId) === "wb:block_magic_equipment") {
                    const v2 = new Vector3(e.blockLocation).add(2, 2, 2);
                    const v1 = new Vector3(e.blockLocation).sub(2, 0, 2);
                    let m = p.setArea(new ExBlockArea(v1, v2, true))
                        .setDimension(this.getDimension(MinecraftDimensionTypes.overworld))
                        .find();
                    if (m) {
                        p.analysis({
                            X: MinecraftBlockTypes.sandstone.id,
                            W: "wb:portal_desertboss",
                            Y: "wb:portal_desertboss",
                            A: MinecraftBlockTypes.air.id,
                            S: MinecraftBlockTypes.stoneBlockSlab2.id,
                            C: MinecraftBlockTypes.cobblestoneWall.id
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