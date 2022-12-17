import { MinecraftDimensionTypes, MinecraftEntityTypes, MinecraftBlockTypes } from '@minecraft/server';
import { Objective } from "../../modules/exmc/server/entity/ExScoresManager.js";
import ExDimension from "../../modules/exmc/server/ExDimension.js";
import ExGameConfig from "../../modules/exmc/server/ExGameConfig.js";
import ExGameServer from "../../modules/exmc/server/ExGameServer.js";
import ExTickQueue from "../../modules/exmc/server/ExTickQueue.js";
import Random from "../../modules/exmc/utils/Random.js";
import TimeLoopTask from "../../modules/exmc/utils/TimeLoopTask.js";
import GlobalSettings from "./cache/GlobalSettings.js";
import PomDesertBossRuin from "./func/ruins/desert/PomDesertBossRuin.js";
import RuinsLoaction from "./func/ruins/RuinsLoaction.js";
import PomClient from "./PomClient.js";
import ExBlockStructureNormal from '../../modules/exmc/server/block/structure/ExBlockStructureNormal.js';
import TickDelayTask from '../../modules/exmc/utils/TickDelayTask.js';
import Vector3 from '../../modules/exmc/math/Vector3.js';
import ExGameVector3 from '../../modules/exmc/server/math/ExGameVector3.js';
import ExEntity from '../../modules/exmc/server/entity/ExEntity.js';
import { GameMode } from '@minecraft/server';
export default class PomServer extends ExGameServer {
    constructor(config) {
        super(config);
        this.tps = 20;
        this._mtps = 20;
        this.setting = new GlobalSettings(new Objective("wpsetting"));
        (this.clearEntityNumUpdate = new TimeLoopTask(this.getEvents(), () => {
            this.updateClearEntityNum();
        }).delay(10000)).start();
        this.updateClearEntityNum();
        this.entityCleaner = new TimeLoopTask(this.getEvents(), () => {
            let entities = Array.from(ExDimension.getInstance(this.getDimension(MinecraftDimensionTypes.overworld)).getEntities())
                .concat(Array.from(ExDimension.getInstance(this.getDimension(MinecraftDimensionTypes.theEnd)).getEntities()))
                .concat(Array.from(ExDimension.getInstance(this.getDimension(MinecraftDimensionTypes.nether)).getEntities()));
            //ExGameConfig.console.log("当前实体数：" + entities.length);
            let map = new Map();
            entities.forEach(e => {
                var _a;
                if ((e === null || e === void 0 ? void 0 : e.typeId) == undefined)
                    return;
                map.set(e.typeId, ((_a = map.get(e.typeId)) !== null && _a !== void 0 ? _a : 0) + 1);
            });
            let max = [0, ""];
            map.forEach((v, k) => {
                if (v > max[0] && [MinecraftEntityTypes.player.id, MinecraftEntityTypes.villager.id, MinecraftEntityTypes.villagerV2.id].indexOf(k) === -1) {
                    max[0] = v;
                    max[1] = k;
                }
            });
            if (entities.length > this.entityCleanerLeastNum) {
                ExGameConfig.console.log("最多实体数：" + max[0]);
                ExGameConfig.console.log("最多实体数：" + max[1]);
                entities.forEach(e => {
                    if (!e || !e.typeId || e.typeId !== max[1])
                        return;
                    if (e.typeId === "minecraft:item" && e.viewVector.y !== 0)
                        return;
                    //if (e.nameTag) return;
                    e.kill();
                });
            }
        }).delay(8000);
        this.upDateEntityCleaner();
        let ticks = 0;
        this.tpsListener = new TimeLoopTask(this.getEvents(), () => {
            this.tps = ticks;
            let liner = (this.tps - this._mtps) > 0 ? this.entityCleanerStrength : 11 - this.entityCleanerStrength;
            this._mtps = this._mtps * (liner - 1) / liner + this.tps / liner;
            //ExGameConfig.console.log("tps：" + this.tps, "myps : " + this._mtps,"delay:"+this.entityCleanerDelay ** (this._mtps));
            this.entityCleaner.delay(Math.pow(this.entityCleanerDelay, (this._mtps)));
            ticks = 0;
        }).delay(1000);
        this.getEvents().events.tick.subscribe(e => {
            ticks++;
        });
        this.tpsListener.start();
        this.portal_desertBoss = new ExBlockStructureNormal();
        this.portal_desertBoss.setDirection(ExBlockStructureNormal.DIRECTION_LAY)
            .setStructure([
            [
                "XXXXX",
                "XWWWX",
                "XWYWX",
                "XWWWX",
                "XXXXX"
            ],
            [
                "XSXSX",
                "SAAAS",
                "XAAAX",
                "SAAAS",
                "XSXSX"
            ],
            [
                "CAAAC",
                "AAAAA",
                "AAAAA",
                "AAAAA",
                "CAAAC"
            ]
        ])
            .analysis({
            X: MinecraftBlockTypes.sandstone.id,
            W: MinecraftBlockTypes.water.id,
            Y: "wb:block_magic_equipment",
            A: MinecraftBlockTypes.air.id,
            S: MinecraftBlockTypes.stoneBlockSlab2.id,
            C: MinecraftBlockTypes.cobblestoneWall.id
        });
        let r = new Random(this.setting.worldSeed);
        this.ruin_desertBoss = new PomDesertBossRuin(r.nextInt());
        ExTickQueue.push(() => {
            this.ruin_desertBoss.init(RuinsLoaction.DESERT_RUIN_LOCATION_START.x, RuinsLoaction.DESERT_RUIN_LOCATION_START.y, RuinsLoaction.DESERT_RUIN_LOCATION_START.z, this.getDimension(MinecraftDimensionTypes.theEnd));
            this.ruin_desertBoss.dispose();
        });
        const tmpV = new Vector3();
        const tmpP = new Vector3();
        this.ruinDesertGuardPos = new Vector3(RuinsLoaction.DESERT_RUIN_LOCATION_CENTER);
        const upDateMonster = () => {
            let entities = Array.from(this.getExDimension(MinecraftDimensionTypes.theEnd).getEntities({
                location: ExGameVector3.getLocation(RuinsLoaction.DESERT_RUIN_LOCATION_CENTER),
                maxDistance: 400
            }));
            for (let e of entities) {
                if (e.id === "minecraft:item" && e.viewVector.y === 0) {
                    e.kill();
                }
            }
        };
        this.desertRuinRandomRules = new TimeLoopTask(this.getEvents(), () => {
            upDateMonster();
        }).delay(60000);
        const enddim = this.getExDimension(MinecraftDimensionTypes.theEnd);
        let ruin_desert_count = 0;
        this.ruinDesertGuardRule = new TickDelayTask(this.getEvents(), () => {
            enddim.spawnParticle("wb:ruin_desert_guardpar", this.ruinDesertGuardPos);
            if (ruin_desert_count > 400) {
                ruin_desert_count = 0;
            }
            if (ruin_desert_count > 200) {
                let entities = enddim.getEntities({
                    location: ExGameVector3.getLocation(RuinsLoaction.DESERT_RUIN_LOCATION_CENTER),
                    maxDistance: 400,
                    closest: 1,
                    type: MinecraftEntityTypes.player.id,
                    gameMode: GameMode.adventure
                });
                if (entities.length > 0) {
                    const loc = entities[0].location;
                    if (loc.x && loc.y && loc.z) {
                        tmpP.set(loc);
                        tmpV.set(this.ruinDesertGuardPos);
                        tmpP.sub(tmpV);
                        if (tmpP.len() < 2) {
                            ExEntity.getInstance(entities[0]).damage(4);
                        }
                        tmpP.normalize();
                        tmpV.set(loc).sub(RuinsLoaction.DESERT_RUIN_LOCATION_START).div(16).floor();
                        if (!this.ruin_desertBoss.isInRoom(`${tmpV.x},${tmpV.y},${tmpV.z}`)) {
                            this.ruinDesertGuardPos.add(tmpP.scl(0.38));
                        }
                        else {
                            this.ruinDesertGuardPos.add(tmpP.scl(0.2));
                        }
                    }
                }
            }
            ruin_desert_count += 1;
        }).delay(1);
        upDateMonster();
        this.desertRuinRandomRules.start();
        this.ruinFuncLooper = new TickDelayTask(this.getEvents(), () => {
            let desertFlag = false;
            for (let client of this.getClients()) {
                tmpV.set(client.player.location);
                if (this.ruin_desertBoss.isCompleted()) {
                    if (tmpV.x >= RuinsLoaction.DESERT_RUIN_LOCATION_START.x && tmpV.x <= RuinsLoaction.DESERT_RUIN_LOCATION_END.x
                        && tmpV.z >= RuinsLoaction.DESERT_RUIN_LOCATION_START.z && tmpV.z <= RuinsLoaction.DESERT_RUIN_LOCATION_END.z) {
                        desertFlag = true;
                    }
                }
            }
            if (!desertFlag) {
                this.ruinDesertGuardRule.stop();
                this.desertRuinRandomRules.stop();
            }
            else {
                this.ruinDesertGuardRule.start();
                this.desertRuinRandomRules.start();
            }
        }).delay(20 * 12);
        this.ruinFuncLooper.start();
    }
    sayTo(str) {
        this.getExDimension(MinecraftDimensionTypes.theEnd).command.run(`tellraw @a {"rawtext": [{"text": "${str}"}]}`);
    }
    updateClearEntityNum() {
        this.entityCleanerStrength = this.setting.entityCleanerStrength;
        this.entityCleanerLeastNum = this.setting.entityCleanerLeastNum;
        this.entityCleanerDelay = (60 - this.setting.entityCleanerDelay) / 100 + 1.8;
    }
    upDateEntityCleaner() {
        if (this.setting.entityCleaner) {
            this.entityCleaner.start();
        }
        else {
            this.entityCleaner.stop();
        }
    }
    newClient(id, player) {
        return new PomClient(this, id, player);
    }
}
//# sourceMappingURL=PomServer.js.map