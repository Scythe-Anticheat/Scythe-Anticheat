# make sure they are allowed to use this command
tellraw @s[type=player,tag=!op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r §4§lHey! §rYou must be Scythe-Opped to use this function."}]}
execute @a[tag=!op] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has tried to toggle Gamemode 2 without op permissions."}]}

# allow
execute @s[type=player,tag=op,scores={gma=..0}] ~~~ scoreboard players set scythe:config gma 1
execute @s[type=player,tag=op,scores={gma=..0}] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has disabled §4gamemode 2§r to be used."}]}

# deny
execute @s[type=player,tag=op,scores={gma=1..}] ~~~ scoreboard players set scythe:config gma 0
execute @s[type=player,tag=op,scores={gma=1..}] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has allowed §agamemode 2§r to be used."}]}

scoreboard players operation @a gma = scythe:config gma