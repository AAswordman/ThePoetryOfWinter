scoreboard players set @s skill_count 0
tag @s add illager_sword_skill
particle dec:illager_sword_particle ^^^1
execute positioned ^^^1 run damage @e[tag=!illager_sword_skill,type=!item,r=1.4] 6 entity_attack entity @s
playanimation @s animation.humanoid.brandish
tag @s remove illager_sword_skill