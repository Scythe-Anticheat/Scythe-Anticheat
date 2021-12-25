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
scoreboard objectives add bedrock dummy
scoreboard players add @s bedrock 0
scoreboard objectives add worldborder dummy
scoreboard players add @s worldborder 0
scoreboard objectives add frostwalker dummy
scoreboard players add @s frostwalker 0
scoreboard objectives add npc dummy
scoreboard players add @s npc 0

tellraw @s[scores={gma=..0}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Anti-GMA is currently §4DISABLED"}]}
tellraw @s[scores={gms=..0}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Anti-GMS is currently §4DISABLED"}]}
tellraw @s[scores={gmc=..0}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Anti-GMC is currently §4DISABLED"}]}
tellraw @s[scores={gma=1..}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Anti-GMA is currently §aENABLED"}]}
tellraw @s[scores={gms=1..}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Anti-GMS is currently §aENABLED"}]}
tellraw @s[scores={gmc=1..}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Anti-GMC is currently §aENABLED"}]}
tellraw @s[scores={commandblocks=..0}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r RemoveCommandBlcoks is currently §4DISABLED"}]}
tellraw @s[scores={commandblocks=1..}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r RemoveCommandBlcoks is currently §aENABLED"}]}
tellraw @s[scores={cmds=..0}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r OverideCommandBlocksEnabled is currently §4DISABLED"}]}
tellraw @s[scores={cmds=1}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r OverideCommandBlocksEnabled is set to §aENABLED"}]}
tellraw @s[scores={cmds=2..}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r OverideCommandBlocksEnabled is set to §4DISABLED"}]}
tellraw @s[scores={npc=..0}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Anti-NPC is set to §aENABLED"}]}
tellraw @s[scores={npc=1..}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Anti-NPC is set to §4DISABLED"}]}
tellraw @s[scores={bedrock=1..}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Bedrock validation is set to §aENABLED"}]}
tellraw @s[scores={bedrock=..0}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Bedrock validation is set to §4DISABLED"}]}
tellraw @s[scores={worldborder=1}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r World border is set to §a1k"}]}
tellraw @s[scores={worldborder=2}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r World border is set to §a5k"}]}
tellraw @s[scores={worldborder=3}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r World border is set to §a10k"}]}
tellraw @s[scores={worldborder=4}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r World border is set to §a25k"}]}
tellraw @s[scores={worldborder=5}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r World border is set to §a50k"}]}
tellraw @s[scores={worldborder=6..}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r World border is set to §a100k"}]}
tellraw @s[scores={worldborder=..0}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r World Border is set to §4DISABLED"}]}
tellraw @s[scores={frostwalker=1..}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r No Frost Walker is currently §aENABLED"}]}
tellraw @s[scores={frostwalker=..0}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r No Frost Walker is currently §4DISABLED"}]}
