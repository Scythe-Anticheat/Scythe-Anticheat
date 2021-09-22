# Anti-Command Block Exploit

scoreboard objectives add cbevl dummy
scoreboard players add @a cbevl 0

execute @e[type=moving_block] ~~~ execute @p ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has attempted to use §7(Exploit) §4Command Block Exploit! §7(moving_block)§4 VL= "},{"score":{"name":"@s","objective":"cbevl"}}]}
execute @e[type=moving_block] ~~~ scoreboard players add @p cbevl 1

kill @e[type=moving_block]

# fish buckets no longer have NBT tags, but we will keep them just incase
clear @s[tag=!op] bucket 2
clear @s[tag=!op] bucket 3
clear @s[tag=!op] bucket 4
clear @s[tag=!op] bucket 5
clear @s[tag=!op] bucket 11
clear @s[tag=!op] bucket 12

clear @s[tag=!op] beehive
clear @s[tag=!op] bee_nest

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
kill @e[type=item,name="§g§lBeehive Command"]
kill @e[type=item,name="§g§lBeeNest Command"]
kill @e[type=item,name="§g§lSpoofed BeeNest Command"]
kill @e[type=item,name="§g§lInvisible Beehive Command"]
kill @e[type=item,name="§g§lMovingBlock BeeNest Command"]


# Gets rid of beehives and beenests already placed
fill ~-5 0 ~-5 ~+5 255 ~+5 air 0 replace bee_nest -1
fill ~-5 0 ~-5 ~+5 255 ~+5 air 0 replace beehive -1

fill ~+10 255 ~+10 ~+10 0 ~+10 air 0 replace bee_nest -1
fill ~+10 255 ~+10 ~+10 0 ~+10 air 0 replace beehive -1

# NOTE: IF YOUR SERVER USES NPC'S PLEASE PUT A # AT THE START OF THE COMMANDS!
execute @e[type=npc] ~~~ execute @p ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has attempted to use §7(Exploit) §4Command Block Exploit! §7(NPC)§4 VL= "},{"score":{"name":"@s","objective":"cbevl"}}]}
execute @e[type=npc] ~~~ scoreboard players add @p cbevl 1
kill @e[type=npc]
