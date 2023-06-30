import UUID from "../../../../modules/exmc/utils/UUID.js";
import ExPlayer from "../../../../modules/exmc/server/entity/ExPlayer.js";
import { MinecraftEffectTypes } from '@minecraft/server';
import { ignorn } from "../../../../modules/exmc/server/ExErrorQueue.js";
import VarOnChangeListener from '../../../../modules/exmc/utils/VarOnChangeListener.js';
export default class PomBossBarrier {
    constructor(server, dim, area, boss) {
        this.deathTimes = 0;
        this.fogListener = new VarOnChangeListener((n, l) => {
            this.dim.command.run(`fog @a[x=${this.center.x},y=${this.center.y},z=${this.center.z},r=128] remove "ruin_fog"`);
            this.fog = n;
        }, "");
        this.players = new Map();
        this.area = area;
        this.center = area.center();
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
    particle(arg0) {
        this.dim.spawnParticle(arg0, this.center);
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
        for (let c of this.clientsByPlayer()) {
            c.ruinsSystem.barrier = undefined;
        }
    }
    *clientsByPlayer() {
        for (let e of this.players) {
            let c = this.server.findClientByPlayer(e[0]);
            if (c) {
                yield c;
            }
        }
    }
    notifyDeathAdd() {
        this.deathTimes += 1;
        for (let c of this.clientsByPlayer()) {
            c.ruinsSystem.deathTimes = this.deathTimes;
        }
        if (this.deathTimes >= 3) {
            this.boss.onFail();
        }
    }
    update() {
        this.dim.spawnParticle("wb:boss_barrier", this.center);
        for (let e of this.server.getPlayers()) {
            if (!e.location)
                continue;
            // console.warn(this.area.contains(e.location))
            if (this.players.has(e)) {
                if (!this.area.contains(e.location)) {
                    if (this.players.get(e)) {
                        // notUtillTask(this.server,() => ExPlayer.getInstance(e).getHealth()>0,()=>{
                        this.server.setTimeout(() => {
                            if (this.dim.dimension !== e.dimension) {
                                let ep = ExPlayer.getInstance(e);
                                ep.addEffect(MinecraftEffectTypes.resistance, 14 * 20, 10, false);
                                ep.addEffect(MinecraftEffectTypes.weakness, 14 * 20, 10, false);
                            }
                            ExPlayer.getInstance(e).setPosition(this.area.center(), this.dim.dimension);
                        }, 2000);
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
        if (this.fog)
            this.dim.command.run(`fog @a[x=${this.center.x},y=${this.center.y},z=${this.center.z},r=128] push ${this.fog} "ruin_fog"`);
    }
    stop() {
        this.dispose();
    }
    changeFog(name) {
        this.fogListener.upDate(name);
    }
}
PomBossBarrier.map = new Map();
//# sourceMappingURL=PomBossBarrier.js.map