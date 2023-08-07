import ExEntityController from "../../../modules/exmc/server/entity/ExEntityController.js";
import Vector3 from "../../../modules/exmc/math/Vector3.js";
import { MinecraftBlockTypes } from "../../../modules/vanilla-data/lib/mojang-block.js";
import ExTaskRunner from "../../../modules/exmc/server/ExTaskRunner.js";
export default class DecNukeController extends ExEntityController {
    constructor(e, server) {
        super(e, server);
    }
    despawn() {
        this.entity.triggerEvent("minecraft:despawn");
    }
    onSpawn() {
        super.onSpawn();
        this.setTimeout(() => {
            const tmpV = new Vector3();
            for (let i = 0; i <= 50; i += 10) {
                this.setTimeout(() => {
                    const dim = this.exEntity.exDimension;
                    const pos = this.entity.location;
                    let task = new ExTaskRunner();
                    task.run(function* () {
                        for (let x = -i; x <= i; x++) {
                            for (let y = -i; y <= i; y++) {
                                for (let z = -i; z <= i; z++) {
                                    tmpV.set(x, y, z);
                                    if (tmpV.len() <= i) {
                                        dim.setBlock(tmpV.add(pos), MinecraftBlockTypes.Air);
                                    }
                                }
                                dim.spawnParticle("dec:nuke_blast", pos);
                                yield true;
                            }
                        }
                    });
                    task.start(1, 20);
                }, i * 100);
            }
        }, 10000);
    }
}
//# sourceMappingURL=DecNukeController.js.map