execute as @a if score @s skill_cooldown matches 1.. run scoreboard players remove @s skill_cooldown 1
execute as @a unless score @s skill_cooldown matches 0.. run scoreboard players set @s skill_cooldown 0

