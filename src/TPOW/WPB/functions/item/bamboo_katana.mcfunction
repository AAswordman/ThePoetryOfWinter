scoreboard players set @s skill_count 0
tag @s add bamboo_katana_skill
particle dec:bamboo_katana_particle ^^^1
execute positioned ^^^1 run damage @e[tag=!bamboo_katana_skill,type=!item,r=1.2] 4 entity_attack entity @s
playanimation @s animation.humanoid.brandish
tag @s remove bamboo_katana_skill