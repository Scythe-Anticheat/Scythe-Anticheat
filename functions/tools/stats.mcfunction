# Gets all anticheat logs from a player

tellraw @a[tag=notify] {"rawtext":[{"text":"\n§r§6[§aScythe§6]§r Getting all Scythe logs from: "},{"selector":"@s"}]}
execute @s[m=c] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" is in Creative mode."}]}
execute @s[m=s] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" is in Survival mode."}]}
execute @s[m=a] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" is in Adventure mode."}]}
tellraw @a[tag=notify,scores={gametestapi=1..}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" is currently at X= "},{"score":{"name":"@s","objective":"xPos"}},{"text":", Y= "},{"score":{"name":"@s","objective":"yPos"}},{"text":", Z= "},{"score":{"name":"@s","objective":"zPos"}}]}

execute @s[scores={autoclickervl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has "},{"score":{"name":"@s","objective":"autoclickervl"}},{"text":" AutoClicker violations."}]}
execute @s[scores={autoshieldvl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has "},{"score":{"name":"@s","objective":"autoshieldvl"}},{"text":" AutoShield violations."}]}
execute @s[scores={autototemvl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has "},{"score":{"name":"@s","objective":"autototemvl"}},{"text":" AutoTotem violations."}]}
execute @s[scores={badenchants=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has "},{"score":{"name":"@s","objective":"badpackets2"}},{"text":" BadPackets violations."}]}
execute @s[scores={anglevl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has "},{"score":{"name":"@s","objective":"badenchants"}},{"text":" BadEnchants violations."}]}
execute @s[scores={badpacketsvl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has "},{"score":{"name":"@s","objective":"badpackets2"}},{"text":" BadPackets violations."}]}
execute @s[scores={cbevl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has "},{"score":{"name":"@s","objective":"cbevl"}},{"text":" Command Block Exploit violations."}]}
execute @s[scores={crashervl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has "},{"score":{"name":"@s","objective":"crashervl"}},{"text":" Crasher violations."}]}
execute @s[scores={flyvl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has "},{"score":{"name":"@s","objective":"flyvl"}},{"text":" Fly violations."}]}
execute @s[scores={illegalitemsvl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has "},{"score":{"name":"@s","objective":"illegalitemsvl"}},{"text":" Illegal Items violations."}]}
execute @s[scores={invalidsprintvl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has "},{"score":{"name":"@s","objective":"invalidsprintvl"}},{"text":" InvalidSprint violations."}]}
execute @s[scores={killauravl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has "},{"score":{"name":"@s","objective":"killauravl"}},{"text":" KillAura violations."}]}
execute @s[scores={invmovevl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has "},{"score":{"name":"@s","objective":"invmovevl"}},{"text":" InventoryMods violations."}]}
execute @s[scores={liquidinteractvl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has "},{"score":{"name":"@s","objective":"liquidinteractvl"}},{"text":" Liquid Interact violations."}]}
execute @s[scores={namespoofvl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has "},{"score":{"name":"@s","objective":"namespoofvl"}},{"text":" NameSpoof violations."}]}
execute @s[scores={noslowvl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has "},{"score":{"name":"@s","objective":"noslowvl"}},{"text":" NoSlow violations."}]}
execute @s[scores={nukervl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has "},{"score":{"name":"@s","objective":"nukervl"}},{"text":" Nuker violations."}]}
execute @s[scores={spammervl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has "},{"score":{"name":"@s","objective":"spammervl"}},{"text":" Spammer violations."}]}
execute @s[scores={reachvl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has "},{"score":{"name":"@s","objective":"reachvl"}},{"text":" Reach violations."}]}
execute @s[scores={gamemodevl=1..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has "},{"score":{"name":"@s","objective":"gamemodevl"}},{"text":" Gamemode Change violations."}]}

execute @s[tag=freeze] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" is currently frozen by a staff member"}]}
execute @s[tag=vanish] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" is currently in vanish"}]}
execute @s[tag=flying] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has fly mode enabled"}]}

tellraw @a[tag=notify,tag=debug] {"rawtext":[{"text":"§߈§r§6[§aScythe§6]§r "},{"text":" ----- DEBUG STATS -----"}]}

execute @s[tag=ground] ~~~ tellraw @a[tag=notify,tag=debug] {"rawtext":[{"text":"§߈§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" onGround: §atrue"}]}
execute @s[tag=jump] ~~~ tellraw @a[tag=notify,tag=debug] {"rawtext":[{"text":"§߈§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" isJumping: §atrue"}]}
execute @s[tag=sneak] ~~~ tellraw @a[tag=notify,tag=debug] {"rawtext":[{"text":"§߈§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" isSneaking: §atrue"}]}
execute @s[tag=gliding] ~~~ tellraw @a[tag=notify,tag=debug] {"rawtext":[{"text":"§߈§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" isGliding: §atrue"}]}
execute @s[tag=levitating] ~~~ tellraw @a[tag=notify,tag=debug] {"rawtext":[{"text":"§߈§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" isLevitating: §atrue"}]}
execute @s[tag=riding] ~~~ tellraw @a[tag=notify,tag=debug] {"rawtext":[{"text":"§߈§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" isRiding: §atrue"}]}
execute @s[tag=left] ~~~ tellraw @a[tag=notify,tag=debug] {"rawtext":[{"text":"§߈§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" isSwinging: §atrue"}]}
execute @s[tag=right] ~~~ tellraw @a[tag=notify,tag=debug] {"rawtext":[{"text":"§߈§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" isUsing: §atrue"}]}
execute @s[tag=moving] ~~~ tellraw @a[tag=notify,tag=debug] {"rawtext":[{"text":"§߈§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" isMoving: §atrue"}]}
execute @s[tag=hasGUIopen] ~~~ tellraw @a[tag=notify,tag=debug] {"rawtext":[{"text":"§߈§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" hasGUIopen: §atrue"}]}
execute @s[tag=sprint] ~~~ tellraw @a[tag=notify,tag=debug] {"rawtext":[{"text":"§߈§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" isSprinting: §atrue"}]}