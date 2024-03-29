
import { Entity, EntityHurtAfterEvent } from '@minecraft/server';
import PomBossController from './PomBossController.js';
import PomServer from '../PomServer.js';
import { registerEvent } from '../../../modules/exmc/server/events/eventDecoratorFactory.js';
import ExErrorQueue from '../../../modules/exmc/server/ExErrorQueue.js';
import VarOnChangeListener from '../../../modules/exmc/utils/VarOnChangeListener.js';
import { TickEvent } from '../../../modules/exmc/server/events/events.js';

export class PomIntentionsBoss1 extends PomBossController {
    static typeId = "wb:intentions_first";
    constructor(e: Entity, server: PomServer) {
        super(e, server);
    }
    override initBossEntity(): void {
        super.initBossEntity();
        if (this.isFisrtCall) this.server.say({ rawtext: [{ translate: "text.wb:summon_intentions.name" }] });
        this.barrier.changeFog("wb:ruin_mind_1_boss");
    }
    override onSpawn(): void {
        super.onSpawn();
    }
    override onKilled(e: EntityHurtAfterEvent): void {
        super.onKilled(e);
    }
    override onFail(): void {
        super.onFail();
    }

    @registerEvent("onLongTick")
    onLongTick(e: TickEvent) {
        try {
            if (this.exEntity.hasComponent("minecraft:is_charged")) {
                this.barrier.particle("wb:ruin_mind_boss_resist_par");
            }
        } catch (e) {
            ExErrorQueue.throwError(e);
        }
    }

}

export class PomIntentionsBoss2 extends PomBossController {
    static typeId = "wb:intentions_second";
    constructor(e: Entity, server: PomServer) {
        super(e, server);
    }
    override initBossEntity(): void {
        super.initBossEntity();
        this.barrier.changeFog("wb:ruin_mind_2_boss");
    }
    override onSpawn(): void {
        super.onSpawn();
    }
    override onKilled(e: EntityHurtAfterEvent): void {
        super.onKilled(e);
    }
    override onFail(): void {
        super.onFail();
    }

    @registerEvent("onLongTick")
    onLongTick(e: TickEvent) {
        try {
            if (this.exEntity.hasComponent("minecraft:is_baby")) {
                this.barrier.particle("wb:ruin_mind_boss_floor_par");
                this.barrier.changeFog("wb:ruin_mind_3_boss");
            } else {
                this.barrier.changeFog("wb:ruin_mind_2_boss");
            }
        } catch (e) {
            ExErrorQueue.throwError(e);
        }
    }

}

export class PomIntentionsBoss3 extends PomBossController {
    static typeId = "wb:intentions_third";
    constructor(e: Entity, server: PomServer) {
        super(e, server);
    }
    override initBossEntity(): void {
        super.initBossEntity();
        this.state = new VarOnChangeListener((n) => {
            switch (n) {
                case 9:
                    this.exEntity.exDimension.spawnParticle("wb:ruin_mind_boss_third_par", this.exEntity.position);
                    break;
                case 1:
                case 2:
                case 3:
                    this.exEntity.exDimension.spawnParticle("wb:ruin_mind_boss_second_par", this.exEntity.position);
                    break;
            }
        }, 1);
        this.changeFog = new VarOnChangeListener((n) => {
            if (n === "wb:ruin_mind_5_boss") {
                this.barrier.changeFog("wb:ruin_mind_4_boss");
                this.setTimeout(() => {
                    this.barrier.changeFog("wb:ruin_mind_5_boss");
                }, 5000);
            } else {
                this.barrier.changeFog(n);
            }
        }, "");
        
        this.changeFog.upDate("wb:ruin_mind_5_boss");
    }
    changeFog!: VarOnChangeListener<string>; 
    state!: VarOnChangeListener<number>; 
    @registerEvent("onLongTick")
    onLongTick(e: TickEvent) {
        try {
            if (this.exEntity.hasComponent("minecraft:is_baby")) {
                this.barrier.particle("wb:ruin_mind_boss_floor_par");
                this.changeFog.upDate("wb:ruin_mind_3_boss");

            } else {
                this.changeFog.upDate("wb:ruin_mind_5_boss");
            }
            this.state.upDate(this.exEntity.getVariant())
        } catch (e) {
            ExErrorQueue.throwError(e);
        }
    }
    override onSpawn(): void {
        super.onSpawn();
    }
    override onKilled(e: EntityHurtAfterEvent): void {
        //设置奖励
        for (let c of this.barrier.clientsByPlayer()) {
            c.progressTaskFinish(this.entity.typeId, c.ruinsSystem.causeDamage);
            c.ruinsSystem.causeDamageShow = false;
        }
        this.server.say({ rawtext: [{ translate: "text.wb:defeat_intentions.name" }] });

        console.warn("onWin");
        this.stopBarrier();
        super.onKilled(e);
    }
    override onFail(): void {
        super.onFail();
    }

}