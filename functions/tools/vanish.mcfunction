tag @s[tag=vanish] add novanish
tag @s[tag=novanish] remove vanish
gamemode creative @s[tag=novanish]
tellraw @s[tag=novanish] {"rawtext":[{"text":"§r§6[§aScythe§6]§r You are now no longer vanished."}]}
execute @s[tag=novanish] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" is no longer vanished."}]}

tag @s[tag=!novanish] add vanish
gamemode spectator @s[tag=vanish,tag=!novanish]
tellraw @s[tag=vanish,tag=!novanish] {"rawtext":[{"text":"§r§6[§aScythe§6]§r You are now vanished."}]}
execute @s[tag=vanish,tag=!novanish] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" is now vanished."}]}

tag @s[tag=novanish] remove novanish