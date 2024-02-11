scoreboard players set @s skill_count 0
tag @s add hard_bamboo_katana_skill
particle dec:hard_bamboo_katana_particle ^^^1
execute positioned ^^^1 run damage @e[tag=!hard_bamboo_katana_skill,type=!item,r=1.2] 5 entity_attack entity @s
playanimation @s animation.humanoid.brandish
tag @s remove hard_bamboo_katana_skill