scoreboard objectives add anglevl dummy

tp @s[type=player,tag=!noBadAngle] ~~~ facing 0 0 0
scoreboard players add @s[type=player,tag=!noBadAngle] anglevl 1
execute @s[type=player,tag=!noBadAngle] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Player) §4BadPackets[1] (Invalid Viewing Angle). VL= "},{"score":{"name":"@s","objective":"anglevl"}}]}
