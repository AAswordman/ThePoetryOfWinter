##死亡模式防创造
execute if entity @a[m=1] run scoreboard players set AlreadyGmCheat global 1
execute if score DieMode global = one global if entity @a[m=1] run tag @a[m=1] add diemode_gmcheat

##召唤标语
execute as @e[tag=ash_knight_spawn] run tellraw @a { "rawtext" : [ { "translate" : "text.dec:summon_ash_knight.name" } ] }
execute as @e[tag=radiate_crystal_spawn] run tellraw @a { "rawtext" : [ { "translate" : "text.dec:summon_radiate_crystal.name" } ] }

tag @a[tag=ash_knight_spawn] remove ash_knight_spawn
tag @a[tag=radiate_crystal_spawn] remove radiate_crystal_spawn

##储存者召唤（不是BOSS！！！！！）
execute as @e[type=item,name=§r§r§r§r§r§r§r§r§r§r魔法箱子碎片§r§r§r§r§r§r§r§r§r§r] at @s if block ~~-0.1~ dec:summoner 0 run summon dec:chester
execute as @e[type=item,name=§r§r§r§r§r§r§r§r§r§r魔法箱子碎片§r§r§r§r§r§r§r§r§r§r] at @s if block ~~-0.1~ dec:summoner 0 run kill @s

##Boss召唤
execute as @e[type=item,name=§r§r§r§r§r§r§r§r§r§c灰烬挑战书§r§r§r§r§r§r§r§r§r§r] at @s if block ~~-0.1~ dec:summoner 0 run tag @p add ash_knight_spawn
execute as @e[type=item,name=§r§r§r§r§r§r§r§r§r§c灰烬挑战书§r§r§r§r§r§r§r§r§r§r] at @s if block ~~-0.1~ dec:summoner 0 run summon dec:ash_knight
execute as @e[type=item,name=§r§r§r§r§r§r§r§r§r§c灰烬挑战书§r§r§r§r§r§r§r§r§r§r] at @s if block ~~-0.1~ dec:summoner 0 run kill @s

execute as @e[type=item,name=§r§r§r§r§r§r§r§r§r§c辐射水晶§r§r§r§r§r§r§r§r§r§r] at @s if block ~~-0.1~ dec:summoner 0 run tag @p add radiate_crystal_spawn
execute as @e[type=item,name=§r§r§r§r§r§r§r§r§r§c辐射水晶§r§r§r§r§r§r§r§r§r§r] at @s if block ~~-0.1~ dec:summoner 0 run summon dec:radiate_crystal
execute as @e[type=item,name=§r§r§r§r§r§r§r§r§r§c辐射水晶§r§r§r§r§r§r§r§r§r§r] at @s if block ~~-0.1~ dec:summoner 0 run kill @s

##Boss战设置
execute as @e[family=boss] run kill @e[type=boat,r=3]
execute as @e[family=boss] run kill @e[type=minecart,r=3]
effect @e[family=boss] levitation 0
execute as @e[family=mini_boss] run kill @e[type=boat,r=3]
execute as @e[family=mini_boss] run kill @e[type=minecart,r=3]