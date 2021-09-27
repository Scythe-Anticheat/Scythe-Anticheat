# Shows all optional features enabled

# make sure all scoreboard values are set
scoreboard objectives add cmds dummy
scoreboard players add @s cmds 0
scoreboard objectives add gma dummy
scoreboard players add @s gma 0
scoreboard objectives add gms dummy
scoreboard players add @s gms 0
scoreboard objectives add gmc dummy
scoreboard players add @s gmc 0
scoreboard objectives add commandblocks dummy
scoreboard players add @s commandblocks 0

tellraw @s[scores={gma=..0}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Anti-GMA is currently §4DISABLED"}]}
tellraw @s[scores={gms=..0}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Anti-GMS is currently §4DISABLED"}]}
tellraw @s[scores={gmc=..0}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Anti-GMC is currently §4DISABLED"}]}
tellraw @s[scores={gma=1..}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Anti-GMA is currently §aENABLED"}]}
tellraw @s[scores={gms=1..}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Anti-GMS is currently §aENABLED"}]}
tellraw @s[scores={gmc=1..}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Anti-GMC is currently §aENABLED"}]}
tellraw @s[scores={commandblocks=..0}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r AntiCommandBlocks is currently §4DISABLED"}]}
tellraw @s[scores={commandblocks=1..}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r AntiCommandBlocks is currently §aENABLED"}]}
tellraw @s[scores={cmds=..0}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r ForceCommandBlocks is currently §4DISABLED"}]}
tellraw @s[scores={cmds=1}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r ForceCommandBlocks is set to §aENABLED"}]}
tellraw @s[scores={cmds=2..}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r ForceCommandBlocks is set to §4DISABLED"}]}
tellraw @s[scores={npc=..0}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Anti-NPC is set to §aENABLED"}]}
tellraw @s[scores={npc=1..}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Anti-NPC is set to §4DISABLED"}]}