tag @s[tag=flying] add noflying
tag @s[tag=noflying] remove flying
ability @s[tag=noflying] mayfly false
tellraw @s[tag=noflying] {"rawtext":[{"text":"§6[§aScythe§6] §rDisabled Fly Mode."}]}
execute @s[tag=noflying] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has left Fly Mode."}]}

ability @s[tag=!noflying] mayfly true
tag @s[tag=!noflying] add flying
tellraw @s[tag=flying,tag=!noflying] {"rawtext":[{"text":"§6[§aScythe§6] §rEnabled Fly Mode!"}]}
execute @s[tag=flying,tag=!noflying] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has entered Fly Mode."}]}

tag @s[tag=noflying] remove noflying