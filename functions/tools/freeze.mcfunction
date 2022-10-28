tag @s[tag=freeze] add nofreeze
tag @s[tag=nofreeze] remove freeze

effect @s[tag=nofreeze] clear
tellraw @s[tag=nofreeze] {"rawtext":[{"text":"§r§6[§aScythe§6]§r You are no longer frozen!"}]}
execute @s[type=player,tag=nofreeze] ~~~ detect ~~2~ barrier 0 setblock ~~2~ air
execute @s[tag=nofreeze] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" is no longer frozen."}]}

effect @s[type=player,tag=!nofreeze] slowness 9999 250 true
effect @s[type=player,tag=!nofreeze] weakness 9999 250 true
effect @s[type=player,tag=!nofreeze] mining_fatigue 9999 250 true
effect @s[type=player,tag=!nofreeze] blindness 9999 250 true
execute @s[type=player,tag=!nofreeze] ~~~ detect ~~2~ air -1 setblock ~~2~ barrier
tag @s[tag=!nofreeze] add freeze
execute @s[tag=freeze,tag=!nofreeze] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has been frozen."}]}


tag @s[tag=nofreeze] remove nofreeze
