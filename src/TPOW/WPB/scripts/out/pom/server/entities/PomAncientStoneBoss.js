import { EntityDamageCause } from '@minecraft/server';
import PomBossController from './PomBossController.js';
import VarOnChangeListener from '../../../modules/exmc/utils/VarOnChangeListener.js';
import Vector3 from '../../../modules/exmc/math/Vector3.js';
class PomAncientStoneBoss extends PomBossController {
    constructor(e, server) {
        super(e, server);
        this.viewTime = 0;
        this.cannonView = new VarOnChangeListener((n, l) => {
            if (n) {
                const f = (e) => {
                    this.viewTime += e.deltaTime;
                    if (this.viewTime >= 0.4) {
                        const view = new Vector3();
                        const pos = new Vector3();
                        for (let e of this.barrier.getPlayers()) {
                            view.set(e.getViewDirection());
                            view.y = 0;
                            view.normalize();
                            pos.set(e.getViewDirection());
                            pos.y = 0;
                            pos.normalize();
                            e.runCommand(`camera @s set minecraft:free ease ${this.viewTime} linear pos ${view
                                .scl(-8).add(0, 5, 0).add(e.location).toArray().join(" ")} facing ${pos
                                .scl(8).add(0, 1, 0).add(e.location).toArray().join(" ")}`);
                        }
                        this.viewTime = 0;
                    }
                };
                this.getEvents().exEvents.tick.subscribe(f);
                this.setTimeout(() => {
                    this.getEvents().exEvents.tick.unsubscribe(f);
                }, 5000);
                for (let e of this.barrier.getPlayers()) {
                    const c = this.server.findClientByPlayer(e);
                    c === null || c === void 0 ? void 0 : c.setTimeout(() => {
                        c.exPlayer.command.run(`camera @s clear`);
                    }, 5200);
                }
            }
            else {
            }
        }, false);
    }
    initBossEntity() {
        super.initBossEntity();
        this.music = this.server.getMusic("music.wb.anger_of_ancient");
        this.music.trackPlayers(Array.from(this.barrier.getPlayers()));
        if (!this.exEntity.hasComponent("minecraft:is_baby") && this.isFisrtCall) {
            this.server.say({ rawtext: [{ translate: "text.wb:summon_ancient_stone.name" }] });
            this.music.loop();
        }
        this.getEvents().exEvents.onLongTick.subscribe(e => {
            this.cannonView.upDate(this.exEntity.hasTag("cannon"));
        });
    }
    onSpawn() {
        super.onSpawn();
    }
    onKilled(e) {
        //设置奖励
        if (this.exEntity.hasComponent("minecraft:is_baby")) {
            for (let c of this.barrier.clientsByPlayer()) {
                c.progressTaskFinish(this.entity.typeId, c.ruinsSystem.causeDamage);
                c.ruinsSystem.causeDamageShow = false;
            }
            this.server.say({ rawtext: [{ translate: "text.wb:defeat_ancient_stone.name" }] });
            this.exEntity.command.run(`camera @a[r=128] clear`);
            console.warn("onWin");
            this.stopBarrier();
            this.music.stop();
        }
        if (e.damageSource.cause === EntityDamageCause.suicide) {
            this.music.stop();
        }
        super.onKilled(e);
    }
    onFail() {
        this.music.stop();
        let pos = this.entity.location;
        this.exEntity.command.run(`camera @a[r=128] clear`);
        super.onFail();
    }
}
PomAncientStoneBoss.typeId = "wb:ancient_stone";
export default PomAncientStoneBoss;
//# sourceMappingURL=PomAncientStoneBoss.js.map