scoreboard players set @s wbkjlq 25
scoreboard players set @s wbkjlqzh 25
scoreboard players set @s wbkjlqcg 25
tag @s add wbkjlq

execute as @s[tag=!wbmsyh] run effect @e[r=6,rm=2] wither 3 3 true
execute as @s[tag=wbmsyh] run effect @e[r=6,rm=2,tag=!wbmsyh] wither 3 3 true
particle wb:armor_water_par ~~~
