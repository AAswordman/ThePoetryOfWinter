import { MinecraftDimensionTypes } from "@minecraft/server";
import ExGameClient from "../../modules/exmc/server/ExGameClient.js";
import { ArmorPlayerDec, ArmorPlayerPom } from "./items/ArmorData.js";
import MathUtil from "../../modules/exmc/math/MathUtil.js";
import Vector3 from "../../modules/exmc/math/Vector3.js";
import DecGlobal from "./DecGlobal.js";
import { DecTasks, PomTasks, numTranToTask, taskUi } from "./data/Task.js";
import ExGame from "../../modules/exmc/server/ExGame.js";
import PomServer from "../../pom/server/PomServer.js";
import GlobalScoreBoardCache from "../../modules/exmc/server/storage/cache/GlobalScoreBoardCache.js";
import { Objective } from "../../modules/exmc/server/entity/ExScoresManager.js";
import Random from "../../modules/exmc/utils/Random.js";
import { MinecraftEffectTypes } from "../../modules/vanilla-data/lib/index.js";
export default class DecClient extends ExGameClient {
    constructor(server, id, player) {
        super(server, id, player);
        this.useArmor = undefined;
        this.tmpV = new Vector3(0, 0, 0);
        this.globalscores = new GlobalScoreBoardCache(new Objective("global"));
    }
    decreaseCooldownEqu(itemCategory, tickDecrease, equipmentTest) {
        const item = this.exPlayer.getBag().itemOnOffHand;
        if (this.player.getItemCooldown(itemCategory) > 0 && (item === null || item === void 0 ? void 0 : item.typeId) == equipmentTest) {
            this.player.startItemCooldown(itemCategory, Math.max(this.player.getItemCooldown(itemCategory) - tickDecrease, 0));
        }
    }
    onJoin() {
        super.onJoin();
        //副手效果
        this.getEvents().exEvents.onLongTick.subscribe((e) => {
            if (e.currentTick % 4 === 0) {
                this.decreaseCooldownEqu('gun', 9, 'dec:archer_bullet_bag');
                this.decreaseCooldownEqu('gun', 7, 'dec:lava_bullet_bag');
                this.decreaseCooldownEqu('gun', 4, 'dec:blood_bullet_bag');
                this.decreaseCooldownEqu('gun', 3, 'dec:hunter_bullet_bag');
                this.decreaseCooldownEqu('gun', 3, 'dec:pirate_bullet_bag');
                this.decreaseCooldownEqu('gun', 2, 'dec:bullet_bag');
                this.decreaseCooldownEqu('catapult', 5, 'dec:stones_bag');
                this.decreaseCooldownEqu('catapult', 13, 'dec:archer_stones_bag');
                this.decreaseCooldownEqu('staff', 4, 'dec:magic_surge_core');
                this.decreaseCooldownEqu('staff', 3, 'dec:alchemic_stone');
                this.decreaseCooldownEqu('katana', 6, 'dec:fire_heart');
                this.decreaseCooldownEqu('magic_book', 4, 'dec:herb_bag');
                this.decreaseCooldownEqu('magic_book', 7, 'dec:shadow_feather');
                this.decreaseCooldownEqu('staff', 8, 'dec:tear_from_dream');
                this.decreaseCooldownEqu('staff', 6, 'dec:time_compass');
                this.decreaseCooldownEqu('missile', 3, 'dec:diamond_ring');
                this.decreaseCooldownEqu('missile', 4, 'dec:emerald_ring');
                this.decreaseCooldownEqu('missile', 7, 'dec:ender_ring');
                this.decreaseCooldownEqu('missile', 6, 'dec:fire_ring');
                this.decreaseCooldownEqu('missile', 4, 'dec:gold_ring');
                this.decreaseCooldownEqu('missile', 5, 'dec:heart_ring');
                this.decreaseCooldownEqu('missile', 3, 'dec:natural_ring');
                this.decreaseCooldownEqu('missile', 7, 'dec:dust_ring');
            }
        });
        this.getEvents().exEvents.afterItemUse.subscribe((e) => {
            if (e.itemStack.hasComponent('minecraft:cooldown')) {
                //这里写有饰品时触发的东西
            }
        });
        this.getEvents().exEvents.afterPlayerHurt.subscribe(e => {
            //这里写死亡事件
            if (this.exPlayer.health <= 0) {
                this.exPlayer.command.run('function die/normal');
                if (this.globalscores.getNumber('DieMode') === 1) {
                    //死亡模式
                    this.exPlayer.command.run('function die/die_mode');
                }
                else {
                    //非死亡模式
                    if (MathUtil.randomInteger(1, 3) == 1) {
                        this.exPlayer.command.run('function die/ghost');
                    }
                }
            }
            let ra = MathUtil.randomInteger(1, 100);
            //鲁伯特套装受伤效果
            if (1 <= ra && ra <= 20) {
                if (this.useArmor === ArmorPlayerDec.rupert) {
                    this.player.addEffect(MinecraftEffectTypes.Regeneration, 10 * 20);
                    this.player.addEffect(MinecraftEffectTypes.Speed, 5 * 20);
                    this.tmpV.set(this.player.location).add(0, 1, 0);
                    this.getExDimension().spawnParticle("dec:tear_from_rupert", this.tmpV);
                    this.getExDimension().spawnParticle("dec:tear_from_rupert", this.tmpV);
                    this.getExDimension().spawnParticle("dec:tear_from_rupert", this.tmpV);
                    this.getExDimension().spawnParticle("dec:tear_from_rupert", this.tmpV);
                    this.getExDimension().spawnParticle("dec:tear_from_rupert", this.tmpV);
                }
            }
            //岩浆套受伤效果
            if (this.useArmor === ArmorPlayerDec.lava) {
                this.tmpV.set(this.player.location).add(0, 1, 0);
                this.getExDimension().spawnParticle("dec:fire_spurt_particle", this.tmpV);
                this.player.addEffect(MinecraftEffectTypes.FireResistance, 4 * 20);
            }
            //哭泣套受伤效果
            if (this.useArmor === ArmorPlayerDec.crying) {
                if (ra < 1) {
                }
                else if (1 <= ra && ra <= 10) {
                    this.player.addEffect(MinecraftEffectTypes.Weakness, 5 * 20);
                }
                else if (ra <= 20) {
                    this.player.addEffect(MinecraftEffectTypes.Slowness, 4 * 20);
                }
                else if (ra <= 30) {
                    this.player.addEffect(MinecraftEffectTypes.Blindness, 5 * 20);
                }
                else if (ra <= 40) {
                    this.player.addEffect(MinecraftEffectTypes.Nausea, 7 * 20);
                }
            }
            //永冬套受伤效果
            if (1 <= ra && ra <= 12) {
                if (this.useArmor === ArmorPlayerDec.everlasting_winter) {
                    for (let e of this.getDimension().getEntities({
                        "maxDistance": 5,
                        "location": this.player.location
                    })) {
                        if (e != this.player) {
                            this.exPlayer.addEffect(MinecraftEffectTypes.Slowness, 3 * 20, 1);
                        }
                    }
                    this.exPlayer.addEffect(MinecraftEffectTypes.HealthBoost, 30 * 20, 0);
                    this.tmpV.set(this.player.location);
                    this.getExDimension().spawnParticle("dec:everlasting_winter_spurt_particle", this.tmpV);
                }
            }
            if (!DecGlobal.isDec() && !this.player.hasTag("wbkjlq")) {
                switch (this.useArmor) {
                    case ArmorPlayerPom.bloodsucking:
                        this.exPlayer.command.run("function armor/bloodsucking");
                        break;
                    case ArmorPlayerPom.senior_bloodsucking:
                        this.exPlayer.command.run("function armor/bloodsucking2");
                        break;
                    case ArmorPlayerPom.ink:
                        //this.exPlayer.command.run("function armor/ink");
                        break;
                    case ArmorPlayerPom.senior_ink:
                        //this.exPlayer.command.run("function armor/ink2");
                        break;
                    case ArmorPlayerPom.senior_seal:
                        this.exPlayer.command.run("function armor/seal2");
                        break;
                    case ArmorPlayerPom.seal:
                        this.exPlayer.command.run("function armor/seal");
                        break;
                    case ArmorPlayerPom.senior_water:
                        this.exPlayer.command.run("function armor/water2");
                        break;
                    case ArmorPlayerPom.water:
                        this.exPlayer.command.run("function armor/water");
                        break;
                    case ArmorPlayerPom.senior_equipment:
                        this.exPlayer.command.run("function armor/equipment2");
                        break;
                    case ArmorPlayerPom.equipment:
                        this.exPlayer.command.run("function armor/equipment");
                        break;
                    case ArmorPlayerPom.senior_forget:
                        this.exPlayer.command.run("function armor/forget2");
                        break;
                    case ArmorPlayerPom.forget:
                        this.exPlayer.command.run("function armor/forget");
                        break;
                }
            }
        });
        this.getEvents().exEvents.afterItemOnHandChange.subscribe((e) => {
            //蓝魔法卷轴
            let bag = this.exPlayer.getBag();
            const itemOnHand = e.afterItem;
            if (itemOnHand) {
                if (itemOnHand.typeId == "dec:magic_scroll_blue" && itemOnHand.amount == 1 && itemOnHand.getLore().length == 0) {
                    let t_n = MathUtil.randomInteger(1, 3);
                    let c_n = itemOnHand;
                    let lor = [];
                    let t = DecGlobal.isDec() ? DecTasks : PomTasks;
                    for (let i = 0; i < t_n; i++) {
                        //lor.push(numTranToTask(randonNumber(0, 9)) + numTranToTask(randonNumber(0, 9)) + numTranToTask(randonNumber(0, 9)))
                        //lor.push("Ao Ao " + numTranToTask(MathUtil.randomInteger(0, 9)));
                        lor.push(numTranToTask(Random.choice(t).id));
                    }
                    c_n.setLore(lor);
                    bag.itemOnMainHand = (c_n);
                }
            }
        });
        this.getEvents().exEvents.tick.subscribe(e => {
            var _a;
            const p = this.player;
            const ep = this.exPlayer;
            const scores = this.exPlayer.getScoresManager();
            //潜行获得tag is_sneaking
            if (p.isSneaking) {
                p.addTag("is_sneaking");
            }
            else {
                p.removeTag("is_sneaking");
            }
            //根据维度添加tag
            if (p.dimension.id === MinecraftDimensionTypes.overworld) {
                p.addTag("dOverworld");
                p.removeTag("dNether");
                p.removeTag("dTheEnd");
            }
            else if (p.dimension.id === MinecraftDimensionTypes.nether) {
                p.addTag("dNether");
                p.removeTag("dOverworld");
                p.removeTag("dTheEnd");
                if (e.currentTick % 80 === 0)
                    ep.command.run("fog @s remove \"night_event\"");
            }
            else if (p.dimension.id === MinecraftDimensionTypes.theEnd) {
                p.addTag("dTheEnd");
                p.removeTag("dNether");
                p.removeTag("dOverworld");
                if (e.currentTick % 80 === 0)
                    ep.command.run("fog @s remove \"night_event\"");
            }
            if (e.currentTick % 20 === 0) {
                //紫水晶套装效果
                if (this.useArmor === ArmorPlayerDec.amethyst) {
                    if (DecGlobal.isDec()) {
                        let mg = scores.getScore("magicpoint");
                        if (11 <= mg && mg <= 29) {
                            this.getExDimension().spawnParticle("dec:amethyst_armor_magic_increase_particle", p.location);
                            scores.addScore("magicpoint", 1);
                        }
                    }
                    else {
                        let mg = scores.getScore("wbfl");
                        if (20 <= mg && mg <= 100) {
                            this.getExDimension().spawnParticle("dec:amethyst_armor_magic_increase_particle", p.location);
                            scores.addScore("wbfl", 1);
                        }
                    }
                }
            }
            if (e.currentTick % 40 === 0) {
                //鲁伯特套装效果
                if (this.useArmor === ArmorPlayerDec.rupert) {
                    this.getExDimension().spawnParticle("dec:tear_from_rupert", this.tmpV.set(p.location).add(0, 1, 0));
                }
                //海龟套效果
                if (p.isSneaking) {
                    if (this.useArmor === ArmorPlayerDec.turtle) {
                        if (((_a = ep.getBag().itemOnMainHand) === null || _a === void 0 ? void 0 : _a.typeId) === "dec:turtle_sword") {
                            ep.addEffect(MinecraftEffectTypes.Slowness, 5 * 20, 5);
                            ep.addEffect(MinecraftEffectTypes.Slowness, 2 * 20, 3);
                            ep.addEffect(MinecraftEffectTypes.Slowness, 2 * 20, 50);
                        }
                    }
                }
            }
            if (e.currentTick % 100 == 0) {
                //木叶套装效果
                if (this.useArmor === ArmorPlayerDec.wood) {
                    if (DecGlobal.isDec()) {
                        let mg = scores.getScore("magicpoint");
                        if (mg <= 15) {
                            this.getExDimension().spawnParticle("dec:wood_armor_magic_increase_particle", p.location);
                            scores.addScore("magicpoint", 1);
                        }
                    }
                    else {
                        let mg = scores.getScore("wbfl");
                        if (mg <= 70) {
                            this.getExDimension().spawnParticle("dec:wood_armor_magic_increase_particle", p.location);
                            scores.addScore("wbfl", 1);
                        }
                    }
                }
            }
            /*if (p.getItemCooldown("village_portal") > 10) {
                p.startItemCooldown("village_portal",p.getItemCooldown("village_portal")-10)
            }*/
            if (scores.getScore('i_heavy') > 0) { //防末影珍珠的放function/global里的
                this.exPlayer.command.run('tag @e[r=10,type=ender_pearl] add no_ender_pearl');
            }
        });
        this.getEvents().exEvents.afterItemUse.subscribe(e => {
            //魔法卷轴
            if (e.itemStack.typeId == "dec:magic_scroll_blue") {
                const i = e.itemStack;
                this.setTimeout(() => {
                    if (DecGlobal.isDec())
                        taskUi(this, i);
                    else
                        ExGame.postMessageBetweenClient(this, PomServer, "taskUi", ["paperTask", "1"]);
                }, 0);
            }
        });
        this.getEvents().exEvents.onLongTick.subscribe(e => {
            if (e.currentTick % 20 === 0) {
                //盔甲选择
                if (this.checkArmor()) {
                    //非空
                    if (!this.exPlayer.detectAnyArmor()) {
                        let armors;
                        if (DecGlobal.isDec()) {
                            armors = ArmorPlayerDec;
                        }
                        else {
                            armors = ArmorPlayerPom;
                        }
                        for (let a in armors) {
                            const armor = armors[a];
                            if (armor.detect(this.exPlayer)) {
                                this.chooseArmor(armor);
                                break;
                            }
                        }
                    }
                }
                //设置防御
            }
        });
    }
    checkArmor() {
        if (!DecGlobal.isDec()) {
            if (this.useArmor === ArmorPlayerPom.ink) {
                this.player.triggerEvent("armor_ink");
            }
            else if (this.useArmor === ArmorPlayerPom.senior_ink) {
                this.player.triggerEvent("armor_senior_ink");
            }
            else {
                this.player.triggerEvent("hostile_mode");
            }
        }
        return this.useArmor ? (this.useArmor.detect(this.exPlayer)) : false;
    }
    chooseArmor(a) {
        this.useArmor = a;
        ExGame.postMessageBetweenClient(this, PomServer, "chooseArmor", [a]);
    }
    onLoaded() {
        super.onLoaded();
    }
    onLeave() {
        super.onLeave();
    }
}
//# sourceMappingURL=DecClient.js.map