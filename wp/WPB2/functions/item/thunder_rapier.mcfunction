scoreboard players set @s skill_count 0
scriptevent dec:sustain_damage lightning;15;5;4;thunder_rapier_skill
scriptevent dec:sustain_particle dec:thunder_wake_particle;20;1
scriptevent dec:sprint 3
playanimation @s animation.humanoid.sprint