import { Entity, MinecraftDimensionTypes, MinecraftEntityTypes, Player, MinecraftBlockTypes, Location } from '@minecraft/server';
import ExConfig from "../../modules/exmc/ExConfig.js";
import { Objective } from "../../modules/exmc/server/entity/ExScoresManager.js";
import ExDimension from "../../modules/exmc/server/ExDimension.js";
import ExGameConfig from "../../modules/exmc/server/ExGameConfig.js";
import ExGameServer from "../../modules/exmc/server/ExGameServer.js";
import ExTickQueue from "../../modules/exmc/server/ExTickQueue.js";
import Random from "../../modules/exmc/utils/Random.js";
import TimeLoopTask from "../../modules/exmc/utils/TimeLoopTask.js";
import GlobalSettings from "./cache/GlobalSettings.js";
import PomDesertBossRuin from "./func/ruins/PomDesertBossRuin.js";
import RuinsLoaction from "./func/ruins/RuinsLoaction.js";
import PomClient from "./PomClient.js";
import ExBlockStructure from '../../modules/exmc/server/block/structure/ExBlockStructure.js';
import ExBlockStructureNormal from '../../modules/exmc/server/block/structure/ExBlockStructureNormal.js';
import TickDelayTask from '../../modules/exmc/utils/TickDelayTask.js';
import Vector3 from '../../modules/exmc/math/Vector3.js';
import { ExBlockArea } from '../../modules/exmc/server/block/ExBlockArea';
import ExGameVector3 from '../../modules/exmc/server/math/ExGameVector3.js';


export default class PomServer extends ExGameServer {
    setting;
    entityCleaner: TimeLoopTask;
    tpsListener: TimeLoopTask;
    tps = 20;
    private _mtps = 20;

    clearEntityNumUpdate: TimeLoopTask;
    entityCleanerLeastNum!: number;
    entityCleanerStrength!: number;
    entityCleanerDelay!: number;

    ruin_desertBoss: PomDesertBossRuin;
    portal_desertBoss: ExBlockStructure;
    ruinFuncLooper: TickDelayTask;
    desertRuinRandomRules;

    sayTo(str: string) {
        this.getExDimension(MinecraftDimensionTypes.theEnd).runCommand(`tellraw @a {"rawtext": [{"text": "${str}"}]}`);
    }

    constructor(config: ExConfig) {
        super(config);
        this.setting = new GlobalSettings(new Objective("wpsetting"));

        (this.clearEntityNumUpdate = new TimeLoopTask(this.getEvents(), () => {
            this.updateClearEntityNum();
        }).delay(10000)).start();

        this.updateClearEntityNum();

        this.entityCleaner = new TimeLoopTask(this.getEvents(), () => {
            let entities: Entity[] = Array.from(ExDimension.getInstance(this.getDimension(MinecraftDimensionTypes.overworld)).getEntities())
                .concat(Array.from(ExDimension.getInstance(this.getDimension(MinecraftDimensionTypes.theEnd)).getEntities()))
                .concat(Array.from(ExDimension.getInstance(this.getDimension(MinecraftDimensionTypes.nether)).getEntities()));

            //ExGameConfig.console.log("当前实体数：" + entities.length);
            let map = new Map<string, number>();
            entities.forEach(e => {
                if (e?.typeId == undefined) return;
                map.set(e.typeId, (map.get(e.typeId) ?? 0) + 1);
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
                    if (!e || !e.typeId || e.typeId !== max[1]) return;
                    if (e.typeId === "minecraft:item" && e.viewVector.y !== 0) return;
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
            this.entityCleaner.delay(this.entityCleanerDelay ** (this._mtps));
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
                ]])
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
            this.ruin_desertBoss.init(RuinsLoaction.DESERT_RUIN_LOCATION_START.x, RuinsLoaction.DESERT_RUIN_LOCATION_START.y,
                RuinsLoaction.DESERT_RUIN_LOCATION_START.z,
                this.getDimension(MinecraftDimensionTypes.theEnd));
            this.ruin_desertBoss.dispose();
        });

        const tmpV = new Vector3();
        let desertEntitiesNum = 0;
        const upDateMonster = () => {
            let entities = Array.from(this.getExDimension(MinecraftDimensionTypes.theEnd).getEntities({
                location: ExGameVector3.getLocation(RuinsLoaction.DESERT_RUIN_LOCATION_CENTER),
                maxDistance: 400
            }));
            for(let e of entities) {
                if(e.id === "minecraft:item" && e.viewVector.y === 0){
                    e.kill();
                }
            }
            desertEntitiesNum = entities.length;
        }
        this.desertRuinRandomRules = new TimeLoopTask(this.getEvents(), ()=>{
            upDateMonster();
        }).delay(60000);
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
                        if (desertEntitiesNum < 80) {
                            //summon monster
                            let vec = ExBlockArea.randomPoint(this.ruin_desertBoss.getPathArea(), 4);
                            this.getExDimension(MinecraftDimensionTypes.theEnd).spawnEntity("wb:desert_skeleton", vec);
                            if (Math.random() > 0.5) this.getExDimension(MinecraftDimensionTypes.theEnd).spawnEntity("wb:desert_skeleton", vec);

                            vec = ExBlockArea.randomPoint(this.ruin_desertBoss.getPathArea(), 4);
                            if (Math.random() > 0.85) this.getExDimension(MinecraftDimensionTypes.theEnd).spawnEntity("wb:desert_chester_normal", vec);
                            vec = ExBlockArea.randomPoint(this.ruin_desertBoss.getAirMonsterSpawnArea(), 4);
                            if (Math.random() > 0.7) this.getExDimension(MinecraftDimensionTypes.theEnd).spawnEntity("wb:desert_chester_high", vec);

                            vec = ExBlockArea.randomPoint(this.ruin_desertBoss.getAirPathArea(), 4);
                            if (Math.random() > 0.4) this.getExDimension(MinecraftDimensionTypes.theEnd).spawnEntity("dec:stone_golem", vec);
                            vec = ExBlockArea.randomPoint(this.ruin_desertBoss.getPathArea(), 4);
                            if (Math.random() > 0.7) this.getExDimension(MinecraftDimensionTypes.theEnd).spawnEntity("dec:stone_golem", vec);
                            desertEntitiesNum += 6;
                        }
                    }
                }
            }

            if (!desertFlag) {
                this.desertRuinRandomRules.stop();
            } else {
                this.desertRuinRandomRules.start();
            }
        }).delay(20 * 12);
        this.ruinFuncLooper.start();

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
    override newClient(id: string, player: Player): PomClient {
        return new PomClient(this, id, player);
    }
}