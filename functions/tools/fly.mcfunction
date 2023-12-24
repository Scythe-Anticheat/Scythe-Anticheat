tag @s[tag=flying] add noflying
tag @s[tag=noflying] remove flying
ability @s[tag=noflying] mayfly false
tellraw @s[tag=noflying] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Fly has been disabled."}]}
execute @s[tag=noflying] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has disabled Fly."}]}

ability @s[tag=!noflying] mayfly true
tag @s[tag=!noflying] add flying
tellraw @s[tag=flying,tag=!noflying] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Fly has been enabled."}]}
execute @s[tag=flying,tag=!noflying] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has enabled Fly."}]}

tag @s[tag=noflying] remove noflying