tickingarea add ~~~ ~~~ ore_test
execute at @p run fill ~-10 ~-10 ~-10 ~10 ~10 ~10 air [] replace stone []
execute at @p run fill ~-10 ~-10 ~-10 ~10 ~10 ~10 air [] replace netherrack []
execute at @p run fill ~-10 ~-10 ~-10 ~10 ~10 ~10 air [] replace end_stone []
kill @e[type=falling_block]
effect @p night_vision 12 0 true