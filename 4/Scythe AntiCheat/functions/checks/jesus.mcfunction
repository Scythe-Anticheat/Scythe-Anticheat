# Prevents Jesus Hacks
execute @a[m=!c] ~ ~ ~ detect ~ ~-1 ~ water 0 detect ~ ~-1 ~-1 water 0 detect ~-1 ~-1 ~-1 water 0 detect ~-1 ~-1 ~ water 0 tag @s add JesusDetected
execute @a[m=!c] ~ ~ ~ detect ~ ~-1 ~ lava 0 detect ~ ~-1 ~-1 lava 0 detect ~-1 ~-1 ~-1 lava 0 detect ~-1 ~-1 ~ lava 0 tag @s add JesusDetected
say @a[tag=notify] §1failed Jesus/Waterwalk.
execute @a[tag=JesusDetected] ~ ~ ~ tp @s ~ ~-1 ~
tag @a[tag=JesusDetected] remove JesusDetected