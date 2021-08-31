# other stuff

effect @s[tag=vanish] invisibility 9999 255 true
effect @s[tag=vanish] night_vision 9999 255 true
title @s[tag=vanish] actionbar §aYOU ARE VANISHED!

execute @s[tag=bypass,tag=!bypass2] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has been excluded from all Scythe Checks!"}]}
tag @s[tag=bypass,tag=!bypass2] add bypass2

execute @s[tag=!bypass,tag=bypass2] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1is no longer Excluded from all Scythe Checks"}]}
tag @s[tag=!bypass,tag=bypass2] remove bypass2
tag @s[tag=!bypass,tag=bypass2] remove bypass

tp @e[type=xp_orb] @p

# If the player is under y= -40 this teleports them to y= -40
tp @s[y=-41,dy=-80,tag=!bypass] ~ -40 ~
