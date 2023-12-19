# Gets all anticheat logs from a player

tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Showing all Scythe logs for "},{"selector":"@s"},{"text":":"}]}
execute @s[m=spectator] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Gamemode: Spectator"}]}
execute @s[m=c] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Gamemode: Creative"}]}
execute @s[m=s] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Gamemode: Survival"}]}
execute @s[m=a] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Gamemode: Adventure"}]}
tellraw @a[tag=notify,scores={gametestapi=1..}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Position: "},{"score":{"name":"@s","objective":"xPos"}},{"text":", "},{"score":{"name":"@s","objective":"yPos"}},{"text":", "},{"score":{"name":"@s","objective":"zPos"}}]}

execute @s[scores={autoclickervl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Autoclicker violations: §c"},{"score":{"name":"@s","objective":"autoclickervl"}}]}
execute @s[scores={autoshieldvl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Autoshield violations: §c"},{"score":{"name":"@s","objective":"autoshieldvl"}}]}
execute @s[scores={autototemvl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Autototem violations: §c"},{"score":{"name":"@s","objective":"autototemvl"}}]}
execute @s[scores={badenchants=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r BadEnchants violations: §c"},{"score":{"name":"@s","objective":"badenchantsvl"}}]}
execute @s[scores={badpacketsvl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r BadPackets violations: §c"},{"score":{"name":"@s","objective":"badpacketsvl"}}]}
execute @s[scores={cbevl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r CommandBlockExploit violations: §c"},{"score":{"name":"@s","objective":"cbevl"}}]}
execute @s[scores={crashervl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Crasher violations: §c"},{"score":{"name":"@s","objective":"crashervl"}}]}
execute @s[scores={fastusevl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r FastUse violations: §c"},{"score":{"name":"@s","objective":"fastusevl"}}]}
execute @s[scores={flyvl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Fly violations: §c"},{"score":{"name":"@s","objective":"flyvl"}}]}
execute @s[scores={illegalitemsvl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r IllegalItems violations: §c"},{"score":{"name":"@s","objective":"illegalitemsvl"}}]}
execute @s[scores={invalidsprintvl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r InvalidSprint violations: §c"},{"score":{"name":"@s","objective":"invalidsprintvl"}}]}
execute @s[scores={invmovevl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r InventoryMods violations: §c"},{"score":{"name":"@s","objective":"invmovevl"}}]}
execute @s[scores={killauravl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Killaura violations: §c"},{"score":{"name":"@s","objective":"killauravl"}}]}
execute @s[scores={namespoofvl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Namespoof violations: §c"},{"score":{"name":"@s","objective":"namespoofvl"}}]}
execute @s[scores={noslowvl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r NoSlow violations: §c"},{"score":{"name":"@s","objective":"noslowvl"}}]}
execute @s[scores={nukervl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Nuker violations: §c"},{"score":{"name":"@s","objective":"nukervl"}}]}
execute @s[scores={reachvl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Reach violations: §c"},{"score":{"name":"@s","objective":"reachvl"}}]}
execute @s[scores={spammervl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Spammer violations: §c"},{"score":{"name":"@s","objective":"spammervl"}}]}
execute @s[scores={scaffoldvl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Scaffold violations: §c"},{"score":{"name":"@s","objective":"scaffoldvl"}}]}
execute @s[scores={gamemodevl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Gamemode change violations: §c"},{"score":{"name":"@s","objective":"gamemodevl"}}]}

execute @s[tag=freeze] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" is currently frozen by a staff member."}]}
execute @s[tag=vanish] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" is currently in vanish."}]}
execute @s[tag=flying] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has fly mode enabled."}]}