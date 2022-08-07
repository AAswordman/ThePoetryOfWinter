gamerule commandblockoutput false
gamerule doimmediaterespawn false

function boss
function block

##发出声音
execute positioned as @e[type=dec:bullet_by_flintlock,tag=!smr] run playsound random.explode @a ~~~
execute positioned as @e[type=dec:bullet_by_flintlock,tag=!smr] run tag @a[r=2,c=1] remove flintlock_shot
execute positioned as @e[type=dec:bullet_by_flintlock_pro,tag=!smr] run playsound random.explode @a ~~~
execute positioned as @e[type=dec:bullet_by_flintlock_pro,tag=!smr] run tag @a[r=2,c=1] remove flintlock_pro_shot
execute positioned as @e[type=dec:bullet_by_short_flintlock,tag=!smr] run playsound random.explode @a ~~~
execute positioned as @e[type=dec:bullet_by_short_flintlock,tag=!smr] run tag @a[r=2,c=1] remove short_flintlock_shot
##添加标签
tag @e[type=dec:bullet_by_flintlock,tag=!smr] add smr
tag @e[type=dec:bullet_by_flintlock_pro,tag=!smr] add smr
tag @e[type=dec:bullet_by_short_flintlock,tag=!smr] add smr
##添加完成标签
tag @e[type=!player,tag=smr,tag=!smrkill,tag=!smrok] add smrok


execute positioned as @e[type=fireball] run particle dec:fire_wake_particle ~~~
execute positioned as @e[type=dragon_fireball] run particle dec:ender_wake_particle ~~~

##房主标记
##在gt中

##死亡模式组件
execute positioned as @a[tag=diemode] run tag @a[tag=!diemode] add diemode
execute positioned as @a[tag=diemode] run title @a[tag=alreadydie] actionbar §4§lYou are Died
execute positioned as @a[tag=diemode] run tp @a[tag=alreadydie] 0 1000 0
execute positioned as @a[tag=diemode] run effect @a[tag=alreadydie] invisibility 20 0 true
execute positioned as @a[tag=diemode] run effect @a[tag=alreadydie] blindness 20 0 true
execute positioned as @a[tag=diemode] run effect @a[tag=alreadydie] night_vision 20 0 true
execute positioned as @a[tag=diemode] run gamerule sendcommandfeedback false

##打败末影龙标记
execute positioned as @r[tag=wbstartkeyok] run tag @r[tag=!wbstartkeyok] add wbstartkeyok

##控制高级锭
clear @a[tag=!wbstartkeyok] wb:mineral_senior_boundary
clear @a[tag=!wbstartkeyok] wb:mineral_senior_equipment
clear @a[tag=!wbstartkeyok] wb:mineral_senior_forget
clear @a[tag=!wbstartkeyok] wb:mineral_senior_ink
clear @a[tag=!wbstartkeyok] wb:mineral_senior_water
clear @a[tag=!wbstartkeyok] wb:mineral_senior_seal
