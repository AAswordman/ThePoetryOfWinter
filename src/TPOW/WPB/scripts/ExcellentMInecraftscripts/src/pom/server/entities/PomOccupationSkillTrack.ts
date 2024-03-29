import ExEntityController from "../../../modules/exmc/server/entity/ExEntityController.js";
import { Entity } from '@minecraft/server';
import { TickEvent } from "../../../modules/exmc/server/events/events.js";
import Vector3, { IVector3 } from "../../../modules/exmc/math/Vector3.js";

export default class PomOccupationSkillTrack extends ExEntityController {
    target: Entity | undefined;
    speed!: number;
    speedListener!: (te: TickEvent) => void;
    override onSpawn(): void {
        super.onSpawn();
        this.speed = this.exEntity.getVelocity().len();
        const tmpV = new Vector3();
        const tmpP = new Vector3();
        this.speedListener = (te: TickEvent) => {
            let loc: IVector3 | undefined;
            try {
                loc = this.target?.location;
                // console.warn(dim === undefined)
                if (loc === undefined) {
                    this.destroyTrigger();
                    return;
                }
            } catch (o) {
                this.destroyTrigger();
                return;
            }
            if(this.speed <= 0.1){
                this.destroyTrigger();
            }

            tmpV.set(loc).sub(this.entity.location).add(0,0.8,0);
            tmpP.set(tmpV).normalize().scl(tmpV.mul(this.entity.getVelocity()) / tmpV.len())
                .sub(this.entity.getVelocity());
            this.entity.applyImpulse(tmpP.scl(0.2));
        }

        this.getEvents().exEvents.tick.subscribe(this.speedListener);
    }
    override onDespawn(): void {
        super.onDespawn();
    }
    setTarget(target: Entity) {
        this.target = target;
    }

}