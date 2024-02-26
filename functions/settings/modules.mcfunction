# Shows all optional features enabled

# sometimes the settings don't apply correctly so we reapply them
function checks/assets/applySettings

tellraw @s[scores={cmds=..0}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r OverrideCommandBlocksEnabled is currently §4DISABLED"}]}
tellraw @s[scores={cmds=1}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r OverrideCommandBlocksEnabled is set to §aENABLED"}]}
tellraw @s[scores={cmds=2..}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r OverrideCommandBlocksEnabled is set to §4DISABLED"}]}

tellraw @s[scores={npc=1..}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Anti-NPC is set to §aENABLED"}]}
tellraw @s[scores={npc=..0}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Anti-NPC is set to §4DISABLED"}]}

tellraw @s[scores={invalidsprint=..0}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Invalid-Sprint is currently §4DISABLED"}]}
tellraw @s[scores={invalidsprint=1..}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Invalid-Sprint is currently §aENABLED"}]}