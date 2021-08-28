# Stops Phase/Noclip hacks

scoreboard players add @a phasevl 0

execute @a[tag=!bypass] ~ ~ ~ detect ~ ~ ~ grass -1 tag @s add PhaseDetected
execute @a[tag=!bypass] ~ ~ ~ detect ~ ~ ~ dirt -1 tag @s add PhaseDetected
execute @a[tag=!bypass] ~ ~ ~ detect ~ ~ ~ cobblestone 0 tag @s add PhaseDetected
execute @a[tag=!bypass] ~ ~ ~ detect ~ ~ ~ stone -1 tag @s add PhaseDetected
execute @a[tag=!bypass] ~ ~ ~ detect ~ ~ ~ obsidian -1 tag @s add PhaseDetected
execute @a[tag=!bypass] ~ ~ ~ detect ~ ~ ~ netherrack -1 tag @s add PhaseDetected
execute @a[tag=!bypass] ~ ~ ~ detect ~ ~ ~ bedrock -1 tag @s add PhaseDetected

execute @a[tag=PhaseDetected] ~ ~ ~ scoreboard players add @s phasevl 1
execute @a[tag=PhaseDetected] ~ ~ ~ tp @s ~ ~ ~ 0 0
execute @a[tag=PhaseDetected] ^ ^ ^ tp ^ ^ ^-1
execute @a[tag=PhaseDetected] ~ ~ ~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Movement) §4Phase/A. VL= "},{"score":{"name":"@s","objective":"phasevl"}}]}

tag @a[tag=PhaseDetected] remove PhaseDetected
