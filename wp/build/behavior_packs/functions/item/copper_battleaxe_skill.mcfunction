scoreboard players set @s skill_count 0
tag @s add copper_battleaxe_skill
particle dec:copper_battleaxe_ring_particle ~~0.5~
particle dec:copper_battleaxe_ring_particle ~~0.5~
particle dec:copper_battleaxe_ring_particle ~~0.5~
damage @e[tag=!copper_battleaxe_skill,type=!item,x=~,y=~,z=~1,r=1.3] 6 entity_attack entity @s
damage @e[tag=!copper_battleaxe_skill,type=!item,x=~,y=~,z=~-1,r=1.3] 6 entity_attack entity @s
damage @e[tag=!copper_battleaxe_skill,type=!item,x=~1,y=~,z=~,r=1.3] 6 entity_attack entity @s
damage @e[tag=!copper_battleaxe_skill,type=!item,x=~-1,y=~,z=~,r=1.3] 6 entity_attack entity @s
playanimation @s animation.humanoid.rolling
tag @s remove copper_battleaxe_skill