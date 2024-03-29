tag @s add blood_sickle_skill
damage @e[r=4,rm=2] 2 magic entity @s
particle dec:blood_spore_ball_particle ~~~
execute positioned as @e[r=4,rm=2,tag=!blood_sickle_skill] run particle dec:blood_spore_seep_particle ~~~
execute if entity @e[r=4,rm=2,tag=!blood_sickle_skill] run effect @s[scores={wbfl=1..},tag=blood_sickle_skill] regeneration 3 0
scoreboard players remove @s wbfl 1
tag @s remove blood_sickle_skill