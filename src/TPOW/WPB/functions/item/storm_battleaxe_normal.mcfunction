scoreboard players set @s skill_count 0
tag @s add storm_battleaxe_skill
particle dec:bubble_ring_particle ~~0.5~
particle dec:bubble_ring_particle ~~0.5~
damage @e[tag=!storm_battleaxe_skill,type=!item,x=~,y=~,z=~2,r=2] 4 entity_attack entity @s
damage @e[tag=!storm_battleaxe_skill,type=!item,x=~,y=~,z=~-2,r=2] 4 entity_attack entity @s
damage @e[tag=!storm_battleaxe_skill,type=!item,x=~2,y=~,z=~,r=2] 4 entity_attack entity @s
damage @e[tag=!storm_battleaxe_skill,type=!item,x=~-2,y=~,z=~,r=2] 4 entity_attack entity @s
damage @e[tag=!storm_battleaxe_skill,type=!item,x=~1,y=~,z=~1,r=2] 4 entity_attack entity @s
damage @e[tag=!storm_battleaxe_skill,type=!item,x=~-1,y=~,z=~1,r=2] 4 entity_attack entity @s
damage @e[tag=!storm_battleaxe_skill,type=!item,x=~1,y=~,z=~-1,r=2] 4 entity_attack entity @s
damage @e[tag=!storm_battleaxe_skill,type=!item,x=~-1,y=~,z=~-1,r=2] 4 entity_attack entity @s
playanimation @s animation.humanoid.rolling
tag @s remove storm_battleaxe_skill