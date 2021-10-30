# other stuff
scoreboard objectives add xPos dummy
scoreboard objectives add yPos dummy
scoreboard objectives add zPos dummy
scoreboard players add @s[tag=right] right 1

title @s[tag=vanish] actionbar §aYOU ARE VANISHED!

tp @e[type=xp_orb] @p[r=25]

# If the player is under y= -40 this teleports them to y= -40
tp @s[y=-41,dy=-80] ~ -40 ~

# optional features

# NoCMDS
scoreboard players operation @s cmds = scythe:config cmds
execute @s[scores={cmds=1}] ~~~ gamerule commandblocksenabled true
execute @s[scores={cmds=2..}] ~~~ gamerule commandblocksenabled false
