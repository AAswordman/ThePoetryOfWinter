tellraw @s[tag=load_ok] { "rawtext" : [ { "translate" : "text.dec:load_ok.name" } ] }
tellraw @s[tag=!load_ok] { "rawtext" : [ { "translate" : "text.dec:load_fail.name" } ] }
tag @s remove load_ok