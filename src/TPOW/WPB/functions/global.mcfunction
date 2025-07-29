function boss
function block

execute at @e[type=fireball] run particle dec:fire_wake_particle ~~~
execute at @e[type=dragon_fireball] run particle dec:ender_wake_particle ~~~

##防末影珍珠
execute at @e[type=ender_pearl,tag=no_ender_pearl] run loot spawn ~~~ loot "entities/ender_pearl"
kill @e[type=ender_pearl,tag=no_ender_pearl]