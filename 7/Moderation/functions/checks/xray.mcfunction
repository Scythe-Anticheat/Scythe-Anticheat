# Anti-Xray Detection
# Reports to staff if diamond ore or emerald ore has been found!

execute @a ^ ^ ^ detect ^ ^+1 ^ diamond_ore 1 /tellraw @a[tag=op] {"rawtext":[{"text":"[Xray] @s Has Found x1 Diamond Ore!"}]}
execute @a ^ ^ ^ detect ^ ^ ^ diamond_ore 1 /tellraw @a[tag=op] {"rawtext":[{"text":"[Xray] @s Has Found x1 Diamond Ore!"}]}
execute @a ^ ^ ^ detect ^ ^+1 ^ emerald_ore 1 /tellraw @a[tag=op] {"rawtext":[{"text":"[Xray] @s Has Found x1 Emerald Ore!"}]}
execute @a ^ ^ ^ detect ^ ^ ^ emerald_ore 1 /tellraw @a[tag=op] {"rawtext":[{"text":"[Xray] @s Has Found x1 Emerald Ore!"}]}