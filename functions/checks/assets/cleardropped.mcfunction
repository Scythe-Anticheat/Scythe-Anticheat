# illegal items
kill @s[type=item,name="Bedrock"]
kill @s[type=item,name="End Portal"]
kill @s[type=item,name="Command Block"]
kill @s[type=item,name="Chain Command Block"]
kill @s[type=item,name="Repeating Command Block"]
kill @s[type=item,name="Minecart with Command Block"]
kill @s[type=item,name="Barrier"]
kill @s[type=item,name="Structure Block"]
kill @s[type=item,name="Structure Void"]
kill @s[type=item,name="Jigsaw Block"]
kill @s[type=item,name="Allow"]
kill @s[type=item,name="Deny"]
kill @s[type=item,name="Light Block"]
kill @s[type=item,name="Border"]
kill @s[type=item,name="Compound Creator"]
kill @s[type=item,name="Frosted Ice"]
kill @s[type=item,name=""]

# cbe related items
kill @s[type=item,name="Beehive"]
kill @s[type=item,name="Bee Nest"]
kill @s[type=item,name="tile.movingBlock.name"]
kill @s[type=item,name="§g§lBeehive Command"]
kill @s[type=item,name="§g§lBeeNest Command"]
kill @s[type=item,name="§g§lSpoofed BeeNest Command"]
kill @s[type=item,name="§g§lInvisible Beehive Command"]
kill @s[type=item,name="§g§lMovingBlock BeeNest Command"]

# xray
execute @s[type=item,name="Ancient Debris",rx=0,rxm=0,ry=0,rym=0] ~~~ execute @p[r=5,scores={xray=..0}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r §4[Xray]§r "},{"selector":"@s"},{"text":" has found §g1x Ancient Debris."}]}
execute @s[type=item,name="Diamond",rx=0,rxm=0,ry=0,rym=0] ~~~ execute @p[r=5,scores={xray=..0}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r §4[Xray]§r "},{"selector":"@s"},{"text":" has found §g1x Diamond."}]}

tag @s[type=item] add didCheck