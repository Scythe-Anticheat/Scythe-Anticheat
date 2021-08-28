# Clears illegal items from player inventories

scoreboard players add @a illegalitemsvl 0

# bedrock
execute @a[tag=bedrock,tag=!op,m=!c,tag=!bypass] ~~~ clear @s bedrock
execute @a[tag=bedrock,tag=!op,m=!c,tag=!bypass] ~~~ scoreboard players add @s illegalitemsvl 1
execute @a[tag=bedrock,tag=!op,m=!c,tag=!bypass] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Inventory) §4Illegal Items §7(bedrock)§4. VL= "},{"score":{"name":"@s","objective":"illegalitemsvl"}}]}

# spawn_eggs
# cant get this to work :(
clear @a[tag=!op,m=!c,tag=!bypass] spawn_egg

# end_portal_frame
execute @a[tag=end_portal_frame,tag=!op,m=!c,tag=!bypass] ~~~ clear @s end_portal_frame
execute @a[tag=end_portal_frame,tag=!op,m=!c,tag=!bypass] ~~~ scoreboard players add @s illegalitemsvl 1
execute @a[tag=end_portal_frame,tag=!op,m=!c,tag=!bypass] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Inventory) §4Illegal Items §7(end_portal_frame)§4. VL= "},{"score":{"name":"@s","objective":"illegalitemsvl"}}]}

# dragon_egg
execute @a[tag=dragon_egg,tag=!op,m=!c,tag=!bypass] ~~~ clear @s dragon_egg
execute @a[tag=dragon_egg,tag=!op,m=!c,tag=!bypass] ~~~ scoreboard players add @s illegalitemsvl 1
execute @a[tag=dragon_egg,tag=!op,m=!c,tag=!bypass] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Inventory) §4Illegal Items §7(dragon_egg)§4. VL= "},{"score":{"name":"@s","objective":"illegalitemsvl"}}]}

# farmland
execute @a[tag=farmland,tag=!op,m=!c,tag=!bypass] ~~~ clear @s farmland
execute @a[tag=farmland,tag=!op,m=!c,tag=!bypass] ~~~ scoreboard players add @s illegalitemsvl 1
execute @a[tag=farmland,tag=!op,m=!c,tag=!bypass] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Inventory) §4Illegal Items §7(farmland)§4. VL= "},{"score":{"name":"@s","objective":"illegalitemsvl"}}]}


# monster_egg
execute @a[tag=monster_egg,tag=!op,m=!c,tag=!bypass] ~~~ clear @s monster_egg
execute @a[tag=monster_egg,tag=!op,m=!c,tag=!bypass] ~~~ scoreboard players add @s illegalitemsvl 1
execute @a[tag=monster_egg,tag=!op,m=!c,tag=!bypass] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Inventory) §4Illegal Items §7(monster_egg)§4. VL= "},{"score":{"name":"@s","objective":"illegalitemsvl"}}]}

# brown_mushroom_block
execute @a[tag=brown_mushroom_block,tag=!op,m=!c,tag=!bypass] ~~~ clear @s brown_mushroom_block
execute @a[tag=brown_mushroom_block,tag=!op,m=!c,tag=!bypass] ~~~ scoreboard players add @s illegalitemsvl 1
execute @a[tag=brown_mushroom_block,tag=!op,m=!c,tag=!bypass] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Inventory) §4Illegal Items §7(brown_mushroom_block)§4. VL= "},{"score":{"name":"@s","objective":"illegalitemsvl"}}]}

# red_mushroom_block
execute @a[tag=red_mushroom_block,tag=!op,m=!c,tag=!bypass] ~~~ clear @s red_mushroom_block
execute @a[tag=red_mushroom_block,tag=!op,m=!c,tag=!bypass] ~~~ scoreboard players add @s illegalitemsvl 1
execute @a[tag=red_mushroom_block,tag=!op,m=!c,tag=!bypass] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Inventory) §4Illegal Items §7(red_mushroom_block)§4. VL= "},{"score":{"name":"@s","objective":"illegalitemsvl"}}]}

# chorus_plant
execute @a[tag=chorus_plant,tag=!op,m=!c,tag=!bypass] ~~~ clear @s chorus_plant
execute @a[tag=chorus_plant,tag=!op,m=!c,tag=!bypass] ~~~ scoreboard players add @s illegalitemsvl 1
execute @a[tag=chorus_plant,tag=!op,m=!c,tag=!bypass] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Inventory) §4Illegal Items §7(chorus_plant)§4. VL= "},{"score":{"name":"@s","objective":"illegalitemsvl"}}]}

# turtle_egg
execute @a[tag=turtle_egg,tag=!op,m=!c,tag=!bypass] ~~~ clear @s turtle_egg
execute @a[tag=turtle_egg,tag=!op,m=!c,tag=!bypass] ~~~ scoreboard players add @s illegalitemsvl 1
execute @a[tag=turtle_egg,tag=!op,m=!c,tag=!bypass] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Inventory) §4Illegal Items §7(turtle_egg)§4. VL= "},{"score":{"name":"@s","objective":"illegalitemsvl"}}]}

# skull3
# no way to detect item data as of now
clear @a[tag=skull3,tag=!op,m=!c,tag=!bypass] skull 3

# mob_spawner
execute @a[tag=mob_spawner,tag=!op,m=!c,tag=!bypass] ~~~ clear @s mob_spawner
execute @a[tag=mob_spawner,tag=!op,m=!c,tag=!bypass] ~~~ scoreboard players add @s illegalitemsvl 1
execute @a[tag=mob_spawner,tag=!op,m=!c,tag=!bypass] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Inventory) §4Illegal Items §7(mob_spawner)§4. VL= "},{"score":{"name":"@s","objective":"illegalitemsvl"}}]}

# command_block
execute @a[tag=command_block,tag=!op,tag=!bypass] ~~~ clear @s command_block
execute @a[tag=command_block,tag=!op,tag=!bypass] ~~~ scoreboard players add @s illegalitemsvl 1
execute @a[tag=command_block,tag=!op,tag=!bypass] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Inventory) §4Illegal Items §7(command_block)§4. VL= "},{"score":{"name":"@s","objective":"illegalitemsvl"}}]}

# chain_command_block
execute @a[tag=chain_command_block,tag=!op,tag=!bypass] ~~~ clear @s chain_command_block
execute @a[tag=chain_command_block,tag=!op,tag=!bypass] ~~~ scoreboard players add @s illegalitemsvl 1
execute @a[tag=chain_command_block,tag=!op,tag=!bypass] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Inventory) §4Illegal Items §7(chain_command_block)§4. VL= "},{"score":{"name":"@s","objective":"illegalitemsvl"}}]}

# repeating_command_block
execute @a[tag=repeating_command_block,tag=!op,tag=!bypass] ~~~ clear @s repeating_command_block
execute @a[tag=repeating_command_block,tag=!op,tag=!bypass] ~~~ scoreboard players add @s illegalitemsvl 1
execute @a[tag=repeating_command_block,tag=!op,tag=!bypass] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Inventory) §4Illegal Items §7(repeating_command_block)§4. VL= "},{"score":{"name":"@s","objective":"illegalitemsvl"}}]}

# command_block_minecart
execute @a[tag=command_block_minecart,tag=!op,tag=!bypass] ~~~ clear @s command_block_minecart
execute @a[tag=command_block_minecart,tag=!op,tag=!bypass] ~~~ scoreboard players add @s illegalitemsvl 1
execute @a[tag=command_block_minecart,tag=!op,tag=!bypass] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Inventory) §4Illegal Items §7(command_block_minecart)§4. VL= "},{"score":{"name":"@s","objective":"illegalitemsvl"}}]}

# barrier
execute @a[tag=barrier,tag=!op,tag=!bypass] ~~~ clear @s barrier
execute @a[tag=barrier,tag=!op,tag=!bypass] ~~~ scoreboard players add @s illegalitemsvl 1
execute @a[tag=barrier,tag=!op,tag=!bypass] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Inventory) §4Illegal Items §7(barrier)§4. VL= "},{"score":{"name":"@s","objective":"illegalitemsvl"}}]}

# structure_block
execute @a[tag=structure_block,tag=!op,tag=!bypass] ~~~ clear @s structure_block
execute @a[tag=structure_block,tag=!op,tag=!bypass] ~~~ scoreboard players add @s illegalitemsvl 1
execute @a[tag=structure_block,tag=!op,tag=!bypass] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Inventory) §4Illegal Items §7(structure_block)§4. VL= "},{"score":{"name":"@s","objective":"illegalitemsvl"}}]}

# structure_void
execute @a[tag=structure_void,tag=!op,tag=!bypass] ~~~ clear @s structure_void
execute @a[tag=structure_void,tag=!op,tag=!bypass] ~~~ scoreboard players add @s illegalitemsvl 1
execute @a[tag=structure_void,tag=!op,tag=!bypass] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Inventory) §4Illegal Items §7(structure_void)§4. VL= "},{"score":{"name":"@s","objective":"illegalitemsvl"}}]}

# jigsaw
execute @a[tag=jigsaw,tag=!op,tag=!bypass] ~~~ clear @s jigsaw
execute @a[tag=jigsaw,tag=!op,tag=!bypass] ~~~ scoreboard players add @s illegalitemsvl 1
execute @a[tag=jigsaw,tag=!op,tag=!bypass] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Inventory) §4Illegal Items §7(jigsaw)§4. VL= "},{"score":{"name":"@s","objective":"illegalitemsvl"}}]}

# allow
execute @a[tag=allow,tag=!op,tag=!bypass] ~~~ clear @s allow
execute @a[tag=allow,tag=!op,tag=!bypass] ~~~ scoreboard players add @s illegalitemsvl 1
execute @a[tag=allow,tag=!op,tag=!bypass] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Inventory) §4Illegal Items §7(allow)§4. VL= "},{"score":{"name":"@s","objective":"illegalitemsvl"}}]}

# deny
execute @a[tag=deny,tag=!op,tag=!bypass] ~~~ clear @s deny
execute @a[tag=deny,tag=!op,tag=!bypass] ~~~ scoreboard players add @s illegalitemsvl 1
execute @a[tag=deny,tag=!op,tag=!bypass] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Inventory) §4Illegal Items §7(deny)§4. VL= "},{"score":{"name":"@s","objective":"illegalitemsvl"}}]}

# light_block
execute @a[tag=light_block,tag=!op,tag=!bypass] ~~~ clear @s light_block
execute @a[tag=light_block,tag=!op,tag=!bypass] ~~~ scoreboard players add @s illegalitemsvl 1
execute @a[tag=light_block,tag=!op,tag=!bypass] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Inventory) §4Illegal Items §7(light_block)§4. VL= "},{"score":{"name":"@s","objective":"illegalitemsvl"}}]}

# border_block
execute @a[tag=border_block,tag=!op,tag=!bypass] ~~~ clear @s border_block
execute @a[tag=border_block,tag=!op,tag=!bypass] ~~~ scoreboard players add @s illegalitemsvl 1
execute @a[tag=border_block,tag=!op,tag=!bypass] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Inventory) §4Illegal Items §7(border_block)§4. VL= "},{"score":{"name":"@s","objective":"illegalitemsvl"}}]}

# chemistry_table
execute @a[tag=chemistry_table,tag=!op,tag=!bypass] ~~~ clear @s chemistry_table
execute @a[tag=chemistry_table,tag=!op,tag=!bypass] ~~~ scoreboard players add @s illegalitemsvl 1
execute @a[tag=chemistry_table,tag=!op,tag=!bypass] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Inventory) §4Illegal Items §7(chemistry_table)§4. VL= "},{"score":{"name":"@s","objective":"illegalitemsvl"}}]}

# frosted_ice
execute @a[tag=frosted_ice,tag=!op,tag=!bypass] ~~~ clear @s frosted_ice
execute @a[tag=frosted_ice,tag=!op,tag=!bypass] ~~~ scoreboard players add @s illegalitemsvl 1
execute @a[tag=frosted_ice,tag=!op,tag=!bypass] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Inventory) §4Illegal Items §7(frosted_ice)§4. VL= "},{"score":{"name":"@s","objective":"illegalitemsvl"}}]}

# remove tags after
tag @a[tag=bedrock] remove bedrock
tag @a[tag=end_portal_frame] remove end_portal_frame
tag @a[tag=dragon_egg] remove dragon_egg
tag @a[tag=farmland] remove farmland
tag @a[tag=monster_egg] remove monster_egg
tag @a[tag=brown_mushroom_block] remove brown_mushroom_block
tag @a[tag=red_mushroom_block] remove red_mushroom_block
tag @a[tag=chorus_plant] remove chorus_plant
tag @a[tag=turtle_egg] remove turtle_egg
tag @a[tag=skull3] remove skull3
tag @a[tag=mob_spawner] remove mob_spawner
tag @a[tag=command_block] remove command_block
tag @a[tag=chain_command_block] remove chain_command_block
tag @a[tag=repeating_command_block] remove repeating_command_block
tag @a[tag=command_block_minecart] remove command_block_minecart
tag @a[tag=barrier] remove barrier
tag @a[tag=structure_block] remove structure_block
tag @a[tag=structure_void] remove structure_void
tag @a[tag=jigsaw] remove jigsaw
tag @a[tag=allow] remove allow
tag @a[tag=deny] remove deny
tag @a[tag=light_block] remove light_block
tag @a[tag=border_block] remove border_block
tag @a[tag=chemistry_table] remove chemistry_table
tag @a[tag=frosted_ice] remove frosted_ice

kill @e[type=chalkboard]

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
