tag @s add everlasting_winter_dagger_skill
playanimation @s animation.humanoid.sprint
effect @e[r=4,tag=!everlasting_winter_dagger_skill] slowness 3 1
particle dec:everlasting_winter_seep_particle ~~~
execute positioned ^^^0.8 run damage @e[type=!item,x=~,y=~-0.4,z=~,dx=0,dy=2,dz=0,tag=!everlasting_winter_dagger_skill] 21 entity_attack entity @s
execute positioned ^^^0.8 run effect @e[type=!item,x=~,y=~-0.4,z=~,dx=0,dy=2,dz=0,tag=!everlasting_winter_dagger_skill] slowness 3 6
execute positioned ^^^0.8 at @e[type=!item,x=~,y=~-0.4,z=~,dx=0,dy=2,dz=0,tag=!everlasting_winter_dagger_skill] run particle dec:everlasting_winter_gather_particle ~~~
tag @s remove everlasting_winter_dagger_skill