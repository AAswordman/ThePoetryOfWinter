var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChatEvent, EntityDamageCause, EntityHurtEvent, GameMode, MinecraftBlockTypes, MinecraftDimensionTypes, MinecraftEffectTypes, MinecraftEntityTypes } from '@minecraft/server';
import Vector3 from '../../modules/exmc/math/Vector3.js';
import ExDimension from "../../modules/exmc/server/ExDimension.js";
import ExGameServer from "../../modules/exmc/server/ExGameServer.js";
import ExTickQueue from "../../modules/exmc/server/ExTickQueue.js";
import ExBlockStructureNormal from '../../modules/exmc/server/block/structure/ExBlockStructureNormal.js';
import ExEntity from '../../modules/exmc/server/entity/ExEntity.js';
import ExPlayer from '../../modules/exmc/server/entity/ExPlayer.js';
import { Objective } from "../../modules/exmc/server/entity/ExScoresManager.js";
import { registerEvent } from '../../modules/exmc/server/events/eventDecoratorFactory.js';
import ExGameVector3 from '../../modules/exmc/server/math/ExGameVector3.js';
import Random from "../../modules/exmc/utils/Random.js";
import TickDelayTask from '../../modules/exmc/utils/TickDelayTask.js';
import TimeLoopTask from "../../modules/exmc/utils/TimeLoopTask.js";
import PomClient from "./PomClient.js";
import GlobalSettings from "./cache/GlobalSettings.js";
import PomHeadlessGuardBoss from './entities/PomHeadlessGuardBoss.js';
import PomMagicStoneBoss from './entities/PomMagicStoneBoss.js';
import RuinsLoaction from "./func/ruins/RuinsLoaction.js";
import PomCaveBossRuin from './func/ruins/cave/PomCaveBossRuin.js';
import PomDesertBossRuin from "./func/ruins/desert/PomDesertBossRuin.js";
import PomStoneBossRuin from './func/ruins/stone/PomStoneBossRuin.js';
import damageShow from './helper/damageShow.js';
import PomAncientBossRuin from './func/ruins/ancient/PomAncientBossRuin.js';
import PomAncientStoneBoss from './entities/PomAncientStoneBoss.js';
import PomMindBossRuin from './func/ruins/mind/PomMindBossRuin.js';
import { PomIntentionsBoss1, PomIntentionsBoss2, PomIntentionsBoss3 } from './entities/PomIntentionsBoss.js';
import itemCanChangeBlock from './items/itemCanChangeBlock.js';
import PomBossBarrier from './func/barrier/PomBossBarrier.js';
import ExEnvironment from '../../modules/exmc/server/env/ExEnvironment.js';
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
            Y: "wb:block_energy_seal",
            S: MinecraftBlockTypes.cobblestoneWall.id,
            A: MinecraftBlockTypes.air.id,
            B: MinecraftBlockTypes.stonebrick.id
        });
        //洞穴遗迹
        this.portal_caveBoss = new ExBlockStructureNormal();
        this.portal_caveBoss.setDirection(ExBlockStructureNormal.DIRECTION_LAY)
            .setStructure([
            [
                "XXXXX",
                "XWWWX",
                "XWYWX",
                "XWWWX",
                "XXXXX"
            ],
            [
                "XASAX",
                "AAAAA",
                "SAAAS",
                "AAAAA",
                "XASAX"
            ]
        ])
            .analysis({
            X: MinecraftBlockTypes.deepslateTiles.id,
            W: MinecraftBlockTypes.water.id,
            Y: "wb:block_energy_boundary",
            S: MinecraftBlockTypes.lantern.id,
            A: MinecraftBlockTypes.air.id
        });
        //洞穴远古
        this.portal_ancientBoss = new ExBlockStructureNormal();
        this.portal_ancientBoss.setDirection(ExBlockStructureNormal.DIRECTION_LAY)
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
            X: MinecraftBlockTypes.chiseledDeepslate.id,
            W: MinecraftBlockTypes.water.id,
            Y: "wb:block_magic_ink",
            S: MinecraftBlockTypes.verdantFroglight.id,
            A: MinecraftBlockTypes.air.id,
            B: MinecraftBlockTypes.mossyCobblestone.id
        });
        //遗迹内心
        this.portal_mindBoss = new ExBlockStructureNormal();
        this.portal_mindBoss.setDirection(ExBlockStructureNormal.DIRECTION_LAY)
            .setStructure([
            [
                "XSSSX",
                "SWWWS",
                "SWYWS",
                "SWWWS",
                "XSSSX"
            ],
            [
                "XAAAX",
                "AAAAA",
                "AAAAA",
                "AAAAA",
                "XAAAX"
            ]
        ])
            .analysis({
            X: "wb:block_magic_equipment",
            W: MinecraftBlockTypes.water.id,
            Y: "wb:block_senior_equipment",
            S: "wb:block_magic_barrier",
            A: MinecraftBlockTypes.air.id
        });
        let r = new Random(this.setting.worldSeed);
        this.ruin_desertBoss = new PomDesertBossRuin(r.nextInt());
        this.ruin_stoneBoss = new PomStoneBossRuin(r.nextInt());
        this.ruin_caveBoss = new PomCaveBossRuin(r.nextInt());
        this.ruin_ancientBoss = new PomAncientBossRuin(r.nextInt());
        this.ruin_mindBoss = new PomMindBossRuin(r.nextInt());
        //遗迹初始化各个房间位置
        ExTickQueue.push(() => {
            this.ruin_desertBoss.init(RuinsLoaction.DESERT_RUIN_LOCATION_START.x, RuinsLoaction.DESERT_RUIN_LOCATION_START.y, RuinsLoaction.DESERT_RUIN_LOCATION_START.z, this.getDimension(MinecraftDimensionTypes.theEnd));
            this.ruin_desertBoss.dispose();
            this.ruin_stoneBoss.init(RuinsLoaction.STONE_RUIN_LOCATION_START.x, RuinsLoaction.STONE_RUIN_LOCATION_START.y, RuinsLoaction.STONE_RUIN_LOCATION_START.z, this.getDimension(MinecraftDimensionTypes.theEnd));
            this.ruin_stoneBoss.dispose();
            this.ruin_caveBoss.init(RuinsLoaction.CAVE_RUIN_LOCATION_START.x, RuinsLoaction.CAVE_RUIN_LOCATION_START.y, RuinsLoaction.CAVE_RUIN_LOCATION_START.z, this.getDimension(MinecraftDimensionTypes.theEnd));
            this.ruin_caveBoss.dispose();
            this.ruin_ancientBoss.init(RuinsLoaction.ANCIENT_RUIN_LOCATION_START.x, RuinsLoaction.ANCIENT_RUIN_LOCATION_START.y, RuinsLoaction.ANCIENT_RUIN_LOCATION_START.z, this.getDimension(MinecraftDimensionTypes.theEnd));
            this.ruin_ancientBoss.dispose();
            this.ruin_mindBoss.init(RuinsLoaction.MIND_RUIN_LOCATION_START.x, RuinsLoaction.MIND_RUIN_LOCATION_START.y, RuinsLoaction.MIND_RUIN_LOCATION_START.z, this.getDimension(MinecraftDimensionTypes.theEnd));
            this.ruin_ancientBoss.dispose();
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
        const isInProtectArea = (v) => {
            return RuinsLoaction.DESERT_RUIN_PROTECT_AREA.contains(v)
                || RuinsLoaction.STONE_RUIN_PROTECT_AREA.contains(v)
                || RuinsLoaction.CAVE_RUIN_PROTECT_AREA.contains(v)
                || RuinsLoaction.ANCIENT_RUIN_PROTECT_AREA.contains(v)
                || RuinsLoaction.MIND_RUIN_PROTECT_AREA.contains(v);
        };
        //遗迹保护
        this.getEvents().events.blockBreak.subscribe(e => {
            if (e.dimension === this.getDimension(MinecraftDimensionTypes.theEnd) && (isInProtectArea(e.block))) {
                let ex = ExPlayer.getInstance(e.player);
                // if (ex.getGameMode() === GameMode.creative) return;
                e.dimension.getBlock(e.block.location).setType(e.brokenBlockPermutation.type);
                ex.getExDimension().command.run("kill @e[type=item,r=2,x=" + e.block.x + ",y=" + e.block.y + ",z=" + e.block.z + "]");
                e.player.addEffect(MinecraftEffectTypes.nausea, 200, 0, true);
                e.player.addEffect(MinecraftEffectTypes.blindness, 200, 0, true);
                e.player.addEffect(MinecraftEffectTypes.darkness, 400, 0, true);
                e.player.addEffect(MinecraftEffectTypes.wither, 100, 0, true);
                e.player.addEffect(MinecraftEffectTypes.miningFatigue, 600, 2, true);
                e.player.addEffect(MinecraftEffectTypes.hunger, 600, 1, true);
                ex.command.run("tellraw @s { \"rawtext\" : [ { \"translate\" : \"text.dec:i_inviolable.name\" } ] }");
            }
        });
        this.getEvents().events.beforeItemUseOn.subscribe(e => {
            if (e.source.dimension === this.getDimension(MinecraftDimensionTypes.theEnd) && (isInProtectArea(e.blockLocation))) {
                // if (e.source instanceof Player) {
                //     let ex = ExPlayer.getInstance(e.source);
                //     if (ex.getGameMode() === GameMode.creative) return;
                // }
                e.cancel = true;
            }
        });
        this.getEvents().events.beforeExplosion.subscribe(e => {
            if (e.source && e.dimension === this.getDimension(MinecraftDimensionTypes.theEnd) && (isInProtectArea(e.source.location))) {
                if (e.impactedBlocks.length !== 0) {
                    this.getExDimension(MinecraftDimensionTypes.theEnd).spawnParticle("dec:damp_explosion_particle", e.source.location);
                    e.cancel = true;
                }
                //this.getExDimension(MinecraftDimensionTypes.theEnd).createExplosion(e.source.location,e.impactedBlocks.length);
            }
        });
        this.getEvents().events.beforeItemUse.subscribe(e => {
            if (e.source.dimension === this.getDimension(MinecraftDimensionTypes.theEnd) && (isInProtectArea(e.source.location))) {
                if (itemCanChangeBlock(e.item.typeId)) {
                    e.cancel = true;
                }
                ;
            }
        });
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
            var _a;
            let desertFlag = false;
            let mindFlag = false;
            for (let client of this.getClients()) {
                tmpV.set(client.player.location);
                if (this.ruin_desertBoss.isCompleted()) {
                    if (tmpV.x >= RuinsLoaction.DESERT_RUIN_LOCATION_START.x && tmpV.x <= RuinsLoaction.DESERT_RUIN_LOCATION_END.x
                        && tmpV.z >= RuinsLoaction.DESERT_RUIN_LOCATION_START.z && tmpV.z <= RuinsLoaction.DESERT_RUIN_LOCATION_END.z) {
                        desertFlag = true;
                    }
                }
                if (tmpV.x >= RuinsLoaction.MIND_RUIN_LOCATION_START.x && tmpV.x <= RuinsLoaction.MIND_RUIN_LOCATION_END.x
                    && tmpV.z >= RuinsLoaction.MIND_RUIN_LOCATION_START.z && tmpV.z <= RuinsLoaction.MIND_RUIN_LOCATION_END.z) {
                    mindFlag = true;
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
            if (mindFlag) {
                let area = (_a = this.ruin_mindBoss.getBossSpawnArea()) === null || _a === void 0 ? void 0 : _a.center();
                if (area && !PomBossBarrier.find(area))
                    this.getExDimension(MinecraftDimensionTypes.theEnd).spawnParticle("wb:ruin_mind_boss_center_par", area);
            }
        }).delay(20 * 12);
        this.ruinFuncLooper.start();
        //末影人清理
        this.getEvents().events.entityCreate.subscribe(e => {
            if (e.entity.typeId === MinecraftEntityTypes.enderman.id) {
                if (e.entity.dimension === this.getDimension(MinecraftDimensionTypes.theEnd) &&
                    (isInProtectArea(e.entity.location))) {
                    e.entity.triggerEvent("minecraft:despawn");
                }
            }
        });
        //实体监听
        this.addEntityController(PomMagicStoneBoss.typeId, PomMagicStoneBoss);
        this.addEntityController(PomHeadlessGuardBoss.typeId, PomHeadlessGuardBoss);
        this.addEntityController(PomAncientStoneBoss.typeId, PomAncientStoneBoss);
        this.addEntityController(PomIntentionsBoss1.typeId, PomIntentionsBoss1);
        this.addEntityController(PomIntentionsBoss2.typeId, PomIntentionsBoss2);
        this.addEntityController(PomIntentionsBoss3.typeId, PomIntentionsBoss3);
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
    time(e) {
        new ExEnvironment().print();
    }
    damageShow(e) {
        damageShow(ExDimension.getInstance(e.hurtEntity.dimension), e.damage, e.hurtEntity.location);
    }
    newClient(id, player) {
        return new PomClient(this, id, player);
    }
}
__decorate([
    registerEvent("chat", (server, e) => e.message === "time"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ChatEvent]),
    __metadata("design:returntype", void 0)
], PomServer.prototype, "time", null);
__decorate([
    registerEvent("entityHurt", (server, e) => server.setting.damageShow && e.cause !== EntityDamageCause.suicide),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EntityHurtEvent]),
    __metadata("design:returntype", void 0)
], PomServer.prototype, "damageShow", null);
//# sourceMappingURL=PomServer.js.map