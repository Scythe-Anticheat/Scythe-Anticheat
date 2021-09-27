tag @s[tag=freeze] add nofreeze
tag @s[tag=nofreeze] remove freeze
effect @s[tag=nofreeze] clear
tellraw @s[tag=nofreeze] {"rawtext":[{"text":"§r§6[§aScythe§6] §r You are no longer frozen!"}]}
execute @s[tag=nofreeze] ~~~ detect ~ ~+2 ~ barrier 0 setblock ~ ~+2 ~ air
execute @s[tag=nofreeze] ~ ~ ~ tell @a[tag=notify] §r§6[§aScythe§6] §r@s Is No Longer Frozen!

effect @s[tag=!nofreeze] slowness 9999 250 true
effect @s[tag=!nofreeze] weakness 9999 250 true
effect @s[tag=!nofreeze] mining_fatigue 9999 250 true
effect @s[tag=!nofreeze] blindness 9999 250 true
execute @s[tag=!nofreeze] ~~~ detect ~ ~+2 ~ air 0 setblock ~ ~+2 ~ barrier
tag @s[tag=!nofreeze] add freeze
tellraw @s[tag=freeze,tag=!nofreeze] {"rawtext":[{"text":"§r§6[§aScythe§6] §rYou Are Frozen By Staff!"}]}
execute @s[tag=freeze,tag=!nofreeze] ~ ~ ~ tell @a[tag=notify] §r§6[§aScythe§6] §r@s Is Frozen!


tag @s[tag=nofreeze] remove nofreeze