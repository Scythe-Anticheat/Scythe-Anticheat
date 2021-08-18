# Creats an entity and checks how far away they are from the entity

scoreboard players add @a speedvl 0

execute @a[tag=speedtest2,m=c] ~~~ tp @e[type=scythe:speedtest,name="speedtest",r=5] 0 -100 0

tag @r[tag=!bypass,tag=!flying,m=!c,tag=!speedtest,tag=!speedtest2,tag=!gliding,tag=ground] add speedtest
execute @a[tag=speedtest2] ~~~ tag @a[tag=speedtest] remove speedtest

tag @a[tag=speedtest,tag=!speedtest2] add speedtest2
tag @a[tag=speedtest,tag=speedtest2] remove speedtest

execute @a[tag=speedtest2,scores={timer=0}] ^^^ summon scythe:speedtest ^-2 ^+1 ^-1
effect @e[type=scythe:speedtest] invisibility 9999 250 true

execute @a[tag=speedtest2] ~~~ scoreboard players add @s timer 1

execute @a[tag=speedtest2] ~~~ kill @e[type=item,name="Armor Stand",r=5]

execute @a[tag=speedtest2,tag=!sneak,tag=!right] ~~~ execute @e[type=scythe:speedtest] ~~~ tag @p[tag=speedtest2,r=6] add NoSpeed
execute @a[tag=speedtest2,tag=sneak,tag=!right] ~~~ execute @e[type=scythe:speedtest] ~~~ tag @p[tag=speedtest2,r=4] add NoSpeed
execute @a[tag=speedtest2,tag=!sneak,tag=right] ~~~ execute @e[type=scythe:speedtest] ~~~ tag @p[tag=speedtest2,r=4] add NoSpeed
execute @a[tag=speedtest2,tag=sneak,tag=right] ~~~ execute @e[type=scythe:speedtest] ~~~ tag @p[tag=speedtest2,r=3] add NoSpeed

execute @e[type=scythe:speedtest] ~~~ execute @a[m=!c,tag=speedtest2,tag=ground,tag=!NoSpeed,tag=!riding,tag=!gliding] ~~~ scoreboard players add @s speedvl 1

execute @e[type=scythe:speedtest] ~~~ execute @a[m=!c,tag=speedtest2,tag=ground,tag=!NoSpeed,tag=!riding,tag=!gliding,tag=!sneak,tag=!right] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Movement) §4Speed/A. VL= "},{"score":{"name":"@s","objective":"speedvl"}}]}
execute @e[type=scythe:speedtest] ~~~ execute @a[m=!c,tag=speedtest2,tag=ground,tag=!NoSpeed,tag=!riding,tag=!gliding,tag=sneak,tag=!right] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Movement) §4Speed/A §7(is_sneaking)§4. VL= "},{"score":{"name":"@s","objective":"speedvl"}}]}
execute @e[type=scythe:speedtest] ~~~ execute @a[m=!c,tag=speedtest2,tag=ground,tag=!NoSpeed,tag=!riding,tag=!gliding,tag=!sneak,tag=right] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Movement) §4Speed/A §7(is_using)§4. VL= "},{"score":{"name":"@s","objective":"speedvl"}}]}
execute @e[type=scythe:speedtest] ~~~ execute @a[m=!c,tag=speedtest2,tag=ground,tag=!NoSpeed,tag=!riding,tag=!gliding,tag=sneak,tag=right] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Movement) §4Speed/A §7(is_using) (is_sneaking)§4. VL= "},{"score":{"name":"@s","objective":"speedvl"}}]}

execute @e[type=scythe:speedtest] ~~~ execute @a[m=!c,tag=speedtest2,tag=ground,tag=!NoSpeed,tag=!riding,tag=!gliding] ~~~ tp @s @e[type=scythe:speedtest] true

execute @a[tag=speedtest2,scores={timer=10..}] ~~~ tp @e[type=scythe:speedtest] 999 -200 999
execute @a[tag=speedtest2,scores={timer=10..}] ~~~ kill @e[type=scythe:speedtest]
tag @a[tag=speedtest2,scores={timer=..10}] remove NoSpeed
tag @a[tag=speedtest2,scores={timer=10}] remove speedtest2

scoreboard players set @a[scores={timer=10..}] timer 0
