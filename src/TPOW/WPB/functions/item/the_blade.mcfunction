scoreboard players set @s skill_count 0
tag @s add the_blade_skill
particle dec:the_blade_particle ^^^1
execute positioned ^^^1 run damage @e[tag=!the_blade_skill,type=!item,r=1.3] 3 entity_attack entity @s
playanimation @s animation.humanoid.brandish
tag @s remove the_blade_skill