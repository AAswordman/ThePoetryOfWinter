import { EntityDamageCause, EquipmentSlot, GameMode, MinecraftDimensionTypes } from "@minecraft/server";
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
        this.globalscores = new GlobalScoreBoardCache(new Objective("global"), false);
    }
    decreaseCooldownEqu(item, itemCategory, tickDecrease, equipmentTest) {
        if (item.typeId == equipmentTest &&
            this.player.getItemCooldown(itemCategory) > 0) {
            this.player.startItemCooldown(itemCategory, Math.max(this.player.getItemCooldown(itemCategory) - tickDecrease, 0));
        }
    }
    totemEffect(equipmentTest, commands) {
        const item_main = this.exPlayer.getBag().itemOnMainHand;
        const item_off = this.exPlayer.getBag().itemOnOffHand;
        if ((item_main === null || item_main === void 0 ? void 0 : item_main.typeId) == equipmentTest || (item_off === null || item_off === void 0 ? void 0 : item_off.typeId) == equipmentTest) {
            for (let c of commands) {
                this.player.runCommandAsync(c);
            }
        }
    }
    onJoin() {
        super.onJoin();
        this.exPlayer.command.run('fog @s remove \"night_event\"');
        this.getEvents().exEvents.onLongTick.subscribe((e) => {
            if (e.currentTick % 40 === 0) {
                this.totemEffect('dec:gingerbread_totem', ['function item/gingerbread_totem']);
            }
            ;
            if (e.currentTick % 120 === 0) {
                this.totemEffect('dec:ocean_totem', ['function item/ocean_totem']);
                this.totemEffect('dec:fire_totem', ['function item/fire_totem']);
            }
            ;
            if (e.currentTick % 4 === 0) {
                const item = this.exPlayer.getBag().itemOnOffHand;
                this.totemEffect('dec:energy_totem', ['function item/energy_totem']);
                if (item) {
                    this.decreaseCooldownEqu(item, 'gun', 9, 'dec:archer_bullet_bag');
                    this.decreaseCooldownEqu(item, 'gun', 7, 'dec:lava_bullet_bag');
                    this.decreaseCooldownEqu(item, 'gun', 4, 'dec:blood_bullet_bag');
                    this.decreaseCooldownEqu(item, 'gun', 3, 'dec:hunter_bullet_bag');
                    this.decreaseCooldownEqu(item, 'gun', 3, 'dec:pirate_bullet_bag');
                    this.decreaseCooldownEqu(item, 'gun', 2, 'dec:bullet_bag');
                    this.decreaseCooldownEqu(item, 'catapult', 5, 'dec:stones_bag');
                    this.decreaseCooldownEqu(item, 'catapult', 13, 'dec:archer_stones_bag');
                    this.decreaseCooldownEqu(item, 'staff', 4, 'dec:magic_surge_core');
                    this.decreaseCooldownEqu(item, 'staff', 3, 'dec:alchemic_stone');
                    this.decreaseCooldownEqu(item, 'katana', 6, 'dec:fire_heart');
                    this.decreaseCooldownEqu(item, 'magic_book', 4, 'dec:herb_bag');
                    this.decreaseCooldownEqu(item, 'magic_book', 7, 'dec:shadow_feather');
                    this.decreaseCooldownEqu(item, 'staff', 8, 'dec:tear_from_dream');
                    this.decreaseCooldownEqu(item, 'staff', 6, 'dec:time_compass');
                    this.decreaseCooldownEqu(item, 'missile', 3, 'dec:diamond_ring');
                    this.decreaseCooldownEqu(item, 'missile', 4, 'dec:emerald_ring');
                    this.decreaseCooldownEqu(item, 'missile', 7, 'dec:ender_ring');
                    this.decreaseCooldownEqu(item, 'missile', 6, 'dec:fire_ring');
                    this.decreaseCooldownEqu(item, 'missile', 4, 'dec:gold_ring');
                    this.decreaseCooldownEqu(item, 'missile', 5, 'dec:heart_ring');
                    this.decreaseCooldownEqu(item, 'missile', 3, 'dec:natural_ring');
                    this.decreaseCooldownEqu(item, 'missile', 7, 'dec:dust_ring');
                }
            }
        });
        this.getEvents().exEvents.afterItemOnHandChange.subscribe((e) => {
            //切换物品清除skill_count
            this.exPlayer.getScoresManager().setScore('skill_count', 0);
        });
        /*this.getEvents().exEvents.afterItemReleaseUse.subscribe((e) => {
            //物品使用后清除skill_count
            if(e.itemStack.getTags().includes('use_skill_count')){
                this.exPlayer.getScoresManager().setScore('skill_count',0)
            }
        })*/
        this.getEvents().exEvents.afterItemUse.subscribe((e) => {
            if (e.itemStack.hasComponentById('minecraft:cooldown')) {
                //这里写有饰品时触发的东西
            }
        });
        this.getEvents().exEvents.beforeItemUseOn.subscribe(e => {
            const id = e.block.typeId;
            if (id.startsWith("dec") && id.includes("summoner") && id !== "dec:summoner" && this.exPlayer.getGameMode() !== GameMode.creative) {
                e.cancel = true;
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
                const tmpV = new Vector3();
                switch (this.useArmor) {
                    case ArmorPlayerPom.bloodsucking:
                        this.exPlayer.command.run("function armor/bloodsucking");
                        break;
                    case ArmorPlayerPom.senior_bloodsucking:
                        this.exPlayer.command.run("function armor/bloodsucking2");
                        break;
                    case ArmorPlayerPom.senior_seal:
                        this.exPlayer.command.run("function armor/seal2");
                        break;
                    case ArmorPlayerPom.seal:
                        this.exPlayer.command.run("function armor/seal");
                        break;
                    case ArmorPlayerPom.senior_water:
                        for (let e of this.getExDimension().getEntities({
                            "maxDistance": 10,
                            "excludeTags": (this.exPlayer.hasTag("wbmsyh") ? ["wbmsyh"] : undefined),
                            "location": this.player.location
                        })) {
                            try {
                                e.applyDamage(5, {
                                    "cause": EntityDamageCause.entityAttack,
                                    "damagingEntity": this.player
                                });
                                let direction = tmpV.set(e.location).sub(this.player.location).normalize();
                                e.applyKnockback(direction.x, direction.z, 4, 1);
                            }
                            catch (e) { }
                        }
                        this.exPlayer.command.run("function armor/water2");
                        break;
                    case ArmorPlayerPom.water:
                        for (let e of this.getExDimension().getEntities({
                            "maxDistance": 10,
                            "excludeTags": (this.exPlayer.hasTag("wbmsyh") ? ["wbmsyh"] : undefined),
                            "location": this.player.location
                        })) {
                            try {
                                e.applyDamage(5, {
                                    "cause": EntityDamageCause.entityAttack,
                                    "damagingEntity": this.player
                                });
                                let direction = tmpV.set(e.location).sub(this.player.location).normalize();
                                e.applyKnockback(direction.x, direction.z, 3, 0.5);
                            }
                            catch (e) { }
                        }
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
                    case ArmorPlayerPom.senior_ink:
                        this.exPlayer.addHealth(this, e.damage);
                        // this.exPlayer.health += e.damage;
                        this.exPlayer.command.run("function armor/ink2");
                        break;
                    case ArmorPlayerPom.ink:
                        // this.exPlayer.health += e.damage;
                        this.exPlayer.addHealth(this, e.damage);
                        this.exPlayer.command.run("function armor/ink");
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
                //深渊之翼
                if (this.exPlayer.getBag().getSlot(EquipmentSlot.chest).typeId == 'dec:wings_from_deep') {
                    ep.addEffect(MinecraftEffectTypes.JumpBoost, 6 * 20, 1, true);
                    ep.addEffect(MinecraftEffectTypes.SlowFalling, 6 * 20, 0, true);
                }
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
                            scores.addScore("magicpoint", 5);
                        }
                    }
                    else {
                        let mg = scores.getScore("wbfl");
                        if (mg <= 70) {
                            this.getExDimension().spawnParticle("dec:wood_armor_magic_increase_particle", p.location);
                            scores.addScore("wbfl", 5);
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
            let hunter_reset = () => {
                let hunter_x_offset = (Math.random() - 0.5) * 2000;
                let hunter_z_offset = (Math.random() - 0.5) * 2000;
                let hunter_x = 0;
                let hunter_z = 0;
                if (Math.random() > 0) {
                    hunter_x = 5000;
                }
                else {
                    hunter_x = -5000;
                }
                if (Math.random() > 0) {
                    hunter_z = 5000;
                }
                else {
                    hunter_z = -5000;
                }
                this.globalscores.setNumber('hunter_x', Math.floor(e.source.location.x + hunter_x + hunter_x_offset));
                this.globalscores.setNumber('hunter_z', Math.floor(e.source.location.z + hunter_z + hunter_z_offset));
            };
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
            else if (e.itemStack.typeId == "dec:hunter_book") {
                //猎人之书
                let cur_hunter_x = this.globalscores.getNumber('hunter_x');
                let cur_hunter_z = this.globalscores.getNumber('hunter_z');
                if (this.globalscores.getNumber('hunter_x') == undefined || this.globalscores.getNumber('hunter_z') == undefined || this.globalscores.getNumber('hunter_x') == 0 || this.globalscores.getNumber('hunter_z') == 0) {
                    hunter_reset();
                    e.source.runCommandAsync('tellraw @a { "rawtext" : [ { "translate" : "text.dec:hunter_book_new.name" } ] }');
                    e.source.runCommandAsync('tellraw @s { "rawtext" : [ { "translate" : "text.dec:hunter_book_coordinate_1.name" },{ "score":{ "name": "hunter_x","objective": "global" } },{ "translate" : "text.dec:hunter_book_coordinate_2.name" },{ "score":{ "name": "hunter_z","objective": "global" } } ] }');
                }
                else if (cur_hunter_x - 3 <= e.source.location.x && cur_hunter_x + 3 >= e.source.location.x && cur_hunter_z - 3 <= e.source.location.z && cur_hunter_z + 3 >= e.source.location.z) {
                    hunter_reset();
                    e.source.runCommandAsync('tellraw @a { "rawtext" : [ { "translate" : "text.dec:hunter_book_success.name" } ] }');
                    e.source.runCommandAsync('tellraw @a { "rawtext" : [ { "translate" : "text.dec:hunter_book_new.name" } ] }');
                    e.source.runCommandAsync('tellraw @s { "rawtext" : [ { "translate" : "text.dec:hunter_book_coordinate_1.name" },{ "score":{ "name": "hunter_x","objective": "global" } },{ "translate" : "text.dec:hunter_book_coordinate_2.name" },{ "score":{ "name": "hunter_z","objective": "global" } } ] }');
                    e.source.runCommandAsync('xp ' + (5000 + Math.random() * 4000) + ' @s');
                    e.source.runCommandAsync('loot give @s loot "items/hunter_book"');
                }
                else {
                    e.source.runCommandAsync('tellraw @s { "rawtext" : [ { "translate" : "text.dec:hunter_book_not_complete.name" } ] }');
                    e.source.runCommandAsync('tellraw @s { "rawtext" : [ { "translate" : "text.dec:hunter_book_coordinate_1.name" },{ "score":{ "name": "hunter_x","objective": "global" } },{ "translate" : "text.dec:hunter_book_coordinate_2.name" },{ "score":{ "name": "hunter_z","objective": "global" } } ] }');
                }
            }
        });
        this.getEvents().exEvents.onLongTick.subscribe(e => {
            if (e.currentTick % 20 === 0) {
                //盔甲选择
                if (!this.checkArmor()) {
                    //非空
                    if (!this.exPlayer.detectAnyArmor()) {
                        let armors;
                        if (DecGlobal.isDec()) {
                            armors = ArmorPlayerDec;
                        }
                        else {
                            armors = ArmorPlayerPom;
                        }
                        let flag = true;
                        for (let a in armors) {
                            const armor = armors[a];
                            if (armor.detect(this.exPlayer)) {
                                this.chooseArmor(armor);
                                flag = false;
                                break;
                            }
                        }
                        if (flag) {
                            this.chooseArmor(undefined);
                        }
                    }
                    else {
                        this.chooseArmor(undefined);
                    }
                }
                //设置防御
            }
        });
    }
    checkArmor() {
        return this.useArmor ? (this.useArmor.detect(this.exPlayer)) : false;
    }
    chooseArmor(a) {
        this.useArmor = a;
        ExGame.postMessageBetweenClient(this, PomServer, "chooseArmor", [a]);
    }
    onLoad() {
        super.onLoad();
    }
    onLeave() {
        super.onLeave();
    }
}
//# sourceMappingURL=DecClient.js.map