scoreboard players set @s skill_count 0
scriptevent dec:sustain_damage magic;4;5;4;dead_wood_rapier_skill
scriptevent dec:sustain_particle dec:dead_wood_wake_particle;17;1
scriptevent dec:sprint 3.2
playanimation @s animation.humanoid.sprint
effect @e[r=3,rm=1,type=!item,type=!painting] wither 2 0
effect @e[r=3,rm=1,type=!item,type=!painting] poison 3 0