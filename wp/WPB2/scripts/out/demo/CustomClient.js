import { MinecraftBlockTypes, MinecraftItemTypes } from 'mojang-minecraft';
import ExGameClient from "../modules/exmc/ExGameClient.js";
import PerlinNoise from '../modules/exmc/utils/PerlinNoise.js';
import ExDimension from '../modules/exmc/ExDimension.js';
import Vector3 from '../modules/exmc/utils/Vector3.js';
export default class CustomClient extends ExGameClient {
    constructor(server, id, player) {
        super(server, id, player);
        const noiseA = new PerlinNoise(12362);
        const noiseB = new PerlinNoise(123611);
        this.getEvents().exEvents.onceItemUseOn.subscribe(e => {
            if (e.item.id === MinecraftItemTypes.stick.id && this.getDimension().getBlock(e.blockLocation).id === MinecraftBlockTypes.obsidian.id) {
                let pos = this.exPlayer.getPosition().floor();
                let dim = ExDimension.getInstance(this.getDimension());
                let vec = new Vector3();
                for (let x = -200; x < 200; x++) {
                    for (let z = -200; z < 200; z++) {
                        let noise1 = noiseA.noise((pos.x + x) / 97, (pos.z + z) / 97) * 30;
                        let noise2 = noiseA.noise((pos.x + x) / 137, (pos.z + z) / 137) * 50;
                        dim.setBlock(vec.set(pos.x + x, 20 + Math.floor(noise1 + noise2), pos.z + z), MinecraftBlockTypes.sandstone);
                    }
                }
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