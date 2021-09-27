# other stuff

effect @a[tag=vanish] invisibility 9999 250 true
title @a[tag=vanish] actionbar §aYOU ARE VANISHED!

#
execute @a[tag=bypass,tag=!bypass2] ~~~ tell @a[tag=notify] §r§6[§aScythe§6] §r@s Has Been Excluded from all Scythe checks
execute @a[tag=bypass,tag=!bypass2] ~~~ tag @s add bypass2

execute @a[tag=!bypass,tag=bypass2] ~~~ tell @a[tag=notify] §r§6[§aScythe§6] §r@s Is No Longer Excluded from all Scythe checks
execute @a[tag=!bypass,tag=bypass2] ~~~ tag @s remove bypass2
execute @a[tag=!bypass,tag=bypass2] ~~~ tag @s remove bypass