# sometimes the gametestapi scoreboard value doesnt apply correctly so we apply it again
scoreboard players add scythe:config gametestapi 0
scoreboard players operation @s gametestapi = scythe:config gametestapi

tellraw @s {"rawtext":[{"text":"\n§l§aScythe AntiCheat Command Help"}]}

# alert the player if gametest is disabled
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"\n§l§4Beta APIs are disabled in this world."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§l§4Please enable Beta APIs and Education Edition in world settings to ensure all features work properly."}]}

tellraw @s {"rawtext":[{"text":"\n§l§aModeration Commands"}]}

# Gametest enabled
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!help§r - Shows this help page."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!ban <username> [time] [reason]§r - Ban the specified user."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!kick <username> [reason]§r - Kick the specified user."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!mute <username> [reason]§r - Mute the specified user."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!unmute <username> [reason]§r - Unmute the specified user."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!notify§r - Enables/Disables cheat notifications."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!credits§r - Shows credits, that's it."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!op <username>§r - Op's a player in Scythe Anticheat features."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!unban <username> [reason]§r - Unbans the specified player."}]}

# Gametest Disabled
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/function help§r - Shows this help page."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/execute as <username> run function ban§r - Ban the specified user."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/function notify§r - Enables/Disables cheat notifications."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/function credits§r - Shows credits, that's it."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/tag <player name> add op§r - Op's a player in Scythe AntiCheat features."}]}

tellraw @s {"rawtext":[{"text":"\n§l§aOptional Features"}]}

# Gametest enabled
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!modules§r - View all enabled or disabled modules."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!antiGMA§r - Enables/disables gamemode 2 (Adventure) to be used."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!antiGMC§r - Enables/disables gamemode 1 (Creative) to be used."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!antiGMS§r - Enables/disables gamemode 0 (Survival) to be used."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!autoban§r - Enables/disables auto-banning."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!autoclicker§r - Enables/disables anti-autoclicker."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!bedrockValidate§r - Enables/disables validation of bedrock (Such as in the nether roof or at y=-64)."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!invalidsprint§r - Enables/disables anti-invalidsprint."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!npc§r - Enables/disables killing all NPCs."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!overideCommandBlocksEnabled§r - Forces the commandblocksenabled gamerule to be enabled or disabled at all times."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!removeCommandBlocks§r - Enables/disables clearing nearby command blocks."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!worldborder§r - Enables/disables the world border and its size."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!xray§r - Enables/disables anti-xray."}]}

# Gametest disabled
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/function settings/modules§r - View all enabled or disabled modules."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/function settings/antiGMA§r - Enables/disables gamemode 2 (Adventure) to be used."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/function settings/antiGMC§r - Enables/disables gamemode 1 (Creative) to be used."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/function settings/antiGMS§r - Enables/disables gamemode 0 (Survival) to be used."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/function settings/autoban§r - Enables/disables auto-banning."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/function settings/autoclicker§r - Enables/disables anti-autoclicker."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/function settings/bedrockValidate§r - Enables/disables validation of bedrock (Such as in the nether roof or at y=-64)."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/function settings/invalidsprint§r - Enables/disables anti-invalidsprint."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/function settings/npc§r - Enables/disables killing all NPCs."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/function settings/overideCommandBlocksEnabled§r - Forces the commandblocksenabled gamerule to be enabled or disabled at all times."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/function settings/removeCommandBlocks§r - Enables/disables clearing nearby command blocks."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/function settings/worldborder§r - Enables/disables the world border and its size."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/function settings/xray§r - Enables/disables anti-xray ."}]}

tellraw @s {"rawtext":[{"text":"\n§l§aTools and Utilites"}]}

# Gametest enabled
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!ecwipe <username>§r - Clears a player's ender chest."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!fly [username]§r - Enables/disables the ability to fly in survival mode."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!freeze <username>§r - Freeze a player and make it so they can't move."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!stats <username>§r - View a specific players anticheat logs."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!fullreport§r - View everyones anticheat logs."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!vanish§r - Enables/disables vanish (Used for spying on suspects)."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!tag <nametag>§r - Adds tag to username in chat window (use \"reset\" to get rid of it)."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!tag <player> <nametag>§r - Adds tag to username in chat window for specific users (use \"reset\" to get rid of it)."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!report <player> [reason]§r - Report a player."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!ui§r - Opens the Scythe Management UI."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!invsee <player>§r - View another players inventory."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!resetwarns <player>§r - Reset a players violations."}]}

# Gametest disabled
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/execute as <username> run function tools/ecwipe§r - Clears a players ender chest."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/execute as <username> run function tools/fly§r - Enables/disables the ability to fly."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/execute as <username> run function tools/freeze§r - Freeze a player and make it so they cant move."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/execute as <username> run function tools/stats§r - View a specific players anticheat logs."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/execute as<username> run function tools/vanish§r - Enables/disables vanish mode (Used for spying on suspects)."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/execute as<username> run function tools/resetwarns§r - Reset a players violations."}]}

tellraw @s {"rawtext":[{"text":"\nNeed extra help? Ask your question in the support server: https://discord.gg/9m9TbgJ973.\n"}]}