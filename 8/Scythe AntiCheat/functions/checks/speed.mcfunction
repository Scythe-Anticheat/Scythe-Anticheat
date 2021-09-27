tp @e[type=armor_stand,name=speedtest] 0 -100 0

tag @r[tag=!bypass,tag=!flying,m=!c] add speedtest

execute @a[tag=speedtest] ^^^ summon armor_stand speedtest ^ ^ ^-2

effect @e[type=armor_stand,name=speedtest] invisibility 9999 250 true

# add delay stuff here
execute @e[type=armor_stand,name=speedtest] tp @s ^ ^ ^-2

execute @e[type=armor_stand,name=speedtest] ~~~ tag @p[r=3] add NoSpeed

execute @a[tag=speedtest,tag=!NoSpeed] ~~~ tell @a[tag=notify] §r§6[§aScythe§6] §r@s §1has failed §4Speed/FastWalk.

tag @a[tag=speedtest] remove NoSpeed
tag @a[tag=speedtest] remove speedtest

