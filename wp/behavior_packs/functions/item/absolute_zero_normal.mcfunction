scoreboard players set @s skill_count 0
tag @s add absolute_zero_skill
particle dec:absolute_zero_particle ^^^1
particle dec:absolute_zero_smoke_small_particle ^^^1
execute positioned ^^^1 run effect @e[tag=!absolute_zero_skill,type=!item,r=1.1] slowness 4 0
execute positioned ^^^1 run damage @e[tag=!absolute_zero_skill,type=!item,r=1.1] 7 entity_attack entity @s
playanimation @s animation.humanoid.brandish
tag @s remove absolute_zero_skill