# InvalidSprint/B
scoreboard players add @s[type=player,tag=sprint,tag=right,scores={right=2..}] invalidsprintvl 1
execute @s[type=player,tag=sprint,tag=right,scores={right=2..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Movement) §4InvalidSprint/B. VL= "},{"score":{"name":"@s","objective":"invalidsprintvl"}}]}
tp @s[type=player,tag=sprint,tag=right,scores={right=2..}] @s

# InvalidSprint/C
scoreboard players add @s[type=player,tag=sprint,tag=sneak,m=!c,tag=!flying] invalidsprintvl 1
execute @s[type=player,tag=sprint,tag=sneak,m=!c,tag=!flying] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Movement) §4InvalidSprint/C. VL= "},{"score":{"name":"@s","objective":"invalidsprintvl"}}]}
tp @s[type=player,tag=sprint,tag=sneak,m=!c,tag=!flying] @s

# InvalidSprint/D
scoreboard players add @s[type=player,tag=sprint,tag=gliding,tag=!right] invalidsprintvl 1
execute @s[type=player,tag=sprint,tag=gliding,tag=!right] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Movement) §4InvalidSprint/D. VL= "},{"score":{"name":"@s","objective":"invalidsprintvl"}}]}
tp @s[type=player,tag=sprint,tag=gliding,tag=!right] @s

# InvalidSprint/E
# execute @s[type=player,tag=sprint,tag=ground,tag=!jump,tag=!moving] ~~~ detect ~~~ air -1 scoreboard players add @s invalidsprintvl 1
# execute @s[type=player,tag=sprint,tag=ground,tag=!jump,tag=!moving] ~~~ detect ~~~ air -1 tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Movement) §4InvalidSprint/E. VL= "},{"score":{"name":"@s","objective":"invalidsprintvl"}}]}
# execute @s[type=player,tag=sprint,tag=ground,tag=!jump,tag=!moving] ~~~ detect ~~~ air -1 tp @s @s