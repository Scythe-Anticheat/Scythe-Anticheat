scoreboard players add @s gmc 0

# make sure they are allowed to use this command
tellraw @s[type=player,tag=!op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r §4§lHey! §rYou must be Scythe-Opped to use this function!"}]}
execute @s[tag=!op] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §rHas tried to enable Gamemode 1 without perms!"}]}

# allow
execute @s[type=player,tag=op,scores={gmc=..0}] ~~~ scoreboard players set scythe:gamemode gmc 1
execute @s[type=player,tag=op,scores={gmc=..0}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has allowed gamemode 1 to be used!"}]}

# deny
execute @s[type=player,tag=op,scores={gmc=1..}] ~~~ scoreboard players set scythe:gamemode gmc 0
execute @s[type=player,tag=op,scores={gmc=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has disallowed gamemode 1 to be used!"}]}
