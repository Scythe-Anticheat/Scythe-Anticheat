# Places a fake entity behind the player and see if they will hit the entity

scoreboard objectives add killauravl dummy
scoreboard objectives add aura_timer dummy
scoreboard players add @s killauravl 0
scoreboard players add @s aura_timer 0

tag @r[tag=!bypass,tag=!gliding,tag=!dead] add killaura
execute @s[tag=killaura2] ~~~ tag @a[tag=killaura] remove killaura

tag @s[tag=killaura,tag=!killaura2] add killaura2
tag @s[tag=killaura,tag=killaura2] remove killaura

execute @s[tag=killaura2,scores={aura_timer=0}] ^^^ summon scythe:killaura killaura ^ ^+1 ^-3

execute @s[tag=killaura2,scores={aura_timer=..9}] ~~~ tp @e[type=scythe:killaura] ^ ^+1 ^-3

scoreboard players add @s[tag=killaura2] aura_timer 1

execute @e[type=scythe:killaura] ~~~ tag @a[tag=killaura2] add noaura
execute @s[tag=killaura2,tag=!noaura,tag=!gliding,tag=!dead,scores={leftclick=1..}] ~~~ scoreboard players add @s[y=1,dy=256,scores={aura_timer=10..}] killauravl 1
execute @s[tag=killaura2,tag=!noaura,tag=!gliding,tag=!dead,scores={leftclick=1..}] ~~~ execute @s[y=1,dy=256,scores={aura_timer=10..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Combat) §4KillAura/A. VL= "},{"score":{"name":"@s","objective":"killauravl"}}]}

execute @s[tag=killaura2,scores={aura_timer=10..}] ~~~ tp @e[type=scythe:killaura] 999 -200 999
execute @s[tag=killaura2,scores={aura_timer=10..}] ~~~ kill @e[type=scythe:killaura]

tag @s[tag=killaura2,scores={aura_timer=..10}] remove killaura
tag @s[tag=killaura2,scores={aura_timer=..10}] remove noaura
tag @s[tag=killaura2,scores={aura_timer=10}] remove killaura2

scoreboard players set @s[scores={aura_timer=10..}] aura_timer 0
