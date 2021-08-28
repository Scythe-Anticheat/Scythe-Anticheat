tellraw @s[tag=!op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r §7You are now op!"}]}
execute @s[tag=!op] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §rIs now Scythe-Opped."}]}
tellraw @s[tag=op] {"rawtext":[{"text":"To OP someone use this command: /execute <PlayerName> ~ ~ ~ function op."}]}
tag @s[tag=!op] add op
