execute as @a if score @s skill_cooldown matches 1.. run scoreboard players remove @s skill_cooldown 1
execute as @a unless score @s skill_cooldown matches 0.. run scoreboard players set @s skill_cooldown 0

execute as @a[hasitem={item=dec:flintlock_bullet,quantity=0}] run scoreboard players set @s bullet_type 0
execute as @a[hasitem={item=dec:flintlock_bullet,quantity=1..}] run scoreboard players set @s bullet_type 1

execute as @a if score @s arrow_type matches 1.. if score @s skill_cooldown matches ..10 at @s run function EPIC/epic_crossbow_replace