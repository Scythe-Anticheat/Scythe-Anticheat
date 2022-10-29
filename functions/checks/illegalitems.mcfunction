# Clears illegal items from player inventories

execute @e[type=item,tag=!didCheck] ~~~ function checks/assets/xray

# get rid of illegal blocks already placed
fill ~5 ~5 ~5 ~-5 ~-5 ~-5 air 0 replace unknown -1