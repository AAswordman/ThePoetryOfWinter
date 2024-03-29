import { Entity, EntityHurtAfterEvent, EntityDamageCause } from '@minecraft/server';
import ExEntityController from '../../../modules/exmc/server/entity/ExEntityController.js';
import PomBossBarrier from '../func/barrier/PomBossBarrier.js';
import { ExBlockArea } from '../../../modules/exmc/server/block/ExBlockArea.js';
import PomServer from '../PomServer.js';
import Vector3 from '../../../modules/exmc/math/Vector3.js';

export default class PomBossController extends ExEntityController {
    startPos: Vector3;
    barrier: PomBossBarrier;
    isFisrtCall = false;
    constructor(e: Entity, server: PomServer) {
        super(e, server);
        this.startPos = this.exEntity.position;
        let barrier = PomBossBarrier.find(this.startPos);

        if (!barrier) {
            this.isFisrtCall = true;
            barrier = new PomBossBarrier(server, this.exEntity.exDimension,
                new ExBlockArea(this.startPos.cpy().sub(32, 32, 32), this.startPos.cpy().add(32, 32, 32), true),
                this);
        } else {
            barrier.setBoss(this);
        }
        this.barrier = barrier;

        if (barrier.players.size === 0) {
            this.despawn();
            this.stopBarrier();
            this.destroyBossEntity();
        }else{
            this.initBossEntity();
        }
    }
    despawn() {
        this.entity.triggerEvent("minecraft:despawn");
    }
    onFail() {
        console.warn("onFail");
        for (let c of this.barrier.clientsByPlayer()) {
            c.ruinsSystem.causeDamageShow = false;
        }
        this.stopBarrier();
        this.destroyBossEntity();
        this.server.say({ rawtext: [{ translate: "text.dec:killed_by_boss.name" }] });
        this.despawn();
    }

    override onKilled(e: EntityHurtAfterEvent): void {
        this.destroyBossEntity();
        if (e.damageSource.cause === EntityDamageCause.suicide) {
            this.stopBarrier();
        }
        super.onKilled(e);
    }

    override onSpawn(): void {
        super.onSpawn();
    }

    stopBarrier() {
        this.barrier.stop();
    }
    destroyBossEntity(){

    }
    initBossEntity(){
        for (let c of this.barrier.clientsByPlayer()) {
            c.ruinsSystem.causeDamageShow = true;
            c.ruinsSystem.causeDamageType.add(this.entity.typeId);
        }
    }
}