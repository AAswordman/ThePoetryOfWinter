execute if score IsNight global = zero global run tellraw @s { "rawtext" : [ { "translate" : "text.dec:blood_meat_day.name" } ] }
execute if score IsNight global = one global if score NightRandom global = one global run tellraw @s { "rawtext" : [ { "translate" : "text.dec:blood_meat_already.name" } ] }
execute if score IsNight global = one global unless score NightRandom global = one global run tag @s add blood_meat_skill
execute if entity @s[tag=blood_meat_skill] run tellraw @a { "rawtext" : [ { "translate" : "text.dec:blood_meat_success.name" } ] }
execute if entity @s[tag=blood_meat_skill] run scoreboard players set NightRandom global 1
execute if entity @s[tag=blood_meat_skill] run scoreboard players set @a night_event 1
execute if entity @s[tag=blood_meat_skill] run clear @s dec:blood_meat 0 1
execute if entity @s[tag=blood_meat_skill] run playsound mob.drowned.say @a ~~~
tag @s remove blood_meat_skill