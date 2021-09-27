# Stops people from jumping mid-air

summon armor_stand ~ ~-1 ~
execute @p[tag=!bypass,tag=!gliding,m=!c,tag=!ground] ~~~ detect ~ ~-1 ~ air -1 execute @s ~~~ detect ~ ~-2 ~ air -1 execute @e[type=armor_stand,r=3] ~~~ tag @p add AirJump

# execute @p[tag=AirJump,tag=!bypass,tag=!gliding,m=!c] ~~~ tp @s ~ ~-1 ~
execute @p[tag=AirJump,tag=!bypass,tag=!gliding,m=!c] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §4AirJump. VL= "},{"score":{"name":"@s","objective":"airjumpvl"}}]}
tag @p remove AirJump


tp @e[type=armor_stand,r=10] 999 -200 999
kill @e[type=armor_stand]