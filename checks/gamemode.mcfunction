# Prevents people from changing their gamemode

scoreboard objectives add gamemodevl dummy

scoreboard players operation @s gma = scythe:config gma
scoreboard players operation @s gmc = scythe:config gmc
scoreboard players operation @s gms = scythe:config gms

# adventure mode check
execute @s[tag=!op,m=a,scores={gma=1}] ~~~ scoreboard players add @s gamemodevl 1
execute @s[tag=!op,m=a,scores={gma=1}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has tried to §4change their gamemode §7(Gamemode_A)§4 . VL= "},{"score":{"name":"@s","objective":"gamemodevl"}}]}
execute @s[tag=!op,m=a,scores={gma=1}] ~~~ gamemode 2 @s[scores={gma=1}]
execute @s[tag=!op,m=a,scores={gma=1}] ~~~ gamemode 1 @s[scores={gmc=1}]
# creative mode check
execute @s[tag=!op,m=c,scores={gmc=1}] ~~~ scoreboard players add @s gamemodevl 1
execute @s[tag=!op,m=c,scores={gmc=1}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has tried to §4change their gamemode §7(Gamemode_C)§4 . VL= "},{"score":{"name":"@s","objective":"gamemodevl"}}]}
execute @s[tag=!op,m=c,scores={gmc=1}] ~~~ gamemode 2 @s[scores={gma=1}]
execute @s[tag=!op,m=c,scores={gmc=1}] ~~~ gamemode 0 @s[scores={gms=1}]

# survival mode check
execute @s[tag=!op,m=s,scores={gms=0}] ~~~ scoreboard players add @s gamemodevl 1
execute @s[tag=!op,m=s,scores={gms=1}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has tried to §4change their gamemode §7(Gamemode_S)§4 . VL= "},{"score":{"name":"@s","objective":"gamemodevl"}}]}
execute @s[tag=!op,m=s,scores={gms=1}] ~~~ gamemode 2 @s[scores={gma=1}]
execute @s[tag=!op,m=s,scores={gms=1}] ~~~ gamemode 1 @s[scores={gmc=1}]

# if all gamemodes are disabled, allow adventure mode to be used
execute @s[scores={gma=0}] ~~~ execute @s[scores={gms=0}] ~~~ execute @s[scores={gmc=0}] ~~~ tellraw @s[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Since all gamemodes were disallowed, adventure mode has been enabled."}]}
execute @s[scores={gma=0}] ~~~ execute @s[scores={gms=0}] ~~~ execute @s[scores={gmc=0}] ~~~ scoreboard players set scythe:config gma 1
