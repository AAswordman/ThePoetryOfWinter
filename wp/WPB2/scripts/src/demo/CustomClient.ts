import { Player, MinecraftBlockTypes, MinecraftItemTypes } from 'mojang-minecraft';
import ExGameClient from "../modules/exmc/ExGameClient.js";
import ExGameServer from "../modules/exmc/ExGameServer.js";
import ExBlockStructureNormal from '../modules/exmc/block/structure/ExBlockStructureNormal.js';
import Vector3 from "../modules/exmc/utils/Vector3.js";
import { ExBlockArea } from "../modules/exmc/block/ExBlockArea.js";
import ExGameConfig from '../modules/exmc/ExGameConfig.js';

export default class CustomClient extends ExGameClient {
    constructor(server: ExGameServer, id: string, player: Player) {
        super(server, id, player);

        this.getEvents().exEvents.onceItemUseOn.subscribe(e => {
            if (e.item.id === MinecraftItemTypes.stick.id && this.getDimension().getBlock(e.blockLocation).id === MinecraftBlockTypes.obsidian.id) {
                const start = new Vector3(e.blockLocation).sub(1, 1, 1);
                const end = new Vector3(e.blockLocation).add(1, 1, 1);
                const structure = new ExBlockStructureNormal()
                    .setDimension(this.getDimension())
                    .setDirection(ExBlockStructureNormal.DIRECTION_AROUND | ExBlockStructureNormal.DIRECTION_LAY | ExBlockStructureNormal.DIRECTION_ALLOW_ROTATE)
                    .setArea(new ExBlockArea(start, end, true))
                    .setStructure([
                        [
                            " Y ",
                            "XXX",
                            " X "
                        ]
                    ])
                    .analysis({
                        "X": MinecraftBlockTypes.obsidian.id,
                        "Y": MinecraftBlockTypes.air.id
                    });

                const area = structure.find();
                if (area) {
                    structure.analysis({
                        "X": MinecraftBlockTypes.obsidian.id,
                        "Y": MinecraftBlockTypes.bell.id
                    })
                        .putStructure(area);

                }else{
                    ExGameConfig.console.log("Structure not found");
                }
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