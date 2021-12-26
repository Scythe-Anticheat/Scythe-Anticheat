# other stuff
scoreboard objectives add xPos dummy
scoreboard objectives add yPos dummy
scoreboard objectives add zPos dummy
scoreboard players add @s[tag=right] right 1

execute @s[tag=vanish] ~~~ function checks/assets/vanish

tp @e[type=xp_orb] @p[r=25]

# If the player is under y=-104 this teleports them back to y=-104
tp @s[y=-105,dy=-205] ~ -104 ~

# patch invalid entities riding boats
ride @e[type=!player] stop_riding

# fix a possible bypass
tag @e[type=!player] remove op

# overide commandblocksenabled
execute @s[scores={cmds=1}] ~~~ gamerule commandblocksenabled true
execute @s[scores={cmds=2..}] ~~~ gamerule commandblocksenabled false