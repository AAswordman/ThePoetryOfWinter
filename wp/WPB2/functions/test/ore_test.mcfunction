tickingarea add ~~~ ~~~ ore_test
execute at @p run fill ~-10 ~-10 ~-10 ~10 ~10 ~10 air 0 replace stone -1
execute at @p run fill ~-10 ~-10 ~-10 ~10 ~10 ~10 air 0 replace netherrack 0
execute at @p run fill ~-10 ~-10 ~-10 ~10 ~10 ~10 air 0 replace end_stone 0
kill @e[type=falling_block]
effect @p night_vision 12 0 true