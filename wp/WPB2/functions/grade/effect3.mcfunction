tag @s[scores={wbef=-100..}] add wbefz
execute @s[tag=!wbefz] ~ ~ ~ scoreboard players set @s wbef 0
tag @s remove wbefz
execute @s[scores={wbef=0}] ~ ~ ~ function grade/effect2
execute @s[scores={wbef=0}] ~ ~ ~ tellraw @s {"rawtext":[{"translate":"§b[系统]勇者之力触发成功！"}]}
execute @s[scores={wbef=0}] ~ ~ ~ scoreboard players add @s wbef 600