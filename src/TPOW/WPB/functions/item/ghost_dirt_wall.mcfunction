playsound conduit.activate @a ~~~
fill ~-1~2~2 ~1~-2~2 dec:dirt_ghost_block [] replace air []
fill ~2~-2~1 ~2~2~-1 dec:dirt_ghost_block [] replace air []
fill ~1~-2~-2 ~-1~2~-2 dec:dirt_ghost_block [] replace air []
fill ~-2~2~-1 ~-2~-2~1 dec:dirt_ghost_block [] replace air []

execute if entity @s[m=!2] run fill ~-1~2~2 ~1~-2~2 dec:dirt_ghost_block [] replace tallgrass []
execute if entity @s[m=!2] run fill ~2~-2~1 ~2~2~-1 dec:dirt_ghost_block [] replace tallgrass []
execute if entity @s[m=!2] run fill ~1~-2~-2 ~-1~2~-2 dec:dirt_ghost_block [] replace tallgrass []
execute if entity @s[m=!2] run fill ~-2~2~-1 ~-2~-2~1 dec:dirt_ghost_block [] replace tallgrass []
execute if entity @s[m=!2] run fill ~-1~2~2 ~1~-2~2 dec:dirt_ghost_block [] replace red_flower []
execute if entity @s[m=!2] run fill ~2~-2~1 ~2~2~-1 dec:dirt_ghost_block [] replace red_flower []
execute if entity @s[m=!2] run fill ~1~-2~-2 ~-1~2~-2 dec:dirt_ghost_block [] replace red_flower []
execute if entity @s[m=!2] run fill ~-2~2~-1 ~-2~-2~1 dec:dirt_ghost_block [] replace red_flower []
execute if entity @s[m=!2] run fill ~-1~2~2 ~1~-2~2 dec:dirt_ghost_block [] replace yellow_flower []
execute if entity @s[m=!2] run fill ~2~-2~1 ~2~2~-1 dec:dirt_ghost_block [] replace yellow_flower []
execute if entity @s[m=!2] run fill ~1~-2~-2 ~-1~2~-2 dec:dirt_ghost_block [] replace yellow_flower []
execute if entity @s[m=!2] run fill ~-2~2~-1 ~-2~-2~1 dec:dirt_ghost_block [] replace yellow_flower []
execute if entity @s[m=!2] run fill ~-1~2~2 ~1~-2~2 dec:dirt_ghost_block [] replace vine []
execute if entity @s[m=!2] run fill ~2~-2~1 ~2~2~-1 dec:dirt_ghost_block [] replace vine []
execute if entity @s[m=!2] run fill ~1~-2~-2 ~-1~2~-2 dec:dirt_ghost_block [] replace vine []
execute if entity @s[m=!2] run fill ~-2~2~-1 ~-2~-2~1 dec:dirt_ghost_block [] replace vine []

clear @s dec:ghost_dirt_wall 0 1