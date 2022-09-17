tag @s[scores={wbef=-100..}] add wbefz
execute as @s[tag=!wbefz] at @s run scoreboard players set @s wbef 0
tag @s remove wbefz
execute as @s[scores={wbef=0}] at @s run function grade/effect2
execute as @s[scores={wbef=0}] at @s run tellraw @s {"rawtext":[{"translate":"§b[系统]勇者之力触发成功！"}]}
execute as @s[scores={wbef=0}] at @s run scoreboard players add @s wbef 600