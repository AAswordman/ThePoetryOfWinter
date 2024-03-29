scoreboard players set @s skill_count 0
tag @s add steel_battleaxe_skill
particle dec:steel_battleaxe_ring_particle ~~0.5~
particle dec:steel_battleaxe_ring_particle ~~0.5~
particle dec:steel_battleaxe_ring_particle ~~0.5~
damage @e[tag=!steel_battleaxe_skill,type=!item,x=~,y=~,z=~1,r=1.3] 8 entity_attack entity @s
damage @e[tag=!steel_battleaxe_skill,type=!item,x=~,y=~,z=~-1,r=1.3] 8 entity_attack entity @s
damage @e[tag=!steel_battleaxe_skill,type=!item,x=~1,y=~,z=~,r=1.3] 8 entity_attack entity @s
damage @e[tag=!steel_battleaxe_skill,type=!item,x=~-1,y=~,z=~,r=1.3] 8 entity_attack entity @s
playanimation @s animation.humanoid.rolling
tag @s remove steel_battleaxe_skill