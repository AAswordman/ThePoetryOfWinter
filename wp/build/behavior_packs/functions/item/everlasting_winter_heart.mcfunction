execute if score IsNight global = zero global run tellraw @s { "rawtext" : [ { "translate" : "text.dec:everlasting_winter_heart_day.name" } ] }
execute if score IsNight global = four global if score NightRandom global = four global run tellraw @s { "rawtext" : [ { "translate" : "text.dec:everlasting_winter_heart_already.name" } ] }
execute if score IsNight global = one global unless score NightRandom global = four global run tag @s add everlasting_winter_heart_skill
execute if entity @s[tag=everlasting_winter_heart_skill] run tellraw @a { "rawtext" : [ { "translate" : "text.dec:everlasting_winter_heart_success.name" } ] }
execute if entity @s[tag=everlasting_winter_heart_skill] run scoreboard players set NightRandom global 4
execute if entity @s[tag=everlasting_winter_heart_skill] run clear @s dec:everlasting_winter_heart 0 1
execute if entity @s[tag=everlasting_winter_heart_skill] run playsound conduit.activate @a ~~~
tag @s remove everlasting_winter_heart_skill