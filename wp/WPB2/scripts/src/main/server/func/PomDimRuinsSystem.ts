import { BlockLocation, MinecraftBlockTypes, MinecraftDimensionTypes, Block, MinecraftEntityTypes } from '@minecraft/server';
import ExBlockStructureNormal from "../../../modules/exmc/server/block/structure/ExBlockStructureNormal.js";
import GameController from "./GameController.js";
import RuinsLoaction from "./ruins/RuinsLoaction.js";
import { ExBlockArea } from '../../../modules/exmc/server/block/ExBlockArea.js';
import Vector3 from '../../../modules/exmc/math/Vector3.js';
import ExGameVector3 from '../../../modules/exmc/server/math/ExGameVector3.js';
import VarOnChangeListener from '../../../modules/exmc/utils/VarOnChangeListener.js';
import ExMessageAlert from '../../../modules/exmc/server/ui/ExMessageAlert.js';
import Random from '../../../modules/exmc/utils/Random.js';
import { getEnumKeys } from '../../../modules/exmc/utils/enumUtil.js';
import PomDesertRuinRules from './ruins/desert/PomDesertRuinRules.js';
import ExErrorQueue, { to } from '../../../modules/exmc/server/ExErrorQueue.js';
import PomMazeMapBuilder from './ruins/PomMazeMapBuilder.js';

export default class PomDimRuinsSystem extends GameController {
    portalMatching = new ExBlockStructureNormal().setStructure([["XXX"]]);
    onJoin(): void {
        const tmpV = new Vector3();
        const tmpA = new Vector3();
        const tmpB = new Vector3();


        const addHealthListener = (damage: number) => {
            this.client.magicSystem.additionHealth -= damage;
            if (this.client.magicSystem.additionHealth <= 0) {
                this.exPlayer.removeHealth(this, 999);
            }
        }

        const desertRuinRules = new PomDesertRuinRules(this);
        const inRuinsListener = new VarOnChangeListener((v) => {
            if (!v) {
                this.client.magicSystem.additionHealth = 40;
                if (this.client.talentSystem.hasBeenDamaged.indexOf(addHealthListener) !== -1) {
                    this.client.talentSystem.hasBeenDamaged.splice(this.client.talentSystem.hasBeenDamaged.indexOf(addHealthListener), 1);
                }
                desertRoomCounter.clear();
                desertRuinRules.clear();
                this.client.magicSystem.anotherShow = [];

            } else {
                desertRuinRules.init();
                if (this.client.talentSystem.hasBeenDamaged.indexOf(addHealthListener) === -1) {
                    this.client.talentSystem.hasBeenDamaged.push(addHealthListener);
                }
            }
        }, false);


        const desertRuinBackJudge = new VarOnChangeListener((v) => {
            if (v) {
                new ExMessageAlert().title("返回").body("是否返回主世界?")
                    .button1("否", () => {

                    })
                    .button2("是", () => {
                        let v = this.data.dimBackPoint;
                        if (!v) {
                            v = new Vector3(0, 255, 0);
                        }
                        this.exPlayer.setPosition(v, this.getDimension(MinecraftDimensionTypes.overworld));
                    })
                    .show(this.player);
            }
        }, false);
        const desertRoomCounter = new Map<string, number>();
        const desertRuinScoreJudge = new VarOnChangeListener((v, last) => {
            const show = [];
            const mapSize = 8;
            const spos = this.client.exPlayer.getPosition().sub(RuinsLoaction.DESERT_RUIN_LOCATION_START).div(16).floor();
            spos.div(mapSize, 1, mapSize).floor().scl(mapSize, 1, mapSize);
            const playerPos = this.client.exPlayer.getPosition().sub(RuinsLoaction.DESERT_RUIN_LOCATION_START).div(16).floor();
            const spos2 = spos.clone();
            const epos = spos.clone().add(mapSize, 0, mapSize);
            const ruin = this.client.getServer().ruin_desertBoss;

            // console.warn(spos);
            // console.warn(epos);
            for (; spos.z < epos.z; spos.z++) {
                let line: string[] = [];
                for (spos.x = spos2.x; spos.x < epos.x; spos.x++) {
                    const posStr = `${spos.x},${spos.y},${spos.z}`;
                    if (spos.x === playerPos.x && spos.z === playerPos.z) {
                        const view = this.player.viewVector;
                        if (ruin.isInRoom(posStr)) {
                            if (view.x > view.z) {
                                if (Math.abs(view.x) > Math.abs(view.z)) line.push(PomMazeMapBuilder.CHAR_MAZE_ROOM_ARROW_LEFT);
                                else line.push(PomMazeMapBuilder.CHAR_MAZE_ROOM_ARROW_DOWN);
                            } else {
                                if (Math.abs(view.x) > Math.abs(view.z)) line.push(PomMazeMapBuilder.CHAR_MAZE_ROOM_ARROW_RIGHT);
                                else line.push(PomMazeMapBuilder.CHAR_MAZE_ROOM_ARROW_UP);
                            }
                        } else if (ruin.isOnPath(posStr)) {
                            if (view.x > view.z) {
                                if (Math.abs(view.x) > Math.abs(view.z)) line.push(PomMazeMapBuilder.CHAR_MAZE_PATH_ARROW_LEFT);
                                else line.push(PomMazeMapBuilder.CHAR_MAZE_PATH_ARROW_DOWN);
                            } else {
                                if (Math.abs(view.x) > Math.abs(view.z)) line.push(PomMazeMapBuilder.CHAR_MAZE_PATH_ARROW_RIGHT);
                                else line.push(PomMazeMapBuilder.CHAR_MAZE_PATH_ARROW_UP);
                            }
                        } else {
                            line.push(PomMazeMapBuilder.CHAR_MAZE_EMPTY);
                        }
                    } else if (ruin.isInRoom(posStr)) {
                        if (desertRoomCounter.has(posStr)) {
                            line.push(PomMazeMapBuilder.CHAR_MAZE_ROOM_PASSED);
                        } else {
                            line.push(PomMazeMapBuilder.CHAR_MAZE_ROOM);
                        }
                    } else if (ruin.isOnPath(posStr)) {
                        line.push(PomMazeMapBuilder.CHAR_MAZE_PATH);
                    } else {
                        line.push(PomMazeMapBuilder.CHAR_MAZE_EMPTY);
                    }
                }
                show.unshift(line.reverse().join(""));
            }

            this.client.magicSystem.anotherShow = show;

            if (last && ruin.isInRoom(last)) {
                let lastPos = last.split(",").map(e => parseInt(e));
                let lastVec = new Vector3(lastPos[0], lastPos[1], lastPos[2]).scl(16).add(RuinsLoaction.DESERT_RUIN_LOCATION_START).add(8, 8, 8);
                const tmpV = new Vector3();
                const unclearList: string[] = [];
                for (let e of this.getDimension().getEntities({
                    excludeTypes: ["minecraft:item", MinecraftEntityTypes.player.id],
                    maxDistance: 16,
                    location: ExGameVector3.getLocation(lastVec)
                })) {
                    if (lastVec.clone().sub(tmpV.set(e.location)).abs().toArray().every(i => i <= 8)) {
                        unclearList.push(e.id);

                        this.client.magicSystem.additionHealth -= 1;
                        e.kill();
                    }
                }
                if (unclearList.length !== 0) this.sayTo("§b[遗迹]§f" + unclearList.length + "个实体未清理, 已扣除 " + unclearList.length + " 点血量");
            }
            if (this.client.getServer().ruin_desertBoss.isInRoom(v)) {
                desertRoomCounter.set(v, (desertRoomCounter.get(v) ?? 0) + 1);
                let point = Math.max(-2, Math.floor(Math.random() * (3 + (this.player.location.y - RuinsLoaction.DESERT_RUIN_LOCATION_START.y) / 10 - 2 * (desertRoomCounter.get(v) ?? 0))));
                this.sayTo("§b[遗迹]§f第" + desertRoomCounter.get(v) + "次进入，随机点数：" + point);
                let fpoint = point;
                while (fpoint >= 1) {
                    this.sayTo("§b[遗迹]§f获得规则 §b§l" + (<any>this.getLang())["ruinDesertCmd_" + desertRuinRules.randomAddRule()]);
                    fpoint--;
                }

                this.client.magicSystem.additionHealth += point;
                if (Math.random() < 0.7) {
                    desertRuinRules.show().then(e => {
                        let r = Math.floor(10 * Math.random());
                        let pos = this.exPlayer.getPosition().div(16).floor().scl(16).add(8, 4, 8);
                        switch (r) {
                            case 0:
                                break;
                            case 1:
                                while (point + 1 > 0) {
                                    this.getExDimension().spawnEntity("wb:magic_book", pos);
                                    this.getExDimension().spawnEntity("wb:magic_book", pos);
                                    point--;
                                }
                                break;
                            case 2:
                                while (point + 1 > 0) {
                                    this.getExDimension().spawnEntity("wb:desert_insect", pos);
                                    this.getExDimension().spawnEntity("wb:magic_book", pos);
                                    this.getExDimension().spawnEntity("wb:magic_book", pos);
                                    this.getExDimension().spawnEntity("wb:desert_chester_normal", pos);
                                    point--;
                                }
                                break;
                            case 3:
                                while (point + 1 > 0) {
                                    this.getExDimension().spawnEntity("wb:desert_chester_high", pos);
                                    this.getExDimension().spawnEntity("wb:desert_skeleton", pos);
                                    this.getExDimension().spawnEntity("wb:desert_skeleton", pos);
                                    this.getExDimension().spawnEntity("wb:desert_skeleton", pos);
                                    this.getExDimension().spawnEntity("wb:desert_skeleton", pos);
                                    point -= 1;
                                }
                                break;
                            case 4:
                                while (point + 1 > 0) {
                                    this.getExDimension().spawnEntity("dec:stone_golem", pos);
                                    this.getExDimension().spawnEntity("dec:stone_golem", pos);
                                    this.getExDimension().spawnEntity("wb:desert_chester_high", pos);
                                    point -= 2;
                                }
                                break;
                            case 5:
                                while (point + 1 > 0) {
                                    this.getExDimension().spawnEntity("dec:stone_golem", pos);
                                    this.getExDimension().spawnEntity("dec:stone_golem", pos);
                                    this.getExDimension().spawnEntity("wb:desert_chester_high", pos);
                                    point -= 2;
                                }
                                break;
                            case 6:
                                while (point + 1 > 0) {
                                    this.getExDimension().spawnEntity("wb:desert_zombie", pos);
                                    this.getExDimension().spawnEntity("wb:desert_zombie", pos);
                                    this.getExDimension().spawnEntity("wb:desert_skeleton", pos);
                                    point -= 1;
                                }
                                break;
                            default:
                                break;
                        }
                    }).catch(e => ExErrorQueue.throwError(e));

                }
            }
        }, "0,0,0");
        this.getEvents().exEvents.onLongTick.subscribe(event => {
            if (event.currentTick % 4 !== 0) return;
            //1s 1 tick
            let isInRuin = false;


            tmpV.set(this.player.location);
            let loc = ExGameVector3.getBlockLocation(tmpV);
            loc.y -= 1;
            let block;
            try {
                block = this.getDimension().getBlock(loc);
            } catch (e) { }
            if (block?.typeId === "wb:portal_desertboss") {
                //TODO: tp to end
                this.data.dimBackPoint = new Vector3(this.player.location).add(3, 2, 3);
                this.client.cache.save();
                this.exPlayer.setPosition(ExBlockArea.randomPoint(this.client.getServer().ruin_desertBoss.getPlayerSpawnArea(), 4),
                    this.getDimension(MinecraftDimensionTypes.theEnd));


                if (((this.globalSettings.ruinsExsitsData >> RuinsLoaction.DESERT_RUIN_NUM) & 1) == 0) {
                    //generate
                    this.client.getServer().ruin_desertBoss.generate();
                    this.globalSettings.ruinsExsitsData = this.globalSettings.ruinsExsitsData | (1 << (RuinsLoaction.DESERT_RUIN_NUM));
                }
            }
            tmpA.set(RuinsLoaction.DESERT_RUIN_LOCATION_CENTER).sub(32, 4, 32);
            tmpB.set(RuinsLoaction.DESERT_RUIN_LOCATION_CENTER).add(32, 32, 32);

            desertRuinBackJudge.upDate(
                tmpA.x <= tmpV.x && tmpA.z <= tmpV.z &&
                tmpV.x <= tmpB.x && tmpV.z <= tmpB.z &&
                tmpA.y <= tmpV.y && tmpV.y <= tmpB.y
                && this.player.dimension.id === MinecraftDimensionTypes.theEnd
            );

            if (tmpV.x >= RuinsLoaction.DESERT_RUIN_LOCATION_START.x && tmpV.x <= RuinsLoaction.DESERT_RUIN_LOCATION_END.x
                && tmpV.z >= RuinsLoaction.DESERT_RUIN_LOCATION_START.z && tmpV.z <= RuinsLoaction.DESERT_RUIN_LOCATION_END.z) {
                if (tmpV.y < RuinsLoaction.DESERT_RUIN_LOCATION_START.y - 2) {
                    tmpV.y = RuinsLoaction.DESERT_RUIN_LOCATION_START.y + 4;
                    this.exPlayer.setPosition(tmpV);
                }

                if (3 <= tmpV.x % 16 && tmpV.x % 16 <= 13 && 3 <= tmpV.z % 16 && tmpV.z % 16 <= 13)
                    desertRuinScoreJudge.upDate(`${Math.floor((tmpV.x - RuinsLoaction.DESERT_RUIN_LOCATION_START.x) / 16)},${Math.floor((tmpV.y - RuinsLoaction.DESERT_RUIN_LOCATION_START.y) / 16)},${Math.floor((tmpV.z - RuinsLoaction.DESERT_RUIN_LOCATION_START.z) / 16)}`);
                isInRuin = true;

            }

            this.client.magicSystem.additionHealthShow = isInRuin;
            inRuinsListener.upDate(isInRuin);

        });



        // this.getEvents().exEvents.itemOnHandChange.subscribe((e) => {
        //     this.sayTo(e.afterItem?.typeId + "");
        // });
        this.getEvents().exEvents.onceItemUseOn.subscribe(e => {
            let block: Block | undefined;
            try {
                block = this.getDimension().getBlock(e.blockLocation);
            } catch (e) { }
            if (e.item.typeId === "wb:mineral_magic_equipment") {
                const p = this.client.getServer().portal_desertBoss;
                if (block?.typeId === "wb:block_magic_equipment") {
                    const v2 = new Vector3(e.blockLocation).add(2, 2, 2);
                    const v1 = new Vector3(e.blockLocation).sub(2, 0, 2);
                    let m = p.setArea(new ExBlockArea(v1, v2, true))
                        .setDimension(this.getDimension(MinecraftDimensionTypes.overworld))
                        .find();
                    if (m) {
                        p.analysis({
                            X: MinecraftBlockTypes.sandstone.id,
                            W: "wb:portal_desertboss",
                            Y: "wb:portal_desertboss",
                            A: MinecraftBlockTypes.air.id,
                            S: MinecraftBlockTypes.stoneBlockSlab2.id,
                            C: MinecraftBlockTypes.cobblestoneWall.id
                        })
                            .putStructure(m);
                        const parLoc = new Vector3(e.blockLocation).add(0.5, 0.5, 0.5);
                        this.getExDimension().spawnParticle("wb:portal_desertboss_par1", parLoc);
                        this.getExDimension().spawnParticle("wb:portal_desertboss_par2", parLoc);

                    }
                }

            }
        });
    }

    onLoaded(): void {

    }

    onLeave(): void {

    }

}