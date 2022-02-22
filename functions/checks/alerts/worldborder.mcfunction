tellraw @s[tag=worldborder] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"§4§lHey!§r You have reached the world border."}]}
effect @s[tag=worldborder,m=!c] slow_falling 35 0 true
spreadplayers 0 0 0 999 @s[tag=worldborder]

tag @s[tag=worldborder] remove worldborder