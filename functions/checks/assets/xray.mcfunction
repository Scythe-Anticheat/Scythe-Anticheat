# get rid of items with invalid names
kill @s[name=""]

# xray
execute @s[name="Ancient Debris",rx=0,rxm=0,ry=0,rym=0] ~~~ execute @p[r=5,scores={xray=..0}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r §4[Xray]§r "},{"selector":"@s"},{"text":" has found §g1x Ancient Debris."}]}
execute @s[name="Diamond",rx=0,rxm=0,ry=0,rym=0] ~~~ execute @p[r=5,scores={xray=..0}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r §4[Xray]§r "},{"selector":"@s"},{"text":" has found §g1x Diamond."}]}

tag @s add didCheck