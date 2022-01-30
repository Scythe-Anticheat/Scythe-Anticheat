# make sure they are allowed to use this command
tellraw @s[type=player,tag=!op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r §4§lHey! §rYou must be Scythe-Opped to use this function!"}]}
execute @s[tag=!op] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has tried to toggle auto-banning without perms!"}]}

# allow
execute @s[type=player,tag=op,scores={autoban=..0}] ~~~ scoreboard players set scythe:config autoban 1
execute @s[type=player,tag=op,scores={autoban=..0}] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has enabled §aauto-banning."}]}

# deny
execute @s[type=player,tag=op,scores={autoban=1..}] ~~~ scoreboard players set scythe:config autoban 0
execute @s[type=player,tag=op,scores={autoban=1..}] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has disabled §4auto-banning."}]}

scoreboard players operation @a autoban = scythe:config autoban