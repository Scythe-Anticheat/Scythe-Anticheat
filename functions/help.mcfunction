# sometimes the gametestapi scoreboard value doesnt apply correctly so we apply it again
scoreboard players operation @a gametestapi = scythe:config gametestapi

tellraw @s {"rawtext":[{"text":"\n§l§aScythe AntiCheat Command Help"}]}

# alert the player if gametest is disabled
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"\n§l§4Gametest Is Disabled In World!"}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"\n§l§4Please Enable Gametest, Cheats, and Education Edition!"}]}

tellraw @s {"rawtext":[{"text":"\n§l§aModeration Commands"}]}

# Gametest enabled
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!help§r - Shows this help page."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!ban <username> [time] [reason]§r - Ban the specified user."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!kick <username> [reason]§r - Kick the specified user."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!mute <username> [reason]§r - Mute the specified user."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!unmute <username> [reason]§r - Unmute the specified user."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!notify§r - Enables/Disables cheat notifications."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!credits§r - Shows credits, thats it."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!op <username>§r - Op's player in Scythe AntiCheat features."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!unban <username> [reason]§r - Unbans the specified player."}]}

# Gametest Disabled
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/function help§r - Shows this help page."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/execute <username> ~~~ function ban§r - Ban the specified user."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/function notify§r - Enables/Disables cheat notifications."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/function credits§r - Shows credits, thats it."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/execute <username> ~~~ function op§r - Op's player in Scythe AntiCheat features."}]}

tellraw @s {"rawtext":[{"text":"\n§l§aOptional Features"}]}

# Gametest enabled
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!modules§r - View all enabled or disabled modules."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!allowgma§r - Enables/disables gamemode 2(Adventure) to be used."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!allowgmc§r - Enables/disables gamemode 1(Creative) to be used."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!allowgms§r - Enables/disables gamemode 0(Survival) to be used."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!removecommandblocks§r - Enables/disables clearing nearby command blocks."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!bedrockvalidate§r - Enables/disables validation of bedrock (Such as in the nether roof or at y=0)."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!overidecommandblocksenabled§r - Forces the commandblocksenabled gamerule to be enabled or disabled at all times."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!npc§r - Enables/disables Killing all NPC's."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!worldborder§r - Enables/disables the world border and its size."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!xray§r - Enables/disables the anti-xray check."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!autoclicker§r - Enables/disables Anti Autoclicker."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!autoban§r - Enables/disables auto banning."}]}

# Gametest disabled
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/function settings/modules§r - View all enabled or disabled modules."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/function settings/allowGMA§r - Enables/disables gamemode 2(Adventure) to be used."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/function settings/allowGMC§r - Enables/disables gamemode 1(Creative) to be used."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/function settings/allowGMS§r - Enables/disables gamemode 0(Survival) to be used."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/function settings/removeCommandBlocks§r - Enables/disables clearing nearby command blocks."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/function settings/bedrockValidate§r - Enables/disables validation of bedrock (Such as in the nether roof or at y=0)."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/function overideCommandBlocksEnabled§r - Forces the commandblocksenabled gamerule to be enabled or disabled at all times."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/function settings/npc§r - Enables/disables Killing all NPC's."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/function settings/worldborder§r - Enables/disables the world border and its size."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/function settings/xray§r - Enables/disables the anti-xray check."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/function settings/autoclicker§r - Enables/disables Anti Autoclicker."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/function settings/autoban - Enables/disables auto banning."}]}

tellraw @s {"rawtext":[{"text":"\n§l§aTools and Utilites"}]}

# Gametest enabled
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!ecwipe <username>§r - Clears a players ender chest."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!fly <username>§r - Enables/disables fly mode in survival."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!freeze <username>§r - Freeze a player and make it so they cant move."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!stats <username>§r - View a specific players anticheat logs."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!fullreport§r - View everyones anticheat logs."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!vanish§r - Enables/disables vanish (Used for spying on suspects)."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!oldvanish§r - Enables/disables old vanish (Used for spying on suspects)."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!tag <nametag>§r - Adds tag to username in chat window."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!report <player> [reason]§r - Report a player."}]}
tellraw @s[scores={gametestapi=1..}] {"rawtext":[{"text":"§3!gui - Opens the Scythe Management UI."}]}

# Gametest disabled
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/execute <username> ~~~ function tools/ecwipe§r - Clears a players ender chest."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/execute <username> ~~~ tools/fly§r - Enables/disables fly mode in survival."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/execute <username> ~~~ tools/freeze§r - Freeze a player and make it so they cant move."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/execute <username> ~~~ tools/stats§r - View a specific players anticheat logs."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/execute @a ~~~ function tools/stats§r - View everyones anticheat logs."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/execute <username> ~~~ tools/vanish§r - Enables/disables vanish (Used for spying on suspects)."}]}
tellraw @s[scores={gametestapi=..0}] {"rawtext":[{"text":"§3/execute <username> ~~~ tools/oldvanish§r - Enables/disables old vanish (Used for spying on suspects)."}]}

tellraw @s {"rawtext":[{"text":"\n"}]}
