# adventure mode check
scoreboard players add @s[tag=!op,m=a,scores={gma=1..}] gamemodevl 1
execute @s[tag=!op,m=a,scores={gma=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has tried to §4change their gamemode §7(Gamemode_A)§4 . VL= "},{"score":{"name":"@s","objective":"gamemodevl"}}]}
gamemode 1 @s[tag=!op,m=a,scores={gmc=..0,gma=1..}]
gamemode 0 @s[tag=!op,m=a,scores={gms=..0,gma=1..}]

# if all gamemodes are disabled, allow adventure mode to be used
execute @s[scores={gma=1..,gms=1..,gmc=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Since all gamemodes were disallowed, adventure mode has been enabled."}]}
execute @s[scores={gma=1..,gms=1..,gmc=1..}] ~~~ scoreboard players set * gma 1
