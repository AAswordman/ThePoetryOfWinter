var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { MinecraftDimensionTypes, MinecraftEntityTypes, MinecraftBlockTypes, EntityHurtEvent, EntityDamageCause } from '@minecraft/server';
import { Objective } from "../../modules/exmc/server/entity/ExScoresManager.js";
import ExDimension from "../../modules/exmc/server/ExDimension.js";
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
import PomMagicStoneBoss from './entities/PomMagicStoneBoss.js';
import { registerEvent } from '../../modules/exmc/server/events/eventDecoratorFactory.js';
import damageShow from './helper/damageShow.js';
import PomStoneBossRuin from './func/ruins/stone/PomStoneBossRuin.js';
export default class PomServer extends ExGameServer {
    constructor(config) {
        super(config);
        this.tps = 20;
        this._mtps = 20;
        //虚拟玩家
        this.fakeplayers = [];
        this.setting = new GlobalSettings(new Objective("wpsetting"));
        //实体清理
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
                this.say("Clear Entity Type：" + max[1]);
                this.say("Clear Entity Num：" + max[0]);
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
        //守卫遗迹
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
        //石头遗迹
        this.portal_stoneBoss = new ExBlockStructureNormal();
        this.portal_stoneBoss.setDirection(ExBlockStructureNormal.DIRECTION_LAY)
            .setStructure([
            [
                "BXXXB",
                "XWWWX",
                "XWYWX",
                "XWWWX",
                "BXXXB"
            ],
            [
                "BASAB",
                "AAAAA",
                "SAAAS",
                "AAAAA",
                "BASAB"
            ]
        ])
            .analysis({
            X: MinecraftBlockTypes.sandstone.id,
            W: MinecraftBlockTypes.water.id,
            Y: "wb:block_magic_equipment",
            S: MinecraftBlockTypes.cobblestoneWall.id,
            A: MinecraftBlockTypes.air.id,
            B: MinecraftBlockTypes.stonebrick.id
        });
        let r = new Random(this.setting.worldSeed);
        this.ruin_desertBoss = new PomDesertBossRuin(r.nextInt());
        this.ruin_stoneBoss = new PomStoneBossRuin(r.nextInt());
        //遗迹初始化各个房间位置
        ExTickQueue.push(() => {
            this.ruin_desertBoss.init(RuinsLoaction.DESERT_RUIN_LOCATION_START.x, RuinsLoaction.DESERT_RUIN_LOCATION_START.y, RuinsLoaction.DESERT_RUIN_LOCATION_START.z, this.getDimension(MinecraftDimensionTypes.theEnd));
            this.ruin_desertBoss.dispose();
            this.ruin_stoneBoss.init(RuinsLoaction.STONE_RUIN_LOCATION_START.x, RuinsLoaction.STONE_RUIN_LOCATION_START.y, RuinsLoaction.STONE_RUIN_LOCATION_START.z, this.getDimension(MinecraftDimensionTypes.theEnd));
            this.ruin_stoneBoss.dispose();
        });
        //遗迹掉落物清理
        const upDateMonster = () => {
            let entities = this.getExDimension(MinecraftDimensionTypes.theEnd).getEntities({
                location: ExGameVector3.getLocation(RuinsLoaction.DESERT_RUIN_LOCATION_CENTER),
                maxDistance: 400
            });
            // .concat(
            //     this.getExDimension(MinecraftDimensionTypes.theEnd).getEntities({
            //         location: ExGameVector3.getLocation(RuinsLoaction.STONE_RUIN_LOCATION_CENTER),
            //         maxDistance: 128
            //     })
            // );
            for (let e of entities) {
                if (e.typeId === "minecraft:item" && e.viewVector.y === 0) {
                    e.kill();
                }
            }
        };
        this.ruinCleaner = new TimeLoopTask(this.getEvents(), () => {
            upDateMonster();
        }).delay(60000);
        upDateMonster();
        this.ruinCleaner.start();
        //守卫遗迹规则
        const enddim = this.getExDimension(MinecraftDimensionTypes.theEnd);
        let ruin_desert_count = 0;
        const tmpV = new Vector3();
        const tmpP = new Vector3();
        this.ruinDesertGuardPos = new Vector3(RuinsLoaction.DESERT_RUIN_LOCATION_CENTER);
        this.ruinDesertGuardRule = new TickDelayTask(this.getEvents(), () => {
            enddim.spawnParticle("wb:ruin_desert_guardpar", this.ruinDesertGuardPos);
            if (ruin_desert_count > 400) {
                ruin_desert_count = 0;
            }
            if (ruin_desert_count > 200) {
                let entities = enddim.getPlayers({
                    location: ExGameVector3.getLocation(RuinsLoaction.DESERT_RUIN_LOCATION_CENTER),
                    maxDistance: 400,
                    closest: 1,
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
        //遗迹功能总监听
        this.ruinFuncLooper = new TickDelayTask(this.getEvents(), () => {
            let desertFlag = false;
            let stoneFlag = false;
            for (let client of this.getClients()) {
                tmpV.set(client.player.location);
                if (this.ruin_desertBoss.isCompleted()) {
                    if (tmpV.x >= RuinsLoaction.DESERT_RUIN_LOCATION_START.x && tmpV.x <= RuinsLoaction.DESERT_RUIN_LOCATION_END.x
                        && tmpV.z >= RuinsLoaction.DESERT_RUIN_LOCATION_START.z && tmpV.z <= RuinsLoaction.DESERT_RUIN_LOCATION_END.z) {
                        desertFlag = true;
                    }
                }
                if (tmpV.x >= RuinsLoaction.STONE_RUIN_LOCATION_START.x && tmpV.x <= RuinsLoaction.STONE_RUIN_LOCATION_END.x
                    && tmpV.z >= RuinsLoaction.STONE_RUIN_LOCATION_START.z && tmpV.z <= RuinsLoaction.STONE_RUIN_LOCATION_END.z) {
                    desertFlag = true;
                }
            }
            if (!desertFlag) {
                this.ruinDesertGuardRule.stop();
                this.ruinCleaner.stop();
            }
            else {
                this.ruinDesertGuardRule.start();
                this.ruinCleaner.start();
            }
            if (stoneFlag) {
            }
        }).delay(20 * 12);
        this.ruinFuncLooper.start();
        //实体监听
        this.addEntityController(PomMagicStoneBoss.typeId, PomMagicStoneBoss);
        // gt.register("Pom", "fakeplayer", (test) => {
        //     this.fakeplayers.push(new PomFakePlayer(
        //         test.spawnSimulatedPlayer(this.fakePlayerSpawnLoc, "Steve1025", GameMode.survival), this)
        //     );
        // })
        //     .structureName("pom:camp_fire");
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
    // fakePlayerSpawnLoc = new BlockLocation(0, 0, 0);
    // @registerEvent<PomServer>("chat", (server, e: ChatEvent) => e.message === "create")
    // createFakePlayer(e: ChatEvent) {
    //     this.fakePlayerSpawnLoc = new BlockLocation(e.sender.location.x, e.sender.location.y, e.sender.location.z);
    //     ExPlayer.getInstance(e.sender).command.run("gametest run Pom:fakeplayer")
    // }
    damageShow(e) {
        damageShow(ExDimension.getInstance(e.hurtEntity.dimension), e.damage, e.hurtEntity.location);
    }
    newClient(id, player) {
        return new PomClient(this, id, player);
    }
}
__decorate([
    registerEvent("entityHurt", (server, e) => server.setting.damageShow && e.cause !== EntityDamageCause.suicide),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EntityHurtEvent]),
    __metadata("design:returntype", void 0)
], PomServer.prototype, "damageShow", null);
//# sourceMappingURL=PomServer.js.map