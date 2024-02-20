scoreboard players add @s invalidsprintvl 1
tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Movement) §4InvalidSprint/B §7(last_move="},{"score":{"name":"@s","objective":"last_move"}},{"text":")§4 VL= "},{"score":{"name":"@s","objective":"invalidsprintvl"}}]}
tp @s @s