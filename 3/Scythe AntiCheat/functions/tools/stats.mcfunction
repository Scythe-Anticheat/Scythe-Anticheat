# Gets all Scythe statistics on a user

tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Getting all Scythe Logs from: "},{"selector":"@s"}]}
execute @s[m=c] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" is in Creative Mode"}]}
execute @s[m=s] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" is in Survival Mode"}]}
execute @s[m=a] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" is in Adventure Mode"}]}
tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has "},{"score":{"name":"@s","objective":"killauravl"}},{"text":" KillAura Violations"}]}
tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has "},{"score":{"name":"@s","objective":"speedvl"}},{"text":" Speed Violations"}]}
tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has "},{"score":{"name":"@s","objective":"phasevl"}},{"text":" Phase Violations"}]}
tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has "},{"score":{"name":"@s","objective":"flyvl"}},{"text":" Fly Violations"}]}
tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has "},{"score":{"name":"@s","objective":"jesusvl"}},{"text":" Jesus Violations"}]}
tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has "},{"score":{"name":"@s","objective":"anglevl"}},{"text":" Angle Violations"}]}
tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has "},{"score":{"name":"@s","objective":"epearlGlitch"}},{"text":" Ender Pearl Violations"}]}
tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has "},{"score":{"name":"@s","objective":"leftclickvl"}},{"text":" AutoClicker Violations"}]}



