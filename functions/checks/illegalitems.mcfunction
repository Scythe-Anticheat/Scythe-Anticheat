# Clears illegal items from player inventories

# skull3
clear @s[tag=!op,m=!c] skull 3

# chiseled purpur
clear @s purpur_block 1

# tile.purpur_block.smooth.name
clear @s purpur_block 3

# clear dropped items
execute @e[type=item,tag=!didCheck] ~~~ function checks/assets/cleardropped

# get rid of illegal blocks already placed
fill ~10 ~3 ~10 ~-10 ~-3 ~-10 air 0 replace unknown -1
