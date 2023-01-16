gamerule commandblockoutput false


##计分板
scoreboard objectives add global dummy
scoreboard players set zero global 0
scoreboard players set one global 1
scoreboard players set two global 2
scoreboard players add FirstEnter global 0
scoreboard players add AlreadyDie global 0
scoreboard players add AlreadyGmCheat global 0
scoreboard players add DieMode global 0
scoreboard players add MagicDisplay global 0
scoreboard players add IsNight global 0
scoreboard players add IsDay global 0
scoreboard players add NightRandom global 0

##房主标记
execute unless score FirstEnter global = one global run tag @a add owner
execute unless score FirstEnter global = one global run scoreboard players set FirstEnter global 1

##声明及重置变量
scoreboard objectives add night_event dummy
scoreboard objectives add magicreckontimer dummy
scoreboard objectives add wbflmirror dummy
scoreboard objectives add gametime dummy
scoreboard objectives add maxmagic dummy
scoreboard objectives add magicgain dummy
scoreboard objectives add story_random dummy
scoreboard objectives add magicreckon dummy
scoreboard objectives add random dummy
scoreboard objectives add skill_count dummy
scoreboard players add @a night_event 0
scoreboard players add @a i_inviolable 0
scoreboard players add @a i_damp 0
scoreboard players add @a i_soft 0
scoreboard players set @a[tag=!mok] maxmagic 0
scoreboard players set @a[tag=!mok] magicgain 1
scoreboard players set @a[tag=!mok] tens 20
scoreboard players set @a[tag=!mok] magicreckontimer 0
scoreboard players set @a[tag=!mok] magicreckon 0
scoreboard players set @a[tag=!mok] skill_count 0
tag @a[tag=!mok] add mok