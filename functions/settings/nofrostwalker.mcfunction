# make sure they are allowed to use this command
tellraw @s[type=player,tag=!op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r §4§lHey! §rYou must be Scythe-Opped to use this function!"}]}
execute @s[tag=!op] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has tried to toggle No Frost Walker without perms!"}]}

# allow
execute @s[type=player,tag=op,scores={frostwalker=..0}] ~~~ scoreboard players set scythe:config frostwalker 1
execute @s[type=player,tag=op,scores={frostwalker=..0}] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has enabled §aNo Frost Walker!"}]}

# deny
execute @s[type=player,tag=op,scores={frostwalker=1..}] ~~~ scoreboard players set scythe:config frostwalker 0
execute @s[type=player,tag=op,scores={frostwalker=1..}] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has disabled §4No Frost Walker!"}]}

scoreboard players operation @a frostwalker = scythe:config frostwalker