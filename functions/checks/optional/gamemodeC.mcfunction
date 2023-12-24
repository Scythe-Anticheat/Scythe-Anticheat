# creative mode check
scoreboard players add @s[scores={gmc=1..}] gamemodevl 1
execute @s[scores={gmc=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has tried to §4change their gamemode §7(Gamemode_C)§4 . VL= "},{"score":{"name":"@s","objective":"gamemodevl"}}]}
gamemode 2 @s[scores={gma=..0,gmc=1..}]
gamemode 0 @s[scores={gms=..0,gmc=1..}]