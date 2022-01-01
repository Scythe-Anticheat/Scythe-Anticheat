# Prevents people from changing their gamemode

# adventure mode check
scoreboard players add @s[tag=!op,m=a,scores={gma=1..}] gamemodevl 0
execute @s[tag=!op,m=a,scores={gma=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has tried to §4change their gamemode §7(Gamemode_A)§4 . VL= "},{"score":{"name":"@s","objective":"gamemodevl"}}]}
gamemode 2 @s[tag=!op,m=a,scores={gmc=..0,gma=1..}]
gamemode 1 @s[tag=!op,m=a,scores={gms=..0,gma=1..}]

# creative mode check
scoreboard players add @s[tag=!op,m=c,scores={gmc=1..}] gamemodevl 1
execute @s[tag=!op,m=c,scores={gmc=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has tried to §4change their gamemode §7(Gamemode_C)§4 . VL= "},{"score":{"name":"@s","objective":"gamemodevl"}}]}
gamemode 2 @s[tag=!op,m=c,scores={gma=..0,gmc=1..}]
gamemode 0 @s[tag=!op,m=c,scores={gms=..0,gmc=1..}]

# survival mode check
scoreboard players add @s[tag=!op,m=s,scores={gms=1..}] gamemodevl 1
execute @s[tag=!op,m=s,scores={gms=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has tried to §4change their gamemode §7(Gamemode_S)§4 . VL= "},{"score":{"name":"@s","objective":"gamemodevl"}}]}
gamemode 2 @s[tag=!op,m=s,scores={gma=..0,gms=1..}]
gamemode 1 @s[tag=!op,m=s,scores={gmc=..0,gms=1..}]

# if all gamemodes are disabled, allow adventure mode to be used
execute @s[scores={gma=1..,gms=1..,gmc=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Since all gamemodes were disallowed, adventure mode has been enabled."}]}
execute @s[scores={gma=1..,gms=1..,gmc=1..}] ~~~ scoreboard players set * gma 0
