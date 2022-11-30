# if the player is already op
tellraw @s[tag=op] {"rawtext":[{"text":"To Scythe-Op someone, please use this command: \"/execute <player_name> ~~~ function op\"."}]}

tellraw @s[tag=!op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r §7You are now op!"}]}
execute @s[tag=!op] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" is now Scythe-Opped."}]}
tag @s[type=player,tag=!op] add op