execute as @s[scores={wbptbt=2},tag=wbhcptbt] at @s run fill 80030 199 80030 79970 206 79970 wb:parallel_block 0 replace
execute as @s[scores={wbptbt=2},tag=wbhcptbt] at @s run fill 80030 198 80030 79970 198 79970 wb:parallel_block 0 replace
execute as @s[scores={wbptbt=2},tag=wbhcptbt] at @s run fill 80030 197 80030 79970 197 79970 wb:parallel_block 0 replace
execute as @s[scores={wbptbt=2},tag=wbhcptbt] at @s run fill 80030 196 80030 79970 196 79970 wb:parallel_block 0 replace
execute as @s[scores={wbptbt=2},tag=wbhcptbt] at @s run fill 80030 195 80030 79970 195 79970 wb:parallel_block 0 replace
execute as @s[scores={wbptbt=2},tag=wbhcptbt] at @s run fill 80029 200 80029 79971 205 79971 air 0 replace

execute as @s[scores={wbptbt=2},tag=wbhcptbt] at @s run setblock 80002 200 80001 wb:block_magic_barrier 0 replace
execute as @s[scores={wbptbt=2},tag=wbhcptbt] at @s run setblock 80002 200 79999 wb:block_magic_barrier 0 replace
execute as @s[scores={wbptbt=2},tag=wbhcptbt] at @s run setblock 79998 200 80001 wb:block_magic_barrier 0 replace
execute as @s[scores={wbptbt=2},tag=wbhcptbt] at @s run setblock 79998 200 79999 wb:block_magic_barrier 0 replace
execute as @s[scores={wbptbt=2},tag=wbhcptbt] at @s run setblock 80001 200 80002 wb:block_magic_equipment 0 replace
execute as @s[scores={wbptbt=2},tag=wbhcptbt] at @s run setblock 79999 200 80002 wb:block_magic_equipment 0 replace
execute as @s[scores={wbptbt=2},tag=wbhcptbt] at @s run setblock 80001 200 79998 wb:block_magic_equipment 0 replace
execute as @s[scores={wbptbt=2},tag=wbhcptbt] at @s run setblock 79999 200 79998 wb:block_magic_equipment 0 replace
execute as @s[scores={wbptbt=2},tag=wbhcptbt] at @s run fill 80001 199 80001 79999 199 79999 wb:portal_bossx 0 replace
execute as @s[scores={wbptbt=2},tag=wbhcptbt] at @s run setblock 80002 200 80002 torch 0 replace
execute as @s[scores={wbptbt=2},tag=wbhcptbt] at @s run setblock 79998 200 80002 torch 0 replace
execute as @s[scores={wbptbt=2},tag=wbhcptbt] at @s run setblock 80002 200 79998 torch 0 replace
execute as @s[scores={wbptbt=2},tag=wbhcptbt] at @s run setblock 79998 200 79998 torch 0 replace
execute as @s[scores={wbptbt=2},tag=wbhcptbt] at @s run setblock 80002 200 80000 stone_slab 0 replace
execute as @s[scores={wbptbt=2},tag=wbhcptbt] at @s run setblock 79998 200 80000 stone_slab 0 replace
execute as @s[scores={wbptbt=2},tag=wbhcptbt] at @s run setblock 80000 200 80002 stone_slab 0 replace
execute as @s[scores={wbptbt=2},tag=wbhcptbt] at @s run setblock 80000 200 79998 stone_slab 0 replace
execute as @s[scores={wbptbt=2},tag=wbhcptbt] at @s run summon minecraft:lightning_bolt 80000 200 80000

execute as @s[scores={wbptbt=2},tag=wbhcptbt] at @s run scoreboard players operation @e[r=80,type=!minecraft:player] wbptbpd = @s wbldid
execute as @s[scores={wbptbt=2},tag=wbhcptbt] at @s run execute as @e[type=!player,r=80] at @s run scoreboard players operation @s wbptbpd -= @s wbptbgs
execute as @s[scores={wbptbt=2},tag=wbhcptbt] at @s run execute as @e[type=!player,r=80,scores={wbptbpd=0}] at @s run kill @s

execute as @s[scores={wbptbt=2},tag=wbhcptbt] at @s run tp @s 80000 201 80003


execute as @s[scores={wbptbt=2,wbdjcg=0..15},tag=wbhcptbt] at @s run summon wb:magic_spider ~+10 ~ ~+10
execute as @s[scores={wbptbt=2,wbdjcg=16..35},tag=wbhcptbt] at @s run summon wb:magic_stoneman ~+10 ~ ~+10
execute as @s[scores={wbptbt=2,wbdjcg=36..65},tag=wbhcptbt] at @s run summon wb:headless_guard ~+10 ~ ~+10
execute as @s[scores={wbptbt=2,wbdjcg=66..75},tag=wbhcptbt] at @s run summon wb:ancient_stone ~+10 ~ ~+10
execute as @s[scores={wbptbt=2,wbdjcg=76..90},tag=wbhcptbt] at @s run summon wb:border_fugitive ~+10 ~ ~+10
execute as @s[scores={wbptbt=2,wbdjcg=90..100},tag=wbhcptbt] at @s run summon wb:intentions_first ~+10 ~ ~+10




execute as @s[scores={wbptbt=2},tag=wbhcptbt] at @s run tag @s remove wbhcptbt

execute as @s at @s if block ~ ~-1 ~ wb:portal_boss -1 run tag @s add wbonptbt
execute as @s[tag=!wbonptbt,tag=!wbhcptbt] at @s run scoreboard players set @s wbptbt 0
execute as @s[tag=wbonptbt] at @s run scoreboard players add @s wbptbt 1
execute as @s[tag=wbhcptbt] at @s run scoreboard players remove @s wbptbt 1

execute as @s[scores={wbptbt=1},tag=wbonptbt] at @s run effect @s nausea 2 4 true

execute as @s[scores={wbptbt=2},tag=wbonptbt] at @s run effect @s nausea 3 5 true
execute as @s[scores={wbptbt=3},tag=wbonptbt] at @s run effect @s nausea 4 6 true
execute as @s[scores={wbptbt=4},tag=wbonptbt] at @s run effect @s nausea 3 7 true
execute as @s[scores={wbptbt=4},tag=wbonptbt] at @s run effect @s resistance 6 255 true
execute as @s[scores={wbptbt=4},tag=wbonptbt] at @s run effect @s regeneration 6 255 true
execute as @s[scores={wbptbt=4},tag=wbonptbt] at @s run effect @s blindness 6 255 true
execute as @s[scores={wbptbt=4},tag=wbonptbt] at @s run tp @s 80000 230 80000
execute as @s[scores={wbptbt=4},tag=wbonptbt] at @s run setblock ~ ~-2 ~ wb:parallel_block 0
execute as @s[scores={wbptbt=4},tag=wbonptbt] at @s run tag @s add wbhcptbt

tag @s remove wbonptbt



execute as @s[scores={wbptbt=1},tag=wbhcptbtx] at @s run tag @s remove wbhcptbtx

execute as @s at @s if block ~ ~-1 ~ wb:portal_bossx -1 run tag @s add wbonptbtx
execute as @s[tag=!wbonptbtx,tag=!wbhcptbtx] at @s run scoreboard players set @s wbptbtx 0
execute as @s[tag=wbonptbtx] at @s run scoreboard players add @s wbptbtx 1
execute as @s[tag=wbhcptbtx] at @s run scoreboard players remove @s wbptbtx 1

execute as @s[scores={wbptbtx=1},tag=wbonptbtx] at @s run effect @s nausea 2 4 true
execute as @s[scores={wbptbtx=2},tag=wbonptbtx] at @s run effect @s nausea 3 5 true
execute as @s[scores={wbptbtx=3},tag=wbonptbtx] at @s run effect @s nausea 4 6 true
execute as @s[scores={wbptbtx=4},tag=wbonptbtx] at @s run effect @s nausea 3 7 true
execute as @s[scores={wbptbtx=4},tag=wbonptbtx] at @s run effect @s resistance 6 255 true
execute as @s[scores={wbptbtx=4},tag=wbonptbtx] at @s run effect @s regeneration 6 255 true
execute as @s[scores={wbptbtx=4},tag=wbonptbtx] at @s run effect @s blindness 6 255 true
execute as @s[scores={wbptbtx=4},tag=wbonptbtx] at @s run spreadplayers 0 0 10 200 @s
execute as @s[scores={wbptbtx=4},tag=wbonptbtx] at @s run tag @s add wbhcptbtx

tag @s remove wbonptbtx