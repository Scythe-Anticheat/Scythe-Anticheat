# Prevents Jesus Hacks

scoreboard players add @a jesusvl 0

execute @a[tag=!flying,m=!c,tag=!bypass] ~~~ detect ~ ~-1 ~ water 0 execute @s ~~~ detect ~-1 ~-1 ~ water 0 execute @s ~~~ detect ~ ~-1 ~-1 water 0 execute @s ~~~ detect ~-1 ~-1 ~-1 water 0 execute @s ~~~ detect ~1 ~-1 ~ water 0 execute @s ~~~ detect ~1 ~-1 ~ water 0 execute @s ~~~ detect ~ ~-1 ~1 water 0 execute @s ~~~ detect ~1 ~-1 ~1 water 0 execute @s ~~~ detect ~~~air 0 tag @s add JesusDetected
execute @a[tag=!flying,m=!c,tag=!bypass] ~~~ detect ~ ~-1 ~ lava 0 execute @s ~~~ detect ~-1 ~-1 ~ lava 0 execute @s ~~~ detect ~ ~-1 ~-1 lava 0 execute @s ~~~ detect ~-1 ~-1 ~-1 lava 0 execute @s ~~~ detect ~1 ~-1 ~ lava 0 execute @s ~~~ detect ~1 ~-1 ~ lava 0 execute @s ~~~ detect ~ ~-1 ~1 lava 0 execute @s ~~~ detect ~1 ~-1 ~1 lava 0 execute @s ~~~ detect ~~~air 0 tag @s add JesusDetected
execute @a[tag=JesusDetected] ~~~ scoreboard players add @s jesusvl 1
execute @a[tag=JesusDetected] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §4Jesus/WaterWalk. VL= "},{"score":{"name":"@s","objective":"jesusvl"}}]}
execute @a[tag=JesusDetected] ~~~ tp @s ~ ~-1 ~
tag @a[tag=JesusDetected] remove JesusDetected
