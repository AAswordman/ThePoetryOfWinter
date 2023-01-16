tag @s add iron_dagger_skill
playanimation @s animation.humanoid.sprint
execute positioned ^^^0.8 run damage @e[type=!item,x=~,y=~-0.4,z=~,dx=0,dy=2,dz=0,tag=!iron_dagger_skill] 16 entity_attack entity @s
tag @s remove iron_dagger_skill