# Clears illegal items from player inventories

scoreboard objectives add illegalitemsvl dummy

# skull3
clear @s[tag=!op,m=!c] skull 3

# chiseled purpur
clear @s purpur_block 1

# tile.purpur_block.smooth.name
clear @a purpur_block 3

# clear dropped items
kill @e[type=item,name="Bedrock"]
kill @e[type=item,name="End Portal"]
kill @e[type=item,name="Command Block"]
kill @e[type=item,name="Chain Command Block"]
kill @e[type=item,name="Repeating Command Block"]
kill @e[type=item,name="Minecart with Command Block"]
kill @e[type=item,name="Barrier"]
kill @e[type=item,name="Structure Block"]
kill @e[type=item,name="Structure Void"]
kill @e[type=item,name="Jigsaw Block"]
kill @e[type=item,name="Allow"]
kill @e[type=item,name="Deny"]
kill @e[type=item,name="Light Block"]
kill @e[type=item,name="Border"]
kill @e[type=item,name="Compound Creator"]
kill @e[type=item,name="Frosted Ice"]
kill @e[type=item,name=""]

# get rid of illegal blocks already placed
fill ~+10 ~+3 ~+10 ~-10 ~-3 ~-10 air 0 replace unknown -1
