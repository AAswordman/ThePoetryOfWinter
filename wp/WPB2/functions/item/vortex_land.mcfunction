tag @s add vortex_skill
particle dec:bubble_vortex_particle ~~-0.1~
particle dec:bubble_vortex_particle ~~-0.1~
effect @e[tag=!vortex_skill,type=!item,r=3] poison 2 0
damage @e[tag=!vortex_skill,type=!item,r=3] 7 drowning entity @s
playanimation @s animation.humanoid.sword_charge
playsound conduit.activate @a ~~~
tag @s remove vortex_skill
scoreboard players remove @s[scores={wbfl=11..}] wbfl 11