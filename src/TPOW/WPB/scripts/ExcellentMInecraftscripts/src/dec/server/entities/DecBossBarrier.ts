import DisposeAble from "../../../modules/exmc/interface/DisposeAble.js";
import ExEventManager from "../../../modules/exmc/interface/ExEventManager.js";
import Vector3, { IVector3 } from "../../../modules/exmc/math/Vector3.js";
import ExDimension from "../../../modules/exmc/server/ExDimension.js";
import { ignorn } from "../../../modules/exmc/server/ExErrorQueue.js";
import { ExBlockArea } from "../../../modules/exmc/server/block/ExBlockArea.js";
import UUID from "../../../modules/exmc/utils/UUID.js";
import VarOnChangeListener from "../../../modules/exmc/utils/VarOnChangeListener.js";
import { MinecraftEffectTypes } from "../../../modules/vanilla-data/lib/index.js";
import DecServer from "../DecServer.js";
import DecBossController from "./DecBossController.js";
import DecClient from "../DecClient.js";
import { Entity, Player } from "@minecraft/server";


export default class DecBossBarrier implements DisposeAble {
    center: Vector3;
    particle(arg0: string) {
        this.dim.spawnParticle(arg0, this.center);
    }
    tickEvent: () => void;
    manager: ExEventManager;
    server: DecServer;
    boss: DecBossController;
    fog?: string;
    deathTimes: number = 0;

    fogListener = new VarOnChangeListener((n, l) => {
        this.clearFog();
        this.fog = n;
    }, "");
    static find(startPos: IVector3) {
        for (let [k, v] of this.map) {
            if (v.area.contains(startPos)) {
                return v;
            }
        }
    }
    setBoss(e: DecBossController) {
        this.boss = e;
    }
    static isInBarrier(e: Entity) {
        return DecBossBarrier.find(e.location) !== undefined;
    }
    area: ExBlockArea;
    static map = new Map<string, DecBossBarrier>();
    players: Map<Player, boolean> = new Map<Player, boolean>();
    dim: ExDimension;
    id: string;
    constructor(server: DecServer, dim: ExDimension, area: ExBlockArea, boss: DecBossController) {
        this.area = area;
        this.center = area.center();
        this.id = UUID.randomUUID();
        DecBossBarrier.map.set(this.id, this);
        this.dim = dim;
        for (let e of dim.getPlayers()) {
            if (area.contains(e.location)) {
                this.players.set(e, true);
                let c = <DecClient | undefined>server.findClientByPlayer(e);
                if (c) {
                    c.bossBarrier = this;
                }
            }
        }
        this.tickEvent = this.update.bind(this);
        this.server = server;
        this.manager = server.getEvents();
        this.manager.register("onLongTick", this.tickEvent);
        this.boss = boss;
    }
    dispose(): void {
        DecBossBarrier.map.delete(this.id);
        this.manager.cancel("onLongTick", this.tickEvent);
        for (let c of this.clientsByPlayer()) {
            c.bossBarrier = undefined;
        }
    }
    *clientsByPlayer() {
        for (let e of this.players) {
            let c = <DecClient | undefined>this.server.findClientByPlayer(e[0]);
            if (c) {
                yield c;
            }
        }
    }
    *getPlayers() {
        for (let e of this.players) {
            if (e[0].isValid()) yield e[0];
        }
    }

    notifyDeathAdd() {
        this.boss.onFail();
    }
    update() {
        this.dim.spawnParticle("wb:boss_barrier", this.center);
        for (let e of this.server.getExPlayers()) {
            if (!e.entity.location) continue;
            // console.warn(this.area.contains(e.location))
            if (this.players.has(e.entity)) {
                if (!this.area.contains(e.entity.location)) {
                    if (this.players.get(e.entity)) {
                        // notUtillTask(this.server,() => ExPlayer.getInstance(e).getHealth()>0,()=>{
                        this.server.setTimeout(() => {
                            if (this.dim.dimension !== e.dimension) {
                                e.addEffect(MinecraftEffectTypes.Resistance, 14 * 20, 10, false);
                                e.addEffect(MinecraftEffectTypes.Weakness, 14 * 20, 10, false);
                            }
                            e.setPosition(this.area.center(), this.dim.dimension);
                        }, 2000);
                        // });
                        this.players.set(e.entity, false);
                    }
                } else {
                    this.players.set(e.entity, true);
                }
            } else {
                if (this.area.contains(e.entity.location)) {
                    e.entity.kill();
                }
            }
        }

        if (ignorn(() => this.boss.entity.location) && !this.area.contains(this.boss.entity.location)) {
            this.boss.exEntity.setPosition(this.area.center());
        }

        if (this.fog) this.dim.command.run(`fog @a[x=${this.center.x},y=${this.center.y},z=${this.center.z},r=128] push ${this.fog} "ruin_fog"`);

    }
    stop() {
        this.clearFog();
        this.dispose();
    }
    clearFog() {
        this.dim.command.run(`fog @a[x=${this.center.x},y=${this.center.y},z=${this.center.z},r=128] remove "ruin_fog"`);
    }
    changeFog(name: string) {
        this.fogListener.upDate(name);
    }
}