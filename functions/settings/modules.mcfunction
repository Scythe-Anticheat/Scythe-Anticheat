# Shows all optional features enabled

# sometimes the settings don't apply correctly so we reapply them
function checks/assets/applySettings

tellraw @s[scores={gma=..0}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Anti-GMA is currently §4DISABLED"}]}
tellraw @s[scores={gma=1..}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Anti-GMA is currently §aENABLED"}]}

tellraw @s[scores={gms=..0}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Anti-GMS is currently §4DISABLED"}]}
tellraw @s[scores={gms=1..}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Anti-GMS is currently §aENABLED"}]}

tellraw @s[scores={gmc=..0}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Anti-GMC is currently §4DISABLED"}]}
tellraw @s[scores={gmc=1..}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Anti-GMC is currently §aENABLED"}]}

tellraw @s[scores={cmds=..0}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r OverrideCommandBlocksEnabled is currently §4DISABLED"}]}
tellraw @s[scores={cmds=1}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r OverrideCommandBlocksEnabled is set to §aENABLED"}]}
tellraw @s[scores={cmds=2..}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r OverrideCommandBlocksEnabled is set to §4DISABLED"}]}

tellraw @s[scores={npc=1..}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Anti-NPC is set to §aENABLED"}]}
tellraw @s[scores={npc=..0}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Anti-NPC is set to §4DISABLED"}]}

tellraw @s[scores={invalidsprint=..0}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Invalid-Sprint is currently §4DISABLED"}]}
tellraw @s[scores={invalidsprint=1..}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Invalid-Sprint is currently §aENABLED"}]}