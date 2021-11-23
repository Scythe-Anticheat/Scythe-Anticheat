# make sure they are allowed to use this command
tellraw @s[type=player,tag=!op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r §4§lHey! §rYou must be Scythe-Opped to use this function!"}]}
execute @s[tag=!op] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has tried to enable NPCs without perms!"}]}

# deny
execute @s[type=player,tag=op,scores={npc=1..}] ~~~ scoreboard players set scythe:config npc 0
execute @s[type=player,tag=op,scores={npc=1..}] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has enabled §aAnti-NPC!"}]}

# allow
execute @s[type=player,tag=op,scores={npc=..0}] ~~~ scoreboard players set scythe:config npc 1
execute @s[type=player,tag=op,scores={npc=..0}] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has disabled §4Anti-NPC!"}]}

scoreboard players operation @a npc = scythe:config npc