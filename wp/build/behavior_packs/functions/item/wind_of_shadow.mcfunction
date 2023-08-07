particle dec:ender_bomb_particle ~~~
tag @s add wind_of_shadow_skill
damage @e[type=!item,r=4,tag=!wind_of_shadow_skill] 11 magic entity @s
playanimation @s animation.humanoid.sword_use
playsound random.explode @a ~~~
tag @s remove wind_of_shadow_skill