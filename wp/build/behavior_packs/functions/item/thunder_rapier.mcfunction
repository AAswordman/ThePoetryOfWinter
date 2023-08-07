scoreboard players set @s skill_count 0
execute if block ^^0.6^0.5 air if block ^^0.6^1 air if block ^^0.6^1.5 air if block ^^0.6^2 air if block ^^0.6^2.5 air if block ^^0.6^3 air run tag @s add thunder_rapier_skill
execute if entity @s[tag=thunder_rapier_skill] positioned ^^0.6^1 run damage @e[r=1,tag=!thunder_rapier_skill] 15 lightning entity @s
execute if entity @s[tag=thunder_rapier_skill] positioned ^^0.6^2 run damage @e[r=1,tag=!thunder_rapier_skill] 15 lightning entity @s
execute if entity @s[tag=thunder_rapier_skill] positioned ^^0.6^3 run damage @e[r=1,tag=!thunder_rapier_skill] 15 lightning entity @s
execute if entity @s[tag=thunder_rapier_skill] run particle dec:thunder_wake_particle ^^0.6^0.5
execute if entity @s[tag=thunder_rapier_skill] run particle dec:thunder_wake_particle ^^0.6^1
execute if entity @s[tag=thunder_rapier_skill] run particle dec:thunder_wake_particle ^^0.6^1.5
execute if entity @s[tag=thunder_rapier_skill] run particle dec:thunder_wake_particle ^^0.6^2
execute if entity @s[tag=thunder_rapier_skill] run particle dec:thunder_wake_particle ^^0.6^2.5
execute if entity @s[tag=thunder_rapier_skill] run tp ^^0.6^3
execute if entity @s[tag=thunder_rapier_skill] run playanimation @s animation.humanoid.sprint
tag @s remove thunder_rapier_skill