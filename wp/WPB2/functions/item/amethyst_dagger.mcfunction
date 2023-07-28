tag @s add amethyst_dagger_skill
playanimation @s animation.humanoid.sprint
execute positioned ^^^0.8 run damage @e[type=!item,x=~-0.3,y=~-0.4,z=~-0.3,dx=0.6,dy=2,dz=0.6,tag=!amethyst_dagger_skill] 12 entity_attack entity @s
tag @s remove amethyst_dagger_skill