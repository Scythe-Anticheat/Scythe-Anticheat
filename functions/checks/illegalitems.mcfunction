# Clears illegal items from player inventories

# clear dropped items
execute @e[type=item,tag=!didCheck] ~~~ function checks/assets/cleardropped

# get rid of illegal blocks already placed
fill ~10 ~3 ~10 ~-10 ~-3 ~-10 air 0 replace unknown -1