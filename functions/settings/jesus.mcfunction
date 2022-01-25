# make sure they are allowed to use this command
tellraw @s[type=player,tag=!op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r §4§lHey! §rYou must be Scythe-Opped to use this function!"}]}
execute @s[tag=!op] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has tried to toggle Anti-Jesus without perms!"}]}

# allow
execute @s[type=player,tag=op,scores={jesus=..0}] ~~~ scoreboard players set scythe:config jesus 1
execute @s[type=player,tag=op,scores={jesus=..0}] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has disabled §4Anti-Jesus§r!"}]}

# deny
execute @s[type=player,tag=op,scores={jesus=1..}] ~~~ scoreboard players set scythe:config jesus 0
execute @s[type=player,tag=op,scores={jesus=1..}] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has enabled §aAnti-Jesus§r!"}]}

scoreboard players operation @a jesus = scythe:config jesus