tag @s[tag=flying] add noflying
tag @s[tag=noflying] remove flying
ability @s[tag=noflying] mayfly false
tellraw @s[tag=noflying] {"rawtext":[{"text":"Disabled Fly Mode."}]}

ability @s[tag=!noflying] mayfly true
tag @s[tag=!noflying] add flying
tellraw @s[tag=flying,tag=!noflying] {"rawtext":[{"text":"Enabled Fly Mode!"}]}

tag @s[tag=noflying] remove noflying