##作弊后开启
execute unless score DieMode global = one global if score AlreadyGmCheat global = one global as @s run tellraw @a { "rawtext" : [ { "translate" : "text.dec:diemode_test_close_cannot_open_gmc.name" } ] }

##死亡过开启
execute unless score DieMode global = one global if score AlreadyDie global = one global as @s run tellraw @a { "rawtext" : [ { "translate" : "text.dec:diemode_test_close_cannot_open_die.name" } ] }

##已开启
execute if score DieMode  global = one global as @s run tellraw @s { "rawtext" : [ { "translate" : "text.dec:diemode_test_open.name" } ] }

##可正常开启
execute unless score DieMode global = one global unless score AlreadyDie global = one global unless score AlreadyGmCheat global = one global as @s[tag=owner] run tellraw @a { "rawtext" : [ { "translate" : "text.dec:diemode_test_close.name" } ] }