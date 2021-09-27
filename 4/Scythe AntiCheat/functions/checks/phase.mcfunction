# Stops Phase/Noclip hacks

tag @a[tag=PhaseDetected] remove PhaseDetected

execute @a[tag=!op] ~ ~ ~ detect ~ ~ ~ grass -1 tag @s add PhaseDetected
execute @a[tag=!op] ~ ~ ~ detect ~ ~ ~ dirt -1 tag @s add PhaseDetected
execute @a[tag=!op] ~ ~ ~ detect ~ ~ ~ stone -1 tag @s add PhaseDetected
execute @a[tag=!op] ~ ~ ~ detect ~ ~ ~ cobblestone -1 tag @s add PhaseDetected
execute @a[tag=!op] ~ ~ ~ detect ~ ~ ~ sandstone -1 tag @s add PhaseDetected
execute @a[tag=!op] ~ ~ ~ detect ~ ~ ~ obsidian -1 tag @s add PhaseDetected
execute @a[tag=!op] ~ ~ ~ detect ~ ~ ~ bedrock -1 tag @s add PhaseDetected
execute @a[tag=!op] ~ ~ ~ detect ~ ~ ~ planks -1 tag @s add PhaseDetected
execute @a[tag=!op] ~ ~ ~ detect ~ ~ ~ grass -1 tag @s add PhaseDetected

execute @a[tag=PhaseDetected] ^ ^ ^ tp ^ ^ ^-1 
execute @a[tag=PhaseDetected] ~ ~ ~ say @a[tag=notify] §1failed Phase/Noclip.