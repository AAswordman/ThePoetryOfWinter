import { MinecraftEntityTypes } from "@minecraft/server";
import GameControllerRuinRule from "../GameControllerRuinRule.js";
import RuinsLoaction from "../RuinsLoaction.js";
import PomDesertRuinRules from "./PomDesertRuinRules.js";
import PomMazeMapBuilder from "../PomMazeMapBuilder.js";
import Vector3 from "../../../../../modules/exmc/math/Vector3.js";
import ExErrorQueue from "../../../../../modules/exmc/server/ExErrorQueue.js";
import VarOnChangeListener from "../../../../../modules/exmc/utils/VarOnChangeListener.js";
export default class PomDesertRuinBasicRule extends GameControllerRuinRule {
    getShowMap() {
        const show = [];
        const mapSize = 8;
        const spos = this.client.exPlayer.position.sub(RuinsLoaction.DESERT_RUIN_LOCATION_START).div(16).floor();
        spos.div(mapSize, 1, mapSize).floor().scl(mapSize, 1, mapSize);
        const playerPos = this.client.exPlayer.position.sub(RuinsLoaction.DESERT_RUIN_LOCATION_START).div(16).floor();
        const spos2 = spos.clone();
        const epos = spos.clone().add(mapSize, 0, mapSize);
        const ruin = this.client.getServer().ruin_desertBoss;
        //ExGameConfig.console.warn(this.client.getServer());
        // console.warn(spos);
        // console.warn(epos);
        this.tmpA.set(this.client.getServer().ruinDesertGuardPos).sub(RuinsLoaction.DESERT_RUIN_LOCATION_START).div(16).floor();
        for (; spos.z < epos.z; spos.z++) {
            let line = [];
            for (spos.x = spos2.x; spos.x < epos.x; spos.x++) {
                const posStr = `${spos.x},${spos.y},${spos.z}`;
                if (spos.x === this.tmpA.x && spos.y === this.tmpA.y && spos.z === this.tmpA.z) {
                    line.push(PomMazeMapBuilder.CHAR_MAZE_PATH_GUARD);
                }
                else if (spos.x === playerPos.x && spos.z === playerPos.z) {
                    const view = this.game.player.getViewDirection();
                    if (ruin.isInRoom(posStr)) {
                        if (view.x > view.z) {
                            if (Math.abs(view.x) > Math.abs(view.z))
                                line.push(PomMazeMapBuilder.CHAR_MAZE_ROOM_ARROW_LEFT);
                            else
                                line.push(PomMazeMapBuilder.CHAR_MAZE_ROOM_ARROW_DOWN);
                        }
                        else {
                            if (Math.abs(view.x) > Math.abs(view.z))
                                line.push(PomMazeMapBuilder.CHAR_MAZE_ROOM_ARROW_RIGHT);
                            else
                                line.push(PomMazeMapBuilder.CHAR_MAZE_ROOM_ARROW_UP);
                        }
                    }
                    else if (ruin.isOnPath(posStr)) {
                        if (view.x > view.z) {
                            if (Math.abs(view.x) > Math.abs(view.z))
                                line.push(PomMazeMapBuilder.CHAR_MAZE_PATH_ARROW_LEFT);
                            else
                                line.push(PomMazeMapBuilder.CHAR_MAZE_PATH_ARROW_DOWN);
                        }
                        else {
                            if (Math.abs(view.x) > Math.abs(view.z))
                                line.push(PomMazeMapBuilder.CHAR_MAZE_PATH_ARROW_RIGHT);
                            else
                                line.push(PomMazeMapBuilder.CHAR_MAZE_PATH_ARROW_UP);
                        }
                    }
                    else {
                        line.push(PomMazeMapBuilder.CHAR_MAZE_EMPTY);
                    }
                }
                else if (ruin.isInRoom(posStr)) {
                    if (this.desertRoomCounter.has(posStr)) {
                        line.push(PomMazeMapBuilder.CHAR_MAZE_ROOM_PASSED);
                    }
                    else {
                        line.push(PomMazeMapBuilder.CHAR_MAZE_ROOM);
                    }
                }
                else if (ruin.isOnPath(posStr)) {
                    line.push(PomMazeMapBuilder.CHAR_MAZE_PATH);
                }
                else {
                    line.push(PomMazeMapBuilder.CHAR_MAZE_EMPTY);
                }
            }
            show.unshift(line.reverse().join(""));
        }
        return show;
    }
    constructor(game) {
        super(game);
        this.tmpA = new Vector3();
        const addHealthListener = (damage) => {
            this.client.magicSystem.additionHealth -= damage / 2;
            if (this.client.magicSystem.additionHealth <= 0) {
                game.exPlayer.removeHealth(game, 999);
            }
        };
        this.desertRuinRules = new PomDesertRuinRules(game);
        this.inRuinsListener = new VarOnChangeListener((v) => {
            if (!v) {
                this.client.magicSystem.additionHealth = 40;
                this.client.talentSystem.hasBeenDamaged.removeMonitor(addHealthListener);
                this.desertRoomCounter.clear();
                this.desertRuinRules.clear();
                this.client.magicSystem.deleteActionbarPass("desertRuinMap");
            }
            else {
                this.desertRuinRules.init();
                if (!this.client.talentSystem.hasBeenDamaged.hasMonitor(addHealthListener)) {
                    this.client.talentSystem.hasBeenDamaged.addMonitor(addHealthListener);
                }
                this.client.magicSystem.deleteActionbarPass("desertRuinMap");
            }
        }, false);
        this.desertRoomCounter = new Map();
        this.desertRuinScoreJudge = new VarOnChangeListener((v, last) => {
            var _a, _b;
            const ruin = this.client.getServer().ruin_desertBoss;
            if (last && ruin.isInRoom(last)) {
                let lastPos = last.split(",").map(e => parseInt(e));
                let lastVec = new Vector3(lastPos[0], lastPos[1], lastPos[2]).scl(16).add(RuinsLoaction.DESERT_RUIN_LOCATION_START).add(8, 8, 8);
                const tmpV = new Vector3();
                const unclearList = [];
                for (let e of game.getDimension().getEntities({
                    excludeTypes: ["minecraft:item", MinecraftEntityTypes.player.id],
                    maxDistance: 16,
                    location: lastVec
                })) {
                    if (lastVec.clone().sub(tmpV.set(e.location)).abs().toArray().every(i => i <= 8)) {
                        unclearList.push(e.id);
                        this.client.magicSystem.additionHealth -= 1;
                        e.kill();
                    }
                }
                if (unclearList.length !== 0)
                    game.sayTo("§b[遗迹]§f" + unclearList.length + "个实体未清理, 已扣除 " + unclearList.length + " 点血量");
            }
            if (this.client.getServer().ruin_desertBoss.isInRoom(v)) {
                this.desertRoomCounter.set(v, ((_a = this.desertRoomCounter.get(v)) !== null && _a !== void 0 ? _a : 0) + 1);
                let point = Math.max(-2, Math.floor(Math.random() * (5 + (game.player.location.y - RuinsLoaction.DESERT_RUIN_LOCATION_START.y) / 12 - 2 * ((_b = this.desertRoomCounter.get(v)) !== null && _b !== void 0 ? _b : 0))));
                game.sayTo("§b[遗迹]§f第" + this.desertRoomCounter.get(v) + "次进入，随机点数：" + point);
                let fpoint = point;
                while (fpoint >= 1) {
                    game.sayTo("§b[遗迹]§f获得规则 §b§l" + game.getLang()["ruinDesertCmd_" + this.desertRuinRules.randomAddRule()]);
                    game.sayTo("§b[遗迹]§f获得规则 §b§l" + game.getLang()["ruinDesertCmd_" + this.desertRuinRules.randomAddRule()]);
                    fpoint--;
                }
                this.client.magicSystem.additionHealth += point;
                if (Math.random() < 0.7) {
                    this.desertRuinRules.show().then(e => {
                        let r = Math.floor(10 * Math.random());
                        let pos = game.exPlayer.position.div(16).floor().scl(16).add(8, 4, 8);
                        switch (r) {
                            case 0:
                                break;
                            case 1:
                                while (point + 1 > 0) {
                                    game.getExDimension().spawnEntity("wb:magic_book", pos);
                                    game.getExDimension().spawnEntity("wb:magic_book", pos);
                                    point -= 2;
                                }
                                break;
                            case 2:
                                while (point + 1 > 0) {
                                    game.getExDimension().spawnEntity("wb:desert_insect", pos);
                                    game.getExDimension().spawnEntity("wb:magic_book", pos);
                                    game.getExDimension().spawnEntity("wb:magic_book", pos);
                                    game.getExDimension().spawnEntity("wb:desert_chester_normal", pos);
                                    point -= 2;
                                }
                                break;
                            case 3:
                                while (point + 1 > 0) {
                                    game.getExDimension().spawnEntity("wb:desert_chester_high", pos);
                                    game.getExDimension().spawnEntity("wb:desert_skeleton", pos);
                                    game.getExDimension().spawnEntity("wb:desert_skeleton", pos);
                                    game.getExDimension().spawnEntity("wb:desert_skeleton", pos);
                                    game.getExDimension().spawnEntity("wb:desert_skeleton", pos);
                                    point -= 2;
                                }
                                break;
                            case 4:
                                while (point + 1 > 0) {
                                    game.getExDimension().spawnEntity("dec:stone_golem", pos);
                                    game.getExDimension().spawnEntity("dec:stone_golem", pos);
                                    game.getExDimension().spawnEntity("wb:desert_chester_high", pos);
                                    point -= 4;
                                }
                                break;
                            case 5:
                                while (point + 1 > 0) {
                                    game.getExDimension().spawnEntity("dec:stone_golem", pos);
                                    game.getExDimension().spawnEntity("dec:stone_golem", pos);
                                    game.getExDimension().spawnEntity("wb:desert_chester_high", pos);
                                    point -= 4;
                                }
                                break;
                            case 6:
                                while (point + 1 > 0) {
                                    game.getExDimension().spawnEntity("wb:desert_zombie", pos);
                                    game.getExDimension().spawnEntity("wb:desert_zombie", pos);
                                    game.getExDimension().spawnEntity("wb:desert_skeleton", pos);
                                    point -= 2;
                                }
                                break;
                            default:
                                break;
                        }
                    }).catch(e => ExErrorQueue.throwError(e));
                }
            }
        }, "0,0,0");
    }
}
//# sourceMappingURL=PomDesertRuinBasicRule.js.map