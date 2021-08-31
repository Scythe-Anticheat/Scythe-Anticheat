# Stops Phase/Noclip hacks

scoreboard objectives add phasevl dummy
scoreboard players add @s phasevl 0

tag @s[tag=PhaseDetected] remove PhaseDetected

execute @s[tag=!bypass] ~~~ detect ~~~ grass -1 tag @s add PhaseDetected
execute @s[tag=!bypass] ~~~ detect ~~~ dirt -1 tag @s add PhaseDetected
execute @s[tag=!bypass] ~~~ detect ~~~ cobblestone 0 tag @s add PhaseDetected
execute @s[tag=!bypass] ~~~ detect ~~~ stone -1 tag @s add PhaseDetected
execute @s[tag=!bypass] ~~~ detect ~~~ obsidian -1 tag @s add PhaseDetected
execute @s[tag=!bypass] ~~~ detect ~~~ netherrack -1 tag @s add PhaseDetected
execute @s[tag=!bypass] ~~~ detect ~~~ bedrock -1 tag @s add PhaseDetected

scoreboard players add @s[tag=PhaseDetected] phasevl 1
tp @s[tag=PhaseDetected] ~~~ 0 0
tp @s[tag=PhaseDetected] ^ ^ ^-1
execute @s[tag=PhaseDetected] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Movement) §4Phase/A. VL= "},{"score":{"name":"@s","objective":"phasevl"}}]}