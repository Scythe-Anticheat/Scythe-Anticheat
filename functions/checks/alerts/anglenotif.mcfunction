tp @s[type=player] ~~~ facing @s
scoreboard players add @s[type=player] badpacketsvl 1
tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Player) §4BadPackets[1]. VL= "},{"score":{"name":"@s","objective":"badpacketsvl"}}]}