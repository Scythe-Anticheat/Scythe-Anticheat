# Places a fake entity behind the player and see if they will hit the entity

scoreboard players add @a killauravl 0

tag @r[tag=!bypass,tag=!gliding] add killaura
execute @a[tag=killaura2] ~~~ tag @a[tag=killaura] remove killaura

tag @a[tag=killaura,tag=!killaura2] add killaura2
tag @a[tag=killaura,tag=killaura2] remove killaura

execute @a[tag=killaura2,scores={aura_timer=0}] ^^^ summon scythe:killaura killaura ^-2 ^+1 ^-1

execute @a[tag=killaura2] ~~~ scoreboard players add @s aura_timer 1

execute @e[type=scythe:killaura] ~~~ tag @a[tag=killaura2] add noaura
execute @a[tag=killaura2,tag=!noaura,tag=!gliding,scores={leftclick=1..}] ~~~ scoreboard players add @s killauravl 1
execute @a[tag=killaura2,tag=!noaura,tag=!gliding,scores={leftclick=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Combat) §4KillAura/A. VL= "},{"score":{"name":"@s","objective":"killauravl"}}]}

execute @a[tag=killaura2,scores={aura_timer=10..}] ~~~ tp @e[type=scythe:killaura] 999 -200 999

tag @a[tag=killaura2,scores={aura_timer=..10}] remove killaura
tag @a[tag=killaura2,scores={aura_timer=..10}] remove noaura
tag @a[tag=killaura2,scores={aura_timer=10}] remove killaura2

scoreboard players set @a[scores={aura_timer=10..}] aura_timer 0