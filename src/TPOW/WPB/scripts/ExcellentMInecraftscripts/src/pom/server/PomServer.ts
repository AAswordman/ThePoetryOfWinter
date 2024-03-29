import { ChatSendBeforeEvent, DimensionType, DimensionTypes, Entity, EntityDamageCause, EntityHurtAfterEvent, GameMode, MinecraftDimensionTypes, MolangVariableMap, Player, world } from '@minecraft/server';
import ExConfig from "../../modules/exmc/ExConfig.js";
import Vector3, { IVector3 } from '../../modules/exmc/math/Vector3.js';
import ExDimension from "../../modules/exmc/server/ExDimension.js";
import ExGameServer from "../../modules/exmc/server/ExGameServer.js";
import ExTickQueue from "../../modules/exmc/server/ExTickQueue.js";
import ExBlockStructure from '../../modules/exmc/server/block/structure/ExBlockStructure.js';
import ExBlockStructureNormal from '../../modules/exmc/server/block/structure/ExBlockStructureNormal.js';
import ExEntity from '../../modules/exmc/server/entity/ExEntity.js';
import ExPlayer from '../../modules/exmc/server/entity/ExPlayer.js';
import { Objective } from "../../modules/exmc/server/entity/ExScoresManager.js";
import ExEnvironment from '../../modules/exmc/server/env/ExEnvironment.js';
import { registerEvent } from '../../modules/exmc/server/events/eventDecoratorFactory.js';
import { ExEventNames } from '../../modules/exmc/server/events/events.js';
import ExSystem from '../../modules/exmc/utils/ExSystem.js';
import Random from "../../modules/exmc/utils/Random.js";
import TickDelayTask from '../../modules/exmc/utils/TickDelayTask.js';
import TimeLoopTask from "../../modules/exmc/utils/TimeLoopTask.js";
import { falseIfError } from '../../modules/exmc/utils/tool.js';
import PomClient from "./PomClient.js";
import GlobalSettings from "./cache/GlobalSettings.js";
import PomAncientStoneBoss from './entities/PomAncientStoneBoss.js';
import PomFakePlayer from './entities/PomFakePlayer.js';
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
import { ExBlockArea } from '../../modules/exmc/server/block/ExBlockArea.js';
import BlockPartitioning from './map/BlockPartitioning.js';
import ExGame from '../../modules/exmc/server/ExGame.js';
import TerritoryData from './data/TerritoryData.js';
// import * as b from "brain.js";

export default class PomServer extends ExGameServer {

    //实体清理
    entityCleaner!: TimeLoopTask;
    entityCleanerLooper!: TimeLoopTask;
    tpsListener!: TimeLoopTask;
    tps = 20;
    private _mtps = 20;

    clearEntityNumUpdate!: TimeLoopTask;
    entityCleanerLeastNum!: number;
    entityCleanerStrength!: number;
    entityCleanerDelay!: number;

    ruinCleaner!: TickDelayTask;
    ruinFuncLooper!: TickDelayTask;
    //遗迹沙漠
    ruin_desertBoss!: PomDesertBossRuin;
    portal_desertBoss!: ExBlockStructure;
    ruinDesertGuardPos!: Vector3;
    ruinDesertGuardRule!: TickDelayTask;

    //遗迹石块
    ruin_stoneBoss!: PomStoneBossRuin;
    portal_stoneBoss!: ExBlockStructure;

    //遗迹洞穴
    ruin_caveBoss!: PomCaveBossRuin;
    portal_caveBoss!: ExBlockStructure;

    //遗迹远古
    ruin_ancientBoss!: PomAncientBossRuin;
    portal_ancientBoss!: ExBlockStructure;

    //遗迹内心
    ruin_mindBoss!: PomMindBossRuin;
    portal_mindBoss!: ExBlockStructure;


    //虚拟玩家
    fakeplayers: PomFakePlayer[] = [];

    //全局变量
    setting!: GlobalSettings;
    cache!: ExPropCache<PomServerData>;
    looper!: TickDelayTask;
    data!: PomServerData;

    //领域
    territoryParLooper?: TickDelayTask;
    territoryData?: BlockPartitioning<TerritoryData>;


    sayTo(str: string) {
        this.getExDimension(MinecraftDimensionTypes.theEnd).command.run(`tellraw @a {"rawtext": [{"text": "${str}"}]}`);
    }

    constructor(config: ExConfig) {
        super(config);
        this.initGlobalVars();
        this.initEntityCleaner();
        this.initRuinsGeneration();
        this.initRuinsRules();
        this.initBossControllers();
        this.initTerritory();
    }
    private initTerritory() {
        this.territoryData = new BlockPartitioning<TerritoryData>(this.data.territoryData);
        this.territoryParLooper = ExSystem.tickTask(() => {
            let terAreas: [ExBlockArea, number][] = [];
            let terSet = new Set<string>();
            for (let p of this.getExPlayers()) {
                for (let area of this.territoryData!.getAreasByNearby(p.position, 2)) {
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
                && (<PomClient>this.findClientByPlayer(e.player)).territorySystem.isLocationLevelToPlayer(new Vector3(e.block))) {
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
                && (<PomClient>this.findClientByPlayer(e.source)).territorySystem.isLocationLevelToPlayer(new Vector3(e.block))) {
                e.cancel = true;
            }

        });
        this.getEvents().events.beforeExplosion.subscribe(e => {
            if (e.source && e.dimension === this.getDimension(MinecraftDimensionTypes.overworld) && (
                this.territoryData!.getAreaIn(new Vector3(e.source.location), 2)
            )) {
                e.cancel = true;
                const s = e.source.location;
                ExGame.run(() => this.getExDimension(MinecraftDimensionTypes.overworld).spawnParticle("dec:damp_explosion_particle", s));
            }
        });
        this.getEvents().events.beforeItemUseOn.subscribe(e => {
            if (e.source.dimension === this.getDimension(MinecraftDimensionTypes.overworld) && (
                (<PomClient>this.findClientByPlayer(e.source)).territorySystem.isLocationLevelToPlayer(new Vector3(e.block))
            )) {
                if (itemCanChangeBlock(e.itemStack.typeId)) {
                    e.cancel = true;
                };
            }
        });
        this.getEvents().events.beforePlayerInteractWithBlock.subscribe(e => {
            if (e.player.dimension === this.getDimension(MinecraftDimensionTypes.overworld) && (
                (<PomClient>this.findClientByPlayer(e.player)).territorySystem.isLocationLevelToPlayer(new Vector3(e.block))
            )) {
                e.cancel = true;
            }
        });
    }
    private initBossControllers() {
        //实体监听
        this.addEntityController(PomMagicStoneBoss.typeId, PomMagicStoneBoss);
        this.addEntityController(PomHeadlessGuardBoss.typeId, PomHeadlessGuardBoss);
        this.addEntityController(PomAncientStoneBoss.typeId, PomAncientStoneBoss);
        this.addEntityController(PomIntentionsBoss1.typeId, PomIntentionsBoss1);
        this.addEntityController(PomIntentionsBoss2.typeId, PomIntentionsBoss2);
        this.addEntityController(PomIntentionsBoss3.typeId, PomIntentionsBoss3);
    }

    private initRuinsRules() {
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
            if (e.source && e.dimension === this.getDimension(MinecraftDimensionTypes.theEnd) && (
                RuinsLoaction.isInProtectArea(e.source.location)
            )) {
                e.setImpactedBlocks([]);
                const s = e.source.location;
                ExGame.run(() => this.getExDimension(MinecraftDimensionTypes.theEnd).spawnParticle("dec:damp_explosion_particle", s));
            }
        });
        this.getEvents().events.beforeItemUse.subscribe(e => {
            if (e.source.dimension === this.getDimension(MinecraftDimensionTypes.theEnd) && (
                RuinsLoaction.isInProtectArea(e.source.location)
            )) {
                if (itemCanChangeBlock(e.itemStack.typeId)) {
                    e.cancel = true;
                };
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
                        } else {
                            this.ruinDesertGuardPos.add(tmpP.scl(0.2));
                        }
                    }
                }
            }

            ruin_desert_count += 1;
        }).delay(1);


        //遗迹功能总监听
        this.ruinFuncLooper = ExSystem.tickTask(() => {
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
            } else {
                this.ruinDesertGuardRule.start();
                this.ruinCleaner.start();
            }
            if (mindFlag) {
                let area = this.ruin_mindBoss.getBossSpawnArea()?.center();
                if (area && !PomBossBarrier.find(area))
                    this.getExDimension(MinecraftDimensionTypes.theEnd).spawnParticle("wb:ruin_mind_boss_center_par",
                        area);
            }
        }).delay(20 * 12);
        this.ruinFuncLooper.start();

        //末影人清理
        this.getEvents().events.afterEntitySpawn.subscribe(e => {
            if (!falseIfError(() => (e.entity.typeId))) return;
            if (e.entity.typeId === MinecraftEntityTypes.Enderman) {
                if (e.entity.dimension === this.getDimension(MinecraftDimensionTypes.theEnd) &&
                    (
                        RuinsLoaction.isInProtectArea(e.entity.location)
                    )) {
                    e.entity.remove();

                }
            }
        });
    }

    private initRuinsGeneration() {

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
            this.ruin_desertBoss.init(RuinsLoaction.DESERT_RUIN_LOCATION_START.x, RuinsLoaction.DESERT_RUIN_LOCATION_START.y,
                RuinsLoaction.DESERT_RUIN_LOCATION_START.z,
                this.getDimension(MinecraftDimensionTypes.theEnd));
            this.ruin_desertBoss.dispose();

            this.ruin_stoneBoss.init(RuinsLoaction.STONE_RUIN_LOCATION_START.x, RuinsLoaction.STONE_RUIN_LOCATION_START.y,
                RuinsLoaction.STONE_RUIN_LOCATION_START.z,
                this.getDimension(MinecraftDimensionTypes.theEnd));
            this.ruin_stoneBoss.dispose();

            this.ruin_caveBoss.init(RuinsLoaction.CAVE_RUIN_LOCATION_START.x, RuinsLoaction.CAVE_RUIN_LOCATION_START.y,
                RuinsLoaction.CAVE_RUIN_LOCATION_START.z,
                this.getDimension(MinecraftDimensionTypes.theEnd));
            this.ruin_caveBoss.dispose();

            this.ruin_ancientBoss.init(RuinsLoaction.ANCIENT_RUIN_LOCATION_START.x, RuinsLoaction.ANCIENT_RUIN_LOCATION_START.y,
                RuinsLoaction.ANCIENT_RUIN_LOCATION_START.z,
                this.getDimension(MinecraftDimensionTypes.theEnd));
            this.ruin_ancientBoss.dispose();

            this.ruin_mindBoss.init(RuinsLoaction.MIND_RUIN_LOCATION_START.x, RuinsLoaction.MIND_RUIN_LOCATION_START.y,
                RuinsLoaction.MIND_RUIN_LOCATION_START.z,
                this.getDimension(MinecraftDimensionTypes.theEnd));
            this.ruin_ancientBoss.dispose();
        });
    }

    private initEntityCleaner() {
        (this.clearEntityNumUpdate = new TimeLoopTask(this.getEvents(), () => {
            this.updateClearEntityNum();
        }).delay(10000)).start();

        this.updateClearEntityNum();


        this.entityCleaner = new TimeLoopTask(this.getEvents(), () => {
            if (!this.entityCleanerLooper.isStarted()) {
                let entities: Entity[] = (Array.from(ExDimension.getInstance(this.getDimension(MinecraftDimensionTypes.overworld)).getEntities())
                    .concat(Array.from(ExDimension.getInstance(this.getDimension(MinecraftDimensionTypes.theEnd)).getEntities()))
                    .concat(Array.from(ExDimension.getInstance(this.getDimension(MinecraftDimensionTypes.nether)).getEntities())));

                if (entities.length > this.entityCleanerLeastNum) {
                    cleanTimes = 11;
                    this.entityCleanerLooper.start();
                }
            }
        }).delay(8000);

        let cleanTimes = 11;
        this.entityCleanerLooper = new TimeLoopTask(this.getEvents(), () => {
            for (let c of this.getClients()) {
                (c as PomClient).magicSystem.setActionbarByPass("cleaner", ["实体清理: " + cleanTimes]);
            }
            if (cleanTimes === 11) {
                if (this.setting.entityShowMsg) this.say("Prepare for entities cleaning...");
            } else if (cleanTimes === 0) {
                this.clearEntity();
                for (let c of this.getClients()) {
                    (c as PomClient).magicSystem.deleteActionbarPass("cleaner");
                }
                this.entityCleanerLooper.stop();
            } else if (cleanTimes <= 3) {
                if (this.setting.entityShowMsg) this.say(`Remaining ${cleanTimes}s for entities cleaning`);
            }

            cleanTimes -= 1;
        }).delay(1000);
        this.upDateEntityCleaner();


        let ticks = 0;
        this.tpsListener = new TimeLoopTask(this.getEvents(), () => {
            this.tps = ticks;

            let liner = (this.tps - this._mtps) > 0 ? this.entityCleanerStrength : 11 - this.entityCleanerStrength;
            this._mtps = this._mtps * (liner - 1) / liner + this.tps / liner;

            //ExGameConfig.console.log("tps：" + this.tps, "myps : " + this._mtps,"delay:"+this.entityCleanerDelay ** (this._mtps));
            this.entityCleaner.delay(this.entityCleanerDelay ** (this._mtps));
            ticks = 0;
        }).delay(1000);


        this.getEvents().exEvents.tick.subscribe(e => {
            ticks++;
        });

        this.tpsListener.start();
    }

    private initGlobalVars() {
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
            this.data.territoryData = {}
        }
        if (!this.data.socialListGlobalMap) {
            this.data.socialListGlobalMap = {}
        }
        if (!this.data.redemptionCode) {
            this.data.redemptionCode = {}
        }

        // console.warn(JSON.stringify(this.data));
    }

    private clearEntity() {
        let entities: Entity[] = Array.from(ExDimension.getInstance(this.getDimension(MinecraftDimensionTypes.overworld)).getEntities())
            .concat(Array.from(ExDimension.getInstance(this.getDimension(MinecraftDimensionTypes.theEnd)).getEntities()))
            .concat(Array.from(ExDimension.getInstance(this.getDimension(MinecraftDimensionTypes.nether)).getEntities()));

        //ExGameConfig.console.log("当前实体数：" + entities.length);
        let map = new Map<MinecraftEntityTypes, number>();
        entities.forEach(e => {
            if (e?.typeId == undefined) return;
            map.set(e.typeId as MinecraftEntityTypes, (map.get(e.typeId as MinecraftEntityTypes) ?? 0) + 1);
        });

        let max: [number, string] = [0, ""];
        map.forEach((v, k) => {
            if (v > max[0] && [MinecraftEntityTypes.Player, MinecraftEntityTypes.Villager, MinecraftEntityTypes.VillagerV2].indexOf(k) === -1) {
                max[0] = v;
                max[1] = k;
            }
        });

        if (entities.length > this.entityCleanerLeastNum) {

            if (this.setting.entityShowMsg) this.say("Clear Entity Type：" + max[1]);
            if (this.setting.entityShowMsg) this.say("Clear Entity Num：" + max[0]);

            entities.forEach(e => {
                if (!e || !e.typeId || e.typeId !== max[1]) return;
                if (e.typeId === "minecraft:item" && e.getViewDirection().y !== 0) return;
                if (e.typeId === "minecraft:item" && e.getComponent("minecraft:item")?.itemStack.typeId === MinecraftItemTypes.ShulkerBox) return;
                // if (e.typeId === "minecraft:item" && e.getViewDirection().y === 0){
                //     e.runCommand('tag @s[name="Shulker Box"] add ShulkerBox')
                //     if (e.hasTag('ShulkerBox')) {
                //         return;
                //     }
                // }

                //if (e.nameTag) return;
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
        } else {
            this.entityCleaner.stop();
        }
    }

    // fakePlayerSpawnLoc = new BlockLocation(0, 0, 0);
    // @registerEvent<PomServer>("chat", (server, e: ChatEvent) => e.message === "create")
    // createFakePlayer(e: ChatEvent) {
    //     this.fakePlayerSpawnLoc = new BlockLocation(e.sender.location.x, e.sender.location.y, e.sender.location.z);
    //     ExPlayer.getInstance(e.sender).command.run("gametest run Pom:fakeplayer")
    // }
    @registerEvent<PomServer>(ExEventNames.beforeChatSend, (server, e: ChatSendBeforeEvent) => e.message === "time")
    time(e: ChatSendBeforeEvent) {
        new ExEnvironment().print();
    }

    @registerEvent<PomServer>(ExEventNames.afterEntityHurt, (server, e: EntityHurtAfterEvent) => server.setting.damageShow && e.damageSource.cause !== EntityDamageCause.suicide)
    damageShow(e: EntityHurtAfterEvent) {
        if (!e.hurtEntity.isValid()) return;
        if (!(e.damageSource.damagingEntity instanceof Player)) damageShow(this.getExDimension(e.hurtEntity.dimension.id), e.damage, e.hurtEntity.location);
    }


    override newClient(id: string, player: Player): PomClient {
        return new PomClient(this, id, player);
    }
}