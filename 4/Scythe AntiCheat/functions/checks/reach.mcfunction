# Blocks reach hacks
tp @e[type=armor_stand,name="reachblock"] ~ -100 ~
kill @e[type=armor_stand,name="reachblock"]
execute @a ^ ^ ^ summon armor_stand "reachblock" ^ ^+1 ^+7
effect @e[type=armor_stand,name="reachblock"] invisibility 9999 250 true
execute @e[type=armor_stand,name="reachblock"] ~ ~ ~ kill @e[type=item,r=2,name="Armor Stand"]
execute @e[type=arrow] ~ ~ ~ tp @e[type=armor_stand,name="reachblock",r=3] 0 -100 0 