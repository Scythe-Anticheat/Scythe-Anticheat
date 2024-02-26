# Sometimes the gametestapi scoreboard value doesn't apply correctly so we apply it again
scoreboard players add scythe:config gametestapi 0
scoreboard players operation @s gametestapi = scythe:config gametestapi

tellraw @s {"rawtext":[{"text":"§l§aScythe AntiCheat Command Help"}]}

# Alert the player if gametest is disabled
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"\n§l§4Beta APIs are disabled in this world."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§l§4Please enable Beta APIs and Education Edition in world settings to ensure all features work properly."}]}

tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§l§4You are currently viewing the function-based help menu. Use '!help' instead of this command."}]}

tellraw @s {"rawtext":[{"text":"\n§l§aModeration Commands"}]}

tellraw @s {"rawtext":[{"text":"§3/function help§r - Shows this help page."}]}
tellraw @s {"rawtext":[{"text":"§3/execute as <username> run function ban§r - Ban the specified user."}]}
tellraw @s {"rawtext":[{"text":"§3/function notify§r - Enables/Disables cheat notifications."}]}
tellraw @s {"rawtext":[{"text":"§3/function credits§r - Show credits for the anticheat."}]}
tellraw @s {"rawtext":[{"text":"§3/tag <player name> add op§r - Op's a player in Scythe AntiCheat features."}]}

tellraw @s {"rawtext":[{"text":"\n§l§aOptional Features"}]}

tellraw @s {"rawtext":[{"text":"§3/function settings/modules§r - View all enabled or disabled modules."}]}
tellraw @s {"rawtext":[{"text":"§3/function settings/invalidsprint§r - Enables/disables anti-invalidsprint."}]}
tellraw @s {"rawtext":[{"text":"§3/function settings/npc§r - Enables/disables killing all NPCs."}]}
tellraw @s {"rawtext":[{"text":"§3/function settings/overrideCommandBlocksEnabled§r - Forces the commandblocksenabled gamerule to be enabled or disabled at all times."}]}

tellraw @s {"rawtext":[{"text":"\n§l§aTools and Utilities"}]}

tellraw @s {"rawtext":[{"text":"§3/execute as <username> run function tools/ecwipe§r - Clears a players ender chest."}]}
tellraw @s {"rawtext":[{"text":"§3/execute as <username> run function tools/fly§r - Enables/disables the ability to fly."}]}
tellraw @s {"rawtext":[{"text":"§3/execute as <username> run function tools/freeze§r - Freeze a player and make it so they can't move."}]}
tellraw @s {"rawtext":[{"text":"§3/execute as <username> run function tools/stats§r - View a specific players anticheat logs."}]}
tellraw @s {"rawtext":[{"text":"§3/execute as <username> run function tools/vanish§r - Enables/disables vanish mode (Used for spying on suspects)."}]}
tellraw @s {"rawtext":[{"text":"§3/execute as <username> run function tools/resetwarns§r - Reset a players violations."}]}

tellraw @s {"rawtext":[{"text":"\nNeed extra help? Ask your question in the support server: https://discord.gg/9m9TbgJ973.\n"}]}