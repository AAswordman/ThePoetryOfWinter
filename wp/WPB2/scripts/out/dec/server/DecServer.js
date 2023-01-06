import { MinecraftDimensionTypes, MinecraftEffectTypes } from '@minecraft/server';
import ExGameServer from "../../modules/exmc/server/ExGameServer.js";
import DecClient from "./DecClient.js";
import ExPlayer from '../../modules/exmc/server/entity/ExPlayer.js';
import MathUtil from '../../modules/exmc/math/MathUtil.js';
import { ActionFormData } from '@minecraft/server-ui';
import { tasks } from './helper/Task.js';
import { Objective } from '../../modules/exmc/server/entity/ExScoresManager.js';
import ExEntity from '../../modules/exmc/server/entity/ExEntity.js';
import commandAnalysis from '../../modules/exmc/utils/commandAnalysis.js';
import format from '../../modules/exmc/utils/format.js';
function taskTranToNum(t) {
    let task_arr = ["Ao", "Jf", "Sk", "Ch", "Om", "Bs", "Hd", "Oa", "Gx", "Xe"];
    let n = "";
    while (t.length >= 2) {
        let msg = t.slice(0, 2);
        n = n + (task_arr.filter((e) => e === msg)).toString();
        t = t.slice(3);
    }
    return n;
}
function numTranToTask(n) {
    let r = "";
    let task_arr = ["Ao", "Jf", "Sk", "Ch", "Om", "Bs", "Hd", "Oa", "Gx", "Xe"];
    for (let l = 0; l <= n.toString().length - 1; l++) {
        r = r + task_arr.slice(parseInt(n.toString().charAt(l)), parseInt(n.toString().charAt(l)) + 1) + " ";
    }
    while (r.charAt(-1) == " ") {
        r = r.slice(0, r.length - 1);
    }
    return r;
}
function equAddTag(tar, head, chest, legs, boots, tag) {
    tar.runCommandAsync("execute if entity @s[hasitem={location=slot.armor.head,item=" + head + "}] if entity @s[hasitem={location=slot.armor.chest,item=" + chest + "}] if entity @s[hasitem={location=slot.armor.legs,item=" + legs + "}] if entity @s[hasitem={location=slot.armor.feet,item=" + boots + "}] run tag @s add " + tag);
}
function taskUi(p, i) {
    let ui = new ActionFormData();
    ui = ui.title("text.dec:task_choose_title.name");
    ui = ui.body("text.dec:task_choose_body.name");
    let lor = i.getLore();
    lor.forEach(l => {
        ui = ui.button(l);
    });
    ui.show(p).then(s => {
        if (s.selection != undefined) {
            let ch_t = lor[s.selection];
            let ch_n = taskTranToNum(ch_t);
            //p.runCommandAsync("say "+ch_n)
            taskUiChoose(p, ch_n);
        }
    });
}
function taskUiChoose(p, id) {
    let ui_ch = new ActionFormData();
    ui_ch.button("text.dec:task_complete_button.name");
    let title = "";
    let body = "";
    let commands = [];
    if (tasks.findIndex(t => t.id === id) !== -1) {
        return;
    }
    ui_ch = ui_ch.title(title);
    ui_ch = ui_ch.body(body);
    ui_ch.show(p).then(s => {
        if (s.selection == 0) {
            ExPlayer.getInstance(p).command.run(commands);
        }
    });
}
export default class DecServer extends ExGameServer {
    constructor(config) {
        super(config);
        this.i_inviolable = new Objective("i_inviolable").create("i_inviolable");
        this.i_damp = new Objective("i_damp").create("i_damp");
        this.i_soft = new Objective("i_soft").create("i_soft");
        //new Objective("harmless").create("harmless");
        this.getEvents().events.beforeChat.subscribe(e => {
            let cmdRunner = this.getExDimension(MinecraftDimensionTypes.overworld);
            let sender = ExPlayer.getInstance(e.sender);
            if (e.message.startsWith(">/")) {
                let cmds = commandAnalysis(e.message.substring(2));
                let errMsg = "";
                switch (cmds[0]) {
                    case "help":
                        cmdRunner.command.run("function help");
                        break;
                    case "diemode":
                        if (cmds[1] === "open") {
                            cmdRunner.command.run("function diemode/open");
                        }
                        else if (cmds[1] === "test") {
                            cmdRunner.command.run("function diemode/test");
                        }
                        else {
                            errMsg = "Invalid command " + cmds[1];
                        }
                        break;
                    case "magic":
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
                        break;
                }
                if (errMsg.length !== 0) {
                    sender.command.run(`tellraw @s { "rawtext" : [ { "text" : "Command Error: ${errMsg}" } ] }`);
                }
                e.cancel = true;
            }
        });
        this.getEvents().events.blockBreak.subscribe(e => {
            const entity = ExPlayer.getInstance(e.player);
            //防破坏方块 i_inviolable计分板控制
            if (entity.getScoresManager().getScore(this.i_inviolable) > 1) {
                e.dimension.getBlock(e.block.location).setType(e.brokenBlockPermutation.type);
                e.dimension.runCommandAsync("kill @e[type=item,r=2,x=" + e.block.x + ",y=" + e.block.y + ",z=" + e.block.z + "]");
                e.player.addEffect(MinecraftEffectTypes.nausea, 200, 0, true);
                e.player.addEffect(MinecraftEffectTypes.blindness, 200, 0, true);
                e.player.addEffect(MinecraftEffectTypes.darkness, 400, 0, true);
                e.player.addEffect(MinecraftEffectTypes.wither, 100, 0, true);
                e.player.addEffect(MinecraftEffectTypes.miningFatigue, 600, 2, true);
                e.player.addEffect(MinecraftEffectTypes.hunger, 600, 1, true);
                e.player.runCommandAsync("tellraw @s { \"rawtext\" : [ { \"translate\" : \"text.dec:i_inviolable.name\" } ] }");
            }
        });
        this.getEvents().events.beforeExplosion.subscribe(e => {
            const entity = ExEntity.getInstance(e.source);
            //防爆 i_inviolable计分板控制
            if (entity.getScoresManager().getScore(this.i_damp) > 0) {
                e.dimension.runCommandAsync(format("particle dec:damp_explosion_particle {0} {1} {2}", e.source.location.x, e.source.location.y, e.source.location.z));
                e.cancel = true;
            }
        });
        this.getEvents().events.beforeItemUseOn.subscribe(e => {
            const entity = ExEntity.getInstance(e.source);
            //防放方块
            if (entity.getScoresManager().getScore(this.i_soft) > 0 && e.item.typeId != "dec:iron_key" && e.item.typeId != "dec:frozen_power") {
                e.cancel = true;
            }
        });
        this.getEvents().events.entityHurt.subscribe(e => {
            let hurtEntity = ExEntity.getInstance(e.hurtEntity);
            let ra = MathUtil.randomInteger(1, 100);
            //鲁伯特套装受伤效果
            if (1 <= ra && ra <= 20) {
                equAddTag(e.hurtEntity, "dec:rupert_helmet", "dec:rupert_chestplate", "rupert_leggings", "rupert_boots", "rupert_armor_skill_1");
                hurtEntity.command.run([
                    "effect @s[tag=rupert_armor_skill_1] regeneration 10",
                    "effect @s[tag=rupert_armor_skill_1] speed 5",
                    "execute if entity @s[tag=rupert_armor_skill_1] run particle dec:tear_from_rupert ~~1~",
                    "execute if entity @s[tag=rupert_armor_skill_1] run particle dec:tear_from_rupert ~~1~",
                    "execute if entity @s[tag=rupert_armor_skill_1] run particle dec:tear_from_rupert ~~1~",
                    "execute if entity @s[tag=rupert_armor_skill_1] run particle dec:tear_from_rupert ~~1~",
                    "execute if entity @s[tag=rupert_armor_skill_1] run particle dec:tear_from_rupert ~~1~",
                    "tag @s[tag=rupert_armor_skill_1] remove rupert_armor_skill_1"
                ]);
            }
            //岩浆套受伤效果
            equAddTag(e.hurtEntity, "dec:lava_helmet", "dec:lava_chestplate", "dec:lava_leggings", "dec:lava_boots", "lava_armor_skill");
            hurtEntity.command.run([
                "execute if entity @s[tag=lava_armor_skill] run particle dec:fire_spurt_particle ~~1~",
                "effect @s[tag=lava_armor_skill] fire_resistance 4",
                "tag @s[tag=lava_armor_skill] remove lava_armor_skill"
            ]);
            //哭泣套受伤效果
            equAddTag(e.hurtEntity, "dec:crying_helmet", "dec:crying_chestplate", "dec:crying_leggings", "dec:crying_boots", "crying_armor_skill");
            if (ra < 1) {
            }
            else if (1 <= ra && ra <= 10) {
                hurtEntity.command.run("effect @s[tag=crying_armor_skill] weakness 5");
            }
            else if (ra <= 20) {
                hurtEntity.command.run("effect @s[tag=crying_armor_skill] slowness 5");
            }
            else if (ra <= 30) {
                hurtEntity.command.run("effect @s[tag=crying_armor_skill] blindness 5");
            }
            else if (ra <= 40) {
                hurtEntity.command.run("effect @s[tag=crying_armor_skill] nausea 7");
            }
            e.hurtEntity.runCommandAsync("tag @s[tag=crying_armor_skill] remove crying_armor_skill");
            //永冬套受伤效果
            if (1 <= ra && ra <= 12) {
                equAddTag(e.hurtEntity, "dec:everlasting_winter_helmet", "dec:everlasting_winter_chestplate", "dec:everlasting_winter_leggings", "dec:everlasting_winter_boots", "everlasting_winter_skill");
                hurtEntity.command.run([
                    "execute if entity @s[tag=everlasting_winter_skill] run effect @e[r=5,tag=!everlasting_winter_skill] slowness 3 1",
                    "effect @s[tag=everlasting_winter_skill] health_boost 30 0",
                    "execute if entity @s[tag=everlasting_winter_skill] run particle dec:everlasting_winter_spurt_particle ~~~",
                    "tag @s[tag=everlasting_winter_skill] remove everlasting_winter_skill"
                ]);
            }
        });
        this.getEvents().events.tick.subscribe(e => {
            //诅咒时间减少
            this.getExDimension(MinecraftDimensionTypes.overworld).command.run([
                "scoreboard players remove @e[scores={i_inviolable=1..}] i_inviolable 1",
                "scoreboard players remove @e[scores={i_damp=1..}] i_damp 1",
                "scoreboard players remove @e[scores={i_soft=1..}] i_soft 1",
                "scoreboard players remove @e[scores={harmless=1..}] harmless 1"
            ]);
            for (const p of this.getPlayers()) {
                const ep = ExPlayer.getInstance(p);
                //蓝魔法卷轴
                let bag = ep.getBag();
                const itemOnHand = bag.getItemOnHand();
                if (itemOnHand) {
                    if (itemOnHand.typeId == "dec:magic_scroll_blue" && itemOnHand.amount == 1 && itemOnHand.getLore().length == 0) {
                        let t_n = MathUtil.randomInteger(1, 3);
                        let c_n = itemOnHand;
                        let lor = [];
                        for (let i = 0; i < t_n; i++) {
                            //lor.push(numTranToTask(randonNumber(0, 9)) + numTranToTask(randonNumber(0, 9)) + numTranToTask(randonNumber(0, 9)))
                            lor.push("Ao Ao " + numTranToTask(MathUtil.randomInteger(0, 9)));
                        }
                        c_n.setLore(lor);
                        bag.setItemOnHand(c_n);
                    }
                }
                //潜行获得tag is_sneaking
                if (p.isSneaking) {
                    p.addTag("is_sneaking");
                }
                else {
                    p.removeTag("is_sneaking");
                }
                //根据维度添加tag
                if (p.dimension.id == "minecraft:overworld") {
                    p.addTag("dOverworld");
                    p.removeTag("dNether");
                    p.removeTag("dTheEnd");
                }
                else if (p.dimension.id == "minecraft:nether") {
                    p.addTag("dNether");
                    p.removeTag("dOverworld");
                    p.removeTag("dTheEnd");
                    p.runCommandAsync("fog @a remove \"night_event\"");
                }
                else if (p.dimension.id == "minecraft:the_end") {
                    p.addTag("dTheEnd");
                    p.removeTag("dNether");
                    p.removeTag("dOverworld");
                    p.runCommandAsync("fog @a remove \"night_event\"");
                }
                if (e.currentTick % 20 == 0) {
                    //紫水晶套装效果
                    equAddTag(p, "dec:amethyst_helmet", "dec:amethyst_chestplate", "dec:amethyst_leggings", "dec:amethyst_boots", "amethyst_armor_skill");
                    ep.command.run([
                        "execute if entity @s[tag=amethyst_armor_skill] run function armor/amethyst_armor",
                        "tag @s[tag=amethyst_armor_skill] remove amethyst_armor_skill"
                    ]);
                }
                if (e.currentTick % 40 == 0) {
                    equAddTag(p, "dec:rupert_helmet", "dec:rupert_chestplate", "dec:rupert_leggings", "dec:rupert_boots", "rupert_armor_skill");
                    ep.command.run([
                        //鲁伯特套装效果
                        "execute if entity @s[tag=rupert_armor_skill] run particle dec:tear_from_rupert ~~1~",
                        "tag @s[tag=rupert_armor_skill] remove rupert_armor_skill"
                    ]);
                    //海龟套效果
                    if (p.isSneaking) {
                        equAddTag(p, "minecraft:turtle_helmet", "dec:turtle_chestplate", "dec:turtle_leggings", "dec:turtle_boots", "turtle_armor_skill_b");
                        ep.command.run([
                            "execute if entity @s[hasitem={location=slot.weapon.mainhand,item=dec:turtle_sword},tag=turtle_armor_skill_b] run tag @s add turtle_armor_skill",
                            "effect @s[tag=turtle_armor_skill] slowness 5 5",
                            "effect @s[tag=turtle_armor_skill] resistance 2 3",
                            "effect @s[tag=turtle_armor_skill] weakness 2 50",
                            "tag @s[tag=turtle_armor_skill] remove turtle_armor_skill",
                            "tag @s[tag=turtle_armor_skill_b] remove turtle_armor_skill_b"
                        ]);
                    }
                }
                if (e.currentTick % 100 == 0) {
                    //木叶套装效果
                    equAddTag(p, "dec:wood_helmet", "dec:wood_chestplate", "dec:wood_leggings", "dec:wood_boots", "wood_armor_skill");
                    ep.command.run([
                        "scoreboard players add @s[scores={magicpoint=..15},tag=wood_armor_skill] magicpoint 1",
                        "execute if entity @s[tag=wood_armor_skill,scores={magicpoint=..15}] run particle dec:wood_armor_magic_increase_particle ~~~",
                        "tag @s[tag=wood_armor_skill] remove wood_armor_skill"
                    ]);
                }
                /*if (p.getItemCooldown("village_portal") > 10) {
                    p.startItemCooldown("village_portal",p.getItemCooldown("village_portal")-10)
                }*/
            }
        });
        this.getEvents().events.itemUse.subscribe(e => {
            //魔法纸张
            if (e.item.typeId == "dec:magic_scroll_blue") {
                taskUi(e.source, e.item);
            }
        });
    }
    newClient(id, player) {
        return new DecClient(this, id, player);
    }
}
//# sourceMappingURL=DecServer.js.map