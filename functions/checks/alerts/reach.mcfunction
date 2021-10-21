scoreboard objectives add reachvl dummy

scoreboard players add @s[type=player,tag=attack,m=!c] reachvl 1
execute @s[type=player,tag=attack,m=!c] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Combat) §4Reach/A. VL= "},{"score":{"name":"@s","objective":"reachvl"}}]}
