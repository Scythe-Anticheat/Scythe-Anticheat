# Prevents E-Pearls from glitching through walls

scoreboard objectives add epearlGlitch dummy
scoreboard players add @s epearlGlitch 0

execute @e[type=ender_pearl,tag=!enderPearlGlitch] ~~~ detect ~~~ ladder -1 tag @s add enderPearlGlitch
execute @e[type=ender_pearl,tag=!enderPearlGlitch] ~~~ detect ~~~ vine -1 tag @s add enderPearlGlitch
execute @e[type=ender_pearl,tag=!enderPearlGlitch] ~~~ detect ~~~ twisting_vines -1 tag @s add enderPearlGlitch
execute @e[type=ender_pearl,tag=!enderPearlGlitch] ~~~ detect ~~~ weeping_vines -1 tag @s add enderPearlGlitch

execute @e[type=ender_pearl,tag=enderPearlGlitch] ^^^ detect ^^+1^ air -1 tag @s remove enderPearlGlitch
execute @e[type=ender_pearl,tag=enderPearlGlitch] ~~~ execute @p[tag=!bypass] ~~~ scoreboard players add @s epearlGlitch 1
execute @e[type=ender_pearl,tag=enderPearlGlitch] ~~~ execute @p[tag=!bypass] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Movement) §4Ender Pearl Glitching/A. VL= "},{"score":{"name":"@s","objective":"epearlGlitch"}}]}
execute @e[type=ender_pearl,tag=enderPearlGlitch] ~~~ tp @s ~ -200 ~
