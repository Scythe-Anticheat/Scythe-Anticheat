# Anti-Command Block Exploit

execute @e[type=command_block_minecart] ~~~ execute @p ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has attempted to use §4CBE!"}]}

kill @e[type=command_block_minecart]
kill @e[type=moving_block]

clear @a[tag=!op,tag=!bypass] bucket 2
clear @a[tag=!op,tag=!bypass] bucket 3
clear @a[tag=!op,tag=!bypass] bucket 4
clear @a[tag=!op,tag=!bypass] bucket 5
clear @a[tag=!op,tag=!bypass] bucket 11
clear @a[tag=!op,tag=!bypass] bucket 12
clear @a[tag=!op,tag=!bypass] beehive
clear @a[tag=!op,tag=!bypass] bee_nest

# Clears ground items

kill @e[type=item,name="Bucket Of Cod"]
kill @e[type=item,name="Bucket Of Salmon"]
kill @e[type=item,name="Bucket Of Tropical Fish"]
kill @e[type=item,name="Bucket Of Pufferfish"]
kill @e[type=item,name="Powder Snow Bucket"]
kill @e[type=item,name="Bucket Of Axolotl"]
kill @e[type=item,name="Beehive"]
kill @e[type=item,name="Bee Nest"]
kill @e[type=item,name="tile.movingBlock.name"]

# Gets rid of beehives and beenests already placed
execute @a ~~~ fill ~-5 0 ~-5 ~+5 255 ~+5 air 0 replace bee_nest -1
execute @a ~~~ fill ~-5 0 ~-5 ~+5 255 ~+5 air 0 replace beehive -1

# NOTE: IF YOUR SERVER USES NPC'S PLEASE PUT A # AT THE START OF THE COMMAND!
kill @e[type=npc]
