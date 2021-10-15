scoreboard objectives add interactusevl dummy

scoreboard players add @s[type=player,tag=right,scores={right=2..}] interactusevl 1
execute @s[type=player,tag=right,scores={right=2..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Misc) §4InteractUse/A. VL= "},{"score":{"name":"@s","objective":"interactusevl"}}]}
