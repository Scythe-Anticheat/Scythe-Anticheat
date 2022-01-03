# make sure they are allowed to use this command
tellraw @s[type=player,tag=!op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r §4§lHey! §rYou must be Scythe-Opped to use this function!"}]}
execute @s[tag=!op] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has tried to toggle anti-autoclicker without perms!"}]}

# deny
execute @s[type=player,tag=op,scores={autoclicker=..0}] ~~~ scoreboard players set scythe:config autoclicker 1
execute @s[type=player,tag=op,scores={autoclicker=..0}] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has disabled §4Anti-autoclicker!"}]}

# allow
execute @s[type=player,tag=op,scores={autoclicker=1..}] ~~~ scoreboard players set scythe:config autoclicker 0
execute @s[type=player,tag=op,scores={autoclicker=1..}] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has enabled §aAnti-autoclicker!"}]}

scoreboard players operation @a autoclicker = scythe:config autoclicker
