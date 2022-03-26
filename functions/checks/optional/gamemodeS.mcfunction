# survival mode check
scoreboard players add @s[tag=!op,m=s,scores={gms=1..}] gamemodevl 1
execute @s[tag=!op,m=s,scores={gms=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has tried to §4change their gamemode §7(Gamemode_S)§4 . VL= "},{"score":{"name":"@s","objective":"gamemodevl"}}]}
gamemode 2 @s[tag=!op,m=s,scores={gma=..0,gms=1..}]
gamemode 1 @s[tag=!op,m=s,scores={gmc=..0,gms=1..}]