# other stuff

effect @a[tag=vanish] invisibility 9999 250 true
title @a[tag=vanish] actionbar §aYOU ARE VANISHED!

execute @a[tag=bypass,tag=!bypass2] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has been excluded from all Scythe Checks!"}]}
execute @a[tag=bypass,tag=!bypass2] ~~~ tag @s add bypass2

execute @a[tag=!bypass,tag=bypass2] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1is no longer Excluded from all Scythe Checks"}]}
execute @a[tag=!bypass,tag=bypass2] ~~~ tag @s remove bypass2
execute @a[tag=!bypass,tag=bypass2] ~~~ tag @s remove bypass


# If the player is under y= -40 this teleports them to y= -40
execute @a[tag=!bypass] ~~~ execute @s[y=-41,dy=-60] ~~~ tp @s ~ -40 ~