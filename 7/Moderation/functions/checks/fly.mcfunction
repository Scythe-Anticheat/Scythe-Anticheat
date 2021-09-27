tag @a[tag=FlyKick] remove FlyKick
execute @a[tag=!op,tag=!flying] ~ ~ ~ detect ~ ~-1 ~ air 0 execute @s ~ ~ ~ detect ~1 ~-1 ~ air 0 execute @s ~ ~ ~ detect ~-1 ~-1 ~ air 0 execute @s ~ ~ ~ detect ~ ~-1 ~1 air 0 execute @s ~ ~ ~ detect ~ ~-1 ~-1 air 0 execute @s ~ ~ ~ detect ~1 ~-1 ~1 air 0 execute @s ~ ~ ~ detect ~1 ~-1 ~-1 air 0 execute @s ~ ~ ~ detect ~-1 ~-1 ~-1 air 0 execute @s ~ ~ ~ detect ~-1 ~-1 ~1 air 0 execute @s ~ ~ ~ detect ~ ~-2 ~ air 0 execute @s ~ ~ ~ detect ~1 ~-2 ~ air 0 execute @s ~ ~ ~ detect ~-1 ~-2 ~ air 0 execute @s ~ ~ ~ detect ~ ~-2 ~1 air 0 execute @s ~ ~ ~ detect ~ ~-2 ~-1 air 0 execute @s ~ ~ ~ detect ~1 ~-2 ~1 air 0 execute @s ~ ~ ~ detect ~1 ~-2 ~-1 air 0 execute @s ~ ~ ~ detect ~-1 ~-2 ~-1 air 0 execute @s ~ ~ ~ detect ~-1 ~-2 ~1 air 0 tag @s add FlyDetected
tellraw @a[tag=op] {"text":"[Scythe AntiCheat]","extra":[{"selector":"@a[tag=FlyDetected"},{"text":" has been detected for Fly!"}]}
effect @a[tag=FlyDetect] clear
tag @a[tag=FlyKick] remove FlyKick
tag @a[tag=FlyDetected] add FlyKick
tag @a[tag=FlyKick] remove FlyDetected
kick @a[tag=FlyKick] [Scythe AntiCheat] Flying is not enabled on this server.