import UUID from "../../../../modules/exmc/utils/UUID.js";
import ExPlayer from "../../../../modules/exmc/server/entity/ExPlayer.js";
export default class PomBossBarrier {
    constructor(server, dim, area) {
        this.players = new Set();
        this.area = area;
        this.id = UUID.randomUUID();
        PomBossBarrier.map.set(this.id, this);
        this.dim = dim;
        for (let e of dim.getPlayers()) {
            if (area.contains(e.location)) {
                this.players.add(e);
            }
        }
        this.tickEvent = this.update.bind(this);
        this.server = server;
        this.manager = server.getEvents();
        this.manager.register("onLongTick", this.tickEvent);
    }
    static find(startPos) {
        for (let [k, v] of this.map) {
            if (v.area.contains(startPos)) {
                return v;
            }
        }
    }
    static isInBarrier(e) {
        return PomBossBarrier.find(e.location) !== undefined;
    }
    dispose() {
        PomBossBarrier.map.delete(this.id);
        this.manager.cancel("onLongTick", this.tickEvent);
    }
    update() {
        this.dim.spawnParticle("wb:boss_barrier", this.area.center());
        for (let e of this.server.getPlayers()) {
            if (!e.location)
                continue;
            // console.warn(this.area.contains(e.location))
            if (this.players.has(e)) {
                if (!this.area.contains(e.location)) {
                    ExPlayer.getInstance(e).setPosition(this.area.center(), this.dim.dimension);
                }
            }
            else {
                if (this.area.contains(e.location)) {
                    e.kill();
                }
            }
        }
    }
    stop() {
        this.dispose();
    }
}
PomBossBarrier.map = new Map();
//# sourceMappingURL=PomBossBarrier.js.map