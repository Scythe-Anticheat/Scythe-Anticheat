# other stuff
scoreboard players add @s[tag=right] right 1
scoreboard players add @s[tag=dead] deathticks 1
scoreboard players add @s[scores={last_attack=1..}] last_attack 1
execute @s[tag=!left,scores={last_attack=10..}] ~~~ function checks/alerts/noswing

execute @s[tag=vanish] ~~~ function checks/assets/vanish

execute @e[type=xp_orb] ~~~ tp @s @p[r=10]

# If the player is under y=-104 this teleports them back to y=-104
tp @s[y=-105,dy=-205] ~ -104 ~