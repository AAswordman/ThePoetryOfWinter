import { ActionFormData } from "@minecraft/server-ui";
export class DecTask {
    constructor(id, xp_change, condition, respond) {
        this.id = id;
        if (condition instanceof Array) {
            this.commands = condition;
            if (respond && respond instanceof Array) {
                this.commands = this.commands.concat(respond);
            }
            else {
                this.commands.push("tellraw @s[tag=task_complete] { \"rawtext\" : [ { \"translate\" : \"text.dec:task_" + id + "_complete.name\" } ] }", "tellraw @s[tag=!task_complete] { \"rawtext\" : [ { \"translate\" : \"text.dec:task_fail.name\" } ] }", "loot give @s[tag=task_complete] loot \"tasks/" + id + "\"", "xp " + xp_change.toString() + " @s[tag=task_complete]", "replaceitem entity @s[tag=task_complete] slot.weapon.mainhand 0 air");
            }
        }
        else if (respond && !(respond instanceof Array)) {
            this.conditions = condition;
            this.respond = respond;
        }
        this.xps = xp_change;
    }
    title() {
        let title = "text.dec:task_" + this.id + "_title.name";
        return title;
    }
    body() {
        let body = "text.dec:task_" + this.id + "_body.name";
        return body;
    }
    detect(c, lor) {
        let item = c.exPlayer.getBag().itemOnMainHand;
        if (!item || lor.toString() !== item.getLore().toString()) {
            return;
        }
        if (this.commands) {
            c.exPlayer.command.run(this.commands);
            c.setTimeout(() => {
                if (c.exPlayer.hasTag('task_complete')) {
                    c.data.gameExperience += this.xps;
                    c.exPlayer.removeTag("task_complete");
                }
            }, 800);
        }
        if (this.conditions && this.respond) {
            if (this.conditions(c.exPlayer)) {
                this.respond(c.exPlayer);
            }
        }
    }
    dec_detect(ep) {
        if (this.commands) {
            ep.command.run(this.commands);
        }
        if (this.conditions && this.respond) {
            if (this.conditions(ep)) {
                this.respond(ep);
            }
        }
    }
}
//tag给符合条件加task_complete
export let DecTasks = [
    new DecTask("000", 1213, [
        "execute if entity @s[hasitem={location=slot.armor.head,item=dec:lava_helmet}] if entity @s[hasitem={location=slot.armor.chest,item=dec:lava_chestplate}] if entity @s[hasitem={location=slot.armor.legs,item=dec:lava_leggings}] if entity @s[hasitem={location=slot.armor.feet,item=dec:lava_boots}] run tag @s add task_complete",
    ]),
    new DecTask("001", 1321, [
        "execute if entity @s[hasitem={location=slot.armor.head,item=dec:frozen_helmet}] if entity @s[hasitem={location=slot.armor.chest,item=dec:frozen_chestplate}] if entity @s[hasitem={location=slot.armor.legs,item=dec:frozen_leggings}] if entity @s[hasitem={location=slot.armor.feet,item=dec:frozen_boots}] run tag @s add task_complete",
    ]),
    new DecTask("002", 1422, [
        "execute if entity @s[hasitem={location=slot.armor.head,item=dec:rupert_helmet}] if entity @s[hasitem={location=slot.armor.chest,item=dec:rupert_chestplate}] if entity @s[hasitem={location=slot.armor.legs,item=dec:rupert_leggings}] if entity @s[hasitem={location=slot.armor.feet,item=dec:rupert_boots}] run tag @s add task_complete",
    ]),
    new DecTask("003", 961, [
        "execute if entity @s[hasitem={location=slot.armor.head,item=dec:amethyst_helmet}] if entity @s[hasitem={location=slot.armor.chest,item=dec:amethyst_chestplate}] if entity @s[hasitem={location=slot.armor.legs,item=dec:amethyst_leggings}] if entity @s[hasitem={location=slot.armor.feet,item=dec:amethyst_boots}] run tag @s add task_complete",
    ]),
    new DecTask("004", 381, [
        "execute if entity @s[hasitem={location=slot.armor.head,item=dec:copper_helmet}] if entity @s[hasitem={location=slot.armor.chest,item=dec:copper_chestplate}] if entity @s[hasitem={location=slot.armor.legs,item=dec:copper_leggings}] if entity @s[hasitem={location=slot.armor.feet,item=dec:copper_boots}] run tag @s add task_complete",
    ]),
    new DecTask("005", 1623, [
        "execute if entity @s[hasitem={location=slot.armor.head,item=dec:crying_helmet}] if entity @s[hasitem={location=slot.armor.chest,item=dec:crying_chestplate}] if entity @s[hasitem={location=slot.armor.legs,item=dec:crying_leggings}] if entity @s[hasitem={location=slot.armor.feet,item=dec:crying_boots}] run tag @s add task_complete",
    ]),
    new DecTask("006", 1724, [
        "execute if entity @s[hasitem={location=slot.armor.head,item=dec:emerald_helmet}] if entity @s[hasitem={location=slot.armor.chest,item=dec:emerald_chestplate}] if entity @s[hasitem={location=slot.armor.legs,item=dec:emerald_leggings}] if entity @s[hasitem={location=slot.armor.feet,item=dec:emerald_boots}] run tag @s add task_complete",
    ]),
    new DecTask("007", 2310, [
        "execute if entity @s[hasitem={location=slot.armor.head,item=dec:everlasting_winter_helmet}] if entity @s[hasitem={location=slot.armor.chest,item=dec:everlasting_winter_chestplate}] if entity @s[hasitem={location=slot.armor.legs,item=dec:everlasting_winter_leggings}] if entity @s[hasitem={location=slot.armor.feet,item=dec:everlasting_winter_boots}] run tag @s add task_complete",
    ]),
    new DecTask("008", 945, [
        "execute if entity @s[hasitem={location=slot.armor.head,item=dec:knight_helmet}] if entity @s[hasitem={location=slot.armor.chest,item=iron_chestplate}] if entity @s[hasitem={location=slot.armor.legs,item=iron_leggings}] if entity @s[hasitem={location=slot.armor.feet,item=iron_boots}] run tag @s add task_complete",
    ]),
    new DecTask("009", 423, [
        "execute if entity @s[hasitem={location=slot.armor.head,item=dec:witch_hat}] run tag @s add task_complete",
    ]),
    new DecTask("010", 72, [
        "execute if entity @s[hasitem={item=paper}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s paper 0 1"
    ]),
    new DecTask("011", 71, [
        "tag @s add task_complete"
    ]),
    new DecTask("012", 0, [
        "tag @s add task_complete"
    ]),
    new DecTask("013", 751, [
        "execute if entity @s[hasitem={item=dec:chocolates,quantity=8..}] if entity @s[hasitem={item=dec:long_bread,quantity=16..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:long_bread 0 16",
        "execute if entity @s[tag=task_complete] run clear @s dec:chocolates 0 8"
    ]),
    new DecTask("014", 68, [
        "execute if entity @s[hasitem={item=iron_sword}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s iron_sword 0 1"
    ]),
    new DecTask("015", 142, [
        "execute if entity @s[hasitem={item=yellow_flower,quantity=14..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s yellow_flower 0 14"
    ]),
    new DecTask("016", 471, [
        "execute if entity @s[hasitem={item=log,data=1,quantity=64..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s log 0 64"
    ]),
    new DecTask("017", 512, [
        "execute if entity @s[hasitem={item=snow,quantity=12..}] if entity @s[hasitem={item=water_bucket}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s snow 0 12",
        "execute if entity @s[tag=task_complete] run clear @s water_bucket 0 1"
    ]),
    new DecTask("018", 224, [
        "execute if entity @s[hasitem={item=dec:candy,quantity=3..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:candy 0 3"
    ]),
    new DecTask("019", 375, [
        "execute if entity @s[hasitem={item=dec:rice_wine,quantity=16..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:rice_wine 0 16"
    ]),
    new DecTask("020", 1213, [
        "execute if entity @s[hasitem={item=netherite_ingot,quantity=4..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s netherite_ingot 0 4"
    ]),
    new DecTask("021", 742, [
        "execute if entity @s[hasitem={item=dec:ice_ingot}] if entity @s[hasitem={item=iron_ingot,quantity=35..}] if entity @s[hasitem={item=gold_ingot,quantity=62..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:ice_ingot 0 1",
        "execute if entity @s[tag=task_complete] run clear @s iron_ingot 0 35",
        "execute if entity @s[tag=task_complete] run clear @s gold_ingot 0 62"
    ]),
    new DecTask("022", 941, [
        "execute if entity @s[hasitem={item=dec:stream_stone,quantity=31..}] if entity @s[hasitem={item=amethyst_shard,quantity=42..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:stream_stone 0 31",
        "execute if entity @s[tag=task_complete] run clear @s amethyst_shard 0 42"
    ]),
    new DecTask("023", 421, [
        "execute if entity @s[hasitem={item=dec:ice_ingot}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:ice_ingot 0 1"
    ]),
    new DecTask("024", 761, [
        "execute if entity @s[hasitem={item=dec:coral_ingot,quantity=4..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:coral_ingot 0 4"
    ]),
    new DecTask("025", 761, [
        "execute if entity @s[hasitem={item=dec:stream_stone,quantity=14..}] if entity @s[hasitem={item=prismarine_shard,quantity=34..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:stream_stone 0 14",
        "execute if entity @s[tag=task_complete] run clear @s prismarine_shard 0 34",
    ]),
    new DecTask("026", 1231, [
        "execute if entity @s[hasitem={item=dec:ghost_ingot,quantity=2..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:ghost_ingot 0 2"
    ]),
    new DecTask("027", 541, [
        "execute if entity @s[hasitem={item=dec:pure_ingot}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:pure_ingot 0 1"
    ]),
    new DecTask("028", 1342, [
        "execute if entity @s[hasitem={item=dec:steel_ingot,quantity=41..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:steel_ingot 0 41"
    ]),
    new DecTask("029", 1433, [
        "execute if entity @s[hasitem={item=dec:star_debris,quantity=2..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:star_debris 0 2"
    ]),
    new DecTask("030", 978, [
        "execute if entity @s[hasitem={item=dec:echo_shard,quantity=2..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:echo_shard 0 2"
    ]),
    new DecTask("031", 134, [
        "execute if entity @s[hasitem={item=dec:stream_stone,quantity=13..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:stream_stone 0 13"
    ]),
    new DecTask("032", 134, [
        "execute if entity @s[hasitem={item=dec:stream_stone,quantity=32..}] if entity @s[hasitem={item=lapis_lazuli,quantity=26..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:stream_stone 0 32",
        "execute if entity @s[tag=task_complete] run clear @s lapis_lazuli 0 26"
    ]),
    new DecTask("033", 432, [
        "execute if entity @s[hasitem={item=dec:stream_stone,quantity=21..}] if entity @s[hasitem={item=lapis_lazuli,quantity=42..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:stream_stone 0 21",
        "execute if entity @s[tag=task_complete] run clear @s lapis_lazuli 0 42"
    ]),
    new DecTask("034", 331, [
        "execute if entity @s[hasitem={item=dec:stream_stone,quantity=14..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:stream_stone 0 14"
    ]),
    new DecTask("035", 451, [
        "execute if entity @s[hasitem={item=dec:stream_stone,quantity=31..}] if entity @s[hasitem={item=lapis_lazuli,quantity=42..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:stream_stone 0 31",
        "execute if entity @s[tag=task_complete] run clear @s lapis_lazuli 0 42"
    ]),
    new DecTask("036", 433, [
        "execute if entity @s[hasitem={item=dec:stream_stone,quantity=34..}] if entity @s[hasitem={item=lapis_lazuli,quantity=13..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:stream_stone 0 34",
        "execute if entity @s[tag=task_complete] run clear @s lapis_lazuli 0 13"
    ]),
    new DecTask("037", 264, [
        "execute if entity @s[hasitem={item=dec:stream_stone,quantity=21..}] if entity @s[hasitem={item=lapis_lazuli,quantity=41..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:stream_stone 0 21",
        "execute if entity @s[tag=task_complete] run clear @s lapis_lazuli 0 41"
    ]),
    new DecTask("038", 612, [
        "execute if entity @s[hasitem={item=dec:stream_stone,quantity=31..}] if entity @s[hasitem={item=lapis_lazuli,quantity=44..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:stream_stone 0 31",
        "execute if entity @s[tag=task_complete] run clear @s lapis_lazuli 0 44"
    ]),
    new DecTask("039", 951, [
        "execute if entity @s[hasitem={item=dec:stream_stone,quantity=71..}] if entity @s[hasitem={item=lapis_lazuli,quantity=42..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:stream_stone 0 71",
        "execute if entity @s[tag=task_complete] run clear @s lapis_lazuli 0 42"
    ]),
    new DecTask("040", 541, [
        "execute if entity @s[hasitem={item=dec:stream_stone,quantity=31..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:stream_stone 0 31"
    ]),
    new DecTask("041", 845, [
        "execute if entity @s[hasitem={item=dec:stream_stone,quantity=72..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:stream_stone 0 72"
    ]),
    new DecTask("042", 421, [
        "execute if entity @s[hasitem={item=birch_log,quantity=64..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s log -1 64"
    ]),
    new DecTask("043", 562, [
        "execute if entity @s[hasitem={item=oak_log,quantity=73..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s log -1 73"
    ]),
    new DecTask("044", 741, [
        "execute if entity @s[hasitem={item=oak_log,quantity=134..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s log -1 134"
    ]),
    new DecTask("045", 854, [
        "execute if entity @s[hasitem={item=dec:rice,quantity=85..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:rice 0 85"
    ]),
    new DecTask("046", 951, [
        "execute if entity @s[hasitem={item=dec:soybean,quantity=75..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:soybean 0 75"
    ]),
    new DecTask("047", 1034, [
        "execute if entity @s[hasitem={item=dec:leek,quantity=76..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:leek 0 76"
    ]),
    new DecTask("048", 1045, [
        "execute if entity @s[hasitem={item=dec:bracken,quantity=73..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:bracken 0 73"
    ]),
    new DecTask("049", 1641, [
        "execute if entity @s[hasitem={item=dec:houttuynia,quantity=93..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:houttuynia 0 93"
    ]),
    new DecTask("050", 1241, [
        "execute if entity @s[hasitem={item=dec:fritillary,quantity=64..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:fritillary 0 64"
    ]),
    new DecTask("051", 1541, [
        "execute if entity @s[hasitem={item=dec:brizarre_chilli,quantity=95..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:brizarre_chilli 0 95"
    ]),
    new DecTask("052", 375, [
        "execute if entity @s[hasitem={item=dec:a_bowl_of_rice,quantity=4..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:a_bowl_of_rice 0 4"
    ]),
    new DecTask("053", 498, [
        "execute if entity @s[hasitem={item=dec:potato_rice,quantity=4..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:potato_rice 0 4"
    ]),
    new DecTask("054", 783, [
        "execute if entity @s[hasitem={item=dec:rice_wine,quantity=17..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:rice_wine 0 17"
    ]),
    new DecTask("055", 273, [
        "execute if entity @s[hasitem={item=dec:cooked_brain,quantity=27..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:cooked_brain 0 27"
    ]),
    new DecTask("056", 751, [
        "execute if entity @s[hasitem={item=dec:sea_urchin,quantity=4..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:sea_urchin 0 4"
    ]),
    new DecTask("057", 482, [
        "execute if entity @s[hasitem={item=dec:shell,quantity=3..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:shell 0 3"
    ]),
    new DecTask("058", 754, [
        "execute if entity @s[hasitem={item=dec:melon_piece,quantity=78..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:melon_piece 0 78"
    ]),
    new DecTask("059", 751, [
        "execute if entity @s[hasitem={item=dec:fried_melon_seed,quantity=64..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:fried_melon_seed 0 64"
    ]),
    new DecTask("060", 1752, [
        "execute if entity @s[hasitem={item=dec:apple_pie,quantity=74..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:apple_pie 0 74"
    ]),
    new DecTask("061", 1342, [
        "execute if entity @s[hasitem={item=dec:chocolate_cookie,quantity=32..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:chocolate_cookie 0 32"
    ]),
    new DecTask("062", 754, [
        "execute if entity @s[hasitem={item=dec:fried_egg,quantity=18..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:fried_egg 0 18"
    ]),
    new DecTask("063", 571, [
        "execute if entity @s[hasitem={item=dec:ender_fish,quantity=6..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:ender_fish 0 6"
    ]),
    new DecTask("064", 751, [
        "execute if entity @s[hasitem={item=dec:snailfish,quantity=16..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:snailfish 0 16"
    ]),
    new DecTask("065", 1375, [
        "execute if entity @s[hasitem={item=dec:spiral_shell,quantity=7..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:spiral_shell 0 7"
    ]),
    new DecTask("066", 1243, [
        "execute if entity @s[hasitem={item=dec:sword_fish,quantity=2..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:sword_fish 0 2"
    ]),
    new DecTask("067", 1243, [
        "execute if entity @s[hasitem={item=dec:tropical_fish,quantity=72..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:tropical_fish 0 72"
    ]),
    new DecTask("068", 1471, [
        "execute if entity @s[hasitem={item=dec:tropical_fish_cooked,quantity=76..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:tropical_fish_cooked 0 76"
    ]),
    new DecTask("069", 1471, [
        "execute if entity @s[hasitem={item=dec:candy,quantity=75..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:candy 0 75"
    ]),
    new DecTask("070", 1672, [
        "execute if entity @s[hasitem={item=dec:lollipop,quantity=14..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:lollipop 0 14"
    ]),
    new DecTask("071", 1851, [
        "execute if entity @s[hasitem={item=dec:hard_lollipop,quantity=17..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:hard_lollipop 0 17"
    ]),
    new DecTask("072", 214, [
        "execute if entity @s[hasitem={item=dec:long_bread}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:long_bread 0 1"
    ]),
    new DecTask("073", 985, [
        "execute if entity @s[hasitem={item=dec:tofu,quantity=64..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:tofu 0 64"
    ]),
    new DecTask("074", 276, [
        "execute if entity @s[hasitem={item=dec:apple_juice}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:apple_juice 0 1"
    ]),
    new DecTask("074", 276, [
        "execute if entity @s[hasitem={item=dec:crab_leg,quantity=6..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:crab_leg 0 6"
    ]),
    new DecTask("075", 457, [
        "execute if entity @s[hasitem={item=dec:crab_leg_cooked,quantity=6..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:crab_leg_cooked 0 6"
    ]),
    new DecTask("077", 384, [
        "execute if entity @s[hasitem={item=dec:pine_cone}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:pine_cone 0 1"
    ]),
    new DecTask("078", 572, [
        "execute if entity @s[hasitem={item=dec:artificial_meat,quantity=15..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:artificial_meat 0 15"
    ]),
    new DecTask("079", 427, [
        "execute if entity @s[hasitem={item=dec:nautilus_alive}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:nautilus_alive 0 1"
    ]),
    new DecTask("080", 432, [
        "execute if entity @s[hasitem={item=dec:a_piece_of_salmon,quantity=16..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:a_piece_of_salmon 0 16"
    ]),
    new DecTask("081", 1864, [
        "execute if entity @s[hasitem={item=dec:lamprey,quantity=16..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:lamprey 0 16"
    ]),
    new DecTask("082", 675, [
        "execute if entity @s[hasitem={item=dec:perch,quantity=16..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:perch 0 16"
    ]),
    new DecTask("083", 791, [
        "execute if entity @s[hasitem={item=dec:perch_cooked,quantity=17..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:perch 0 17"
    ]),
    new DecTask("084", 754, [
        "execute if entity @s[hasitem={item=dec:blue_jellyfish}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:blue_jellyfish 0 1"
    ]),
    new DecTask("085", 473, [
        "execute if entity @s[hasitem={item=dec:pink_jellyfish}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:pink_jellyfish 0 1"
    ]),
    new DecTask("086", 521, [
        "execute if entity @s[hasitem={item=dec:yellow_jellyfish}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:yellow_jellyfish 0 1"
    ]),
    new DecTask("087", 1427, [
        "execute if entity @s[hasitem={item=dec:chocolates,quantity=64..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:chocolates 0 64"
    ]),
    new DecTask("088", 1213, [
        "execute if entity @s[hasitem={item=dec:gingerbread_man,quantity=16..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:gingerbread_man 0 16"
    ]),
    new DecTask("089", 746, [
        "execute if entity @s[hasitem={item=dec:gingerbread_sword}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:gingerbread_sword 0 1"
    ]),
    new DecTask("090", 754, [
        "execute if entity @s[hasitem={item=dec:candy_cane}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:candy_cane 0 1"
    ]),
    new DecTask("091", 781, [
        "execute if entity @s[hasitem={item=dec:gingerbread_totem}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:gingerbread_totem 0 1"
    ]),
    new DecTask("092", 542, [
        "execute if entity @s[hasitem={item=dec:sardine,quantity=15..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:sardine 0 15"
    ]),
    new DecTask("093", 1312, [
        "execute if entity @s[hasitem={item=dec:leek_cooked,quantity=81..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:leek_cooked 0 81"
    ]),
    new DecTask("094", 572, [
        "execute if entity @s[hasitem={item=dec:ice_cream,quantity=3..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:ice_cream 0 3"
    ]),
    new DecTask("095", 711, [
        "execute if entity @s[hasitem={item=dec:magic_ice_cream}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dec:magic_ice_cream 0 1"
    ]),
    new DecTask("096", 157, [
        "execute if entity @s[hasitem={item=baked_potato}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s baked_potato 0 1"
    ]),
    new DecTask("097", 1170, [
        "execute if entity @s[hasitem={item=beetroot,quantity=77..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s beetroot 0 77"
    ]),
    new DecTask("098", 312, [
        "execute if entity @s[hasitem={item=bread,quantity=18..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s bread 0 18"
    ]),
    new DecTask("099", 127, [
        "execute if entity @s[hasitem={item=cake}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s cake 0 1"
    ]),
    new DecTask("100", 1210, [
        "execute if entity @s[hasitem={item=carrot,quantity=72..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s carrot 0 72"
    ]),
    new DecTask("101", 1241, [
        "execute if entity @s[hasitem={item=chorus,quantity=251..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s chorus 0 251"
    ]),
    new DecTask("102", 1512, [
        "execute if entity @s[hasitem={item=cooked_chicken,quantity=73..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s cooked_chicken 0 73"
    ]),
    new DecTask("103", 1572, [
        "execute if entity @s[hasitem={item=cooked_salmon,quantity=72..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s cooked_salmon 0 72"
    ]),
    new DecTask("104", 1542, [
        "execute if entity @s[hasitem={item=cooked_cod,quantity=72..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s cooked_cod 0 72"
    ]),
    new DecTask("105", 1542, [
        "execute if entity @s[hasitem={item=cooked_porkchop,quantity=71..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s cooked_porkchop 0 71"
    ]),
    new DecTask("106", 741, [
        "execute if entity @s[hasitem={item=rabbit,quantity=71..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s rabbit 0 71"
    ]),
    new DecTask("107", 1513, [
        "execute if entity @s[hasitem={item=cooked_salmon,quantity=217..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s cooked_salmon 0 217"
    ]),
    new DecTask("108", 774, [
        "execute if entity @s[hasitem={item=cookie,quantity=71..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s cookie 0 71"
    ]),
    new DecTask("109", 794, [
        "execute if entity @s[hasitem={item=dried_kelp,quantity=81..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s dried_kelp 0 81"
    ]),
    new DecTask("110", 721, [
        "execute if entity @s[hasitem={item=pumpkin_pie,quantity=21..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s pumpkin_pie 0 21"
    ]),
    new DecTask("111", 711, [
        "execute if entity @s[hasitem={item=sweet_berries,quantity=417..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s sweet_berries 0 417"
    ]),
    new DecTask("112", 320, [
        "execute if entity @s[hasitem={item=glow_berries,quantity=423..}] run tag @s add task_complete",
        "execute if entity @s[tag=task_complete] run clear @s glow_berries 0 423"
    ]),
    new DecTask("113", 300, [
        "execute if entity @s[lm=40] run tag @s add task_complete"
    ]),
];
export let PomTasks = DecTasks.concat([
//new DecTask("500", 100, (ep) => true,(ep) => ep.damage(100))
]);
const task_arr = ["Ao", "Jf", "Sk", "Ch", "Om", "Bs", "Hd", "Oa", "Gx", "Xe"];
export function taskTranToNum(t) {
    return t.split(" ").map(e => task_arr.indexOf(e)).join('');
}
export function numTranToTask(n) {
    return n.split('').map(e => task_arr[parseInt(e)]).join(" ");
}
export function taskUi(p, i) {
    let ui = new ActionFormData();
    ui = ui.title("text.dec:task_choose_title.name");
    ui = ui.body("text.dec:task_choose_body.name");
    let lor = i.getLore();
    lor.forEach(l => {
        ui = ui.button(l);
    });
    ui.show(p.player).then(s => {
        if (s.selection != undefined) {
            let ch_t = lor[s.selection];
            let ch_n = taskTranToNum(ch_t);
            //p.runCommandAsync("say "+ch_n)
            taskUiChoose(p, ch_n);
        }
    });
}
export function taskUiChoose(p, id) {
    let ui_ch = new ActionFormData().button("text.dec:task_complete_button.name");
    const index = DecTasks.findIndex(t => t.id === id);
    if (index === -1) {
        return;
    }
    ui_ch.title(DecTasks[index].title())
        .body(DecTasks[index].body())
        .show(p.player).then(s => {
        if (s.selection == 0) {
            DecTasks[index].dec_detect(p.exPlayer);
        }
    });
}
//# sourceMappingURL=Task.js.map