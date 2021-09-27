# Makes a entity and checks how far away they are from the entity

scoreboard players add @a speedvl 0

execute @a[tag=speedtest2,m=c] ~~~ tp @e[type=armor_stand,name="speedtest",r=5] 0 -100 0

tag @r[tag=!bypass,tag=!flying,m=!c,tag=!speedtest,tag=!speedtest2,tag=!gliding,tag=ground] add speedtest
execute @a[tag=speedtest2] ~~~ tag @a[tag=speedtest] remove speedtest

tag @a[tag=speedtest,tag=!speedtest2] add speedtest2
tag @a[tag=speedtest,tag=speedtest2] remove speedtest

execute @a[tag=speedtest2,scores={timer=0}] ^^^ summon armor_stand speedtest ^-2 ^+1 ^-1
effect @e[type=armor_stand,name=speedtest] invisibility 9999 250 true

execute @a[tag=speedtest2] ~~~ scoreboard players add @s timer 1

execute @a[tag=speedtest2] ~~~ kill @e[type=item,name="Armor Stand",r=5]

execute @a[tag=speedtest2] ~~~ detect ~ ~-1 ~ air -1 execute @s ~~~ detect ~ ~-1 ~-1 air -1 execute @s ~~~ detect ~-1 ~-1 ~ air -1 execute @s ~~~ detect ~-1 ~-1 ~-1 air -1 execute @s ~~~ detect ~ ~-1 ~+1 air -1 execute @s ~~~ detect ~+1 ~-1 ~ air -1 execute @s ~~~ detect ~+1 ~-1 ~+1 air -1 execute @s ~~~ detect ~+1 ~-1 ~-1 air -1 execute @s ~~~ detect ~-1 ~-1 ~+1 air -1 tag @s add isOnAir

execute @a[tag=speedtest2,tag=!isOnAir] ~~~ execute @e[type=armor_stand,name=speedtest] ~~~ tp @s @s
execute @a[tag=speedtest2] ~~~ tag @s remove isOnAir

execute @a[tag=speedtest2] ~~~ execute @e[type=armor_stand,name=speedtest] ~~~ tag @p[tag=speedtest2,r=6] add NoSpeed

execute @e[type=armor_stand,name=speedtest] ~~~ execute @a[m=!c,tag=speedtest2,tag=ground,tag=!NoSpeed,tag=!riding] ~~~ scoreboard players add @s speedvl 1
execute @e[type=armor_stand,name=speedtest] ~~~ execute @a[m=!c,tag=speedtest2,tag=ground,tag=!NoSpeed,tag=!riding] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §4Speed/FastWalk. VL= "},{"score":{"name":"@s","objective":"speedvl"}}]}
execute @e[type=armor_stand,name=speedtest] ~~~ execute @a[m=!c,tag=speedtest2,tag=ground,tag=!NoSpeed,tag=!riding] ~~~ tp @s @e[type=armor_stand,name=speedtest] true

tag @a[tag=speedtest2,tag=isFalling,scores={timer=9..}] remove isFalling
execute @a[tag=speedtest2,scores={timer=10..}] ~~~ tp @e[type=armor_stand,name=speedtest] 0 -100 0
tag @a[tag=speedtest2,scores={timer=..10}] remove NoSpeed
tag @a[tag=speedtest2,scores={timer=10}] remove speedtest2

scoreboard players set @a[scores={timer=10..}] timer 0

