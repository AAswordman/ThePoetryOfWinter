tag @s add vortex_skill
particle dec:bubble_vortex_particle ~~-0.1~
particle dec:bubble_vortex_particle ~~-0.1~
particle dec:bubble_vortex_particle ~~-0.1~
particle dec:bubble_vortex_particle ~~-0.1~
effect @s conduit_power 5
effect @e[tag=!vortex_skill,type=!item,r=3] poison 5 0
damage @e[tag=!vortex_skill,type=!item,r=3] 10 drowning entity @s
playanimation @s animation.humanoid.sword_charge
playsound conduit.activate @a ~~~
tag @s remove vortex_skill
scoreboard players remove @s[scores={wbfl=7..}] wbfl 7