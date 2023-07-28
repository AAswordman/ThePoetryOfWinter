scoreboard players set MagicDisplay global 0
scoreboard objectives remove magicdisplay
tellraw @a { "rawtext" : [ { "translate" : "text.dec:magic_display_off.name" } ] }