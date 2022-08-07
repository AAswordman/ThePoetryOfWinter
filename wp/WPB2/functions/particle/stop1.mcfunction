titleraw @s actionbar {"rawtext":[{"text":"§6§l=粒子禁用列表=§r\n§c>火焰粒子<§r\n爱心粒子\n光环粒子\n符文粒子"}]}
execute positioned as @s[rx=-89] run tp @s ~ ~ ~ facing ~ ~ ~+1
execute positioned as @s[rxm=89] run scoreboard players add @s wblzxz 1
execute positioned as @s[rxm=89] run tp @s ~ ~ ~ facing ~ ~ ~+1