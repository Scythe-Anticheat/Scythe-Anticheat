execute @a[tag=speedtest,m=c] ~~~ kill @e[type=armor_stand,name="speedtest",r=5]
tag @r[tag=!bypass,tag=!flying,m=!c] add speedtest

execute @a[tag=speedtest,scores={timer=0}] ^^^ summon armor_stand speedtest ^-1 ^ ^-2
effect @e[type=armor_stand,name=speedtest] invisibility 9999 250 true

execute @a[tag=speedtest] ~~~ scoreboard players add @s timer 1

execute @a[tag=speedtest] ~~~ kill @e[type=item,name="Armor Stand",r=5]

execute @a[tag=speedtest] ~~~ detect ~ ~-1 ~ air -1 execute @s ~~~ detect ~ ~-1 ~-1 air -1 execute @s ~~~ detect ~-1 ~-1 ~ air -1 execute @s ~~~ detect ~-1 ~-1 ~-1 air -1 execute @s ~~~ detect ~ ~-1 ~+1 air -1 execute @s ~~~ detect ~+1 ~-1 ~ air -1 execute @s ~~~ detect ~+1 ~-1 ~+1 air -1 execute @s ~~~ detect ~+1 ~-1 ~-1 air -1 execute @s ~~~ detect ~-1 ~-1 ~+1 air -1 tag @s add isOnAir

execute @a[tag=speedtest,tag=!isOnAir] ~~~ execute @e[type=armor_stand,name=speedtest] ~~~ tp @s @s
execute @a[tag=speedtest] ~~~ tag @s remove isOnAir

execute @a[tag=speedtest] ~~~ execute @e[type=armor_stand,name=speedtest] ~~~ tag @p[r=15] add NoSpeed

execute @e[type=armor_stand,name=speedtest] ~~~ detect ~ ~ ~ air -1 execute @a[tag=speedtest,tag=!NoSpeed] ~~~ tell @a[tag=notify] §r§6[§aScythe§6]§r @s §1has failed §4Speed/FastWalk.
execute @e[type=armor_stand,name=speedtest] ~~~ detect ~ ~ ~ air -1 execute @a[tag=speedtest,tag=!NoSpeed] ~~~ tp @s @e[type=armor_stand,name=speedtest]

tag @a[tag=speedtest,scores={timer=20}] remove NoSpeed
tag @a[tag=speedtest,scores={timer=20}] remove speedtest

execute @a[tag=speedtest,scores={timer=20..}] ~~~ tp @e[type=armor_stand,name=speedtest] 0 -100 0
scoreboard players set @a[tag=speedtest,m=!c,scores={timer=20..}] timer 0

