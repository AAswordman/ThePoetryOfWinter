particle dec:fire_powering_particle ~~0.5~
playsound fire.fire @a ~~~ 1.4
playsound mob.blaze.shoot @a ~~~
playanimation @s animation.humanoid.sword_use
scoreboard players remove @s[scores={wbfl=15..}] wbfl 15