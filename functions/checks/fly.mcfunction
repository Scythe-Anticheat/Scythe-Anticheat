# Stops Fly Hackers

scoreboard players add @a flyvl 0

tag @a[tag=FlyDetected] remove FlyDetected

execute @a[tag=!flying,m=!c,tag=!bypass,tag=!levitating,tag=!gliding,tag=!riding,tag=!dead] ~~~ detect ~ ~-1 ~ air -1 execute @s ~~~ detect ~1 ~-1 ~ air -1 execute @s ~~~ detect ~-1 ~-1 ~ air -1 execute @s ~~~ detect ~ ~-1 ~1 air -1 execute @s ~~~ detect ~ ~-1 ~-1 air -1 execute @s ~~~ detect ~1 ~-1 ~1 air -1 execute @s ~~~ detect ~1 ~-1 ~-1 air -1 execute @s ~~~ detect ~-1 ~-1 ~-1 air -1 execute @s ~~~ detect ~-1 ~-1 ~1 air -1 execute @s ~~~ detect ~ ~-2 ~ air -1 execute @s ~~~ detect ~1 ~-2 ~ air -1 execute @s ~~~ detect ~-1 ~-2 ~ air -1 execute @s ~~~ detect ~ ~-2 ~1 air -1 execute @s ~~~ detect ~ ~-2 ~-1 air -1 execute @s ~~~ detect ~1 ~-2 ~1 air -1 execute @s ~~~ detect ~1 ~-2 ~-1 air -1 execute @s ~~~ detect ~-1 ~-2 ~-1 air -1 execute @s ~~~ detect ~-1 ~-2 ~1 air -1 execute @s ~~~ detect ~ ~-3 ~ air -1 tag @s add FlyDetected

effect @a[tag=FlyDetected,scores={flycheck=20..}] clear

execute @a[tag=FlyDetected] ~~~ scoreboard players add @s flyvl 1

execute @a[tag=FlyDetected] ~~~ scoreboard players add @s flycheck 1
execute @a[tag=FlyDetected,scores={flycheck=20..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §4Fly. VL= "},{"score":{"name":"@s","objective":"flyvl"}}]}

execute @a[tag=FlyDetected,scores={flycheck=20..}] ~~~ scoreboard players set @s flycheck 0