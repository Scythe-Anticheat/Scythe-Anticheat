# Stops Phase/Noclip hacks

tag @a[tag=PhaseDetected] remove PhaseDetected

execute @a[tag=!bypass] ~ ~ ~ detect ~ ~ ~ grass 0 tag @s add PhaseDetected
execute @a[tag=!bypass] ~ ~ ~ detect ~ ~ ~ dirt 0 tag @s add PhaseDetected
execute @a[tag=!bypass] ~ ~ ~ detect ~ ~ ~ cobblestone 0 tag @s add PhaseDetected
execute @a[tag=!bypass] ~ ~ ~ detect ~ ~ ~ stone 0 tag @s add PhaseDetected
execute @a[tag=!bypass] ~ ~ ~ detect ~ ~ ~ obsidian 0 tag @s add PhaseDetected
execute @a[tag=!bypass] ~ ~ ~ detect ~ ~ ~ netherrack 0 tag @s add PhaseDetected

execute @a[tag=PhaseDetected] ~ ~ ~ scoreboard players add @s phasevl 1
execute @a[tag=PhaseDetected] ^ ^ ^ tp ^ ^ ^-1
execute @a[tag=PhaseDetected] ~ ~ ~ tell @a[tag=notify] §r§6[§aScythe§6] §r@s §1has failed §4Phase/Noclip.