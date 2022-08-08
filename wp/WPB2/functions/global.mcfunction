gamerule commandblockoutput false
gamerule doimmediaterespawn false

function boss
function block

##发出声音
execute @e[type=dec:bullet_by_flintlock,tag=!smr] ~ ~ ~ playsound random.explode @a ~~~
execute @e[type=dec:bullet_by_flintlock,tag=!smr] ~ ~ ~ tag @a[r=2,c=1] remove flintlock_shot
execute @e[type=dec:bullet_by_flintlock_pro,tag=!smr] ~ ~ ~ playsound random.explode @a ~~~
execute @e[type=dec:bullet_by_flintlock_pro,tag=!smr] ~ ~ ~ tag @a[r=2,c=1] remove flintlock_pro_shot
execute @e[type=dec:bullet_by_short_flintlock,tag=!smr] ~ ~ ~ playsound random.explode @a ~~~
execute @e[type=dec:bullet_by_short_flintlock,tag=!smr] ~ ~ ~ tag @a[r=2,c=1] remove short_flintlock_shot
##添加标签
tag @e[type=dec:bullet_by_flintlock,tag=!smr] add smr
tag @e[type=dec:bullet_by_flintlock_pro,tag=!smr] add smr
tag @e[type=dec:bullet_by_short_flintlock,tag=!smr] add smr
##添加完成标签
tag @e[type=!player,tag=smr,tag=!smrkill,tag=!smrok] add smrok


execute @e[type=fireball] ~ ~ ~ particle dec:fire_wake_particle ~~~
execute @e[type=dragon_fireball] ~ ~ ~ particle dec:ender_wake_particle ~~~

##房主标记
##在gt中

##死亡模式组件
execute @a[tag=diemode] ~ ~ ~ tag @a[tag=!diemode] add diemode
execute @a[tag=diemode] ~ ~ ~ title @a[tag=alreadydie] actionbar §4§lYou are Died
execute @a[tag=diemode] ~ ~ ~ tp @a[tag=alreadydie] 0 1000 0
execute @a[tag=diemode] ~ ~ ~ effect @a[tag=alreadydie] invisibility 20 0 true
execute @a[tag=diemode] ~ ~ ~ effect @a[tag=alreadydie] blindness 20 0 true
execute @a[tag=diemode] ~ ~ ~ effect @a[tag=alreadydie] night_vision 20 0 true
execute @a[tag=diemode] ~ ~ ~ gamerule sendcommandfeedback false

##打败末影龙标记
execute @r[tag=wbstartkeyok] ~ ~ ~ tag @r[tag=!wbstartkeyok] add wbstartkeyok

##控制高级锭
clear @a[tag=!wbstartkeyok] wb:mineral_senior_boundary
clear @a[tag=!wbstartkeyok] wb:mineral_senior_equipment
clear @a[tag=!wbstartkeyok] wb:mineral_senior_forget
clear @a[tag=!wbstartkeyok] wb:mineral_senior_ink
clear @a[tag=!wbstartkeyok] wb:mineral_senior_water
clear @a[tag=!wbstartkeyok] wb:mineral_senior_seal
