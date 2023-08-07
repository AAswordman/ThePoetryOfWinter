scoreboard players set @s skill_count 0
tag @s add absolute_zero_skill
particle dec:absolute_zero_particle ^^^1
particle dec:absolute_zero_smoke_particle ^^^1
execute positioned ^^^1 run effect @e[tag=!absolute_zero_skill,type=!item,r=2] slowness 10 0
execute positioned ^^^1 run damage @e[tag=!absolute_zero_skill,type=!item,r=2] 14 entity_attack entity @s
playanimation @s animation.humanoid.brandish
tag @s remove absolute_zero_skill