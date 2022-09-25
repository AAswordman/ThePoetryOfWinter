import { Player, MinecraftBlockTypes, MinecraftItemTypes } from 'mojang-minecraft';
import ExGameClient from "../modules/exmc/ExGameClient.js";
import ExGameServer from "../modules/exmc/ExGameServer.js";
import ExGameConfig from '../modules/exmc/ExGameConfig.js';
import PerlinNoise from '../modules/exmc/utils/PerlinNoise.js';
import ExDimension from '../modules/exmc/ExDimension.js';
import Vector3 from '../modules/exmc/utils/Vector3.js';

export default class CustomClient extends ExGameClient {
    constructor(server: ExGameServer, id: string, player: Player) {
        super(server, id, player);

        const noise = new PerlinNoise(12362);
        this.getEvents().exEvents.onceItemUseOn.subscribe(e => {
            if (e.item.id === MinecraftItemTypes.stick.id && this.getDimension().getBlock(e.blockLocation).id === MinecraftBlockTypes.obsidian.id) {
                let pos = this.exPlayer.getPosition().floor();
                let dim = ExDimension.getInstance(this.getDimension());
                let vec = new Vector3();
                for(let x = 0; x < 100;x++){
                    for(let y = 0; y < 100;y++){
                        dim.setBlock(vec.set(pos.x+x,20+Math.floor(noise.noise((pos.x+x)/40,(pos.z+y)/40)*100),pos.z+y),MinecraftBlockTypes.grass.id);
                    }
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