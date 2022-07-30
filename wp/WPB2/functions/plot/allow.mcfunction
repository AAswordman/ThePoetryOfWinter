scoreboard players operation @s wbqjszcg = 剧情线 wbqjsz
execute @s[scores={wbqjszcg=1}] ~ ~ ~ tag @s add allowplot
execute @s[scores={wbqjszcg=2}] ~ ~ ~ tag @s remove allowplot

execute @s[tag=wbplot] ~ ~ ~ tag @s add allowplot

execute @s[scores={wbqjszcg=1}] ~ ~ ~ tellraw @s {"rawtext":[{"text":"§b[系统]当然剧情线可游玩"}]}
execute @s[scores={wbqjszcg=2},tag=!wbplot] ~ ~ ~ tellraw @s {"rawtext":[{"text":"§b[系统]已经有一个人在游玩，请等他玩好/和他组队"}]}

execute @s[scores={wbqjszcg=-100..100}] ~ ~ ~ tag @s add wblsbqx
execute @s[tag=!wblsbqx] ~ ~ ~ tellraw @s {"rawtext":[{"text":"§b剧情线未开启，请op输入§e/function wbstart"}]}
tag @s remove wblsbqx

execute @s[scores={wbqjszcg=0}] ~ ~ ~ tellraw @s {"rawtext":[{"text":"§b剧情线未开启，请op输入§e/function wbstart"}]}

execute @s[tag=!wbdwdz] ~ ~ ~ tag @s remove allowplot
execute @s[scores={wbqjszcg=1},tag=!wbdwdz] ~ ~ ~ tellraw @s {"rawtext":[{"text":"§b[系统]你还没有队伍，请先创建一个队伍(队长身份)才可以进入/游玩剧情线"}]}