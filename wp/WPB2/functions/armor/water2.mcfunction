scoreboard players set @s wbkjlq 15
scoreboard players set @s wbkjlqzh 15
scoreboard players set @s wbkjlqcg 15
tag @s add wbkjlq

execute as @s[tag=!wbmsyh] run effect @e[r=6,rm=1] wither 3 3 true
execute as @s[tag=wbmsyh] run effect @e[r=6,rm=1,tag=!wbmsyh] wither 3 3 true
particle wb:armor_water_par ~~~
