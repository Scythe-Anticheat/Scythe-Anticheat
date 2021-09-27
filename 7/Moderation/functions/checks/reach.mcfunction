# Blocks reach hacks
tp @e[type=armor_stand,name="reachblock"] 999 -200 999
execute @a ^ ^ ^ summon armor_stand "reachblock" ^ ^+1 ^+5
# effect @e[type=armor_stand,name="reachblock"] invisibility 9999 250 true
execute @e[type=armor_stand,name="reachblock"] ~ ~ ~ kill @e[type=item,r=2,name="Armor Stand"]