tag @s[scores={wbfl=3..}] add shot
execute if entity @s[scores={wbfl=3..}] run playsound item.book.put @a ~~~
scoreboard players remove @s[scores={wbfl=3..}] wbfl 3