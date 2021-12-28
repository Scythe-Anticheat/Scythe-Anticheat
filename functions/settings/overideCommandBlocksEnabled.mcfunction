# make sure they are allowed to use this command
tellraw @s[type=player,tag=!op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r §4§lHey! §rYou must be Scythe-Opped to use this function!"}]}
execute @s[tag=!op] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has tried to toggle Force-CommandBlocksEnabled without perms!"}]}

# enable
execute @s[type=player,tag=op,scores={cmds=..0}] ~~~ scoreboard players set scythe:config cmds 1
execute @s[type=player,tag=op,scores={cmds=..0}] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has set CommandBlocksEnabled §aas enabled!"}]}

# disable command blocks
execute @s[type=player,tag=op,scores={cmds=1}] ~~~ scoreboard players set scythe:config cmds 2
execute @s[type=player,tag=op,scores={cmds=1}] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has set CommandBlocksEnabled §4as disabled!"}]}

# allow command block
execute @s[type=player,tag=op,scores={cmds=2..}] ~~~ scoreboard players set scythe:config cmds 0
execute @s[type=player,tag=op,scores={cmds=2..}] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has §etoggled§r Force-CommandBlocksEnabled!"}]}

scoreboard players operation @a cmds = scythe:config cmds