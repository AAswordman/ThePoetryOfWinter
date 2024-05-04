import { EntityDamageCause, GameMode, MinecraftDimensionTypes } from '@minecraft/server';
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
import ExEntity from '../../modules/exmc/server/entity/ExEntity.js';
export default class DecClient extends ExGameClient {
    constructor(server, id, player) {
        super(server, id, player);
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
                const item_offhand = this.exPlayer.getBag().itemOnOffHand;
                const item_head = this.exPlayer.getBag().equipmentOnHead;
                this.totemEffect('dec:energy_totem', ['function item/energy_totem']);
                if (item_offhand) {
                    this.decreaseCooldownEqu(item_offhand, 'gun', 9, 'dec:archer_bullet_bag');
                    this.decreaseCooldownEqu(item_offhand, 'gun', 7, 'dec:lava_bullet_bag');
                    this.decreaseCooldownEqu(item_offhand, 'gun', 4, 'dec:blood_bullet_bag');
                    this.decreaseCooldownEqu(item_offhand, 'gun', 3, 'dec:hunter_bullet_bag');
                    this.decreaseCooldownEqu(item_offhand, 'gun', 3, 'dec:pirate_bullet_bag');
                    this.decreaseCooldownEqu(item_offhand, 'gun', 2, 'dec:bullet_bag');
                    this.decreaseCooldownEqu(item_offhand, 'catapult', 5, 'dec:stones_bag');
                    this.decreaseCooldownEqu(item_offhand, 'catapult', 13, 'dec:archer_stones_bag');
                    this.decreaseCooldownEqu(item_offhand, 'staff', 4, 'dec:magic_surge_core');
                    this.decreaseCooldownEqu(item_offhand, 'staff', 3, 'dec:alchemic_stone');
                    this.decreaseCooldownEqu(item_offhand, 'katana', 6, 'dec:fire_heart');
                    this.decreaseCooldownEqu(item_offhand, 'magic_book', 4, 'dec:herb_bag');
                    this.decreaseCooldownEqu(item_offhand, 'magic_book', 7, 'dec:shadow_feather');
                    this.decreaseCooldownEqu(item_offhand, 'staff', 8, 'dec:tear_from_dream');
                    this.decreaseCooldownEqu(item_offhand, 'staff', 6, 'dec:time_compass');
                    this.decreaseCooldownEqu(item_offhand, 'missile', 3, 'dec:diamond_ring');
                    this.decreaseCooldownEqu(item_offhand, 'missile', 4, 'dec:emerald_ring');
                    this.decreaseCooldownEqu(item_offhand, 'missile', 7, 'dec:ender_ring');
                    this.decreaseCooldownEqu(item_offhand, 'missile', 6, 'dec:fire_ring');
                    this.decreaseCooldownEqu(item_offhand, 'missile', 4, 'dec:gold_ring');
                    this.decreaseCooldownEqu(item_offhand, 'missile', 5, 'dec:heart_ring');
                    this.decreaseCooldownEqu(item_offhand, 'missile', 3, 'dec:natural_ring');
                    this.decreaseCooldownEqu(item_offhand, 'missile', 7, 'dec:dust_ring');
                }
                if (item_head) {
                    this.decreaseCooldownEqu(item_head, 'staff', 1, 'dec:blue_gem_hat');
                    this.decreaseCooldownEqu(item_head, 'magic_book', 2, 'dec:blue_gem_hat');
                    this.decreaseCooldownEqu(item_head, 'staff', 2, 'dec:red_gem_hat');
                    this.decreaseCooldownEqu(item_head, 'magic_book', 2, 'dec:red_gem_hat');
                    this.decreaseCooldownEqu(item_head, 'gun', 2, 'dec:archer_hat');
                }
            }
        });
        this.getEvents().exEvents.afterItemOnHandChange.subscribe((e) => {
            //切换物品清除skill_count
            this.exPlayer.getScoresManager().setScore('skill_count', 0);
        });
        this.getEvents().exEvents.afterItemUse.subscribe((e) => {
            if (e.itemStack.hasComponentById('minecraft:cooldown')) {
                //这里写有饰品时触发的东西
            }
        });
        this.getEvents().exEvents.beforeItemUseOn.subscribe(e => {
            const id = e.itemStack.typeId;
            if (id.startsWith("dec") && id.includes("summoner") && id !== "dec:summoner" && this.exPlayer.gamemode !== GameMode.creative) {
                e.cancel = true;
            }
        });
        this.getEvents().exEvents.afterPlayerHurt.subscribe(e => {
            var _a;
            //这里写死亡事件
            if (this.exPlayer.health <= 0) {
                if (this.bossBarrier)
                    this.bossBarrier.notifyDeathAdd();
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
                if (1 <= ra && ra <= 10) {
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
            //EPIC
            //日光套装受伤效果
            if (!DecGlobal.isDec() && !this.player.hasTag("wbkjlq")) {
                const tmpV = new Vector3();
                switch (this.useArmor) {
                    case ArmorPlayerPom.sunlight:
                        this.exPlayer.addTag("skill_user");
                        for (let e of this.getExDimension().getEntities({
                            "maxDistance": 5,
                            "excludeTags": ["skill_user", "wbmsyh"],
                            "excludeFamilies": [],
                            "excludeTypes": ["item"],
                            "location": this.player.location
                        })) {
                            try {
                                e.applyDamage(15, {
                                    "cause": EntityDamageCause.magic,
                                    "damagingEntity": this.player
                                });
                                e.setOnFire(5, false);
                                let direction = tmpV.set(e.location).sub(this.player.location).normalize();
                                e.applyKnockback(direction.x, direction.z, 1.2, 0.6);
                            }
                            catch (e) { }
                        }
                        this.exPlayer.addEffect(MinecraftEffectTypes.FireResistance, 5 * 20, 0);
                        this.exPlayer.addEffect(MinecraftEffectTypes.Absorption, 1 * 20, 0);
                        this.exPlayer.command.run("function EPIC/armor/sunlight");
                        this.exPlayer.removeTag("skill_user");
                        break;
                }
            }
            //WB
            if (ra <= 50 && ((_a = ExEntity.getInstance(e.hurtEntity).getBag().equipmentOnHead) === null || _a === void 0 ? void 0 : _a.typeId) === 'dec:glass_tank') {
                e.hurtEntity.runCommandAsync('playsound random.glass @a ~~1~');
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
                        lor.push(numTranToTask(Random.choice(t).id));
                    }
                    c_n.setLore(lor);
                    return (c_n);
                }
            }
        });
        let magic_gap = 60;
        let dec_magic_store = 0;
        const k2 = 0.001;
        const k1 = 1 - k2 + 0.01;
        const g_min = (1 - k1) / k2;
        const magicgain_map_k = 1.05; //此项可修改，与magicgain<1时魔法恢复速度随magicgain变化负相关，即magicgain减小同样的数，此项越大，魔法恢复速度越慢
        const magicgain_map_k2 = (-g_min + 1) / magicgain_map_k;
        function magicgain_map(magicgain) {
            if (magicgain < 1) {
                return (magicgain_map_k2 * Math.pow(magicgain_map_k, magicgain) + g_min);
            }
            else {
                return magicgain;
            }
        }
        this.getEvents().exEvents.tick.subscribe(e => {
            var _a, _b;
            const p = this.player;
            const ep = this.exPlayer;
            const scores = this.exPlayer.getScoresManager();
            //生存，冒险玩家添加gaming标签
            const gamemode = ep.gamemode;
            if (!p.hasTag('gaming') && (gamemode == GameMode.adventure || gamemode == GameMode.survival)) {
                p.addTag('gaming');
                this.globalscores.setNumber("AlreadyGmCheat", 1);
                if (this.globalscores.getNumber('DieMode')) {
                    p.addTag('diemode_gmcheat');
                }
            }
            else if (p.hasTag('gaming')) {
                p.removeTag('gaming');
            }
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
                if (((_a = this.exPlayer.getBag().equipmentOnChest) === null || _a === void 0 ? void 0 : _a.typeId) == 'dec:wings_from_deep') {
                    ep.addEffect(MinecraftEffectTypes.JumpBoost, 6 * 20, 1, true);
                    ep.addEffect(MinecraftEffectTypes.SlowFalling, 6 * 20, 0, true);
                }
                //紫水晶套装效果
                if (this.useArmor === ArmorPlayerDec.amethyst) {
                    if (DecGlobal.isDec()) {
                        let mg = scores.getScore("wbfl");
                        if (11 <= mg && mg <= 29) {
                            this.getExDimension().spawnParticle("dec:amethyst_armor_magic_increase_particle", p.location);
                            scores.addScore("wbfl", 1);
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
                        if (((_b = ep.getBag().itemOnMainHand) === null || _b === void 0 ? void 0 : _b.typeId) === "dec:turtle_sword") {
                            ep.addEffect(MinecraftEffectTypes.Slowness, 5 * 20, 2);
                            ep.addEffect(MinecraftEffectTypes.Resistance, 2 * 20, 3);
                            ep.addEffect(MinecraftEffectTypes.Regeneration, 2 * 20, 0);
                        }
                    }
                }
            }
            if (e.currentTick % 100 == 0) {
                //木叶套装效果
                if (this.useArmor === ArmorPlayerDec.wood) {
                    if (DecGlobal.isDec()) {
                        let mg = scores.getScore("wbfl");
                        if (mg <= 15) {
                            this.getExDimension().spawnParticle("dec:wood_armor_magic_increase_particle", p.location);
                            scores.addScore("wbfl", 5);
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
            if (scores.getScore('i_heavy') > 0) { //防末影珍珠的放function/global里的
                this.exPlayer.command.run('tag @e[r=10,type=ender_pearl] add no_ender_pearl');
            }
            //Dec的魔法系统
            if (DecGlobal.isDec()) {
                let maxmagic = scores.getScore('maxmagic');
                let magicgain = scores.getScore('magicgain');
                let magicreckon = scores.getScore('magicreckon');
                let magicpoint = scores.getScore('magicpoint');
                //wait_tick实际运用可为变量，第一次魔法恢复时用时，并且越大，魔法恢复越慢
                const wait_tick = 60;
                //let l =  Math.pow(0.667,magicgain) - 1
                //p.runCommandAsync('title @s actionbar magic_gap:' + String(magic_gap))
                if (magicpoint < maxmagic) {
                    if (magic_gap <= 0) {
                        //这里写魔法恢复
                        scores.addScore('magicpoint', 1);
                        this.getExDimension().spawnParticle("dec:magic_increase_particle", p.location);
                        //magic_gap = 60 - decMagicK * magicreckon_filter((magicreckon - 60)/(1+l))
                        magic_gap = wait_tick * Math.pow(1 / (k1 + k2 * magicgain_map(magicgain)), magicreckon);
                    }
                    else {
                        magic_gap -= 1;
                    }
                    scores.addScore('magicreckon', 1);
                }
                else if (magicreckon != 0) {
                    scores.setScore('magicreckon', 0);
                    magic_gap = wait_tick;
                }
                if (dec_magic_store > magicpoint) {
                    scores.setScore('magicreckon', 0);
                    if (magicreckon >= wait_tick) {
                        this.getExDimension().spawnParticle("dec:magic_decrease_particle", p.location);
                    }
                }
                dec_magic_store = magicpoint;
            }
        });
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
            this.globalscores.setNumber('hunter_x', Math.floor(this.player.location.x + hunter_x + hunter_x_offset));
            this.globalscores.setNumber('hunter_z', Math.floor(this.player.location.z + hunter_z + hunter_z_offset));
        };
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
            else if (e.itemStack.typeId == "dec:hunter_book") {
                //猎人之书
                let cur_hunter_x = this.globalscores.getNumber('hunter_x');
                let cur_hunter_z = this.globalscores.getNumber('hunter_z');
                if (this.globalscores.getNumber('hunter_x') == undefined || this.globalscores.getNumber('hunter_z') == undefined || this.globalscores.getNumber('hunter_x') == 0 || this.globalscores.getNumber('hunter_z') == 0) {
                    hunter_reset();
                    this.exPlayer.command.run(['tellraw @a { "rawtext" : [ { "translate" : "text.dec:hunter_book_new.name" } ] }',
                        'tellraw @s { "rawtext" : [ { "translate" : "text.dec:hunter_book_coordinate_1.name" },{ "score":{ "name": "hunter_x","objective": "global" } },{ "translate" : "text.dec:hunter_book_coordinate_2.name" },{ "score":{ "name": "hunter_z","objective": "global" } } ] }']);
                }
                else if (cur_hunter_x - 3 <= e.source.location.x && cur_hunter_x + 3 >= e.source.location.x && cur_hunter_z - 3 <= e.source.location.z && cur_hunter_z + 3 >= e.source.location.z) {
                    hunter_reset();
                    this.exPlayer.command.run(['tellraw @a { "rawtext" : [ { "translate" : "text.dec:hunter_book_success.name" } ] }',
                        'tellraw @a { "rawtext" : [ { "translate" : "text.dec:hunter_book_new.name" } ] }',
                        'tellraw @s { "rawtext" : [ { "translate" : "text.dec:hunter_book_coordinate_1.name" },{ "score":{ "name": "hunter_x","objective": "global" } },{ "translate" : "text.dec:hunter_book_coordinate_2.name" },{ "score":{ "name": "hunter_z","objective": "global" } } ] }',
                        'xp ' + (5000 + Math.random() * 4000) + ' @s',
                        'loot give @s loot "items/hunter_book"']);
                }
                else {
                    this.exPlayer.command.run(['tellraw @s { "rawtext" : [ { "translate" : "text.dec:hunter_book_not_complete.name" } ] }',
                        'tellraw @s { "rawtext" : [ { "translate" : "text.dec:hunter_book_coordinate_1.name" },{ "score":{ "name": "hunter_x","objective": "global" } },{ "translate" : "text.dec:hunter_book_coordinate_2.name" },{ "score":{ "name": "hunter_z","objective": "global" } } ] }']);
                }
            }
        });
        this.getEvents().exEvents.afterItemUse.subscribe(e => {
            var _a, _b, _c;
            if (e.itemStack.hasComponent('minecraft:cooldown') && this.player.getItemCooldown((_a = e.itemStack.getComponent('minecraft:cooldown')) === null || _a === void 0 ? void 0 : _a.cooldownCategory) == 0) {
                let item_name = e.itemStack.typeId;
                let p = this.exPlayer;
                let bag = p.getBag();
                let bullet_cur = p.getBag().searchItems([
                    'dec:bomber_bullet',
                    'dec:flintlock_bullet',
                    'dec:small_stone',
                    'dec:exploding_pellets',
                ]);
                let suc = false;
                let hasBullet = (bullet_id) => {
                    return bullet_cur.has(bullet_id);
                };
                let ex_e = this.exPlayer;
                if (item_name == 'dec:bomber' && hasBullet('dec:bomber_bullet')) {
                    let shoot_opt = {
                        speed: 3,
                        uncertainty: 5
                    };
                    ex_e.shootProj('dec:fake_fireball', shoot_opt);
                    ex_e.shootProj('dec:fake_fireball', shoot_opt);
                    ex_e.shootProj('dec:fake_fireball', shoot_opt);
                    p.command.run('function item/bomber');
                    //e.source.playSound('random.explode')
                    //e.source.playAnimation('animation.humanoid.shoot')
                    //e.source.spawnParticle('flintlock_smoke_particle',lo)
                    suc = true;
                }
                else if (item_name == 'dec:catapult' && (hasBullet('dec:small_stone') || hasBullet('dec:exploding_pellets'))) {
                    e.source.playAnimation('animation.humanoid.catapult');
                    e.source.playSound('mob.snowgolem.shoot');
                    let shoot_opt = {
                        speed: 0.9,
                        uncertainty: 3
                    };
                    switch ((_b = bag.searchItem(['dec:small_stone', 'dec:exploding_pellets'])) === null || _b === void 0 ? void 0 : _b.typeId) {
                        case 'dec:exploding_pellets':
                            ex_e.shootProj('dec:bullet_by_catapult_explode', shoot_opt);
                            p.getBag().clearItem('dec:exploding_pellets', 1);
                            break;
                        case 'dec:small_stone':
                            ex_e.shootProj('dec:bullet_by_catapult_normal', shoot_opt);
                            p.getBag().clearItem('dec:small_stone', 1);
                            break;
                    }
                    suc = true;
                }
                else if (item_name == 'dec:everlasting_winter_flintlock' && hasBullet('dec:flintlock_bullet')) {
                    let shoot_opt_1 = {
                        speed: 6,
                        uncertainty: 0
                    };
                    let shoot_opt_2 = {
                        speed: 5,
                        uncertainty: 0.5
                    };
                    ex_e.shootProj('dec:bullet_by_everlasting_winter_flintlock', shoot_opt_1);
                    ex_e.shootProj('dec:bullet_by_everlasting_winter_flintlock', shoot_opt_2);
                    ex_e.shootProj('dec:bullet_by_everlasting_winter_flintlock', shoot_opt_2);
                    e.source.runCommandAsync('function item/general_flintlock');
                    suc = true;
                }
                else if (item_name == 'dec:flintlock_pro' && hasBullet('dec:flintlock_bullet')) {
                    let shoot_opt_1 = {
                        speed: 5.4,
                        uncertainty: 0
                    };
                    let shoot_opt_2 = {
                        speed: 4.8,
                        uncertainty: 3
                    };
                    ex_e.shootProj('dec:bullet_by_flintlock_pro', shoot_opt_1);
                    ex_e.shootProj('dec:bullet_by_flintlock_pro', shoot_opt_2);
                    ex_e.shootProj('dec:bullet_by_flintlock_pro', shoot_opt_2);
                    e.source.runCommandAsync('function item/general_flintlock');
                    suc = true;
                }
                else if (item_name == 'dec:flintlock' && hasBullet('dec:flintlock_bullet')) {
                    let shoot_opt_1 = {
                        speed: 5,
                        uncertainty: 0.1
                    };
                    let shoot_opt_2 = {
                        speed: 4.3,
                        uncertainty: 3
                    };
                    ex_e.shootProj('dec:bullet_by_flintlock', shoot_opt_1);
                    ex_e.shootProj('dec:bullet_by_flintlock', shoot_opt_2);
                    ex_e.shootProj('dec:bullet_by_flintlock', shoot_opt_2);
                    e.source.runCommandAsync('function item/general_flintlock');
                    suc = true;
                }
                else if (item_name == 'dec:ghost_flintlock' && hasBullet('dec:flintlock_bullet')) {
                    let shoot_opt = {
                        speed: 7.2,
                        uncertainty: 0
                    };
                    ex_e.shootProj('dec:bullet_by_ghost_flintlock', shoot_opt);
                    e.source.runCommandAsync('function item/general_flintlock');
                    suc = true;
                }
                else if (item_name == 'dec:lava_flintlock' && hasBullet('dec:flintlock_bullet')) {
                    let shoot_opt = {
                        speed: 4.8,
                        uncertainty: 6
                    };
                    ex_e.shootProj('dec:bullet_by_lava_flintlock', shoot_opt);
                    ex_e.shootProj('dec:bullet_by_lava_flintlock', shoot_opt);
                    ex_e.shootProj('dec:bullet_by_lava_flintlock', shoot_opt);
                    ex_e.shootProj('dec:bullet_by_lava_flintlock', shoot_opt);
                    e.source.runCommandAsync('function item/general_flintlock');
                    suc = true;
                }
                else if (item_name == 'dec:short_flintlock' && hasBullet('dec:flintlock_bullet')) {
                    let shoot_opt = {
                        speed: 4.8,
                        uncertainty: 10
                    };
                    ex_e.shootProj('dec:bullet_by_flintlock', shoot_opt);
                    ex_e.shootProj('dec:bullet_by_flintlock', shoot_opt);
                    e.source.runCommandAsync('function item/general_flintlock');
                    suc = true;
                }
                else if (item_name == 'dec:star_flintlock' && hasBullet('dec:flintlock_bullet')) {
                    let shoot_opt = {
                        speed: 5,
                        uncertainty: 4
                    };
                    ex_e.shootProj('dec:bullet_by_star_flintlock', shoot_opt);
                    ex_e.shootProj('dec:bullet_by_star_flintlock', shoot_opt);
                    ex_e.shootProj('dec:bullet_by_star_flintlock', shoot_opt);
                    ex_e.shootProj('dec:bullet_by_star_flintlock', shoot_opt);
                    ex_e.shootProj('dec:bullet_by_star_flintlock', shoot_opt);
                    e.source.runCommandAsync('function item/general_flintlock');
                    suc = true;
                }
                else if (item_name == 'dec:storm_flintlock' && hasBullet('dec:flintlock_bullet')) {
                    let shoot_opt_1 = {
                        speed: 4.2,
                        uncertainty: 0
                    };
                    let shoot_opt_2 = {
                        speed: 3,
                        uncertainty: 3
                    };
                    ex_e.shootProj('dec:bullet_by_storm_flintlock', shoot_opt_1);
                    ex_e.shootProj('dec:bullet_by_storm_flintlock', shoot_opt_2);
                    ex_e.shootProj('dec:bullet_by_storm_flintlock', shoot_opt_2);
                    e.source.runCommandAsync('function item/general_flintlock');
                    suc = true;
                }
                if (suc) {
                    let new_item = e.itemStack;
                    let dur = new_item.getComponent('minecraft:durability');
                    (_c = e.itemStack.getComponent('minecraft:cooldown')) === null || _c === void 0 ? void 0 : _c.startCooldown(e.source);
                    if (p.gamemode != GameMode.creative) {
                        if (dur.damage + 1 < dur.maxDurability) {
                            dur.damage += 1;
                            p.getBag().setItem(e.source.selectedSlot, new_item);
                        }
                        else {
                            e.source.playSound('random.break');
                            p.getBag().clearItem(e.itemStack.typeId, 1);
                        }
                    }
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