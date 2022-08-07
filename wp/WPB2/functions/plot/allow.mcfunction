scoreboard players operation @s wbqjszcg = 剧情线 wbqjsz
execute positioned as @s[scores={wbqjszcg=1}] run tag @s add allowplot
execute positioned as @s[scores={wbqjszcg=2}] run tag @s remove allowplot

execute positioned as @s[tag=wbplot] run tag @s add allowplot

execute positioned as @s[scores={wbqjszcg=1}] run tellraw @s {"rawtext":[{"text":"§b[系统]当然剧情线可游玩"}]}
execute positioned as @s[scores={wbqjszcg=2},tag=!wbplot] run tellraw @s {"rawtext":[{"text":"§b[系统]已经有一个人在游玩，请等他玩好/和他组队"}]}

execute positioned as @s[scores={wbqjszcg=-100..100}] run tag @s add wblsbqx
execute positioned as @s[tag=!wblsbqx] run tellraw @s {"rawtext":[{"text":"§b剧情线未开启，请op输入§e/function wbstart"}]}
tag @s remove wblsbqx

execute positioned as @s[scores={wbqjszcg=0}] run tellraw @s {"rawtext":[{"text":"§b剧情线未开启，请op输入§e/function wbstart"}]}

execute positioned as @s[tag=!wbdwdz] run tag @s remove allowplot
execute positioned as @s[scores={wbqjszcg=1},tag=!wbdwdz] run tellraw @s {"rawtext":[{"text":"§b[系统]你还没有队伍，请先创建一个队伍(队长身份)才可以进入/游玩剧情线"}]}