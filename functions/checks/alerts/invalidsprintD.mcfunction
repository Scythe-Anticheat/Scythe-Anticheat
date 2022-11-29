scoreboard players add @s[type=player] invalidsprintvl 1
tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Movement) §4InvalidSprint/D. VL= "},{"score":{"name":"@s","objective":"invalidsprintvl"}}]}
tp @s[type=player] @s