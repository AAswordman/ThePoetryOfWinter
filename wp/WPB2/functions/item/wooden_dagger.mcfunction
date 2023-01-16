tag @s add wooden_dagger_skill
playanimation @s animation.humanoid.sprint
execute positioned ^^^0.8 run damage @e[type=!item,x=~,y=~-0.4,z=~,dx=0,dy=2,dz=0,tag=!wooden_dagger_skill] 12 entity_attack entity @s
tag @s remove wooden_dagger_skill