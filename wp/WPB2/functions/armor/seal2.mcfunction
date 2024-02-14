scoreboard players set @s wbkjlq 15
scoreboard players set @s wbkjlqzh 15
scoreboard players set @s wbkjlqcg 15
tag @s add wbkjlq

execute as @s[tag=!wbmsyh] run effect @e[r=14,rm=1] weakness 10 5 true
execute as @s[tag=wbmsyh] run effect @e[r=14,rm=1,tag=!wbmsyh] slowness 10 5 true
particle wb:armor_seal_par ~~~