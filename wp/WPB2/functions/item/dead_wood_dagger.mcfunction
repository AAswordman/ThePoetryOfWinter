tag @s add dead_wood_dagger_skill
playanimation @s animation.humanoid.sprint
execute positioned ^^^0.8 run damage @e[type=!item,x=~-0.3,y=~-0.4,z=~-0.3,dx=0.6,dy=2,dz=0.6,tag=!dead_wood_dagger_skill] 14 entity_attack entity @s
execute positioned ^^^0.8 run effect @e[type=!item,x=~-0.3,y=~-0.4,z=~-0.3,dx=0.6,dy=2,dz=0.6,tag=!dead_wood_dagger_skill] poison 14 1
execute positioned ^^^0.8 run effect @e[type=!item,x=~-0.3,y=~-0.4,z=~-0.3,dx=0.6,dy=2,dz=0.6,tag=!dead_wood_dagger_skill] wither 5
tag @s remove dead_wood_dagger_skill