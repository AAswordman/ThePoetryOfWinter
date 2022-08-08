titleraw @s actionbar {"rawtext":[{"text":"§6§l=粒子禁用列表=§r\n火焰粒子\n§c>爱心粒子<§r\n光环粒子\n符文粒子"}]}
execute @s[rx=-89] ~ ~ ~ scoreboard players remove @s wblzxz 1
execute @s[rx=-89] ~ ~ ~ tp @s ~ ~ ~ facing ~ ~ ~+1
execute @s[rxm=89] ~ ~ ~ scoreboard players add @s wblzxz 1
execute @s[rxm=89] ~ ~ ~ tp @s ~ ~ ~ facing ~ ~ ~+1