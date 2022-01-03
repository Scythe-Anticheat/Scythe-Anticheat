# other stuff
scoreboard players add @s[tag=right] right 1

execute @s[tag=vanish] ~~~ function checks/assets/vanish

tp @e[type=xp_orb] @p[r=25]

# If the player is under y=-104 this teleports them back to y=-104
tp @s[y=-105,dy=-205] ~ -104 ~

tag @e[type=!player,tag=op] remove op