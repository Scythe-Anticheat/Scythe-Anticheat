# Automatically kick banned users

tellraw @a[tag=op] {"rawtext":[{"text":"§߈§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" was kicked for: You are banned!"}]}
event entity @s scythe:kick