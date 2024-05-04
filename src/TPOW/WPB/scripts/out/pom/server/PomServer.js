var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChatSendBeforeEvent, EntityDamageCause, EntityHurtAfterEvent, GameMode, MinecraftDimensionTypes, MolangVariableMap, Player } from '@minecraft/server';
import Vector3 from '../../modules/exmc/math/Vector3.js';
import ExDimension from "../../modules/exmc/server/ExDimension.js";
import ExGameServer from "../../modules/exmc/server/ExGameServer.js";
import ExTickQueue from "../../modules/exmc/server/ExTickQueue.js";
import ExBlockStructureNormal from '../../modules/exmc/server/block/structure/ExBlockStructureNormal.js';
import ExEntity from '../../modules/exmc/server/entity/ExEntity.js';
import ExPlayer from '../../modules/exmc/server/entity/ExPlayer.js';
import { Objective } from "../../modules/exmc/server/entity/ExScoresManager.js";
import ExEnvironment from '../../modules/exmc/server/env/ExEnvironment.js';
import { registerEvent } from '../../modules/exmc/server/events/eventDecoratorFactory.js';
import { ExEventNames } from '../../modules/exmc/server/events/events.js';
import ExSystem from '../../modules/exmc/utils/ExSystem.js';
import Random from "../../modules/exmc/utils/Random.js";
import TimeLoopTask from "../../modules/exmc/utils/TimeLoopTask.js";
import { falseIfError } from '../../modules/exmc/utils/tool.js';
import PomClient from "./PomClient.js";
import GlobalSettings from "./cache/GlobalSettings.js";
import PomAncientStoneBoss from './entities/PomAncientStoneBoss.js';
import PomHeadlessGuardBoss from './entities/PomHeadlessGuardBoss.js';
import { PomIntentionsBoss1, PomIntentionsBoss2, PomIntentionsBoss3 } from './entities/PomIntentionsBoss.js';
import PomMagicStoneBoss from './entities/PomMagicStoneBoss.js';
import PomBossBarrier from './func/barrier/PomBossBarrier.js';
import RuinsLoaction from "./func/ruins/RuinsLoaction.js";
import PomAncientBossRuin from './func/ruins/ancient/PomAncientBossRuin.js';
import PomCaveBossRuin from './func/ruins/cave/PomCaveBossRuin.js';
import PomDesertBossRuin from "./func/ruins/desert/PomDesertBossRuin.js";
import PomMindBossRuin from './func/ruins/mind/PomMindBossRuin.js';
import PomStoneBossRuin from './func/ruins/stone/PomStoneBossRuin.js';
import damageShow from './helper/damageShow.js';
import itemCanChangeBlock from './items/itemCanChangeBlock.js';
import { MinecraftBlockTypes, MinecraftEffectTypes, MinecraftEntityTypes } from '../../modules/vanilla-data/lib/index.js';
import { MinecraftItemTypes } from '../../modules/vanilla-data/lib/index.js';
import PomServerData from './cache/PomServerData.js';
import ExPropCache from '../../modules/exmc/server/storage/cache/ExPropCache.js';
import BlockPartitioning from './map/BlockPartitioning.js';
import ExGame from '../../modules/exmc/server/ExGame.js';
// import * as b from "brain.js";
export default class PomServer extends ExGameServer {
    sayTo(str) {
        this.getExDimension(MinecraftDimensionTypes.theEnd).command.run(`tellraw @a {"rawtext": [{"text": "${str}"}]}`);
    }
    constructor(config) {
        super(config);
        this.tps = 20;
        this._mtps = 20;
        //虚拟玩家
        this.fakeplayers = [];
        this.cleanTimes = 11;
        this.initGlobalVars();
        this.initEntityCleaner();
        this.initRuinsGeneration();
        this.initRuinsRules();
        this.initBossControllers();
        this.initTerritory();
    }
    initTerritory() {
        this.territoryData = new BlockPartitioning(this.data.territoryData);
        this.territoryParLooper = ExSystem.tickTask(() => {
            let terAreas = [];
            let terSet = new Set();
            for (let p of this.getExPlayers()) {
                for (let area of this.territoryData.getAreasByNearby(p.position, 2)) {
                    if (!terSet.has(area[0].center().toString())) {
                        terSet.add(area[0].center().toString());
                        terAreas.push([area[0], area[1].parIndex]);
                    }
                }
            }
            for (let area of terAreas) {
                const vars = new MolangVariableMap();
                const width = area[0].getWidth();
                vars.setFloat("index", area[1]);
                vars.setFloat("x", width.x);
                vars.setFloat("y", width.y);
                vars.setFloat("z", width.z);
                this.getExDimension(MinecraftDimensionTypes.overworld).spawnParticle("wb:territiry_barrier_par", area[0].start, vars);
                // console.warn("show " + area)
            }
        });
        this.territoryParLooper.delay(1 * 20);
        this.territoryParLooper.start();
        //领地保护
        this.getEvents().events.beforePlayerBreakBlock.subscribe(e => {
            if (e.dimension === this.getDimension(MinecraftDimensionTypes.overworld)
                && this.findClientByPlayer(e.player).territorySystem.isLocationLevelToPlayer(new Vector3(e.block))) {
                let ex = ExPlayer.getInstance(e.player);
                ExGame.run(() => {
                    ex.addEffect(MinecraftEffectTypes.Nausea, 200, 0, true);
                    ex.addEffect(MinecraftEffectTypes.Darkness, 400, 0, true);
                    ex.addEffect(MinecraftEffectTypes.Wither, 100, 0, true);
                    ex.addEffect(MinecraftEffectTypes.MiningFatigue, 600, 2, true);
                    ex.addEffect(MinecraftEffectTypes.Hunger, 600, 1, true);
                    ex.addEffect(MinecraftEffectTypes.Blindness, 200, 0, true);
                    ex.command.run("tellraw @s { \"rawtext\" : [ { \"translate\" : \"text.dec:i_inviolable.name\" } ] }");
                });
                e.cancel = true;
            }
        });
        this.getEvents().events.beforeItemUseOn.subscribe(e => {
            if (e.source.dimension === this.getDimension(MinecraftDimensionTypes.overworld)
                && this.findClientByPlayer(e.source).territorySystem.isLocationLevelToPlayer(new Vector3(e.block))) {
                e.cancel = true;
            }
        });
        this.getEvents().events.beforeExplosion.subscribe(e => {
            if (e.source && e.dimension === this.getDimension(MinecraftDimensionTypes.overworld) && (this.territoryData.getAreaIn(new Vector3(e.source.location), 2))) {
                e.cancel = true;
                const s = e.source.location;
                ExGame.run(() => this.getExDimension(MinecraftDimensionTypes.overworld).spawnParticle("dec:damp_explosion_particle", s));
            }
        });
        this.getEvents().events.beforeItemUseOn.subscribe(e => {
            if (e.source.dimension === this.getDimension(MinecraftDimensionTypes.overworld) && (this.findClientByPlayer(e.source).territorySystem.isLocationLevelToPlayer(new Vector3(e.block)))) {
                if (itemCanChangeBlock(e.itemStack.typeId)) {
                    e.cancel = true;
                }
                ;
            }
        });
        this.getEvents().events.beforePlayerInteractWithBlock.subscribe(e => {
            if (e.player.dimension === this.getDimension(MinecraftDimensionTypes.overworld) && (this.findClientByPlayer(e.player).territorySystem.isLocationLevelToPlayer(new Vector3(e.block)))) {
                e.cancel = true;
            }
        });
    }
    initBossControllers() {
        //实体监听
        this.addEntityController(PomMagicStoneBoss.typeId, PomMagicStoneBoss);
        this.addEntityController(PomHeadlessGuardBoss.typeId, PomHeadlessGuardBoss);
        this.addEntityController(PomAncientStoneBoss.typeId, PomAncientStoneBoss);
        this.addEntityController(PomIntentionsBoss1.typeId, PomIntentionsBoss1);
        this.addEntityController(PomIntentionsBoss2.typeId, PomIntentionsBoss2);
        this.addEntityController(PomIntentionsBoss3.typeId, PomIntentionsBoss3);
    }
    initRuinsRules() {
        //遗迹掉落物清理
        const upDateMonster = () => {
            let entities = this.getExDimension(MinecraftDimensionTypes.theEnd).getEntities({
                location: RuinsLoaction.DESERT_RUIN_LOCATION_CENTER,
                maxDistance: 400
            });
            // .concat(
            //     this.getExDimension(MinecraftDimensionTypes.theEnd).getEntities({
            //         location: ExGameVector3.getLocation(RuinsLoaction.STONE_RUIN_LOCATION_CENTER),
            //         maxDistance: 128
            //     })
            // );
            for (let e of entities) {
                if (e.typeId === "minecraft:item" && e.getViewDirection().y === 0) {
                    e.kill();
                }
            }
        };
        this.ruinCleaner = ExSystem.tickTask(() => {
            upDateMonster();
        }).delay(60 * 20);
        upDateMonster();
        this.ruinCleaner.start();
        //遗迹保护
        this.getEvents().events.beforePlayerBreakBlock.subscribe(e => {
            if (e.dimension === this.getDimension(MinecraftDimensionTypes.theEnd) && (RuinsLoaction.isInProtectArea(e.block))) {
                let ex = ExPlayer.getInstance(e.player);
                ExGame.run(() => {
                    ex.addEffect(MinecraftEffectTypes.Nausea, 200, 0, true);
                    ex.addEffect(MinecraftEffectTypes.Darkness, 400, 0, true);
                    ex.addEffect(MinecraftEffectTypes.Wither, 100, 0, true);
                    ex.addEffect(MinecraftEffectTypes.MiningFatigue, 600, 2, true);
                    ex.addEffect(MinecraftEffectTypes.Hunger, 600, 1, true);
                    ex.addEffect(MinecraftEffectTypes.Blindness, 200, 0, true);
                    ex.command.run("tellraw @s { \"rawtext\" : [ { \"translate\" : \"text.dec:i_inviolable.name\" } ] }");
                });
                e.cancel = true;
            }
        });
        this.getEvents().events.beforeItemUseOn.subscribe(e => {
            if (e.source.dimension === this.getDimension(MinecraftDimensionTypes.theEnd) && (RuinsLoaction.isInProtectArea(e.block))) {
                // if (e.source instanceof Player) {
                //     let ex = ExPlayer.getInstance(e.source);
                //     if (ex.getGameMode() === GameMode.creative) return;
                // }
                e.cancel = true;
            }
        });
        this.getEvents().events.beforeExplosion.subscribe(e => {
            if (e.source && e.dimension === this.getDimension(MinecraftDimensionTypes.theEnd) && (RuinsLoaction.isInProtectArea(e.source.location))) {
                e.setImpactedBlocks([]);
                const s = e.source.location;
                ExGame.run(() => this.getExDimension(MinecraftDimensionTypes.theEnd).spawnParticle("dec:damp_explosion_particle", s));
            }
        });
        this.getEvents().events.beforeItemUse.subscribe(e => {
            if (e.source.dimension === this.getDimension(MinecraftDimensionTypes.theEnd) && (RuinsLoaction.isInProtectArea(e.source.location))) {
                if (itemCanChangeBlock(e.itemStack.typeId)) {
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
        this.ruinDesertGuardRule = ExSystem.tickTask(() => {
            enddim.spawnParticle("wb:ruin_desert_guardpar", this.ruinDesertGuardPos);
            if (ruin_desert_count > 400) {
                ruin_desert_count = 0;
            }
            if (ruin_desert_count > 200) {
                let entities = enddim.getPlayers({
                    location: RuinsLoaction.DESERT_RUIN_LOCATION_CENTER,
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
        this.ruinFuncLooper = ExSystem.tickTask(() => {
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
        this.getEvents().events.afterEntitySpawn.subscribe(e => {
            if (!falseIfError(() => (e.entity.typeId)))
                return;
            if (e.entity.typeId === MinecraftEntityTypes.Enderman) {
                if (e.entity.dimension === this.getDimension(MinecraftDimensionTypes.theEnd) &&
                    (RuinsLoaction.isInProtectArea(e.entity.location))) {
                    e.entity.remove();
                }
            }
        });
    }
    initRuinsGeneration() {
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
            X: MinecraftBlockTypes.Sandstone,
            W: MinecraftBlockTypes.Water,
            Y: "wb:block_magic_equipment",
            A: MinecraftBlockTypes.Air,
            S: MinecraftBlockTypes.StoneBlockSlab2,
            C: MinecraftBlockTypes.CobblestoneWall
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
            X: MinecraftBlockTypes.Sandstone,
            W: MinecraftBlockTypes.Water,
            Y: "wb:block_energy_seal",
            S: MinecraftBlockTypes.CobblestoneWall,
            A: MinecraftBlockTypes.Air,
            B: MinecraftBlockTypes.Stonebrick
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
            X: MinecraftBlockTypes.DeepslateTiles,
            W: MinecraftBlockTypes.Water,
            Y: "wb:block_energy_boundary",
            S: MinecraftBlockTypes.Lantern,
            A: MinecraftBlockTypes.Air
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
            X: MinecraftBlockTypes.ChiseledDeepslate,
            W: MinecraftBlockTypes.Water,
            Y: "wb:block_magic_ink",
            S: MinecraftBlockTypes.VerdantFroglight,
            A: MinecraftBlockTypes.Air,
            B: MinecraftBlockTypes.MossyCobblestone
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
            W: MinecraftBlockTypes.Water,
            Y: "wb:block_senior_equipment",
            S: "wb:block_magic_barrier",
            A: MinecraftBlockTypes.Air
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
    }
    initEntityCleaner() {
        (this.clearEntityNumUpdate = new TimeLoopTask(this.getEvents(), () => {
            this.updateClearEntityNum();
        }).delay(10000)).start();
        this.updateClearEntityNum();
        this.entityCleaner = new TimeLoopTask(this.getEvents(), () => {
            if (!this.entityCleanerLooper.isStarted()) {
                let entities = (Array.from(ExDimension.getInstance(this.getDimension(MinecraftDimensionTypes.overworld)).getEntities())
                    .concat(Array.from(ExDimension.getInstance(this.getDimension(MinecraftDimensionTypes.theEnd)).getEntities()))
                    .concat(Array.from(ExDimension.getInstance(this.getDimension(MinecraftDimensionTypes.nether)).getEntities())));
                if (entities.length > this.entityCleanerLeastNum) {
                    this.cleanTimes = 11;
                    this.entityCleanerLooper.start();
                }
            }
        }).delay(8000);
        this.entityCleanerLooper = new TimeLoopTask(this.getEvents(), () => {
            for (let c of this.getClients()) {
                c.magicSystem.setActionbarByPass("cleaner", ["实体清理: " + this.cleanTimes]);
            }
            if (this.cleanTimes === 11) {
                if (this.setting.entityShowMsg)
                    this.say("Prepare for entities cleaning...");
            }
            else if (this.cleanTimes === 0) {
                this.clearEntity();
                for (let c of this.getClients()) {
                    c.magicSystem.deleteActionbarPass("cleaner");
                }
                this.entityCleanerLooper.stop();
            }
            else if (this.cleanTimes <= 3) {
                if (this.setting.entityShowMsg)
                    this.say(`Remaining ${this.cleanTimes}s for entities cleaning`);
            }
            this.cleanTimes -= 1;
        }).delay(1000);
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
        this.getEvents().exEvents.tick.subscribe(e => {
            ticks++;
        });
        this.tpsListener.start();
    }
    initGlobalVars() {
        this.setting = new GlobalSettings(new Objective("wpsetting"));
        this.setting.initializeBoolean("entityShowMsg", true);
        this.setting.initializeBoolean("damageShow", true);
        this.setting.initializeBoolean("playerTpListShowPos", true);
        this.setting.initializeBoolean("playerCanTp", true);
        this.setting.initializeBoolean("tpPointRecord", true);
        this.setting.initializeBoolean("chainMining", true);
        this.setting.initializeBoolean("nuclearBomb", true);
        this.cache = new ExPropCache(this.getDynamicPropertyManager());
        this.looper = ExSystem.tickTask(() => {
            this.cache.save();
        });
        this.looper.delay(10 * 20);
        this.looper.start();
        this.data = this.cache.get(new PomServerData());
        if (!this.data.territoryData) {
            this.data.territoryData = {};
        }
        if (!this.data.socialListGlobalMap) {
            this.data.socialListGlobalMap = {};
        }
        if (!this.data.redemptionCode) {
            this.data.redemptionCode = {};
        }
        if (!this.data.entityCleanerSetting) {
            this.data.entityCleanerSetting = {
                "acceptListById": {},
                "acceptListByTypeId": {
                    [MinecraftEntityTypes.Player]: 1,
                    [MinecraftEntityTypes.Villager]: 1,
                    [MinecraftEntityTypes.VillagerV2]: 1
                }
            };
        }
        // console.warn(JSON.stringify(this.data));
    }
    clearEntity() {
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
            if (v > max[0] && !this.data.entityCleanerSetting.acceptListByTypeId[k]) {
                max[0] = v;
                max[1] = k;
                console.warn(max);
            }
        });
        if (entities.length > this.entityCleanerLeastNum) {
            if (this.setting.entityShowMsg)
                this.say("Clear Entity Type：" + max[1]);
            if (this.setting.entityShowMsg)
                this.say("Clear Entity Num：" + max[0]);
            entities.forEach(e => {
                var _a;
                if (!e || !e.typeId || e.typeId !== max[1])
                    return;
                if (e.typeId === "minecraft:item" && e.getViewDirection().y !== 0)
                    return;
                if (e.typeId === "minecraft:item" && ((_a = e.getComponent("minecraft:item")) === null || _a === void 0 ? void 0 : _a.itemStack.typeId) === MinecraftItemTypes.ShulkerBox)
                    return;
                // if (e.typeId === "minecraft:item" && e.getViewDirection().y === 0){
                //     e.runCommand('tag @s[name="Shulker Box"] add ShulkerBox')
                //     if (e.hasTag('ShulkerBox')) {
                //         return;
                //     }
                // }
                if (this.data.entityCleanerSetting.acceptListById[e.id])
                    return;
                if (e.nameTag === "protect")
                    return;
                e.kill();
            });
        }
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
        if (!e.hurtEntity.isValid())
            return;
        if (!(e.damageSource.damagingEntity instanceof Player))
            damageShow(this.getExDimension(e.hurtEntity.dimension.id), e.damage, e.hurtEntity.location);
    }
    newClient(id, player) {
        return new PomClient(this, id, player);
    }
}
__decorate([
    registerEvent(ExEventNames.beforeChatSend, (server, e) => e.message === "time"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ChatSendBeforeEvent]),
    __metadata("design:returntype", void 0)
], PomServer.prototype, "time", null);
__decorate([
    registerEvent(ExEventNames.afterEntityHurt, (server, e) => server.setting.damageShow && e.damageSource.cause !== EntityDamageCause.suicide),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EntityHurtAfterEvent]),
    __metadata("design:returntype", void 0)
], PomServer.prototype, "damageShow", null);
//# sourceMappingURL=PomServer.js.map