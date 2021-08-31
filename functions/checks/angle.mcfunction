# Blocks invalid viewing angles

scoreboard objectives add anglevl dummy
scoreboard players add @s anglevl 0

execute @s[tag=!bypass,rxm=-90,rx=90] ~~~ tag @s add noBadAngle
execute @s[tag=!bypass,rym=-180,ry=180] ~~~ tag @s add noBadAngle2

execute @s[tag=!bypass,tag=!noBadAngle] ~~~ function checks/alerts/anglenotif
execute @s[tag=!bypass,tag=!noBadAngle2] ~~~ function checks/alerts/anglenotif

tag @s[tag=noBadAngle] remove noBadAngle
tag @s[tag=noBadAngle2] remove noBadAngle2
