# if the player is already op
tellraw @s[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r You already have Scythe-Op. If you would like to Scythe-Op another player, run \"!op <player name>\"."}]}

tellraw @s[tag=!op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r §7You now have Scythe-Op."}]}
execute @s[tag=!op] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" is now Scythe-Opped."}]}
tag @s[type=player,tag=!op] add op