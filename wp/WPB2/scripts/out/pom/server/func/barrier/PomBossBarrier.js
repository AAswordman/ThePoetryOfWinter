import UUID from "../../../../modules/exmc/utils/UUID.js";
import ExPlayer from "../../../../modules/exmc/server/entity/ExPlayer.js";
import { MinecraftEffectTypes } from '@minecraft/server';
import { ignorn } from "../../../../modules/exmc/server/ExErrorQueue.js";
export default class PomBossBarrier {
    constructor(server, dim, area, boss) {
        this.deathTimes = 0;
        this.players = new Map();
        this.area = area;
        this.id = UUID.randomUUID();
        PomBossBarrier.map.set(this.id, this);
        this.dim = dim;
        for (let e of dim.getPlayers()) {
            if (area.contains(e.location)) {
                this.players.set(e, true);
                let c = server.findClientByPlayer(e);
                if (c) {
                    c.ruinsSystem.barrier = this;
                }
            }
        }
        this.tickEvent = this.update.bind(this);
        this.server = server;
        this.manager = server.getEvents();
        this.manager.register("onLongTick", this.tickEvent);
        this.boss = boss;
    }
    static find(startPos) {
        for (let [k, v] of this.map) {
            if (v.area.contains(startPos)) {
                return v;
            }
        }
    }
    setBoss(e) {
        this.boss = e;
    }
    static isInBarrier(e) {
        return PomBossBarrier.find(e.location) !== undefined;
    }
    dispose() {
        PomBossBarrier.map.delete(this.id);
        this.manager.cancel("onLongTick", this.tickEvent);
        for (let [p, v] of this.players) {
            let c = this.server.findClientByPlayer(p);
            if (c) {
                c.ruinsSystem.barrier = undefined;
            }
        }
    }
    notifyDeathAdd() {
        this.deathTimes += 1;
        for (let [p, v] of this.players) {
            let c = this.server.findClientByPlayer(p);
            if (c) {
                c.ruinsSystem.deathTimes = this.deathTimes;
            }
        }
        if (this.deathTimes >= 3) {
            this.boss.onFail();
        }
    }
    update() {
        this.dim.spawnParticle("wb:boss_barrier", this.area.center());
        for (let e of this.server.getPlayers()) {
            if (!e.location)
                continue;
            // console.warn(this.area.contains(e.location))
            if (this.players.has(e)) {
                if (!this.area.contains(e.location)) {
                    if (this.players.get(e)) {
                        // notUtillTask(this.server,() => ExPlayer.getInstance(e).getHealth()>0,()=>{
                        if (this.dim.dimension !== e.dimension)
                            e.addEffect(MinecraftEffectTypes.resistance, 14 * 20, 10, true);
                        this.server.setTimeout(() => ExPlayer.getInstance(e).setPosition(this.area.center(), this.dim.dimension), 2000);
                        // });
                        this.players.set(e, false);
                    }
                }
                else {
                    this.players.set(e, true);
                }
            }
            else {
                if (this.area.contains(e.location)) {
                    e.kill();
                }
            }
        }
        if (ignorn(() => this.boss.entity.location) && !this.area.contains(this.boss.entity.location)) {
            this.boss.exEntity.setPosition(this.area.center());
        }
    }
    stop() {
        this.dispose();
    }
}
PomBossBarrier.map = new Map();
//# sourceMappingURL=PomBossBarrier.js.map