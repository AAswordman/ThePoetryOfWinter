##魔法值显示
scoreboard objectives add tens dummy
scoreboard players remove @a[scores={tens=1..}] tens 1
execute @a[scores={tens=..1}] ~ ~ ~ scoreboard objectives remove magicdisplay
scoreboard players set @a[scores={tens=..1}] tens 20
scoreboard objectives add magicdisplay dummy §bwbfl§r
execute @a ~ ~ ~ scoreboard players operation @s magicdisplay = @s wbfl
execute @a[tag=display_on] ~ ~ ~ scoreboard objectives setdisplay sidebar magicdisplay

##声明及重置变量
scoreboard objectives add magicreckontimer dummy
scoreboard objectives add wbflmirror dummy
scoreboard objectives add gametime dummy
scoreboard objectives add wbfl dummy
scoreboard objectives add maxmagic dummy
scoreboard objectives add magicgain dummy
scoreboard objectives add story_random dummy
scoreboard objectives add magicreckon dummy
scoreboard players set @a[tag=!mok] wbfl 20
scoreboard players set @a[tag=!mok] maxmagic 0
scoreboard players set @a[tag=!mok] magicgain 1
scoreboard players set @a[tag=!mok] tens 20
scoreboard players set @a[tag=!mok] magicreckontimer 0
scoreboard players set @a[tag=!mok] magicreckon 0
tag @a[tag=!mok] add hpl1
tag @a[tag=!mok] add mok

##发出声音
execute @e[type=dec:bullet_by_flintlock,tag=!smr] ~ ~ ~ playsound random.explode @a ~~~
execute @e[type=dec:bullet_by_flintlock,tag=!smr] ~ ~ ~ tag @a[r=2,c=1] remove flintlock_shot
execute @e[type=dec:bullet_by_flintlock_pro,tag=!smr] ~ ~ ~ playsound random.explode @a ~~~
execute @e[type=dec:bullet_by_flintlock_pro,tag=!smr] ~ ~ ~ tag @a[r=2,c=1] remove flintlock_pro_shot
execute @e[type=dec:bullet_by_short_flintlock,tag=!smr] ~ ~ ~ playsound random.explode @a ~~~
execute @e[type=dec:bullet_by_short_flintlock,tag=!smr] ~ ~ ~ tag @a[r=2,c=1] remove short_flintlock_shot
##添加标签
tag @e[type=dec:bullet_by_flintlock,tag=!smr] add smr
tag @e[type=dec:bullet_by_flintlock_pro,tag=!smr] add smr
tag @e[type=dec:bullet_by_short_flintlock,tag=!smr] add smr
##添加完成标签
tag @e[type=!player,tag=smr,tag=!smrkill,tag=!smrok] add smrok

##消耗魔法重置魔法计时
execute @a[scores={magicreckontimer=0}] ~ ~ ~ scoreboard players operation @s wbflmirror = @s wbfl
scoreboard players add @a[scores={magicreckontimer=..1}] magicreckontimer 1
execute @a[scores={magicreckontimer=2}] ~ ~ ~ scoreboard players operation @s wbflmirror -= @s wbfl
execute @a[scores={wbflmirror=1..,magicreckontimer=2}] ~ ~ ~ scoreboard players set @s magicreckon 0
execute @a[scores={wbflmirror=1..,magicreckontimer=2}] ~ ~ ~ particle dec:magic_decrease_particle ~~~
scoreboard players set @a[scores={magicreckontimer=2}] magicreckontimer 0

##魔法计时增加
scoreboard players add @a[scores={magicreckon=..129}] magicreckon 1