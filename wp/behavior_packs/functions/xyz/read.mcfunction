scoreboard players operation @e[type=wb:write_position] wbzbcg = @s wbldid
scoreboard players operation @e[type=wb:write_position] wbzbcg -= @e[type=wb:write_position] wbzbgs
tp @s @e[c=1,scores={wbzbcg=0},type=wb:write_position]
kill @e[c=1,scores={wbzbcg=0},type=wb:write_position,r=3]