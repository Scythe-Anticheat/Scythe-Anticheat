# if the player is already op
tellraw @s[tag=op] {"rawtext":[{"text":"To OP someone use this command: /execute <PlayerName> ~~~ function op."}]}

tellraw @s[tag=!op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r §7You are now op!"}]}
tellraw @a[tag=!op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" is now Scythe-Opped."}]}
tag @s[type=player,tag=!op] add op