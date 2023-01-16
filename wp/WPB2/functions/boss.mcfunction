##死亡检测
scoreboard objectives add dierandom dummy
scoreboard objectives add dietest dummy
scoreboard players set @a dietest 0
scoreboard players set @e[type=player] dietest 1
tag @a[scores={dietest=0}] add alreadydie
execute if entity @a[scores={dietest=0}] run scoreboard players set AlreadyDie global 1
execute if entity @a[m=1] run scoreboard players set AlreadyGmCheat global 1
execute if score DieMode global = one global if entity @a[m=1] run tag @a[m=1] add diemode_gmcheat
tag @a[scores={dietest=0}] add dienow
##生成墓碑和鬼魂
execute unless score DieMode global = one global run scoreboard players random @a[tag=dienow,tag=!dieok] dierandom 1 3
execute at @a[tag=dienow,tag=!dieok] run summon dec:gravestone ~~~
execute unless score DieMode global = one global at @a[tag=dienow,tag=!dieok,scores={dierandom=1}] run event entity @e[r=16,type=dec:player_ghost,family=ghost_from_player,c=1] minecraft:despawn
execute unless score DieMode global = one global at @a[tag=dienow,tag=!dieok,scores={dierandom=1}] run summon dec:player_ghost ~~~ minecraft:from_player
execute if score DieMode global = one global at @a[tag=dienow,tag=!dieok] run summon dec:vengeful_ghost ~~~
xp -1L @a[tag=dienow,tag=!dieok]
execute as @a[tag=dienow,tag=!dieok] at @s if entity @e[r=64,family=boss] run tellraw @a { "rawtext" : [ { "translate" : "text.dec:killed_by_boss.name" } ] }
execute as @a[tag=dienow,tag=!dieok] at @s if entity @e[r=64,family=boss] run event entity @e[r=64,family=boss] minecraft:despawn
tag @a[tag=dienow,tag=!dieok] add dieok
tag @e[tag=dienow,tag=dieok,type=player] remove dienow
tag @e[tag=!dienow,tag=dieok,type=player] remove dieok

##召唤标语
execute as @e[tag=abyssal_controller_spawn] run tellraw @a { "rawtext" : [ { "translate" : "text.dec:summon_abyssal_controller.name" } ] }
execute as @e[tag=ash_knight_spawn] run tellraw @a { "rawtext" : [ { "translate" : "text.dec:summon_ash_knight.name" } ] }
execute as @e[tag=radiate_crystal_spawn] run tellraw @a { "rawtext" : [ { "translate" : "text.dec:summon_radiate_crystal.name" } ] }

tag @a[tag=abyssal_controller_spawn] remove abyssal_controller_spawn
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