import { MinecraftDimensionTypes, MinecraftEffectTypes } from '@minecraft/server';
import DecClient from "./DecClient.js";
import ExPlayer from '../../modules/exmc/server/entity/ExPlayer.js';
import { Objective } from '../../modules/exmc/server/entity/ExScoresManager.js';
import ExEntity from '../../modules/exmc/server/entity/ExEntity.js';
import commandAnalysis from '../../modules/exmc/utils/commandAnalysis.js';
import ExGameServer from '../../modules/exmc/server/ExGameServer.js';
import DecGlobal from './DecGlobal.js';
import Vector3 from '../../modules/exmc/math/Vector3.js';
import { DecEverlastingWinterGhastBoss1, DecEverlastingWinterGhastBoss2 } from './entities/DecEverlastingWinterGhastBoss.js';
import { DecCommonBossLastStage } from './entities/DecCommonBossLastStage.js';
import VarOnChangeListener from '../../modules/exmc/utils/VarOnChangeListener.js';
import ExEnvironment from '../../modules/exmc/server/env/ExEnvironment.js';
import { DecHostOfDeepBoss1, DecHostOfDeepBoss2, DecHostOfDeepBoss3 } from './entities/DecHostOfDeepBoss.js';
import GZIPUtil from '../../modules/exmc/utils/GZIPUtil.js';
import IStructureSettle from './data/structure/IStructureSettle.js';
import IStructureDriver from './data/structure/IStructureDriver.js';
import ExTaskRunner from '../../modules/exmc/server/ExTaskRunner.js';
import { decTreeStructure } from './data/structure/decTreeStructure.js';
export default class DecServer extends ExGameServer {
    constructor(config) {
        super(config);
        this.tmpV = new Vector3();
        //test
        this.compress = [""];
        this.i_inviolable = new Objective("i_inviolable").create("i_inviolable");
        this.i_damp = new Objective("i_damp").create("i_damp");
        this.i_soft = new Objective("i_soft").create("i_soft");
        //new Objective("harmless").create("harmless");
        this.nightEventListener = new VarOnChangeListener(e => {
            if (e) {
                // is night
                this.getExDimension(MinecraftDimensionTypes.overworld).command.run([
                    "scoreboard players random NightRandom global 1 100",
                    "scoreboard players set IsDay global 0",
                    "scoreboard players set IsNight global 1"
                ]);
            }
            else {
                this.getExDimension(MinecraftDimensionTypes.overworld).command.run([
                    "scoreboard players set IsDay global 1",
                    "scoreboard players set IsNight global 0",
                    "scoreboard players set NightRandom global 0",
                    "scoreboard players set @a night_event 0",
                    "fog @a remove \"night_event\""
                ]);
            }
        }, false);
        this.getEvents().events.beforeChatSend.subscribe(e => {
            var _a, _b;
            let cmdRunner = this.getExDimension(MinecraftDimensionTypes.overworld);
            let sender = ExPlayer.getInstance(e.sender);
            if (e.message.startsWith(">/")) {
                let cmds = commandAnalysis(e.message.substring(2));
                let errMsg = "";
                switch (cmds[0]) {
                    case "help": {
                        sender.command.run("function help");
                        break;
                    }
                    case "creators": {
                        if (DecGlobal.isDec()) {
                            sender.command.run("function test/creator_list");
                        }
                        break;
                    }
                    case "diemode": {
                        if (cmds[1] === "open") {
                            sender.command.run("function diemode/open");
                        }
                        else if (cmds[1] === "test") {
                            sender.command.run("function diemode/test");
                        }
                        else {
                            errMsg = "Invalid command " + cmds[1];
                        }
                        break;
                    }
                    case "magic": {
                        if (DecGlobal.isDec()) {
                            if (cmds[1] === "display") {
                                if (e.sender.isOp()) {
                                    if (cmds[2] === "true") {
                                        cmdRunner.command.run("function magic/display_on");
                                    }
                                    else if (cmds[2] === "false") {
                                        cmdRunner.command.run("function magic/display_off");
                                    }
                                    else {
                                        errMsg = "Invalid command " + cmds[2];
                                    }
                                }
                                else {
                                    sender.command.run("tellraw @s { \"rawtext\" : [ { \"translate\" : \"text.dec:command_fail.name\" } ] }");
                                }
                            }
                            else {
                                errMsg = "Invalid command " + cmds[1];
                            }
                        }
                        break;
                    }
                    case "_save": {
                        if (cmds.length < 7)
                            return;
                        let start = new Vector3(Math.floor(parseFloat(cmds[1])), Math.floor(parseFloat(cmds[2])), Math.floor(parseFloat(cmds[3])));
                        let end = new Vector3(Math.floor(parseFloat(cmds[4])), Math.floor(parseFloat(cmds[5])), Math.floor(parseFloat(cmds[6]))).add(1);
                        let data = [];
                        let task = new ExTaskRunner();
                        const mthis = this;
                        task.run((function* () {
                            var _a;
                            for (let i of new IStructureDriver().save(mthis.getExDimension(MinecraftDimensionTypes.overworld), start, end)) {
                                let res = i.toData();
                                i.dispose();
                                //console.warn(JSON.stringify(res));
                                let com = (_a = GZIPUtil.zipString(JSON.stringify(res))) !== null && _a !== void 0 ? _a : "";
                                data.push(com);
                                //console.warn(com);
                                yield true;
                            }
                        }).bind(this));
                        task.start(2, 1).then(() => {
                            this.compress = data;
                            console.warn("over");
                            // for(let i of data){
                            //     console.warn(i);
                            // }
                            console.warn(JSON.stringify(data));
                        });
                        // console.warn(GZIPUtil.unzipString(com));
                        break;
                    }
                    case "_load": {
                        let start = new Vector3(Math.floor(parseFloat(cmds[1])), Math.floor(parseFloat(cmds[2])), Math.floor(parseFloat(cmds[3])));
                        let data = new IStructureSettle();
                        let task = [];
                        for (let comp of this.compress) {
                            task.push(() => {
                                data.load(JSON.parse(GZIPUtil.unzipString(comp)));
                                data.run(this.getExDimension(MinecraftDimensionTypes.overworld), start)
                                    .then(() => {
                                    var _a;
                                    (_a = task.shift()) === null || _a === void 0 ? void 0 : _a();
                                });
                            });
                        }
                        (_a = task.shift()) === null || _a === void 0 ? void 0 : _a();
                        break;
                    }
                    case "_test": {
                        let start = new Vector3(Math.floor(parseFloat(cmds[1])), Math.floor(parseFloat(cmds[2])), Math.floor(parseFloat(cmds[3])));
                        let data = new IStructureSettle();
                        let task = [];
                        for (let comp of decTreeStructure) {
                            task.push(() => {
                                data.load(JSON.parse(GZIPUtil.unzipString(comp)));
                                data.run(this.getExDimension(MinecraftDimensionTypes.overworld), start)
                                    .then(() => {
                                    var _a;
                                    (_a = task.shift()) === null || _a === void 0 ? void 0 : _a();
                                });
                            });
                        }
                        (_b = task.shift()) === null || _b === void 0 ? void 0 : _b();
                        break;
                    }
                }
                if (errMsg.length !== 0) {
                    sender.command.run(`tellraw @s { "rawtext" : [ { "text" : "Command Error: ${errMsg}" } ] }`);
                }
                e.cancel = true;
            }
        });
        this.getEvents().events.afterBlockBreak.subscribe(e => {
            var _a;
            const entity = ExPlayer.getInstance(e.player);
            //防破坏方块 i_inviolable计分板控制
            if (entity.getScoresManager().getScore(this.i_inviolable) > 1) {
                (_a = e.dimension.getBlock(e.block.location)) === null || _a === void 0 ? void 0 : _a.setType(e.brokenBlockPermutation.type);
                let ep = ExPlayer.getInstance(e.player);
                entity.exDimension.command.run("kill @e[type=item,r=2,x=" + e.block.x + ",y=" + e.block.y + ",z=" + e.block.z + "]");
                ep.addEffect(MinecraftEffectTypes.blindness, 200, 0, true);
                ep.addEffect(MinecraftEffectTypes.darkness, 400, 0, true);
                ep.addEffect(MinecraftEffectTypes.wither, 100, 0, true);
                ep.addEffect(MinecraftEffectTypes.miningFatigue, 600, 2, true);
                ep.addEffect(MinecraftEffectTypes.hunger, 600, 1, true);
                ep.addEffect(MinecraftEffectTypes.nausea, 200, 0, true);
                entity.command.run("tellraw @s { \"rawtext\" : [ { \"translate\" : \"text.dec:i_inviolable.name\" } ] }");
            }
        });
        this.getEvents().events.beforeExplosion.subscribe(e => {
            if (e.source) {
                const entity = ExEntity.getInstance(e.source);
                //防爆 i_inviolable计分板控制
                if (entity.getScoresManager().getScore(this.i_damp) > 0) {
                    entity.exDimension.spawnParticle("dec:damp_explosion_particle", e.source.location);
                    e.cancel = true;
                }
            }
        });
        this.getEvents().events.beforeItemUseOn.subscribe(e => {
            const entity = ExEntity.getInstance(e.source);
            //防放方块
            if (entity.getScoresManager().getScore(this.i_soft) > 0 && e.itemStack.typeId != "dec:iron_key" && e.itemStack.typeId != "dec:frozen_power") {
                e.cancel = true;
            }
        });
        this.getEvents().exEvents.tick.subscribe(e => {
            //诅咒时间减少
            this.getExDimension(MinecraftDimensionTypes.overworld).command.run([
                "scoreboard players remove @e[scores={i_inviolable=1..}] i_inviolable 1",
                "scoreboard players remove @e[scores={i_damp=1..}] i_damp 1",
                "scoreboard players remove @e[scores={i_soft=1..}] i_soft 1",
                "scoreboard players remove @e[scores={harmless=1..}] harmless 1"
            ]);
            if (e.currentTick % 100 === 0) {
                //夜晚事件
                this.nightEventListener.upDate(new ExEnvironment().isNight());
            }
        });
        //实体监听器，用于播放bgm、完成任务判断
        this.addEntityController("dec:leaves_golem", DecCommonBossLastStage);
        this.addEntityController("dec:king_of_pillager", DecCommonBossLastStage);
        this.addEntityController("dec:abyssal_controller", DecCommonBossLastStage);
        this.addEntityController("dec:predators", DecCommonBossLastStage);
        this.addEntityController("dec:enchant_illager_2", DecCommonBossLastStage);
        this.addEntityController("dec:escaped_soul_entity", DecCommonBossLastStage);
        this.addEntityController("dec:host_of_deep", DecHostOfDeepBoss1);
        this.addEntityController("dec:host_of_deep_1", DecHostOfDeepBoss2);
        this.addEntityController("dec:host_of_deep_2", DecHostOfDeepBoss3);
        this.addEntityController("dec:ash_knight", DecCommonBossLastStage);
        this.addEntityController("dec:everlasting_winter_ghast", DecEverlastingWinterGhastBoss1);
        this.addEntityController("dec:everlasting_winter_ghast_1", DecEverlastingWinterGhastBoss2);
    }
    newClient(id, player) {
        return new DecClient(this, id, player);
    }
}
//# sourceMappingURL=DecServer.js.map