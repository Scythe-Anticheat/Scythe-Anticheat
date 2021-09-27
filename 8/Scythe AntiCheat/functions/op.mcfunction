op @s[tag=!op]
tellraw @s[tag=!op] {"rawtext":[{"text":"§7You are now op!"}]}
tellraw @s[tag=op] {"rawtext":[{"text":"To OP someone use this command: /execute <PlayerName> ~ ~ ~ function op."}]}
tag @s[tag=!op] add op
