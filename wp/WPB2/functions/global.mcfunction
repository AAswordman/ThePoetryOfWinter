gamerule doimmediaterespawn false

function boss
function block

tag @a remove shot
tag @a remove shot_offhand

execute at @e[type=fireball] run particle dec:fire_wake_particle ~~~
execute at @e[type=dragon_fireball] run particle dec:ender_wake_particle ~~~

execute if score IsDay global = one global run scoreboard players set NightRandom global 0
execute if score IsDay global = zero global run scoreboard players operation @a night_event = NightRandom global

##死亡模式组件
execute if score DieMode global = one global if score AlreadyDie global = one global if entity @a[tag=alreadydie] run titleraw @a[tag=alreadydie] actionbar { "rawtext" : [ { "translate" : "text.dec:diemode_spectator.name" } ] }
execute if score DieMode global = one global if score AlreadyGmCheat global = one global if entity @a[tag=diemode_gmcheat] run titleraw @a[tag=diemode_gmcheat] actionbar { "rawtext" : [ { "translate" : "text.dec:diemode_gmcheat.name" } ] }
execute if score DieMode global = one global run gamemode spectator @a[tag=alreadydie]
execute if score DieMode global = one global if entity @a[tag=alreadydie] run gamerule sendcommandfeedback false
execute if score DieMode global = one global run gamemode spectator @a[tag=diemode_gmcheat]
execute if score DieMode global = one global if entity @a[tag=diemode_gmcheat] run gamerule sendcommandfeedback false
execute if score DieMode global = one global run difficulty hard

##打败末影龙标记
execute as @r[tag=wbstartkeyok] at @s run tag @r[tag=!wbstartkeyok] add wbstartkeyok

##控制高级锭
clear @a[tag=!wbstartkeyok] wb:mineral_senior_boundary
clear @a[tag=!wbstartkeyok] wb:mineral_senior_equipment
clear @a[tag=!wbstartkeyok] wb:mineral_senior_forget
clear @a[tag=!wbstartkeyok] wb:mineral_senior_ink
clear @a[tag=!wbstartkeyok] wb:mineral_senior_water
clear @a[tag=!wbstartkeyok] wb:mineral_senior_seal
