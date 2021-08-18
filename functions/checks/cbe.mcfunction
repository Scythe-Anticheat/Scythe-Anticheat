# Anti-Command Block Exploit

execute @e[type=command_block_minecart] ~~~ execute @p ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has attempted to use §4CBE!"}]}
kill @e[type=command_block_minecart]
clear @a[tag=!op,tag=!bypass] bucket 2
clear @a[tag=!op,tag=!bypass] bucket 3
clear @a[tag=!op,tag=!bypass] bucket 4
clear @a[tag=!op,tag=!bypass] bucket 5
clear @a[tag=!op,tag=!bypass] bucket 11
clear @a[tag=!op,tag=!bypass] bucket 12
clear @a[tag=!op,tag=!bypass] beehive
clear @a[tag=!op,tag=!bypass] bee_nest

execute @a ~~~ fill ~-5 0 ~-5 ~+5 255 ~+5 air 0 replace bee_nest -1
execute @a ~~~ fill ~-5 0 ~-5 ~+5 255 ~+5 air 0 replace beehive -1

# NOTE: IF YOUR SERVER USES NPC'S PLEASE PUT A # AT THE START OF THE COMMAND!
kill @e[type=npc]