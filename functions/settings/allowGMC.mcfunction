# make sure they are allowed to use this command
tellraw @s[type=player,tag=!op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r §4§lHey! §rYou must be Scythe-Opped to use this function!"}]}
execute @s[tag=!op] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has tried to toggle Gamemode 1 without op permissions!"}]}

# allow
execute @s[type=player,tag=op,scores={gmc=..0}] ~~~ scoreboard players set scythe:config gmc 1
execute @s[type=player,tag=op,scores={gmc=..0}] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has disabled §4gamemode 1§r to be used!"}]}

# deny
execute @s[type=player,tag=op,scores={gmc=1..}] ~~~ scoreboard players set scythe:config gmc 0
execute @s[type=player,tag=op,scores={gmc=1..}] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has allowed §agamemode 1§r to be used!"}]}

scoreboard players operation @a gmc = scythe:config gmc
