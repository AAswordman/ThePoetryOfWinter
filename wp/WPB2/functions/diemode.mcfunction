##正常开启
execute @s[tag=owner,tag=!diemode,tag=!alreadydie] ~~~ tellraw @a { "rawtext" : [ { "translate" : "text.dec:diemode_open.name" } ] }
tag @s[tag=owner,tag=!diemode] add diemode

##死亡过开启
execute @s[tag=owner,tag=!diemode,tag=alreadydie] ~~~ tellraw @a { "rawtext" : [ { "translate" : "text.dec:diemode_already_die.name" } ] }

##成员开启，并拒绝
execute @s[tag=!owner,tag=!diemode] ~~~ tellraw @s { "rawtext" : [ { "translate" : "text.dec:diemode_not_owner.name" } ] }

##已开启，并没有死亡
execute @s[tag=diemode,tag=!alreadydie] ~~~ tellraw @s { "rawtext" : [ { "translate" : "text.dec:diemode_cannot_close.name" } ] }

##已开启，已经死亡
execute @s[tag=diemode,tag=alreadydie] ~~~ tellraw @s { "rawtext" : [ { "translate" : "text.dec:diemode_cannot_close_already_die.name" } ] }