# make sure they are allowed to use this command
tellraw @s[type=player,tag=!op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r §4§lHey! §rYou must be Scythe-Opped to use this function!"}]}
execute @s[tag=!op] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §rHas tried to enable Gamemode 2 without perms!"}]}

execute @s[type=player,tag=op] ~~~ scoreboard players set scythe:gamemode gma 1
execute @s[type=player,tag=op] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has allowed gamemode 2 to be used!"}]}