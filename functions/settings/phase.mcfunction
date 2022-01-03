# make sure they are allowed to use this command
tellraw @s[type=player,tag=!op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r §4§lHey! §rYou must be Scythe-Opped to use this function!"}]}
execute @s[tag=!op] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has tried to toggle anti-phase without perms!"}]}

# deny
execute @s[type=player,tag=op,scores={phase=..0}] ~~~ scoreboard players set scythe:config phase 1
execute @s[type=player,tag=op,scores={phase=..0}] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has disabled §4Anti-phase!"}]}

# allow
execute @s[type=player,tag=op,scores={phase=1..}] ~~~ scoreboard players set scythe:config phase 0
execute @s[type=player,tag=op,scores={phase=1..}] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has enabled §aAnti-phase!"}]}

scoreboard players operation @a phase = scythe:config phase
