##作弊后开启
execute unless score DieMode global = one global if score AlreadyGmCheat global = one global as @s[tag=owner] run tellraw @a { "rawtext" : [ { "translate" : "text.dec:diemode_gmcheat.name" } ] }

##死亡过开启
execute unless score DieMode global = one global if score AlreadyDie global = one global as @s[tag=owner,tag=alreadydie] run tellraw @a { "rawtext" : [ { "translate" : "text.dec:diemode_already_die.name" } ] }

##成员开启，并拒绝
execute unless score DieMode global = one global as @s[tag=!owner] run tellraw @s { "rawtext" : [ { "translate" : "text.dec:diemode_not_owner.name" } ] }

##已开启，并没有死亡
execute if score DieMode global = one global as @s[tag=!alreadydie] run tellraw @s { "rawtext" : [ { "translate" : "text.dec:diemode_cannot_close.name" } ] }

##已开启，已经死亡
execute if score DieMode  global = one global as @s[tag=alreadydie] run tellraw @s { "rawtext" : [ { "translate" : "text.dec:diemode_cannot_close_already_die.name" } ] }

##正常开启
execute unless score DieMode global = one global unless score AlreadyDie global = one global unless score AlreadyGmCheat global = one global as @s[tag=owner] run tellraw @a { "rawtext" : [ { "translate" : "text.dec:diemode_open.name" } ] }
execute unless score DieMode global = one global unless score AlreadyDie global = one global unless score AlreadyGmCheat global = one global as @s[tag=owner] run scoreboard players set DieMode global 1