scoreboard players remove @s[scores={wbwjswjs=0..}] wbwjswjs 1

titleraw @s[scores={wbwjswjs=0..}] subtitle {"rawtext":[{"score":{"name":"@s","objective":"wbwjswjs"}}]}
titleraw @s[scores={wbwjswjs=0..}] title {"rawtext":[{"translate":"text.wb.you_are_die"}]}
execute as @s[scores={wbwjswjs=..-1}] at @s run tag @s remove wbdie