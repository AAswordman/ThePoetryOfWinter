scoreboard objectives add wbx dummy 坐标x
scoreboard objectives add wbxcg dummy 坐标x草稿
scoreboard objectives add wby dummy 坐标y
scoreboard objectives add wbycg dummy 坐标x草稿
scoreboard objectives add wbz dummy 坐标z
scoreboard objectives add wbzcg dummy 坐标z草稿
scoreboard objectives add judge dummy 判断
tag @s remove wbxyzbug
tag @s remove wbxyzok

summon wb:position_execute 0 ~ ~
//x轴
scoreboard players set @s wbx 0



tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbx
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~+524288 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=524288] wbx 524288
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=524288] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~-1048576 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=524288] wbx -524288
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=524288] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbx
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~+262144 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=262144] wbx 262144
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=262144] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~-262144 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=262144] wbx -262144
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=262144] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbx
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~+131072 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=131072] wbx 131072
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=131072] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~-262144 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=131072] wbx -131072
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=131072] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbx
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~+65536 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=65536] wbx 65536
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=65536] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~-131072 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=65536] wbx -65536
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=65536] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbx
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~+32768 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=32768] wbx 32768
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=32768] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~-65536 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=32768] wbx -32768
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=32768] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbx
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~+16384 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=16384] wbx 16384
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=16384] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~-32768 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=16384] wbx -16384
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=16384] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbx
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~+8192 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=8192] wbx 8192
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=8192] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~-16384 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=8192] wbx -8192
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=8192] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbx
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~+4096 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=4096] wbx 4096
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=4096] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~-8192 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=4096] wbx -4096
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=4096] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbx
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~+2048 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=2048] wbx 2048
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=2048] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~-4096 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=2048] wbx -2048
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=2048] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbx
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~+1024 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=1024] wbx 1024
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=1024] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~-2048 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=1024] wbx -1024
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=1024] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbx
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~+512 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=512] wbx 512
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=512] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~-1024 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=512] wbx -512
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=512] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbx
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~+256 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=256] wbx 256
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=256] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~-512 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=256] wbx -256
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=256] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbx
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~+128 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=128] wbx 128
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=128] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~-256 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=128] wbx -128
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=128] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbx
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~+64 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=64] wbx 64
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=64] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~-128 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=64] wbx -64
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=64] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbx
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~+32 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=32] wbx 32
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=32] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~-64 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=32] wbx -32
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=32] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbx
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~+16 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=16] wbx 16
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=16] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~-32 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=16] wbx -16
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=16] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbx
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~+8 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=8] wbx 8
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=8] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~-16 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=8] wbx -8
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=8] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbx
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~+4 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=4] wbx 4
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=4] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~-8 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=4] wbx -4
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=4] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbx
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~+2 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=2] wbx 2
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=2] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~-4 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=2] wbx -2
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=2] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbx
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~+1 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=1] wbx 1
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=1] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~-2 ~ ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=1] wbx -1
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=1] add wbxyzok

kill @e[type=wb:position_execute]
summon wb:position_execute ~ ~ 0
//z轴
scoreboard players set @s wbz 0

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbz
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~+524288
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=524288] wbz 524288
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=524288] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~-1048576
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=524288] wbz -524288
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=524288] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbz
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~+262144
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=262144] wbz 262144
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=262144] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~-262144
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=262144] wbz -262144
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=262144] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbz
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~+131072
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=131072] wbz 131072
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=131072] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~-262144
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=131072] wbz -131072
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=131072] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbz
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~+65536
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=65536] wbz 65536
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=65536] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~-131072
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=65536] wbz -65536
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=65536] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbz
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~+32768
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=32768] wbz 32768
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=32768] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~-65536
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=32768] wbz -32768
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=32768] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbz
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~+16384
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=16384] wbz 16384
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=16384] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~-32768
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=16384] wbz -16384
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=16384] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbz
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~+8192
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=8192] wbz 8192
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=8192] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~-16384
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=8192] wbz -8192
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=8192] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbz
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~+4096
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=4096] wbz 4096
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=4096] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~-8192
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=4096] wbz -4096
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=4096] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbz
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~+2048
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=2048] wbz 2048
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=2048] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~-4096
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=2048] wbz -2048
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=2048] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbz
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~+1024
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=1024] wbz 1024
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=1024] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~-2048
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=1024] wbz -1024
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=1024] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbz
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~+512
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=512] wbz 512
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=512] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~-1024
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=512] wbz -512
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=512] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbz
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~+256
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=256] wbz 256
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=256] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~-512
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=256] wbz -256
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=256] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbz
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~+128
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=128] wbz 128
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=128] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~-256
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=128] wbz -128
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=128] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbz
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~+64
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=64] wbz 64
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=64] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~-128
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=64] wbz -64
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=64] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbz
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~+32
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=32] wbz 32
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=32] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~-64
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=32] wbz -32
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=32] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbz
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~+16
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=16] wbz 16
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=16] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~-32
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=16] wbz -16
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=16] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbz
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~+8
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=8] wbz 8
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=8] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~-16
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=8] wbz -8
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=8] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbz
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~+4
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=4] wbz 4
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=4] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~-8
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=4] wbz -4
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=4] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbz
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~+2
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=2] wbz 2
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=2] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~-4
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=2] wbz -2
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=2] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbz
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~+1
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=1] wbz 1
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=1] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~ ~-2
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=1] wbz -1
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=1] add wbxyzok

kill @e[type=wb:position_execute]
summon wb:position_execute ~ 0 ~
//z轴
scoreboard players set @s wby 0



tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbz
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~+1024 ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=1024] wby 1024
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=1024] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~-2048 ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=1024] wby -1024
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=1024] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbz
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~+512 ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=512] wby 512
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=512] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~-1024 ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=512] wby -512
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=512] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbz
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~+256 ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=256] wby 256
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=256] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~-512 ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=256] wby -256
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=256] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbz
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~+128 ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=128] wby 128
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=128] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~-256 ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=128] wby -128
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=128] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbz
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~+64 ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=64] wby 64
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=64] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~-128 ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=64] wby -64
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=64] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbz
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~+32 ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=32] wby 32
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=32] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~-64 ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=32] wby -32
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=32] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbz
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~+16 ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=16] wby 16
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=16] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~-32 ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=16] wby -16
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=16] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbz
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~+8 ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=8] wby 8
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=8] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~-16 ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=8] wby -8
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=8] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbz
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~+4 ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=4] wby 4
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=4] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~-8 ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=4] wby -4
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=4] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbz
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~+2 ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=2] wby 2
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=2] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~-4 ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=2] wby -2
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=2] add wbxyzok

tag @s remove wbxyzok
scoreboard players operation @s judge = @s wbz
execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~+1 ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=1] wby 1
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=1] add wbxyzok
execute positioned as @s[tag=!wbxyzok] run execute positioned as @e[type=wb:position_execute] run tp @e[type=wb:position_execute] ~ ~-2 ~
execute positioned as @e[type=wb:position_execute] run scoreboard players add @e[type=minecraft:player,r=1] wby -1
execute positioned as @e[type=wb:position_execute] run tag @e[type=minecraft:player,r=1] add wbxyzok


kill @e[type=wb:position_execute]