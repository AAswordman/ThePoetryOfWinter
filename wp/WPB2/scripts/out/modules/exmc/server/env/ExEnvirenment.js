import { world } from "@minecraft/server";
export default class ExEnvirenment {
    constructor(time) {
        this.time = time !== null && time !== void 0 ? time : world.getAbsoluteTime();
    }
    print() {
        world.say("time is " + this.time);
    }
    isDay() {
        return this.days() < 12000;
    }
    isNight() {
        return this.days() > 12000;
    }
    days() {
        return this.time - (24000 * Math.floor(this.time / 24000));
    }
}
//# sourceMappingURL=ExEnvirenment.js.map