# Prevents Jesus Hacks

scoreboard objectives add jesusvl dummy

execute @s[tag=moving,tag=!flying,m=!c,tag=!jump,tag=!riding,tag=!gliding,tag=!dead] ~~~ detect ~ ~-1 ~ water 0 execute @s ~~~ detect ~-1 ~-1 ~ water 0 execute @s ~~~ detect ~ ~-1 ~-1 water 0  execute @s ~~~ detect ~-1 ~-1 ~-1 water 0 execute @s ~~~ detect ~+1 ~-1 ~ water 0 execute @s ~~~ detect ~ ~-1 ~+1 water 0 execute @s ~~~ detect ~+1 ~-1 ~+1 water 0 execute @s ~~~ detect ~-1 ~-1 ~+1 water 0 execute @s ~~~ detect ~+1 ~-1 ~-1 water 0 execute @s ~~~ detect ~~~ air -1 tag @s add JesusDetected 
execute @s[tag=moving,tag=!flying,m=!c,tag=!jump,tag=!riding,tag=!gliding,tag=!dead] ~~~ detect ~ ~-1 ~ lava 0 execute @s ~~~ detect ~-1 ~-1 ~ lava 0 execute @s ~~~ detect ~ ~-1 ~-1 lava 0  execute @s ~~~ detect ~-1 ~-1 ~-1 lava 0 execute @s ~~~ detect ~+1 ~-1 ~ lava 0 execute @s ~~~ detect ~ ~-1 ~+1 lava 0 execute @s ~~~ detect ~+1 ~-1 ~+1 lava 0 execute @s ~~~ detect ~-1 ~-1 ~+1 lava 0 execute @s ~~~ detect ~+1 ~-1 ~-1 lava 0 execute @s ~~~ detect ~~~ air -1 tag @s add JesusDetected 
execute @s[tag=JesusDetected] ~~~ scoreboard players add @s jesusvl 1
execute @s[tag=JesusDetected] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Movement) §4Jesus/A. VL= "},{"score":{"name":"@s","objective":"jesusvl"}}]}
execute @s[tag=JesusDetected] ~~~ tp @s ~ ~-1 ~
tag @s[tag=JesusDetected] remove JesusDetected
