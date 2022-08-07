
##召唤标语
execute positioned as @a[tag=entity_soul_spawn] run tellraw @a { "rawtext" : [ { "translate" : "text.dec:summon_entity_soul.name" } ] }
execute positioned as @a[tag=predators_spawn] run tellraw @a { "rawtext" : [ { "translate" : "text.dec:summon_predators.name" } ] }
execute positioned as @e[tag=abyssal_controller_spawn] run tellraw @a { "rawtext" : [ { "translate" : "text.dec:summon_abyssal_controller.name" } ] }
execute positioned as @e[tag=king_of_pillager_spawn] run tellraw @a { "rawtext" : [ { "translate" : "text.dec:summon_king_of_pillager.name" } ] }
execute positioned as @e[tag=ash_knight_spawn] run tellraw @a { "rawtext" : [ { "translate" : "text.dec:summon_ash_knight.name" } ] }
execute positioned as @e[tag=enchant_illager_spawn] run tellraw @a { "rawtext" : [ { "translate" : "text.dec:summon_enchant_illager.name" } ] }
execute positioned as @e[tag=host_of_deep_spawn] run tellraw @a { "rawtext" : [ { "translate" : "text.dec:summon_host_of_deep.name" } ] }
execute positioned as @e[tag=radiate_crystal_spawn] run tellraw @a { "rawtext" : [ { "translate" : "text.dec:summon_radiate_crystal.name" } ] }

tag @a[tag=abyssal_controller_spawn] remove abyssal_controller_spawn
tag @a[tag=king_of_pillager_spawn] remove king_of_pillager_spawn
tag @a[tag=predators_spawn] remove predators_spawn
tag @a[tag=entity_soul_spawn] remove entity_soul_spawn
tag @a[tag=ash_knight_spawn] remove ash_knight_spawn
tag @a[tag=enchant_illager_spawn] remove enchant_illager_spawn
tag @a[tag=host_of_deep_spawn] remove host_of_deep_spawn
tag @a[tag=radiate_crystal_spawn] remove radiate_crystal_spawn

##实体灵魂
execute positioned as @e[type=dec:shadow_soul_1] run effect @e[type=dec:entity_soul_1,c=1] strength 2 1
execute positioned as @e[type=dec:shadow_soul_2] run effect @e[type=dec:entity_soul_1,c=1] speed 2 1

##储存者召唤（不是BOSS！！！！！）
execute positioned as @e[type=item,name=§r§r§r§r§r§r§r§r§r§r魔法箱子碎片§r§r§r§r§r§r§r§r§r§r] run detect ~~-0.1~ dec:summoner 0 summon dec:chester
execute positioned as @e[type=item,name=§r§r§r§r§r§r§r§r§r§r魔法箱子碎片§r§r§r§r§r§r§r§r§r§r] run detect ~~-0.1~ dec:summoner 0 kill @s

##Boss召唤

execute positioned as @e[type=item,name=§r§r§r§r§r§r§r§r§r§c神秘的邀请函§r§r§r§r§r§r§r§r§r§r] run detect ~~-0.1~ dec:summoner 0 tag @p add king_of_pillager_spawn
execute positioned as @e[type=item,name=§r§r§r§r§r§r§r§r§r§c神秘的邀请函§r§r§r§r§r§r§r§r§r§r] run detect ~~-0.1~ dec:summoner 0 summon dec:king_of_pillager
execute positioned as @e[type=item,name=§r§r§r§r§r§r§r§r§r§c神秘的邀请函§r§r§r§r§r§r§r§r§r§r] run detect ~~-0.1~ dec:summoner 0 kill @s


execute positioned as @e[type=item,name=§r§r§r§r§r§r§r§r§r§c黑暗石§r§r§r§r§r§r§r§r§r§r] run detect ~~-0.1~ dec:summoner 0 tag @p add abyssal_controller_spawn
execute positioned as @e[type=item,name=§r§r§r§r§r§r§r§r§r§c黑暗石§r§r§r§r§r§r§r§r§r§r] run detect ~~-0.1~ dec:summoner 0 summon dec:abyssal_controller
execute positioned as @e[type=item,name=§r§r§r§r§r§r§r§r§r§c黑暗石§r§r§r§r§r§r§r§r§r§r] run detect ~~-0.1~ dec:summoner 0 kill @s


execute positioned as @e[type=item,name=§r§r§r§r§r§r§r§r§r§c实体灵魂§r§r§r§r§r§r§r§r§r§r] run detect ~~-0.1~ dec:summoner 0 tag @p add entity_soul_spawn
execute positioned as @e[type=item,name=§r§r§r§r§r§r§r§r§r§c实体灵魂§r§r§r§r§r§r§r§r§r§r] run detect ~~-0.1~ dec:summoner 0 summon dec:entity_soul
execute positioned as @e[type=item,name=§r§r§r§r§r§r§r§r§r§c实体灵魂§r§r§r§r§r§r§r§r§r§r] run detect ~~-0.1~ dec:summoner 0 kill @s


execute positioned as @e[type=item,name=§r§r§r§r§r§r§r§r§r§c灰烬挑战书§r§r§r§r§r§r§r§r§r§r] run detect ~~-0.1~ dec:summoner 0 tag @p add ash_knight_spawn
execute positioned as @e[type=item,name=§r§r§r§r§r§r§r§r§r§c灰烬挑战书§r§r§r§r§r§r§r§r§r§r] run detect ~~-0.1~ dec:summoner 0 summon dec:ash_knight
execute positioned as @e[type=item,name=§r§r§r§r§r§r§r§r§r§c灰烬挑战书§r§r§r§r§r§r§r§r§r§r] run detect ~~-0.1~ dec:summoner 0 kill @s


execute positioned as @e[type=item,name=§r§r§r§r§r§r§r§r§r§c蝙蝠诱饵§r§r§r§r§r§r§r§r§r§r] run detect ~~-0.1~ dec:summoner 0 tag @p add predators_spawn
execute positioned as @e[type=item,name=§r§r§r§r§r§r§r§r§r§c蝙蝠诱饵§r§r§r§r§r§r§r§r§r§r] run detect ~~-0.1~ dec:summoner 0 summon dec:predators
execute positioned as @e[type=item,name=§r§r§r§r§r§r§r§r§r§c蝙蝠诱饵§r§r§r§r§r§r§r§r§r§r] run detect ~~-0.1~ dec:summoner 0 kill @s

execute positioned as @e[type=item,name=§r§r§r§r§r§r§r§r§r§c暗黑珍珠§r§r§r§r§r§r§r§r§r§r] run detect ~~-0.1~ dec:summoner 0 tag @p add enchant_illager_spawn
execute positioned as @e[type=item,name=§r§r§r§r§r§r§r§r§r§c暗黑珍珠§r§r§r§r§r§r§r§r§r§r] run detect ~~-0.1~ dec:summoner 0 summon dec:enchant_illager
execute positioned as @e[type=item,name=§r§r§r§r§r§r§r§r§r§c暗黑珍珠§r§r§r§r§r§r§r§r§r§r] run detect ~~-0.1~ dec:summoner 0 kill @s

execute positioned as @e[type=item,name=§r§r§r§r§r§r§r§r§r§c深渊之书§r§r§r§r§r§r§r§r§r§r] run detect ~~-0.1~ dec:summoner 0 tag @p add host_of_deep_spawn
execute positioned as @e[type=item,name=§r§r§r§r§r§r§r§r§r§c深渊之书§r§r§r§r§r§r§r§r§r§r] run detect ~~-0.1~ dec:summoner 0 particle dec:host_of_deep_spawn_particle ~~~
execute positioned as @e[type=item,name=§r§r§r§r§r§r§r§r§r§c深渊之书§r§r§r§r§r§r§r§r§r§r] run detect ~~-0.1~ dec:summoner 0 summon dec:host_of_deep
execute positioned as @e[type=item,name=§r§r§r§r§r§r§r§r§r§c深渊之书§r§r§r§r§r§r§r§r§r§r] run detect ~~-0.1~ dec:summoner 0 kill @s

execute positioned as @e[type=item,name=§r§r§r§r§r§r§r§r§r§c辐射水晶§r§r§r§r§r§r§r§r§r§r] run detect ~~-0.1~ dec:summoner 0 tag @p add radiate_crystal_spawn
execute positioned as @e[type=item,name=§r§r§r§r§r§r§r§r§r§c辐射水晶§r§r§r§r§r§r§r§r§r§r] run detect ~~-0.1~ dec:summoner 0 summon dec:radiate_crystal
execute positioned as @e[type=item,name=§r§r§r§r§r§r§r§r§r§c辐射水晶§r§r§r§r§r§r§r§r§r§r] run detect ~~-0.1~ dec:summoner 0 kill @s