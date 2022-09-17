##正常开启
execute as @s[tag=owner,tag=!diemode,tag=!alreadydie] at @s run tellraw @a { "rawtext" : [ { "translate" : "text.dec:diemode_open.name" } ] }
tag @s[tag=owner,tag=!diemode] add diemode

##死亡过开启
execute as @s[tag=owner,tag=!diemode,tag=alreadydie] at @s run tellraw @a { "rawtext" : [ { "translate" : "text.dec:diemode_already_die.name" } ] }

##成员开启，并拒绝
execute as @s[tag=!owner,tag=!diemode] at @s run tellraw @s { "rawtext" : [ { "translate" : "text.dec:diemode_not_owner.name" } ] }

##已开启，并没有死亡
execute as @s[tag=diemode,tag=!alreadydie] at @s run tellraw @s { "rawtext" : [ { "translate" : "text.dec:diemode_cannot_close.name" } ] }

##已开启，已经死亡
execute as @s[tag=diemode,tag=alreadydie] at @s run tellraw @s { "rawtext" : [ { "translate" : "text.dec:diemode_cannot_close_already_die.name" } ] }