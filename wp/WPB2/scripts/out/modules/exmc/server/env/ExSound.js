import { world, MinecraftDimensionTypes } from '@minecraft/server';
import TimeLoopTask from '../../utils/TimeLoopTask.js';
import { to } from '../ExErrorQueue.js';
export default class ExSound {
    constructor(id, time) {
        this.soundId = id;
        let s = time.split(":");
        this.long = (parseInt(s[0]) * 60 + parseInt(s[1])) * 1000;
    }
    loop(manager, dim, trackVector) {
        this.play(dim, trackVector);
        this.looper = new TimeLoopTask(manager, () => {
            this.play(dim, trackVector);
        }).delay(this.long);
        this.looper.start();
    }
    stop() {
        var _a;
        (_a = this.looper) === null || _a === void 0 ? void 0 : _a.stop();
        world.getDimension(MinecraftDimensionTypes.overworld).runCommandAsync("stopsound @a " + this.soundId);
    }
    play(dim, vec) {
        to(dim.command.run(`playsound ${this.soundId} @a[r=64,x=${vec.x},y=${vec.y},z=${vec.z}] ${vec.x} ${vec.y} ${vec.z} 0.5 1 0.5`));
    }
}
//# sourceMappingURL=ExSound.js.map