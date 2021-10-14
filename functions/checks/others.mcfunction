# other stuff
scoreboard objectives add spammervl dummy
scoreboard objectives add namespoofvl dummy
scoreboard objectives add crasher dummy
scoreboard objectives add xPos dummy
scoreboard objectives add yPos dummy
scoreboard objectives add zPos dummy

effect @s[tag=vanish] invisibility 9999 255 true
effect @s[tag=vanish] night_vision 9999 255 true
title @s[tag=vanish] actionbar §aYOU ARE VANISHED!

tp @e[type=xp_orb] @p[r=25]

# If the player is under y= -40 this teleports them to y= -40
tp @s[y=-41,dy=-80] ~ -40 ~

# optional features

# NoCMDS
scoreboard players operation @s cmds = scythe:config cmds
execute @s[scores={cmds=1}] ~~~ gamerule commandblocksenabled true
execute @s[scores={cmds=2..}] ~~~ gamerule commandblocksenabled false