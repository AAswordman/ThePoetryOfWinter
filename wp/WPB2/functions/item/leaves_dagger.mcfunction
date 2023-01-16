tag @s add leaves_dagger_skill
playanimation @s animation.humanoid.sprint
execute positioned ^^^0.8 run damage @e[type=!item,x=~,y=~-0.4,z=~,dx=0,dy=2,dz=0,tag=!leaves_dagger_skill] 7 entity_attack entity @s
tag @s remove leaves_dagger_skill