# make sure they are allowed to use this command
tellraw @s[type=player,tag=!op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r §4§lHey! §rYou must be Scythe-Opped to use this function!"}]}
execute @s[tag=!op] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §has tried to toggle worldborder! without perms!"}]}

# 1k
execute @s[type=player,tag=op,scores={worldborder=..0}] ~~~ scoreboard players set scythe:config worldborder 1
execute @s[type=player,tag=op,scores={worldborder=..0}] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has set the §aworld border to 1k!"}]}

# 5k
execute @s[type=player,tag=op,scores={worldborder=1}] ~~~ scoreboard players set scythe:config worldborder 2
execute @s[type=player,tag=op,scores={worldborder=1}] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has set the §aworld border to 5k!"}]}

# 10k
execute @s[type=player,tag=op,scores={worldborder=2}] ~~~ scoreboard players set scythe:config worldborder 3
execute @s[type=player,tag=op,scores={worldborder=2}] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has set the §aworld border to 10k!"}]}

# 25k
execute @s[type=player,tag=op,scores={worldborder=3}] ~~~ scoreboard players set scythe:config worldborder 4
execute @s[type=player,tag=op,scores={worldborder=3}] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has set the §aworld border to 25k!"}]}

# 50k
execute @s[type=player,tag=op,scores={worldborder=4}] ~~~ scoreboard players set scythe:config worldborder 5
execute @s[type=player,tag=op,scores={worldborder=4}] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has set the §aworld border to 50k!"}]}

# 100k
execute @s[type=player,tag=op,scores={worldborder=5}] ~~~ scoreboard players set scythe:config worldborder 6
execute @s[type=player,tag=op,scores={worldborder=5}] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has set the §aworld border to 100k!"}]}

# disable
execute @s[type=player,tag=op,scores={worldborder=6..}] ~~~ scoreboard players set scythe:config worldborder 0
execute @s[type=player,tag=op,scores={worldborder=6..}] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has §4disabled§r the worldborder!"}]}

scoreboard players operation @a worldborder = scythe:config worldborder