tag @s add ghost_dagger_skill
playanimation @s animation.humanoid.sprint
execute positioned ^^^0.8 run damage @e[type=!item,x=~-0.3,y=~-0.4,z=~-0.3,dx=0.6,dy=2,dz=0.6,tag=!ghost_dagger_skill] 22 entity_attack entity @s
execute positioned ^^^0.8 run effect @e[type=!item,x=~-0.3,y=~-0.4,z=~-0.3,dx=0.6,dy=2,dz=0.6,tag=!ghost_dagger_skill] invisibility 3 0
execute positioned ^^^0.8 at @e[type=!item,x=~-0.3,y=~-0.4,z=~-0.3,dx=0.6,dy=2,dz=0.6,tag=!ghost_dagger_skill] run particle dec:ghost_sickle_particle ~~~
tag @s remove ghost_dagger_skill