tp @s[type=player,tag=!noBadAngle] ~~~ facing @s
scoreboard players add @s[type=player,tag=!noBadAngle] anglevl 1
execute @s[type=player,tag=!noBadAngle] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Player) §4BadPackets[1]. VL= "},{"score":{"name":"@s","objective":"anglevl"}}]}

# auto ban
execute @s[type=player,tag=!noBadAngle,scores={autoban=1..,anglevl=3..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has been banned by Scythe Anticheat for Unfair Advantage. Check: BadPackets[1]"}]}
tag @s[type=player,tag=!noBadAngle,scores={autoban=1..,anglevl=3..}] add "by:Scythe Anticheat"
tag @s[type=player,tag=!noBadAngle,scores={autoban=1..,anglevl=3..}] add "reason:Scythe Anticheat detected Unfair Advantage! Check: BadPackets[1]"
tag @s[type=player,tag=!noBadAngle,scores={autoban=1..,anglevl=3..}] add isBanned