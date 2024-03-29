scoreboard players set AlreadyDie global 1
summon dec:gravestone ~~~
xp -1L @s
execute if entity @e[r=64,family=boss] run tellraw @a { "rawtext" : [ { "translate" : "text.dec:killed_by_boss.name" } ] }