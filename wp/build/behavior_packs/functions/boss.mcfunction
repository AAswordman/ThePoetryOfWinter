##死亡模式防创造
execute if entity @a[m=1] run scoreboard players set AlreadyGmCheat global 1
execute if score DieMode global = one global if entity @a[m=1] run tag @a[m=1] add diemode_gmcheat

##Boss战设置
execute as @e[family=boss] run kill @e[type=boat,r=3]
execute as @e[family=boss] run kill @e[type=minecart,r=3]
effect @e[family=boss] levitation 0
execute as @e[family=mini_boss] run kill @e[type=boat,r=3]
execute as @e[family=mini_boss] run kill @e[type=minecart,r=3]