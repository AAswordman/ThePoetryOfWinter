scoreboard players remove @s[scores={wbwjswjs=0..}] wbwjswjs 1

titleraw @s[scores={wbwjswjs=0..}] subtitle {"rawtext":[{"score":{"name":"@s","objective":"wbwjswjs"}}]}
titleraw @s[scores={wbwjswjs=0..}] title {"rawtext":[{"text":"你已死亡"}]}
execute positioned as @s[scores={wbwjswjs=..-1}] run tag @s remove wbdie