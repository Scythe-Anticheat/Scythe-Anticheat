tag @s[tag=flying] add noflying
tag @s[tag=noflying] remove flying
ability @s[tag=noflying] mayfly false
tellraw @s[tag=noflying] {"rawtext":[{"text":"§6[§aScythe§6] §rDisabled Fly Mode."}]}
execute @s[tag=noflying] ~ ~ ~ tell @a[tag=notify] §r§6[§aScythe§6] §r@s Is No Longer In Fly Mode!

ability @s[tag=!noflying] mayfly true
tag @s[tag=!noflying] add flying
tellraw @s[tag=flying,tag=!noflying] {"rawtext":[{"text":"§6[§aScythe§6] §rEnabled Fly Mode!"}]}
execute @s[tag=flying,tag=!noflying] ~ ~ ~ tell @a[tag=notify] §r§6[§aScythe§6] §r@s Entered Fly Mode!

tag @s[tag=noflying] remove noflying