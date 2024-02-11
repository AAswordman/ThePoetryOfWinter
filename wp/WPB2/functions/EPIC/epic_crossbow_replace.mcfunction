execute as @s if score @s skill_cooldown matches 8 run say nm
execute as @s if score @s skill_cooldown matches 8 run replaceitem entity @s slot.weapon.mainhand 0 epic:sunlight_crossbow_drawn 1 0
scoreboard players set @s arrow_type 0