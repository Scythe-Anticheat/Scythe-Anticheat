# Blocks invalid viewing angles

scoreboard players add @a anglevl 0

execute @a[tag=!bypass,rxm=-90,rx=90] ~~~ tag @s add noBadAngle
execute @a[tag=!bypass,rym=-180,ry=180] ~~~ tag @s add noBadAngle2

execute @a[tag=!bypass,tag=!noBadAngle] ~~~ function checks/alerts/anglenotif
execute @a[tag=!bypass,tag=!noBadAngle2] ~~~ function checks/alerts/anglenotif

tag @a[tag=noBadAngle] remove noBadAngle
tag @a[tag=noBadAngle2] remove noBadAngle2
