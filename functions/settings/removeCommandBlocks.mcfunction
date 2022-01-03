# make sure they are allowed to use this command
tellraw @s[type=player,tag=!op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r §4§lHey! §rYou must be Scythe-Opped to use this function!"}]}
execute @s[tag=!op] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has tried to toggle Command Blocks without perms!"}]}

# allow
execute @s[type=player,tag=op,scores={commandblocks=..0}] ~~~ scoreboard players set scythe:config commandblocks 1
execute @s[type=player,tag=op,scores={commandblocks=..0}] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has enabled §aclearing command blocks!"}]}

# deny
execute @s[type=player,tag=op,scores={commandblocks=1..}] ~~~ scoreboard players set scythe:config commandblocks 0
execute @s[type=player,tag=op,scores={commandblocks=1..}] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has disabled §4clearing command blocks!"}]}

scoreboard players operation @a commandblocks = scythe:config commandblocks