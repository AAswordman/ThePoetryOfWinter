scoreboard players set @s skill_count 0
tag @s add blood_mare_skill
particle dec:blood_mare_particle ^^^1
particle dec:blood_spore_sweep_particle ^^^1
execute positioned ^^^1 if entity @e[tag=!blood_mare_skill,type=!item,r=1.3] run effect @s regeneration 4 0
execute positioned ^^^1 run damage @e[tag=!blood_mare_skill,type=!item,r=1.3] 8 entity_attack entity @s
playanimation @s animation.humanoid.brandish
tag @s remove blood_mare_skill