import ExEntityController from "../../../modules/exmc/server/entity/ExEntityController.js";
import Vector3 from "../../../modules/exmc/math/Vector3.js";
export default class PomOccupationSkillTrack extends ExEntityController {
    onSpawn() {
        super.onSpawn();
        this.speed = this.exEntity.getVelocity().len();
        const tmpV = new Vector3();
        const tmpP = new Vector3();
        this.speedListener = (te) => {
            let loc;
            try {
                loc = this.target?.location;
                // console.warn(dim === undefined)
                if (loc === undefined) {
                    this.destroyTrigger();
                    return;
                }
            }
            catch (o) {
                this.destroyTrigger();
                return;
            }
            if (this.speed <= 0.1) {
                this.destroyTrigger();
            }
            tmpV.set(loc).sub(this.entity.location).add(0, 0.8, 0);
            tmpP.set(tmpV).normalize().scl(tmpV.mul(this.entity.getVelocity()) / tmpV.len())
                .sub(this.entity.getVelocity());
            this.entity.applyImpulse(tmpP.scl(0.2));
        };
        this.getEvents().exEvents.tick.subscribe(this.speedListener);
    }
    onDespawn() {
        super.onDespawn();
    }
    setTarget(target) {
        this.target = target;
    }
}
