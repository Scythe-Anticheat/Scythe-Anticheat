# Stops Fly Hackers

tag @a[tag=FlyDetected] remove FlyDetected

execute @a[tag=!op,tag=!flying,m=!c] ~ ~ ~ detect ~ ~-1 ~ air 0 execute @s ~ ~ ~ detect ~1 ~-1 ~ air 0 execute @s ~ ~ ~ detect ~-1 ~-1 ~ air 0 execute @s ~ ~ ~ detect ~ ~-1 ~1 air 0 execute @s ~ ~ ~ detect ~ ~-1 ~-1 air 0 execute @s ~ ~ ~ detect ~1 ~-1 ~1 air 0 execute @s ~ ~ ~ detect ~1 ~-1 ~-1 air 0 execute @s ~ ~ ~ detect ~-1 ~-1 ~-1 air 0 execute @s ~ ~ ~ detect ~-1 ~-1 ~1 air 0 execute @s ~ ~ ~ detect ~ ~-2 ~ air 0 execute @s ~ ~ ~ detect ~1 ~-2 ~ air 0 execute @s ~ ~ ~ detect ~-1 ~-2 ~ air 0 execute @s ~ ~ ~ detect ~ ~-2 ~1 air 0 execute @s ~ ~ ~ detect ~ ~-2 ~-1 air 0 execute @s ~ ~ ~ detect ~1 ~-2 ~1 air 0 execute @s ~ ~ ~ detect ~1 ~-2 ~-1 air 0 execute @s ~ ~ ~ detect ~-1 ~-2 ~-1 air 0 execute @s ~ ~ ~ detect ~-1 ~-2 ~1 air 0 tag @s add FlyDetected
execute @a[tag=FlyDetected] ~ ~ ~ say @a[tag=notify] §1Failed Fly/Jetpack.
effect @a[tag=FlyDetect] clear

kick @a[tag=FlyDetected] [Scythe AntiCheat] Flying is not enabled on this server.