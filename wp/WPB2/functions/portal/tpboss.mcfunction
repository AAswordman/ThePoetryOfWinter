execute @s[scores={wbptbt=2},tag=wbhcptbt] ~ ~ ~ fill 80030 199 80030 79970 206 79970 wb:parallel_block 0 replace
execute @s[scores={wbptbt=2},tag=wbhcptbt] ~ ~ ~ fill 80030 198 80030 79970 198 79970 wb:parallel_block 0 replace
execute @s[scores={wbptbt=2},tag=wbhcptbt] ~ ~ ~ fill 80030 197 80030 79970 197 79970 wb:parallel_block 0 replace
execute @s[scores={wbptbt=2},tag=wbhcptbt] ~ ~ ~ fill 80030 196 80030 79970 196 79970 wb:parallel_block 0 replace
execute @s[scores={wbptbt=2},tag=wbhcptbt] ~ ~ ~ fill 80030 195 80030 79970 195 79970 wb:parallel_block 0 replace
execute @s[scores={wbptbt=2},tag=wbhcptbt] ~ ~ ~ fill 80029 200 80029 79971 205 79971 air 0 replace

execute @s[scores={wbptbt=2},tag=wbhcptbt] ~ ~ ~ setblock 80002 200 80001 wb:block_magic_barrier 0 replace
execute @s[scores={wbptbt=2},tag=wbhcptbt] ~ ~ ~ setblock 80002 200 79999 wb:block_magic_barrier 0 replace
execute @s[scores={wbptbt=2},tag=wbhcptbt] ~ ~ ~ setblock 79998 200 80001 wb:block_magic_barrier 0 replace
execute @s[scores={wbptbt=2},tag=wbhcptbt] ~ ~ ~ setblock 79998 200 79999 wb:block_magic_barrier 0 replace
execute @s[scores={wbptbt=2},tag=wbhcptbt] ~ ~ ~ setblock 80001 200 80002 wb:block_magic_equipment 0 replace
execute @s[scores={wbptbt=2},tag=wbhcptbt] ~ ~ ~ setblock 79999 200 80002 wb:block_magic_equipment 0 replace
execute @s[scores={wbptbt=2},tag=wbhcptbt] ~ ~ ~ setblock 80001 200 79998 wb:block_magic_equipment 0 replace
execute @s[scores={wbptbt=2},tag=wbhcptbt] ~ ~ ~ setblock 79999 200 79998 wb:block_magic_equipment 0 replace
execute @s[scores={wbptbt=2},tag=wbhcptbt] ~ ~ ~ fill 80001 199 80001 79999 199 79999 wb:portal_bossx 0 replace
execute @s[scores={wbptbt=2},tag=wbhcptbt] ~ ~ ~ setblock 80002 200 80002 torch 0 replace
execute @s[scores={wbptbt=2},tag=wbhcptbt] ~ ~ ~ setblock 79998 200 80002 torch 0 replace
execute @s[scores={wbptbt=2},tag=wbhcptbt] ~ ~ ~ setblock 80002 200 79998 torch 0 replace
execute @s[scores={wbptbt=2},tag=wbhcptbt] ~ ~ ~ setblock 79998 200 79998 torch 0 replace
execute @s[scores={wbptbt=2},tag=wbhcptbt] ~ ~ ~ setblock 80002 200 80000 stone_slab 0 replace
execute @s[scores={wbptbt=2},tag=wbhcptbt] ~ ~ ~ setblock 79998 200 80000 stone_slab 0 replace
execute @s[scores={wbptbt=2},tag=wbhcptbt] ~ ~ ~ setblock 80000 200 80002 stone_slab 0 replace
execute @s[scores={wbptbt=2},tag=wbhcptbt] ~ ~ ~ setblock 80000 200 79998 stone_slab 0 replace
execute @s[scores={wbptbt=2},tag=wbhcptbt] ~ ~ ~ summon minecraft:lightning_bolt 80000 200 80000

execute @s[scores={wbptbt=2},tag=wbhcptbt] ~ ~ ~ scoreboard players operation @e[r=80,type=!minecraft:player] wbptbpd = @s wbldid
execute @s[scores={wbptbt=2},tag=wbhcptbt] ~ ~ ~ execute @e[type=!player,r=80] ~ ~ ~ scoreboard players operation @s wbptbpd -= @s wbptbgs
execute @s[scores={wbptbt=2},tag=wbhcptbt] ~ ~ ~ execute @e[type=!player,r=80,scores={wbptbpd=0}] ~ ~ ~ kill @s

execute @s[scores={wbptbt=2},tag=wbhcptbt] ~ ~ ~ tp @s 80000 201 80003


execute @s[scores={wbptbt=2,wbdjcg=0..15},tag=wbhcptbt] ~ ~ ~ summon wb:magic_spider ~+10 ~ ~+10
execute @s[scores={wbptbt=2,wbdjcg=16..35},tag=wbhcptbt] ~ ~ ~ summon wb:magic_stoneman ~+10 ~ ~+10
execute @s[scores={wbptbt=2,wbdjcg=36..65},tag=wbhcptbt] ~ ~ ~ summon wb:headless_guard ~+10 ~ ~+10
execute @s[scores={wbptbt=2,wbdjcg=66..75},tag=wbhcptbt] ~ ~ ~ summon wb:ancient_stone ~+10 ~ ~+10
execute @s[scores={wbptbt=2,wbdjcg=76..90},tag=wbhcptbt] ~ ~ ~ summon wb:border_fugitive ~+10 ~ ~+10
execute @s[scores={wbptbt=2,wbdjcg=90..100},tag=wbhcptbt] ~ ~ ~ summon wb:intentions_first ~+10 ~ ~+10




execute @s[scores={wbptbt=2},tag=wbhcptbt] ~ ~ ~ tag @s remove wbhcptbt

execute @s ~ ~ ~ detect ~ ~-1 ~ wb:portal_boss -1 tag @s add wbonptbt
execute @s[tag=!wbonptbt,tag=!wbhcptbt] ~ ~ ~ scoreboard players set @s wbptbt 0
execute @s[tag=wbonptbt] ~ ~ ~ scoreboard players add @s wbptbt 1
execute @s[tag=wbhcptbt] ~ ~ ~ scoreboard players remove @s wbptbt 1

execute @s[scores={wbptbt=1},tag=wbonptbt] ~ ~ ~ effect @s nausea 2 4 true

execute @s[scores={wbptbt=2},tag=wbonptbt] ~ ~ ~ effect @s nausea 3 5 true
execute @s[scores={wbptbt=3},tag=wbonptbt] ~ ~ ~ effect @s nausea 4 6 true
execute @s[scores={wbptbt=4},tag=wbonptbt] ~ ~ ~ effect @s nausea 3 7 true
execute @s[scores={wbptbt=4},tag=wbonptbt] ~ ~ ~ effect @s resistance 6 255 true
execute @s[scores={wbptbt=4},tag=wbonptbt] ~ ~ ~ effect @s regeneration 6 255 true
execute @s[scores={wbptbt=4},tag=wbonptbt] ~ ~ ~ effect @s blindness 6 255 true
execute @s[scores={wbptbt=4},tag=wbonptbt] ~ ~ ~ tp @s 80000 230 80000
execute @s[scores={wbptbt=4},tag=wbonptbt] ~ ~ ~ setblock ~ ~-2 ~ wb:parallel_block 0
execute @s[scores={wbptbt=4},tag=wbonptbt] ~ ~ ~ tag @s add wbhcptbt

tag @s remove wbonptbt



execute @s[scores={wbptbt=1},tag=wbhcptbtx] ~ ~ ~ tag @s remove wbhcptbtx

execute @s ~ ~ ~ detect ~ ~-1 ~ wb:portal_bossx -1 tag @s add wbonptbtx
execute @s[tag=!wbonptbtx,tag=!wbhcptbtx] ~ ~ ~ scoreboard players set @s wbptbtx 0
execute @s[tag=wbonptbtx] ~ ~ ~ scoreboard players add @s wbptbtx 1
execute @s[tag=wbhcptbtx] ~ ~ ~ scoreboard players remove @s wbptbtx 1

execute @s[scores={wbptbtx=1},tag=wbonptbtx] ~ ~ ~ effect @s nausea 2 4 true
execute @s[scores={wbptbtx=2},tag=wbonptbtx] ~ ~ ~ effect @s nausea 3 5 true
execute @s[scores={wbptbtx=3},tag=wbonptbtx] ~ ~ ~ effect @s nausea 4 6 true
execute @s[scores={wbptbtx=4},tag=wbonptbtx] ~ ~ ~ effect @s nausea 3 7 true
execute @s[scores={wbptbtx=4},tag=wbonptbtx] ~ ~ ~ effect @s resistance 6 255 true
execute @s[scores={wbptbtx=4},tag=wbonptbtx] ~ ~ ~ effect @s regeneration 6 255 true
execute @s[scores={wbptbtx=4},tag=wbonptbtx] ~ ~ ~ effect @s blindness 6 255 true
execute @s[scores={wbptbtx=4},tag=wbonptbtx] ~ ~ ~ spreadplayers 0 0 10 200 @s
execute @s[scores={wbptbtx=4},tag=wbonptbtx] ~ ~ ~ tag @s add wbhcptbtx

tag @s remove wbonptbtx