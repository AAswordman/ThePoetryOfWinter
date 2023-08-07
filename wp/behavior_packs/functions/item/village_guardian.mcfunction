execute if entity @e[family=boss,r=64] run tellraw @s { "rawtext" : [ { "translate" : "text.dec:village_guardian_fail_boss.name" } ] }
execute unless entity @e[family=boss,r=64] unless entity @s[rxm=-90,rx=-80] run tellraw @s { "rawtext" : [ { "translate" : "text.dec:village_guardian_fail_rotate.name" } ] }
execute unless entity @e[family=boss,r=64] run tag @s[rxm=-90,rx=-80] add village_guardian_skill
execute if entity @s[tag=village_guardian_skill] run summon dec:village_portal ~~~
playanimation @s animation.humanoid.rise_one_hand
scoreboard players remove @s[tag=village_guardian_skill] wbfl 19
tag @s remove village_guardian_skill