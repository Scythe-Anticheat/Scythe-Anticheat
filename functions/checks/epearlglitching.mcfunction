# Prevents E-Pearls from glitching through walls

execute @s[type=ender_pearl,tag=!enderPearlGlitch] ~~~ detect ~~~ ladder -1 tag @s add enderPearlGlitch
execute @s[type=ender_pearl,tag=!enderPearlGlitch] ~~~ detect ~~~ vine -1 tag @s add enderPearlGlitch
execute @s[type=ender_pearl,tag=!enderPearlGlitch] ~~~ detect ~~~ twisting_vines -1 tag @s add enderPearlGlitch
execute @s[type=ender_pearl,tag=!enderPearlGlitch] ~~~ detect ~~~ weeping_vines -1 tag @s add enderPearlGlitch

execute @s[type=ender_pearl,tag=enderPearlGlitch] ~~~ detect ~~+1~ air -1 tag @s remove enderPearlGlitch
execute @s[type=ender_pearl,tag=enderPearlGlitch] ~~~ scoreboard players add @p epearlGlitch 1
execute @s[type=ender_pearl,tag=enderPearlGlitch] ~~~ execute @p ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Misc) §4Ender Pearl Glitching/A. VL= "},{"score":{"name":"@s","objective":"epearlGlitch"}}]}
tp @s[type=ender_pearl,tag=enderPearlGlitch] ~ -200 ~
