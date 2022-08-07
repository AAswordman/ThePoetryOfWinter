##末影祭坛
execute positioned as @a[scores={wbfl=20..}] run detect ~~-0.1~ dec:end_altar 0 tag @s add tp
scoreboard players remove @a[tag=tp] wbfl 20
execute positioned as @a[tag=tp] run spreadplayers ~ ~ 1 64 @s
tag @a[tag=tp] remove tp

##溪流矿
execute positioned as @e[type=lightning_bolt] run fill ~-1 ~-1 ~-1 ~1 ~1 ~1 dec:stream_ore 0 replace iron_ore 0

##流动块一级
execute positioned as @a[scores={wbfl=..40}] run detect ~ ~-0.1 ~ dec:flowing_block_1 0 tag @s add flowing_block_1
execute positioned as @a[scores={wbfl=..40}] run detect ~ ~-0.1 ~ dec:flowing_block_1 0 setblock ~~-0.1 ~ dec:flowing_block_0
scoreboard players add @a[tag=flowing_block_1] wbfl 20
execute positioned as @a[tag=flowing_block_1] run particle dec:white_star_particle ~~~
execute positioned as @a[tag=flowing_block_1] run particle dec:white_star_particle ~~~
execute positioned as @a[tag=flowing_block_1] run particle dec:white_star_particle ~~~
execute positioned as @a[tag=flowing_block_1] run particle dec:white_star_particle ~~~
execute positioned as @a[tag=flowing_block_1] run particle dec:white_star_particle ~~~
tag @a remove flowing_block_1

##流动块二级
execute positioned as @a[scores={wbfl=..35}] run detect ~ ~-0.1 ~ dec:flowing_block_2 0 tag @s add flowing_block_2
execute positioned as @a[scores={wbfl=..35}] run detect ~ ~-0.1 ~ dec:flowing_block_2 0 setblock ~~-0.1 ~ dec:flowing_block_0
scoreboard players add @a[tag=flowing_block_2] wbfl 25
execute positioned as @a[tag=flowing_block_2] run particle dec:white_star_particle ~~~
execute positioned as @a[tag=flowing_block_2] run particle dec:white_star_particle ~~~
execute positioned as @a[tag=flowing_block_2] run particle dec:white_star_particle ~~~
execute positioned as @a[tag=flowing_block_2] run particle dec:white_star_particle ~~~
execute positioned as @a[tag=flowing_block_2] run particle dec:white_star_particle ~~~
tag @a remove flowing_block_2

##流动块三级
execute positioned as @a[scores={wbfl=..25}] run detect ~ ~-0.1 ~ dec:flowing_block_3 0 tag @s add flowing_block_3
execute positioned as @a[scores={wbfl=..25}] run detect ~ ~-0.1 ~ dec:flowing_block_3 0 setblock ~~-0.1 ~ dec:flowing_block_0
scoreboard players add @a[tag=flowing_block_3] wbfl 35
execute positioned as @a[tag=flowing_block_3] run particle dec:white_star_particle ~~~
execute positioned as @a[tag=flowing_block_3] run particle dec:white_star_particle ~~~
execute positioned as @a[tag=flowing_block_3] run particle dec:white_star_particle ~~~
execute positioned as @a[tag=flowing_block_3] run particle dec:white_star_particle ~~~
execute positioned as @a[tag=flowing_block_3] run particle dec:white_star_particle ~~~
tag @a remove flowing_block_3

##流动块四级
execute positioned as @a[scores={wbfl=..10}] run detect ~ ~-0.1 ~ dec:flowing_block_4 0 tag @s add flowing_block_4
execute positioned as @a[scores={wbfl=..10}] run detect ~ ~-0.1 ~ dec:flowing_block_4 0 setblock ~~-0.1 ~ dec:flowing_block_0
scoreboard players add @a[tag=flowing_block_4] wbfl 50
execute positioned as @a[tag=flowing_block_4] run particle dec:white_star_particle ~~~
execute positioned as @a[tag=flowing_block_4] run particle dec:white_star_particle ~~~
execute positioned as @a[tag=flowing_block_4] run particle dec:white_star_particle ~~~
execute positioned as @a[tag=flowing_block_4] run particle dec:white_star_particle ~~~
execute positioned as @a[tag=flowing_block_4] run particle dec:white_star_particle ~~~
tag @a remove flowing_block_4

##潜影蘑菇
execute positioned as @a run fill ~-5 ~-5 ~-5 ~5 ~5 ~5 dec:lurk_mushroom_lit 0 replace dec:lurk_mushroom 0

##监视者
execute positioned as @a[m=!1] run fill ~-4 ~-4 ~-4 ~4 ~4 ~4 dec:monitor_activated 0 replace dec:monitor 0

##潜影末地石
execute positioned as @e run detect ~~-0.1~ dec:lurk_end_stone 0 effect @s slowness 2 0

##辐射土
execute positioned as @e[type=!dec:werewolf,type=!dec:dark_werewolf,type=!dec:radiate_creeper,type=!dec:radiate_skeleton,type=!dec:radiate_enderman,type=!zombie,type=!dec:radiate_spider] run detect ~~-0.1~ dec:radiate_dirt 0 effect @s poison 5 0
execute positioned as @e[scores={wbfl=1..}] run detect ~~-0.1~ dec:radiate_dirt 0 scoreboard players remove @s wbfl 1

##辐射石头
execute positioned as @e[type=!dec:werewolf,type=!dec:dark_werewolf,type=!dec:radiate_creeper,type=!dec:radiate_skeleton,type=!dec:radiate_enderman,type=!zombie,type=!dec:radiate_spider] run detect ~~-0.1~ dec:radiate_stone 0 effect @s poison 5 0
execute positioned as @e[scores={wbfl=1..}] run detect ~~-0.1~ dec:radiate_stone 0 scoreboard players remove @s wbfl 1

##辐射石砖
execute positioned as @e[type=!dec:werewolf,type=!dec:dark_werewolf,type=!dec:radiate_creeper,type=!dec:radiate_skeleton,type=!dec:radiate_enderman,type=!zombie,type=!dec:radiate_spider] run detect ~~-0.1~ dec:radiate_stonebrick 0 effect @s poison 5 0
execute positioned as @e[scores={wbfl=1..}] run detect ~~-0.1~ dec:radiate_stonebrick 0 scoreboard players remove @s wbfl 1