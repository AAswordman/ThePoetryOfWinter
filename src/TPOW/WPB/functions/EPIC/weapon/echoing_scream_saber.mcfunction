playsound mob.warden.roar @a[r=10] ~~~ 1.75
playsound mob.warden.sonic_boom @a[r=10]
playsound random.explode @a[r=6]
camerashake add @s 0.105 0.075 rotational
camerashake add @s 0.8 0.1 positional
particle epic:echoing_scream_saber_particle2 ~~~

execute as @e[tag=!skill_user,tag=!wbmsyh,type=!item,type=!xp_orb,r=4] run particle minecraft:critical_hit_emitter ~~1.8~
effect @e[r=5,tag=!skill_user,tag=!wbmsyh] wither 3 3 true
effect @e[r=3,tag=!skill_user,tag=!wbmsyh] slowness 3 4 true
effect @e[r=3,tag=!skill_user,tag=!wbmsyh] weakness 3 4 true
effect @e[r=4,rm=3,tag=!skill_user,tag=!wbmsyh] slowness 2 3 true
effect @e[r=4,rm=3,tag=!skill_user,tag=!wbmsyh] weakness 2 3 true